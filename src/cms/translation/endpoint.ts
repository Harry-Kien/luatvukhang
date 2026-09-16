import type { Endpoint, PayloadRequest } from "payload";
import { roleOf } from "../access";
import { collectTexts, replaceTexts } from "./richtext";
import {
  translateStrings,
  translationProvider,
  TranslationTooLarge,
  TranslationUnavailable,
} from "./provider";
import { overLimit } from "@/lib/rate-limit";
import { ensureOperationsTable } from "@/lib/operations-db";

const COLLECTIONS = [
  "pages",
  "services",
  "industries",
  "lawyers",
  "experience",
  "articles",
  "careers",
];
const EDITORIAL = ["admin", "editor", "reviewer", "publisher"];
type Target = "en" | "zh";
const json = (body: unknown, status = 200) => Response.json(body, { status });

/** Các ô chữ của bản ghi cần dịch, theo tên đường dẫn phẳng. */
const PLAIN_FIELDS = [
  "title",
  "summary",
  "keywords",
  "position",
  "qualifications",
  "languages",
  "location",
  "audience",
  "seo.title",
  "seo.description",
  "banner.caption",
];
const ARRAY_FIELDS: Record<string, string[]> = {
  scope: ["item"],
  process: ["heading", "description"],
  faq: ["question", "answer"],
  sources: ["label"],
};

type Slot = { get: () => string; set: (v: string) => void };

function richSlots(holder: Record<string, any>, key: string, slots: Slot[]) {
  const texts = collectTexts(holder[key]);
  const pending: string[] = [...texts];
  texts.forEach((_, i) =>
    slots.push({
      get: () => texts[i],
      set: (v) => {
        pending[i] = v;
        holder[key] = replaceTexts(holder[key], pending);
      },
    }),
  );
}

function slotsFor(doc: Record<string, any>): Slot[] {
  const slots: Slot[] = [];
  const at = (path: string) => {
    const keys = path.split(".");
    const parent = keys
      .slice(0, -1)
      .reduce<any>((o, k) => (o ? o[k] : undefined), doc);
    const last = keys[keys.length - 1];
    if (parent && typeof parent[last] === "string" && parent[last].trim())
      slots.push({ get: () => parent[last], set: (v) => (parent[last] = v) });
  };
  PLAIN_FIELDS.forEach(at);
  for (const [name, keys] of Object.entries(ARRAY_FIELDS))
    for (const row of doc[name] ?? [])
      for (const key of keys)
        if (typeof row[key] === "string" && row[key].trim())
          slots.push({ get: () => row[key], set: (v) => (row[key] = v) });
  for (const block of doc.blocks ?? []) {
    for (const key of ["heading", "caption"])
      if (typeof block[key] === "string" && block[key].trim())
        slots.push({ get: () => block[key], set: (v) => (block[key] = v) });
    if (
      block.blockType === "callout" &&
      typeof block.body === "string" &&
      block.body.trim()
    )
      slots.push({ get: () => block.body, set: (v) => (block.body = v) });
    if (block.blockType === "text" && block.body)
      richSlots(block, "body", slots);
  }
  if (doc.body) richSlots(doc, "body", slots);
  return slots;
}

/**
 * Bỏ id của các hàng mảng/khối lồng nhau: id hàng là khóa chính trong bảng
 * riêng, giữ lại sẽ trùng với bản gốc khi tạo bản ghi mới. Quan hệ đã là id
 * vì đọc với depth 0.
 */
function stripRowIds(value: unknown, top = true) {
  if (Array.isArray(value)) value.forEach((v) => stripRowIds(v, false));
  else if (value && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    if (!top) delete obj.id;
    for (const key of Object.keys(obj))
      if (key !== "root") stripRowIds(obj[key], false);
  }
}

async function translateDocument(req: PayloadRequest, body: any) {
  const { collection, id, force } = body;
  const targets: Target[] = body.targets;
  if (!COLLECTIONS.includes(collection))
    return json({ error: "Bộ sưu tập không hợp lệ." }, 400);
  let source: Record<string, any> | null = null;
  try {
    source = (await req.payload.findByID({
      collection,
      id,
      draft: true,
      depth: 0,
      req,
    })) as Record<string, any>;
  } catch {
    source = null;
  }
  if (!source) return json({ error: "Không tìm thấy bản ghi." }, 404);
  if (source.language !== "vi")
    return json({ error: "Chỉ dịch từ bản tiếng Việt." }, 400);
  const results: { target: Target; id: unknown; created: boolean }[] = [];
  for (const target of targets) {
    const existing = (
      await req.payload.find({
        collection,
        where: {
          and: [
            { translationKey: { equals: source.translationKey } },
            { language: { equals: target } },
          ],
        },
        draft: true,
        limit: 1,
        depth: 0,
        req,
      })
    ).docs[0] as Record<string, any> | undefined;
    if (existing && existing.machineTranslated !== true && !force)
      return json({ error: "exists", target }, 409);
    const draft = JSON.parse(JSON.stringify(source)) as Record<string, any>;
    stripRowIds(draft);
    const slots = slotsFor(draft);
    const translated = await translateStrings(
      slots.map((s) => s.get()),
      target,
      { kind: collection },
    );
    slots.forEach((s, i) => s.set(translated[i]));
    for (const key of [
      "id",
      "createdAt",
      "updatedAt",
      "_status",
      "reviewedBy",
      "reviewedAt",
      "reviewState",
    ])
      delete draft[key];
    draft.language = target;
    draft.machineTranslated = true;
    draft.reviewState = "working";
    if (!existing) {
      const clash = await req.payload.count({
        collection,
        where: {
          and: [
            { slug: { equals: source.slug } },
            { language: { equals: target } },
          ],
        },
        req,
      });
      draft.slug = clash.totalDocs ? `${source.slug}-${target}` : source.slug;
      const doc = await req.payload.create({
        collection,
        data: draft as never,
        draft: true,
        req,
      });
      results.push({ target, id: doc.id, created: true });
    } else {
      delete draft.slug;
      const doc = await req.payload.update({
        collection,
        id: existing.id,
        data: { ...draft, _status: "draft" } as never,
        draft: true,
        req,
      });
      results.push({ target, id: doc.id, created: false });
    }
  }
  return json({ results });
}

