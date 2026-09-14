import { test, expect, type APIRequestContext } from "@playwright/test";
import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { collectTexts, replaceTexts } from "../src/cms/translation/richtext";
import { translateStrings } from "../src/cms/translation/provider";

async function adminToken(request: APIRequestContext) {
  const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
  const password = credentials.match(/Password: (.+)/)![1].trim();
  const login = await request.post("/api/users/login", {
    data: { email: "admin@local.invalid", password },
  });
  return (await login.json()).token as string;
}

test("lexical text nodes are collected and replaced in order without touching structure", () => {
  const doc = {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [
            { type: "text", text: "Xin chào", format: 1 },
            { type: "linebreak" },
            {
              type: "link",
              fields: { url: "https://x" },
              children: [{ type: "text", text: "liên kết" }],
            },
          ],
        },
        { type: "paragraph", children: [{ type: "text", text: "" }] },
      ],
    },
  };
  expect(collectTexts(doc)).toEqual(["Xin chào", "liên kết"]);
  const out = replaceTexts(doc, ["Hello", "link"]) as any;
  expect(out.root.children[0].children[0]).toEqual({
    type: "text",
    text: "Hello",
    format: 1,
  });
  expect(out.root.children[0].children[2].fields.url).toBe("https://x");
  expect(doc.root.children[0].children[0].text).toBe("Xin chào");
});

test("the mock provider tags strings and refuses oversized batches", async () => {
  process.env.TRANSLATION_PROVIDER = "mock";
  expect(await translateStrings(["a", "b"], "en", { kind: "test" })).toEqual([
    "a [en]",
    "b [en]",
  ]);
  await expect(
    translateStrings(["x".repeat(60001)], "zh", { kind: "test" }),
  ).rejects.toThrow(/quá dài/);
});

test("machine-translated records cannot be published until reviewed", async ({
  request,
}) => {
  const auth = { Authorization: "JWT " + (await adminToken(request)) };
  const key = "qa-mt-" + randomUUID();
  const created = await request.post("/api/services?draft=true", {
    headers: auth,
    data: {
      title: "QA bản dịch máy",
      slug: key,
      translationKey: key,
      language: "en",
      summary: "QA",
      reviewState: "approved",
      machineTranslated: true,
      _status: "draft",
    },
  });
  expect(created.ok(), await created.text()).toBeTruthy();
  const id = (await created.json()).doc.id;
  try {
    const publish = await request.patch("/api/services/" + id, {
      headers: auth,
      data: { _status: "published" },
    });
    expect(publish.ok()).toBeFalsy();
    expect(await publish.text()).toContain("rà soát");
    const reviewed = await request.patch(
      "/api/services/" + id + "?draft=true",
      {
        headers: auth,
        data: { machineTranslated: false, _status: "draft" },
      },
    );
    expect(reviewed.ok(), await reviewed.text()).toBeTruthy();
    const doc = (await reviewed.json()).doc;
    expect(doc.reviewedAt).toBeTruthy();
    expect(doc.reviewedBy).toBeTruthy();
    const publishAgain = await request.patch("/api/services/" + id, {
      headers: auth,
      data: { reviewState: "approved", _status: "published" },
    });
    expect(publishAgain.ok(), await publishAgain.text()).toBeTruthy();
  } finally {
    await request.delete("/api/services/" + id, { headers: auth });
  }
});

