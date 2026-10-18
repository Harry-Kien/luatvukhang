/**
 * Chấm điểm từng trang công khai theo một thang cố định (100 điểm):
 *   SEO kỹ thuật 25 · Trợ năng & điện thoại 15 · Dẫn tới liên hệ 15 ·
 *   Độ sâu nội dung 25 · Độ tin cậy theo loại trang 20.
 *
 * Đi theo mọi liên kết nội bộ từ /vi, /en, /zh như check-all-pages, rồi chấm
 * từng trang theo loại (trang chủ, dịch vụ, hồ sơ, bài viết…). Đây là thang tự
 * chấm để so trước–sau một đợt sửa, không phải chứng nhận chất lượng: nó đếm
 * được tiêu đề dài bao nhiêu, có tác giả hay không, nhưng không đọc được nội
 * dung có đúng luật hay không.
 *
 *   npm run score:pages                                   # máy chủ ở cổng 3000
 *   npm run score:pages -- http://localhost:3341 diem.json
 *
 * Máy chủ phải đang chạy. Chấm đúng như khách thấy thì dựng bản production với
 * SITE_LAUNCH_APPROVED=true và NEXT_PUBLIC_DEMO_MODE=false.
 */
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFileSync } from "node:fs";

const BASE = process.argv[2] || "http://localhost:3000";
const OUT = process.argv[3] || "score.json";

const typeOf = (path) => {
  const [, , section, slug] = path.split("/");
  if (!section) return "home";
  if (slug)
    return (
      {
        services: "service",
        lawyers: "lawyer",
        articles: "article",
        industries: "industry",
        careers: "career",
        experience: "experience",
      }[section] || "detail"
    );
  return (
    {
      services: "list",
      lawyers: "list",
      articles: "list",
      industries: "list",
      experience: "list",
      careers: "list",
    }[section] || section
  );
};
const WORD_TARGET = {
  home: 300,
  about: 400,
  service: 600,
  lawyer: 90,
  article: 650,
  industry: 300,
  contact: 100,
  consultation: 80,
  guide: 400,
  privacy: 800,
  terms: 800,
  list: 80,
};

const browser = await chromium.launch();
const desktop = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
});
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
});
const page = await desktop.newPage();
const mpage = await mobile.newPage();