const LOCALIZED_GLOBAL_FIELDS: Record<string, string[]> = {
  "site-layout": [
    "header.tagline",
    "header.menu[].label",
    "header.cta.label",
    "home.heroKicker",
    "home.heroTitle",
    "home.heroSummary",
    "home.heroPrimary.label",
    "home.heroSecondary.label",
    "home.discoverTitle",
    "home.discoverCards[].title",
    "home.aboutKicker",
    "home.aboutTitle",
    "home.aboutLead",
    "home.aboutText",
    "home.aboutLink.label",
    "home.expertiseKicker",
    "home.expertiseTitle",
    "home.expertiseText",
    "home.expertiseLink.label",
    "home.startKicker",
    "home.startTitle",
    "home.startText",
    "home.startCta.label",
    "home.steps[].title",
    "home.steps[].text",
    "footer.kicker",
    "footer.title",
    "footer.invitation",
    "footer.invitationCta.label",
    "footer.motto",
    "footer.exploreTitle",
    "footer.connectTitle",
    "footer.extraLinks[].label",
    "footer.copyright",
    "contact.hours",
  ],
  "site-settings": ["address"],
};

/** Đọc/ghi theo đường dẫn có `[]` cho mảng. */
function pathSlots(obj: Record<string, any>, path: string, slots: Slot[]) {
  const [head, ...rest] = path.split(".");
  if (head.endsWith("[]")) {
    for (const row of obj[head.slice(0, -2)] ?? [])
      pathSlots(row, rest.join("."), slots);
    return;
  }
  if (!rest.length) {
    if (typeof obj[head] === "string" && obj[head].trim())
      slots.push({ get: () => obj[head], set: (v) => (obj[head] = v) });
    return;
  }
  if (obj[head] && typeof obj[head] === "object")
    pathSlots(obj[head], rest.join("."), slots);
}

async function translateGlobal(req: PayloadRequest, body: any) {
  const slug = body.slug as string;
  const paths = LOCALIZED_GLOBAL_FIELDS[slug];
  if (!paths) return json({ error: "Global không hợp lệ." }, 400);
  const targets: Target[] = body.targets;
  const vi = (await req.payload.findGlobal({
    slug: slug as never,
    locale: "vi",
    fallbackLocale: false,
    depth: 0,
    req,
  })) as Record<string, any>;
  const results: { target: Target; fields: number }[] = [];
  for (const target of targets) {
    const data = JSON.parse(JSON.stringify(vi)) as Record<string, any>;
    const slots: Slot[] = [];
    for (const path of paths) pathSlots(data, path, slots);
    const translated = await translateStrings(
      slots.map((s) => s.get()),
      target,
      { kind: slug },
    );
    slots.forEach((s, i) => s.set(translated[i]));
    for (const key of ["id", "createdAt", "updatedAt", "globalType"])
      delete data[key];
    // Mã dòng đi kèm là của bản tiếng Việt; mảng trong global nay có bộ dòng
    // riêng theo ngôn ngữ nên giữ lại sẽ làm lệnh ghi thất bại.
    stripRowIds(data);
    await req.payload.updateGlobal({
      slug: slug as never,
      locale: target,
      data: data as never,
      req,
    });
    results.push({ target, fields: slots.length });
  }
  return json({ results });
}

/**
 * POST /api/translate — dịch một bản ghi (tạo/cập nhật bản nháp EN/ZH có cờ
 * máy dịch) hoặc các ô đa ngôn ngữ của một global. Chỉ nhóm biên tập.
 */
export const translateEndpoint: Endpoint = {
  path: "/translate",
  method: "post",
  handler: async (req) => {
    if (!req.user || !EDITORIAL.includes(roleOf(req.user) || ""))
      return json({ error: "Cần quyền biên tập." }, 403);
    if (!translationProvider())
      return json(
        {
          error:
            "Chưa cấu hình dịch máy: đặt ANTHROPIC_API_KEY trong tệp .env.",
          configured: false,
        },
        503,
      );
    let body: any;
    try {
      body = await req.json!();
    } catch {
      return json({ error: "Thân yêu cầu phải là JSON." }, 400);
    }
    const targets = Array.isArray(body?.targets)
      ? body.targets.filter((t: string) => ["en", "zh"].includes(t))
      : [];
    if (!targets.length)
      return json({ error: "Chọn ít nhất một ngôn ngữ đích (en, zh)." }, 400);
    body.targets = targets;
    await ensureOperationsTable();
    const hour = new Date().toISOString().slice(0, 13);
    if (await overLimit(`translate:${hour}:${req.user.id}`, 60))
      return json(
        { error: "Đã dùng hết 60 lượt dịch trong giờ này. Thử lại sau." },
        429,
      );
    try {
      if (body.kind === "document") return await translateDocument(req, body);
      if (body.kind === "global") return await translateGlobal(req, body);
      return json({ error: "kind phải là document hoặc global." }, 400);
    } catch (error) {
      if (error instanceof TranslationUnavailable)
        return json({ error: error.message, configured: false }, 503);
      if (error instanceof TranslationTooLarge)
        return json({ error: error.message }, 413);
      req.payload.logger.error({ err: error }, "translate failed");
      return json({ error: "Dịch không thành công. Thử lại sau." }, 500);
    }
  },
};