test("translating a Vietnamese record creates reviewable EN/ZH drafts", async ({
  request,
}) => {
  const auth = { Authorization: "JWT " + (await adminToken(request)) };
  const key = "qa-tr-" + randomUUID();
  const created = await request.post("/api/services?draft=true", {
    headers: auth,
    data: {
      title: "Rà soát hợp đồng",
      slug: key,
      translationKey: key,
      language: "vi",
      summary: "Tóm tắt QA",
      body: {
        root: {
          type: "root",
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr",
          children: [
            {
              type: "paragraph",
              format: "",
              indent: 0,
              version: 1,
              direction: "ltr",
              children: [
                {
                  type: "text",
                  text: "Đoạn một",
                  format: 0,
                  mode: "normal",
                  style: "",
                  detail: 0,
                  version: 1,
                },
              ],
            },
          ],
        },
      },
      scope: [{ item: "Soạn thảo" }],
      seo: { description: "Mô tả QA" },
      _status: "draft",
    },
  });
  expect(created.ok(), await created.text()).toBeTruthy();
  const source = (await created.json()).doc;
  const ids: number[] = [source.id];
  try {
    const anon = await request.post("/api/translate", {
      data: {
        kind: "document",
        collection: "services",
        id: source.id,
        targets: ["en"],
      },
    });
    expect(anon.status()).toBe(403);

    const run = await request.post("/api/translate", {
      headers: auth,
      data: {
        kind: "document",
        collection: "services",
        id: source.id,
        targets: ["en", "zh"],
      },
    });
    test.skip(
      [503, 429].includes(run.status()),
      "Dịch máy chưa cấu hình (cần TRANSLATION_PROVIDER=mock) hoặc đã hết hạn mức giờ này.",
    );
    expect(run.ok(), await run.text()).toBeTruthy();
    const { results } = await run.json();
    expect(results.map((r: any) => r.target).sort()).toEqual(["en", "zh"]);
    for (const r of results) ids.push(r.id);

    const en = await (
      await request.get("/api/services/" + results[0].id + "?draft=true", {
        headers: auth,
      })
    ).json();
    expect(en.language).toBe("en");
    expect(en.translationKey).toBe(key);
    expect(en.title).toBe("Rà soát hợp đồng [en]");
    expect(en.summary).toBe("Tóm tắt QA [en]");
    expect(en.scope[0].item).toBe("Soạn thảo [en]");
    expect(en.seo.description).toBe("Mô tả QA [en]");
    expect(en.body.root.children[0].children[0].text).toBe("Đoạn một [en]");
    expect(en.machineTranslated).toBe(true);
    expect(en._status).toBe("draft");

    // Bản đích đã được người sửa: từ chối ghi đè nếu không force.
    const edited = await request.patch(
      "/api/services/" + results[0].id + "?draft=true",
      {
        headers: auth,
        data: {
          machineTranslated: false,
          title: "Edited by human",
          _status: "draft",
        },
      },
    );
    expect(edited.ok(), await edited.text()).toBeTruthy();
    const again = await request.post("/api/translate", {
      headers: auth,
      data: {
        kind: "document",
        collection: "services",
        id: source.id,
        targets: ["en"],
      },
    });
    expect(again.status()).toBe(409);
    const forced = await request.post("/api/translate", {
      headers: auth,
      data: {
        kind: "document",
        collection: "services",
        id: source.id,
        targets: ["en"],
        force: true,
      },
    });
    expect(forced.ok(), await forced.text()).toBeTruthy();
    expect((await forced.json()).results[0].created).toBe(false);
  } finally {
    for (const id of ids)
      await request.delete("/api/services/" + id, { headers: auth });
  }
});

test("translating a global fills the EN locale of localized fields", async ({
  request,
}) => {
  const auth = { Authorization: "JWT " + (await adminToken(request)) };
  const before = await (
    await request.get("/api/globals/site-layout?locale=en&fallback-locale=none")
  ).json();
  const run = await request.post("/api/translate", {
    headers: auth,
    data: { kind: "global", slug: "site-layout", targets: ["en"] },
  });
  test.skip([503, 429].includes(run.status()), "Dịch máy chưa cấu hình hoặc đã hết hạn mức giờ này.");
  expect(run.ok(), await run.text()).toBeTruthy();
  try {
    const after = await (
      await request.get("/api/globals/site-layout?locale=en&fallback-locale=none")
    ).json();
    expect(after.footer.motto).toMatch(/\[en\]$/);
    expect(after.header.menu[0].label).toMatch(/\[en\]$/);
  } finally {
    const restore = await request.post("/api/globals/site-layout?locale=en", {
      headers: auth,
      data: {
        header: before.header,
        home: before.home,
        footer: before.footer,
        contact: before.contact,
      },
    });
    expect(restore.ok(), await restore.text()).toBeTruthy();
  }
});

test("the translation panel lists three languages and offers AI translation", async ({
  page,
  request,
}) => {
  const auth = { Authorization: "JWT " + (await adminToken(request)) };
  const key = "qa-panel-" + randomUUID();
  const created = await request.post("/api/services?draft=true", {
    headers: auth,
    data: {
      title: "QA bảng bản dịch",
      slug: key,
      translationKey: key,
      language: "vi",
      summary: "QA",
      _status: "draft",
    },
  });
  const id = (await created.json()).doc.id;
  try {
    const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
    await page.goto("/admin/login");
    await page.locator('input[name="email"]').fill("admin@local.invalid");
    await page
      .locator('input[name="password"]')
      .fill(credentials.match(/Password: (.+)/)![1].trim());
    await page.locator('button[type="submit"]').click();
    await expect(
      page.getByRole("heading", { name: "Tổng quan công việc" }),
    ).toBeVisible();
    await page.goto(`/admin/collections/services/${id}`);
    const panel = page.locator(".translation-panel");
    await expect(panel).toBeVisible();
    await expect(panel.locator("li")).toHaveCount(3);
    await expect(panel.locator("li", { hasText: "EN" })).toContainText(
      "chưa có",
    );
    await expect(
      panel.getByRole("button", { name: "Dịch bằng AI sang EN" }),
    ).toBeVisible();
  } finally {
    await request.delete("/api/services/" + id, { headers: auth });
  }
});