const seen = new Set();
const queue = ["/vi", "/en", "/zh"];
const results = [];
while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  const res = await page
    .goto(BASE + path, { waitUntil: "load", timeout: 60000 })
    .catch(() => null);
  await page.waitForTimeout(400);
  const status = res ? res.status() : 0;
  if (status !== 200) {
    results.push({ path, status });
    continue;
  }
  const locale = path.split("/")[1];
  const data = await page.evaluate((locale) => {
    const q = (s) => document.querySelector(s);
    const main = q("main") || document.body;
    const text = main.innerText || "";
    const cjk = (text.match(/[一-鿿]/g) || []).length;
    const latinWords = (
      text.replace(/[一-鿿]/g, " ").match(/[\p{L}\p{N}]+/gu) || []
    ).length;
    const words =
      locale === "zh" ? Math.round(cjk / 1.6 + latinWords) : latinWords;
    const ld = [
      ...document.querySelectorAll('script[type="application/ld+json"]'),
    ].flatMap((s) => {
      try {
        const j = JSON.parse(s.textContent);
        return Array.isArray(j) ? j : [j];
      } catch {
        return [];
      }
    });
    const ldTypes = ld.flatMap((j) => [].concat(j["@type"] || []));
    const links = [...main.querySelectorAll("a[href]")].map((a) =>
      a.getAttribute("href"),
    );
    const allLinks = [...document.querySelectorAll("a[href]")].map((a) =>
      a.getAttribute("href"),
    );
    return {
      title: document.title,
      desc: q('meta[name="description"]')?.content || "",
      h1: document.querySelectorAll("h1").length,
      h2: main.querySelectorAll("h2").length,
      canonical: q('link[rel="canonical"]')?.href || "",
      hreflang: document.querySelectorAll('link[rel="alternate"][hreflang]')
        .length,
      ldTypes,
      words,
      imgs: main.querySelectorAll("img").length,
      imgNoAlt: [...main.querySelectorAll("img")].filter(
        (i) => !i.hasAttribute("alt"),
      ).length,
      cta: links.some((h) => /\/consultation|^tel:|zalo\.me/.test(h || "")),
      ctaAnywhere: allLinks.some((h) =>
        /\/consultation|^tel:|zalo\.me/.test(h || ""),
      ),
      internal: links.filter((h) => h && h.startsWith("/" + locale + "/"))
        .length,
      hrefs: [
        ...new Set(
          allLinks
            .filter((h) => h && /^\/(vi|en|zh)(\/|$)/.test(h))
            .map((h) => h.split(/[?#]/)[0]),
        ),
      ],
      author: /Tác giả|Author|作者/.test(text),
      date: !!main.querySelector("time") || /Cập nhật|Updated|更新/.test(text),
      sources:
        ld.some((j) => j.citation) || /Nguồn tham khảo|Sources|参考/.test(text),
      faq: ldTypes.includes("FAQPage"),
      process:
        !!main.querySelector("ol") || /Quy trình|Process|流程/.test(text),
      peopleLinks: links.filter((h) => /\/lawyers\/[a-z]/.test(h || "")).length,
      serviceLinks: links.filter((h) => /\/services\/[a-z]/.test(h || ""))
        .length,
      portrait: !!main.querySelector("img.lawyer-portrait"),
      quals: /Thông tin nghề nghiệp|Qualifications|执业信息|资历/.test(text),
      phone: allLinks.some((h) => /^tel:/.test(h || "")),
      email: allLinks.some((h) => /^mailto:/.test(h || "")),
      address:
        !!document.querySelector("address") ||
        ld.some((j) => j.address) ||
        /Địa chỉ|Address|地址/.test(document.body.innerText),
      map: !!document.querySelector(
        'iframe[src*="google.com/maps"], a[href*="google.com/maps"], a[href*="maps.google"]',
      ),
      registration: /đăng ký hoạt động|giấy phép|registration no|登记/i.test(
        document.body.innerText,
      ),
      form: !!main.querySelector("form textarea, form input[type=email]"),
      consent: !!main.querySelector('input[type="checkbox"]'),
      privacyLink: allLinks.some((h) => /\/privacy/.test(h || "")),
      preparing: /đang được chuẩn bị|being prepared|正在准备/i.test(text),
      items: main.querySelectorAll(
        ".person-card, .service-row, .practice-row, article a, .listing a, .card",
      ).length,
    };
  }, locale);
  for (const h of data.hrefs)
    if (!seen.has(h) && !/\/search|\/typography|\/feed/.test(h)) queue.push(h);
  const axe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze()
    .catch(() => ({ violations: [{ id: "axe-error" }] }));
  await mpage
    .goto(BASE + path, { waitUntil: "load", timeout: 60000 })
    .catch(() => null);
  const overflow = await mpage.evaluate(
    () => document.documentElement.scrollWidth > innerWidth + 1,
  );
  const type = typeOf(path);

  // ---- chấm điểm
  const notes = [];
  const zh = locale === "zh";
  const tl = data.title.length,
    dl = data.desc.length;
  let seo = 0;
  if (zh ? tl >= 8 && tl <= 40 : tl >= 25 && tl <= 65) seo += 5;
  else notes.push(`tiêu đề ${tl} ký tự`);
  if (zh ? dl >= 30 && dl <= 120 : dl >= 70 && dl <= 160) seo += 5;
  else notes.push(`mô tả ${dl} ký tự`);
  if (data.h1 === 1) seo += 5;
  else notes.push(`${data.h1} thẻ H1`);
  if (data.canonical === BASE + path) seo += 3;
  else notes.push("canonical sai");
  if (data.hreflang >= 3) seo += 3;
  else notes.push("thiếu hreflang");
  const wantLd = {
    service: "Service",
    lawyer: "Person",
    article: "Article",
    industry: "Service",
  }[type];
  if (!wantLd || data.ldTypes.includes(wantLd)) seo += 4;
  else notes.push(`thiếu schema ${wantLd}`);

  let a11y = 0;
  const v = axe.violations.length;
  a11y += v === 0 ? 10 : Math.max(0, 10 - 3 * v);
  if (v) notes.push(`${v} lỗi trợ năng`);
  if (!overflow) a11y += 5;
  else notes.push("tràn ngang trên điện thoại");
  if (data.imgNoAlt) {
    a11y = Math.max(0, a11y - 3);
    notes.push(`${data.imgNoAlt} ảnh thiếu alt`);
  }

  let conv = 0;
  if (data.cta) conv += 10;
  else if (data.ctaAnywhere) {
    conv += 6;
    notes.push("lời mời liên hệ chỉ ở đầu/cuối trang");
  } else notes.push("không có lời mời liên hệ");
  if (data.internal >= 3) conv += 5;
  else notes.push(`ít liên kết nội bộ (${data.internal})`);

  let content = 0;
  const target = WORD_TARGET[type] ?? 150;
  content += Math.round(15 * Math.min(1, data.words / target));
  if (data.words < target) notes.push(`nội dung ${data.words}/${target} từ`);
  const h2Target =
    {
      service: 4,
      article: 3,
      about: 3,
      guide: 3,
      home: 3,
      industry: 2,
      privacy: 5,
      terms: 5,
    }[type] ?? 1;
  content += Math.round(10 * Math.min(1, data.h2 / h2Target));
  if (data.h2 < h2Target) notes.push(`${data.h2}/${h2Target} mục H2`);

  let trust = 0;
  const add = (ok, pts, label) => {
    if (ok) trust += pts;
    else notes.push(label);
  };
  switch (type) {
    case "home":
      add(data.phone, 7, "thiếu số điện thoại");
      add(data.address, 6, "thiếu địa chỉ");
      add(
        data.peopleLinks > 0 || data.hrefs.some((h) => h.endsWith("/lawyers")),
        7,
        "không dẫn tới đội ngũ",
      );
      break;
    case "about":
      add(true, 6, "");
      add(data.peopleLinks > 0, 7, "không giới thiệu luật sư");
      add(data.registration, 7, "thiếu số đăng ký hoạt động");
      break;
    case "service":
      add(data.faq, 7, "thiếu hỏi đáp");
      add(data.process, 6, "thiếu quy trình");
      add(data.peopleLinks > 0, 7, "không nêu luật sư phụ trách");
      break;
    case "lawyer":
      add(data.portrait, 7, "thiếu ảnh");
      add(data.quals, 7, "thiếu thông tin nghề nghiệp");
      add(data.serviceLinks > 0, 6, "chưa gán lĩnh vực");
      break;
    case "article":
      add(data.author, 8, "thiếu tác giả");
      add(data.date, 6, "thiếu ngày");
      add(data.sources, 6, "thiếu nguồn");
      break;
    case "industry":
      add(data.serviceLinks > 0, 12, "không dẫn tới dịch vụ cụ thể");
      add(data.faq || data.process, 8, "thiếu hỏi đáp/quy trình");
      break;
    case "contact":
      add(data.phone, 7, "thiếu điện thoại");
      add(data.email, 6, "thiếu email");
      add(data.address && data.map, 7, "thiếu địa chỉ/bản đồ");
      break;
    case "consultation":
      add(data.form, 7, "thiếu biểu mẫu");
      add(data.consent, 6, "thiếu ô đồng ý");
      add(data.privacyLink, 7, "thiếu liên kết chính sách");
      break;
    case "privacy":
    case "terms":
      add(!data.preparing, 20, "chưa công bố");
      break;
    case "guide":
      add(data.faq, 10, "thiếu hỏi đáp");
      add(data.internal >= 5, 10, "ít liên kết");
      break;
    default:
      add(true, 20, "");
  }
  const total = seo + a11y + conv + content + trust;
  results.push({
    path,
    type,
    status,
    total,
    seo,
    a11y,
    conv,
    content,
    trust,
    words: data.words,
    notes: notes.filter(Boolean),
  });
  process.stdout.write(`${total.toString().padStart(3)} ${path}\n`);
}
await browser.close();
writeFileSync(OUT, JSON.stringify(results, null, 2));
const ok = results.filter((r) => r.status === 200);
console.log(
  `\n${ok.length} trang, điểm trung bình ${(ok.reduce((s, r) => s + r.total, 0) / ok.length).toFixed(1)}`,
);
