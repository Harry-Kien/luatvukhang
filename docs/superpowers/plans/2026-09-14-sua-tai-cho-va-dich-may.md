# Kế hoạch thực hiện: sửa tại chỗ, giao diện vào CMS, dịch máy có duyệt

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Người biên tập đăng nhập rồi sửa ngay trên website; menu, footer, trang chủ và cài đặt nằm trong CMS ba ngôn ngữ; bấm một nút để máy dịch sang EN/ZH thành bản nháp bắt buộc rà soát trước khi xuất bản.

**Architecture:** Giữ Next.js 16 + Payload 3.89 + SQLite. Thêm (1) lớp nhận diện người biên tập ở máy chủ và các thành phần `AdminBar`/`Editable` chỉ hiện với phiên đăng nhập thật; (2) global `site-layout` có localization của Payload thay chữ nằm cứng; (3) endpoint `/api/translate` gọi Claude qua `@anthropic-ai/sdk` với cổng xuất bản `machineTranslated`; (4) dọn trang quản trị. Mọi thay đổi lược đồ đi qua migration của Payload.

**Tech Stack:** Next.js 16 (App Router, `await cookies()`/`await headers()`), Payload 3.89 (`localization`, `type: "ui"` field, root `endpoints`, `admin.preview`), `@payloadcms/ui` (`useDocumentInfo`, `useFormFields`, `Button`, `toast`), `@anthropic-ai/sdk`, Playwright.

**Spec:** `docs/superpowers/specs/2026-09-14-sua-tai-cho-va-dich-may-design.md`

## Global Constraints

- Không đổi cấu trúc dữ liệu các collection nội dung: mỗi ngôn ngữ vẫn là một bản ghi, nối bằng `translationKey`.
- HTML gửi cho khách chưa đăng nhập phải giống hệt trước khi làm (không thêm lớp `editable`, không thêm thanh quản trị).
- Mọi thay đổi lược đồ tạo bằng `npm run payload -- migrate:create <ten>` rồi áp bằng `npm run payload -- migrate`; `push` của adapter vẫn tắt.
- Tên công ty giữ nguyên văn trong bản dịch: "Công ty Luật TNHH Vũ Khang Solutions & Partners".
- Khóa API chỉ đọc từ `process.env.ANTHROPIC_API_KEY`; không có khóa thì endpoint trả 503, không được ném lỗi làm hỏng trang.
- Model dịch: `claude-opus-5`. Nhà cung cấp giả lập bật bằng `TRANSLATION_PROVIDER=mock` (chỉ cho kiểm thử).
- Sau mỗi nhiệm vụ: `npm run typecheck`, `npm run build`, khởi động `npm run start -- --hostname 127.0.0.1`, chạy `npm test`, rồi commit. Thông điệp commit tiếng Việt không dấu như lịch sử kho, kết thúc bằng dòng `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Đọc `node_modules/next/dist/docs/` trước khi viết mã Next (theo `AGENTS.md`). API `cookies()` và `headers()` là async.
- Sau khi thêm hoặc đổi component admin: `npm run generate:importmap`; sau khi đổi lược đồ: `npm run generate:types`.

---

## Cấu trúc tệp

**Tạo mới**

- `src/lib/editor.ts` — `getEditor()`, `isEditMode()`; nhận diện người biên tập và trạng thái chế độ sửa từ cookie.
- `src/app/api/edit-mode/route.ts` — bật/tắt cookie `vk-edit`, chỉ khi đã đăng nhập.
- `src/components/admin-bar.tsx` — thanh quản trị (server component).
- `src/components/editable.tsx` — bọc vùng sửa được (server component).
- `src/cms/site-layout.ts` — định nghĩa global `site-layout` và `SITE_LAYOUT_DEFAULTS` ba ngôn ngữ.
- `src/lib/site-layout.ts` — `getSiteLayout(locale)` đọc global, trộn với mặc định.
- `scripts/prepare-site-layout.ts` — nạp giá trị mặc định vào global (chạy lại được).
- `src/cms/translation/glossary.ts` — bảng thuật ngữ pháp lý.
- `src/cms/translation/richtext.ts` — gom và ghi ngược chuỗi trong Lexical JSON.
- `src/cms/translation/provider.ts` — `translateStrings()` với hai nhà cung cấp: `claude`, `mock`.
- `src/cms/translation/endpoint.ts` — handler `POST /api/translate`.
- `src/lib/rate-limit.ts` — `overLimit(bucket, limit)` tách từ route tư vấn.
- `src/components/admin/translation-panel.tsx` — bảng "Bản dịch" (client component).
- `src/components/admin/translate-global-button.tsx` — nút dịch cho global (client component).
- `tests/admin-bar.spec.ts`, `tests/site-layout.spec.ts`, `tests/translate.spec.ts`, `tests/admin-polish.spec.ts`.
- Migration sinh bởi Payload trong `src/migrations/`.

**Sửa**

- `src/payload.config.ts` — localization, global mới, ô mới, hook, endpoint, `admin.preview`, nhóm Nâng cao, thứ tự collection.
- `src/cms/access.ts` — mở rộng `publicationGuard`.
- `src/app/(public)/[locale]/layout.tsx` — gắn `AdminBar`, `Editable` quanh header/footer, truyền `layout`.
- `src/app/(public)/[locale]/page.tsx` — đọc chữ từ `getSiteLayout`, bọc `Editable`.
- `src/app/(public)/[locale]/[section]/page.tsx`, `.../[slug]/page.tsx` — bọc `Editable` quanh tiêu đề/thân bài.
- `src/components/shell.tsx` — Header/Footer nhận `layout` thay vì mảng `navigation` cứng.
- `src/lib/content.ts` — `navigation` thành hàm `navigationFrom(layout)`; giữ hằng cũ làm dự phòng.
- `src/app/sitemap.ts` — đọc menu từ global.
- `src/app/api/consultation/route.ts` — dùng `overLimit` từ `src/lib/rate-limit.ts`.
- `src/app/(public)/[locale]/styles.css` — lớp `.admin-bar`, `.editable`.
- `src/components/admin-dashboard.tsx` — lối tắt.
- `scripts/release-check.ts`, `scripts/hosting-setup.mjs`, `.github/workflows/ci.yml`, `.env.example`, `.env.production.example`, `docs/ADMIN.vi.md`, `docs/DEPLOY-HOSTING-CPANEL.md`, `docs/ACCEPTANCE.md`, `docs/DEPENDENCIES.md`.

---

# ĐỢT 1 — Thanh quản trị và chế độ sửa

### Task 1: Nhận diện người biên tập và cookie chế độ sửa

**Files:**
- Create: `src/lib/editor.ts`
- Create: `src/app/api/edit-mode/route.ts`
- Test: `tests/admin-bar.spec.ts`

**Interfaces:**
- Produces: `getEditor(): Promise<{ id: string | number; email: string; name?: string; role: string } | null>`; `isEditMode(): Promise<boolean>` (true chỉ khi có editor và cookie `vk-edit=1`); `EDIT_COOKIE = "vk-edit"`.
- Produces: `POST /api/edit-mode` với body form `on=1|0`; đặt hoặc xóa cookie rồi chuyển hướng về `Referer` (hoặc `/vi`). Trả 403 khi chưa đăng nhập.

- [ ] **Step 1: Viết kiểm thử thất bại**

```ts
// tests/admin-bar.spec.ts
import { test, expect, type Page } from "@playwright/test";
import fs from "node:fs/promises";

async function loginAsAdmin(page: Page) {
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
}

test("edit mode cookie can only be toggled by a signed-in editor", async ({
  page,
  request,
}) => {
  // Khách: bị từ chối.
  const anon = await request.post("/api/edit-mode", {
    form: { on: "1" },
    maxRedirects: 0,
  });
  expect(anon.status()).toBe(403);

  await loginAsAdmin(page);
  const on = await page.request.post("/api/edit-mode", {
    form: { on: "1" },
    headers: { referer: "http://localhost:3000/vi/about" },
    maxRedirects: 0,
  });
  expect(on.status()).toBe(303);
  expect(on.headers()["location"]).toBe("/vi/about");
  const cookies = await page.context().cookies();
  expect(cookies.find((c) => c.name === "vk-edit")?.value).toBe("1");

  const off = await page.request.post("/api/edit-mode", {
    form: { on: "0" },
    maxRedirects: 0,
  });
  expect(off.status()).toBe(303);
  expect(
    (await page.context().cookies()).find((c) => c.name === "vk-edit"),
  ).toBeUndefined();
});
```

- [ ] **Step 2: Chạy để thấy thất bại**

Run: `npx playwright test tests/admin-bar.spec.ts --project=desktop`
Expected: FAIL — `/api/edit-mode` trả 404.

- [ ] **Step 3: Viết `src/lib/editor.ts`**

```ts
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { getCMS } from "./cms";
import { roleOf } from "@/cms/access";

export const EDIT_COOKIE = "vk-edit";
const EDITOR_ROLES = ["admin", "editor", "reviewer", "publisher"];

export type Editor = {
  id: string | number;
  email: string;
  name?: string;
  role: string;
};

/**
 * Người biên tập đang đăng nhập, hoặc null. Bọc cache() để layout, trang và
 * mọi <Editable> trong cùng một lượt render chỉ xác thực một lần.
 */
export const getEditor = cache(async function getEditor(): Promise<Editor | null> {
  if (!process.env.DATABASE_URL) return null;
  try {
    const cms = await getCMS();
    const { user } = await cms.auth({ headers: await headers() });
    const role = roleOf(user);
    if (!user || !role || !EDITOR_ROLES.includes(role)) return null;
    return {
      id: user.id,
      email: user.email,
      name: (user as { name?: string }).name,
      role,
    };
  } catch {
    return null;
  }
});

/** Chế độ sửa chỉ có ý nghĩa khi đã đăng nhập; cookie một mình không bật được gì. */
export const isEditMode = cache(async function isEditMode() {
  if (!(await getEditor())) return false;
  return (await cookies()).get(EDIT_COOKIE)?.value === "1";
});
```

- [ ] **Step 4: Viết `src/app/api/edit-mode/route.ts`**

```ts
import { NextResponse } from "next/server";
import { getEditor, EDIT_COOKIE } from "@/lib/editor";

/** Bật/tắt chế độ sửa. Chuyển hướng về trang vừa đứng để thanh quản trị đổi ngay. */
export async function POST(request: Request) {
  if (!(await getEditor()))
    return NextResponse.json({ error: "Cần đăng nhập." }, { status: 403 });
  const form = await request.formData();
  const on = form.get("on") === "1";
  const referer = request.headers.get("referer");
  let back = "/vi";
  if (referer) {
    try {
      const url = new URL(referer);
      if (url.origin === new URL(request.url).origin)
        back = url.pathname + url.search;
    } catch {}
  }
  const response = NextResponse.redirect(new URL(back, request.url), 303);
  if (on)
    response.cookies.set(EDIT_COOKIE, "1", {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      httpOnly: true,
    });
  else response.cookies.set(EDIT_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
```

- [ ] **Step 5: Chạy lại kiểm thử**

Run: `npm run build && (npm run start -- --hostname 127.0.0.1 &) && npx playwright test tests/admin-bar.spec.ts --project=desktop`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/editor.ts src/app/api/edit-mode/route.ts tests/admin-bar.spec.ts
git commit -m "Nhan dien nguoi bien tap va cookie che do sua"
```

---

### Task 2: Thanh quản trị trên website

**Files:**
- Create: `src/components/admin-bar.tsx`
- Modify: `src/app/(public)/[locale]/layout.tsx` (sau `<a className="skip">`, trước `{demo && ...}`)
- Modify: `src/app/(public)/[locale]/styles.css` (thêm cuối tệp)
- Test: `tests/admin-bar.spec.ts`

**Interfaces:**
- Consumes: `getEditor`, `isEditMode` (Task 1).
- Produces: `<AdminBar locale editTarget?: { href: string; label: string } preview?: boolean />`. `editTarget` do trang truyền lên qua layout không được (layout không biết trang), nên `AdminBar` tự suy ra từ `headers().get("x-pathname")`? Không có header đó ở Next. Quyết định: **AdminBar nhận `pathname` từ `params`/`searchParams` không được ở layout**, vì vậy nút "Sửa trang này" tính ở phía client: `admin-bar.tsx` xuất thêm client component `EditThisPage` đọc `usePathname()` và ánh xạ: `/{locale}` → `/admin/globals/site-layout#tab-home`; `/{locale}/(about|contact|privacy|terms)` → `/admin/collections/pages?where[slug][equals]=<section>&where[language][equals]=<locale>`; `/{locale}/<collection>/<slug>` → `/admin/collections/<collection>?where[slug][equals]=<slug>&where[language][equals]=<locale>`; còn lại → `/admin`. Danh sách với bộ lọc mở đúng một bản ghi, người dùng bấm vào là sửa; đơn giản và không cần truy vấn ở thanh.

- [ ] **Step 1: Thêm kiểm thử**

```ts
test("visitors never see the admin bar or editable markup", async ({
  page,
}) => {
  const response = await page.goto("/vi");
  const html = await response!.text();
  expect(html).not.toContain('class="admin-bar');
  expect(html).not.toContain('class="editable');
  expect(html).not.toContain("has-admin-bar");
});

test("a signed-in editor sees the admin bar with working controls", async ({
  page,
}) => {
  await loginAsAdmin(page);
  await page.goto("/vi/about");
  const bar = page.locator(".admin-bar");
  await expect(bar).toBeVisible();
  await expect(bar.getByText("admin@local.invalid")).toBeVisible();
  await expect(
    bar.getByRole("link", { name: "Bảng điều khiển" }),
  ).toHaveAttribute("href", "/admin");
  await expect(
    bar.getByRole("link", { name: "Sửa trang này" }),
  ).toHaveAttribute(
    "href",
    "/admin/collections/pages?where[slug][equals]=about&where[language][equals]=vi",
  );
  await bar.getByRole("button", { name: "Bật chế độ sửa" }).click();
  await expect(
    page.locator(".admin-bar").getByRole("button", { name: "Tắt chế độ sửa" }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveClass(/has-admin-bar/);
  await expect(bar.getByRole("link", { name: "Đăng xuất" })).toHaveAttribute(
    "href",
    "/admin/logout",
  );
});
```

- [ ] **Step 2: Chạy để thấy thất bại**

Run: `npx playwright test tests/admin-bar.spec.ts --project=desktop`
Expected: FAIL — không có `.admin-bar`.

- [ ] **Step 3: Viết `src/components/admin-bar.tsx`**

```tsx
import { getEditor, isEditMode } from "@/lib/editor";
import type { Locale } from "@/lib/content";
import { EditThisPage } from "./admin-bar-client";

const ROLE_LABEL: Record<string, string> = {
  admin: "Quản trị",
  editor: "Biên tập",
  reviewer: "Duyệt chuyên môn",
  publisher: "Xuất bản",
};

/** Chỉ hiện với phiên Payload thật; khách không nhận được một byte nào của thanh này. */
export async function AdminBar({
  locale,
  preview = false,
}: {
  locale: Locale;
  preview?: boolean;
}) {
  const editor = await getEditor();
  if (!editor) return null;
  const editing = await isEditMode();
  return (
    <div className="admin-bar" role="region" aria-label="Thanh quản trị">
      <span className="admin-bar-user">
        <strong>{editor.name || editor.email}</strong>
        <span>{ROLE_LABEL[editor.role] || editor.role}</span>
        {editor.name && <span className="admin-bar-email">{editor.email}</span>}
      </span>
      <nav className="admin-bar-actions" aria-label="Công cụ biên tập">
        <EditThisPage locale={locale} />
        <a href="/admin">Bảng điều khiển</a>
        <form method="post" action="/api/edit-mode">
          <input type="hidden" name="on" value={editing ? "0" : "1"} />
          <button type="submit" className={editing ? "on" : ""}>
            {editing ? "Tắt chế độ sửa" : "Bật chế độ sửa"}
          </button>
        </form>
        {preview && (
          <span className="admin-bar-preview">Đang xem bản nháp</span>
        )}
        <a href="/admin/logout">Đăng xuất</a>
      </nav>
    </div>
  );
}
```

Tạo `src/components/admin-bar-client.tsx`:

```tsx
"use client";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/content";

const PAGE_SECTIONS = ["about", "contact", "privacy", "terms"];
const COLLECTIONS = [
  "services",
  "industries",
  "lawyers",
  "experience",
  "articles",
  "careers",
];

export function editHrefFor(pathname: string, locale: Locale) {
  const parts = pathname.split("/").filter(Boolean);
  const [, section, slug] = parts;
  const filter = (collection: string, value: string) =>
    `/admin/collections/${collection}?where[slug][equals]=${encodeURIComponent(value)}&where[language][equals]=${locale}`;
  if (parts.length === 1) return "/admin/globals/site-layout#tab-home";
  if (!slug && section && PAGE_SECTIONS.includes(section))
    return filter("pages", section);
  if (slug && section && COLLECTIONS.includes(section))
    return filter(section, slug);
  return "/admin";
}

export function EditThisPage({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  return <a href={editHrefFor(pathname, locale)}>Sửa trang này</a>;
}
```

- [ ] **Step 4: Gắn vào layout và đánh dấu `<html>`**

Trong `src/app/(public)/[locale]/layout.tsx`: import `AdminBar` và `getEditor`; trong `Layout` thêm `const editor = await getEditor();` và đổi `<html lang=...>` thành `<html lang={...} className={editor ? "has-admin-bar" : undefined}>`; ngay sau thẻ `<a className="skip">` thêm `<AdminBar locale={locale} />`.

- [ ] **Step 5: CSS (cuối `styles.css`)**

```css
/* Thanh quản trị: chỉ có khi đăng nhập, nằm trong luồng nên không che nội dung. */
.admin-bar {
  position: sticky;
  top: 0;
  z-index: 60;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 40px;
  padding: 0 20px;
  background: #101d35;
  color: #fff;
  font-size: 13px;
}
.has-admin-bar .header {
  top: 40px;
}
.admin-bar-user {
  display: flex;
  gap: 10px;
  align-items: baseline;
}
.admin-bar-user span {
  opacity: 0.7;
}
.admin-bar-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}
.admin-bar-actions a,
.admin-bar-actions button {
  color: #fff;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 3px;
  padding: 4px 10px;
  font: inherit;
  cursor: pointer;
  text-decoration: none;
}
.admin-bar-actions button.on {
  background: #b3202c;
  border-color: #b3202c;
}
.admin-bar-preview {
  color: #ffd166;
}
@media (max-width: 700px) {
  .admin-bar {
    flex-wrap: wrap;
    padding: 6px 12px;
  }
  .admin-bar-email {
    display: none;
  }
}
```

- [ ] **Step 6: Chạy kiểm thử, cả bộ**

Run: `npm run typecheck && npm run build && npm test`
Expected: PASS toàn bộ (kiểm thử khách không thấy thanh; các kiểm thử cũ không đổi).

- [ ] **Step 7: Commit**

```bash
git add src/components/admin-bar.tsx src/components/admin-bar-client.tsx "src/app/(public)/[locale]/layout.tsx" "src/app/(public)/[locale]/styles.css" tests/admin-bar.spec.ts
git commit -m "Thanh quan tri tren website cho nguoi bien tap"
```

---

### Task 3: `Editable` và các vùng sửa được; tự lưu nhanh hơn

**Files:**
- Create: `src/components/editable.tsx`
- Modify: `src/app/(public)/[locale]/page.tsx`, `src/app/(public)/[locale]/[section]/page.tsx`, `src/app/(public)/[locale]/[section]/[slug]/page.tsx`, `src/app/(public)/[locale]/layout.tsx`
- Modify: `src/payload.config.ts:129` (`autosave.interval` 1500 → 700)
- Modify: `src/app/(public)/[locale]/styles.css`
- Test: `tests/admin-bar.spec.ts`

**Interfaces:**
- Produces: `<Editable target label>{children}</Editable>` với `type EditTarget = { collection: string; id: string | number } | { global: "site-layout"; tab: "header" | "home" | "footer" | "contact" } | { global: "site-settings" }`; hàm thuần `editHref(target: EditTarget): string`.

- [ ] **Step 1: Thêm kiểm thử**

```ts
test("edit mode marks regions with links to the right CMS screen", async ({
  page,
}) => {
  await loginAsAdmin(page);
  await page.request.post("/api/edit-mode", { form: { on: "1" } });
  await page.goto("/vi");
  const regions = page.locator(".editable");
  expect(await regions.count()).toBeGreaterThanOrEqual(5);
  await expect(
    page.locator(".editable-link[href='/admin/globals/site-layout#tab-home']").first(),
  ).toBeAttached();
  await expect(
    page.locator(".editable-link[href='/admin/globals/site-layout#tab-header']"),
  ).toHaveCount(1);
  await expect(
    page.locator(".editable-link[href='/admin/globals/site-layout#tab-footer']"),
  ).toHaveCount(1);

  await page.goto("/vi/about");
  const link = page.locator("main .editable-link").first();
  await expect(link).toHaveAttribute(
    "href",
    /^\/admin\/collections\/pages\/\d+\/preview$/,
  );

  await page.request.post("/api/edit-mode", { form: { on: "0" } });
  await page.goto("/vi");
  await expect(page.locator(".editable")).toHaveCount(0);
});
```

- [ ] **Step 2: Chạy để thấy thất bại**

Run: `npx playwright test tests/admin-bar.spec.ts --project=desktop`
Expected: FAIL — `.editable` không tồn tại.

- [ ] **Step 3: Viết `src/components/editable.tsx`**

```tsx
import { isEditMode } from "@/lib/editor";

export type EditTarget =
  | { collection: string; id: string | number }
  | { global: "site-layout"; tab: "header" | "home" | "footer" | "contact" }
  | { global: "site-settings" };

export function editHref(target: EditTarget) {
  if ("collection" in target)
    return `/admin/collections/${target.collection}/${target.id}/preview`;
  if (target.global === "site-layout")
    return `/admin/globals/site-layout#tab-${target.tab}`;
  return "/admin/globals/site-settings";
}

/**
 * Khách và người biên tập chưa bật chế độ sửa nhận về đúng children — không
 * thêm phần tử, không thêm lớp. Chỉ khi chế độ sửa bật mới bọc thêm khung và
 * liên kết bút chì tới màn hình biên tập tương ứng.
 */
export async function Editable({
  target,
  label,
  children,
}: {
  target: EditTarget;
  label: string;
  children: React.ReactNode;
}) {
  if (!(await isEditMode())) return <>{children}</>;
  return (
    <div className="editable">
      <a className="editable-link" href={editHref(target)}>
        ✎ Sửa {label}
      </a>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: CSS**

```css
.editable {
  position: relative;
  outline: 1px dashed transparent;
  outline-offset: 4px;
  transition: outline-color 0.15s;
}
.editable:hover {
  outline-color: #b3202c;
}
.editable-link {
  position: absolute;
  top: 6px;
  right: 6px;
  z-index: 40;
  background: #b3202c;
  color: #fff;
  font-size: 12px;
  padding: 3px 9px;
  border-radius: 3px;
  text-decoration: none;
  opacity: 0;
  pointer-events: none;
}
.editable:hover > .editable-link,
.editable-link:focus {
  opacity: 1;
  pointer-events: auto;
}
```

- [ ] **Step 5: Bọc các vùng**

`layout.tsx`: `<Editable target={{ global: "site-layout", tab: "header" }} label="đầu trang"><Header .../></Editable>` và tương tự `tab: "footer"` quanh `<Footer/>`.

`page.tsx` (trang chủ): bọc từng `<section>` lớn: hero (`tab: "home"`, nhãn "trang chủ"), `.pathway-strip` (`tab: "home"`), `.intro` (`tab: "home"`), `.expertise` (`tab: "home"`), `.process` (`tab: "home"`), `.editorial` (`tab: "home"`). Khi `home` có `id`, bọc khối `article-body` của trang home bằng `{ collection: "pages", id: home.id }` nhãn "nội dung trang chủ". Từng thẻ `.practice-item` bọc `{ collection: "services", id: s.id }` nhãn "dịch vụ" khi `s.id` tồn tại (bản minh họa từ `samples` không có id thì không bọc).

`[section]/page.tsx` nhánh about/contact/privacy/terms: khi `record?.id`, bọc `<PageHeading>` và `<article>` chung trong một `<Editable target={{ collection: "pages", id: record.id }} label="trang">`.

`[slug]/page.tsx`: khi `record?.id`, bọc `<PageHeading>` và `<section className="section content-grid">` trong `<Editable target={{ collection: section, id: record.id }} label={sectionLabel}>`.

Danh sách trong `[section]/page.tsx` (services, lawyers, articles...): thẻ nào render từ `record` có `id` thì bọc thẻ đó; thẻ minh họa không bọc.

- [ ] **Step 6: Rút thời gian tự lưu**

`src/payload.config.ts`: `versions: { drafts: { autosave: { interval: 700 } }, maxPerDoc: 50 }`.

- [ ] **Step 7: Chạy kiểm thử cả bộ**

Run: `npm run typecheck && npm run build && npm test`
Expected: PASS; đặc biệt `seo.spec.ts` và `accessibility.spec.ts` không đổi vì khách không thấy khung.

- [ ] **Step 8: Commit**

```bash
git add -A src tests/admin-bar.spec.ts
git commit -m "Che do sua tai cho: khung Editable tro toi man hinh bien tap"
```

---

# ĐỢT 2 — Global "Giao diện website"

### Task 4: Localization, global `site-layout`, ô mới ở `site-settings`, migration

**Files:**
- Create: `src/cms/site-layout.ts`
- Modify: `src/payload.config.ts` (`localization`, `globals`, `site-settings.address`)
- Create: migration qua CLI
- Modify: `src/payload-types.ts` (sinh tự động)

**Interfaces:**
- Produces: `SiteLayout` global slug `site-layout` với các nhóm `header`, `home`, `footer`, `contact` (tab), mọi ô chữ `localized: true`.
- Produces: `SITE_LAYOUT_DEFAULTS: Record<Locale, SiteLayoutData>` và kiểu `SiteLayoutData`.

- [ ] **Step 1: Viết `src/cms/site-layout.ts`**

```ts
import type { Field, GlobalConfig } from "payload";
import { editorial } from "./access";
import type { Locale } from "@/lib/locales";
import { chinese } from "@/lib/zh";

const localized = (name: string, label: string, textarea = false): Field =>
  ({
    name,
    label,
    type: textarea ? "textarea" : "text",
    localized: true,
  }) as Field;
const link = (name: string, label: string): Field => ({
  name,
  label,
  type: "group",
  fields: [
    localized("label", "Nhãn"),
    {
      name: "href",
      label: "Đường dẫn (bắt đầu bằng / hoặc https://)",
      type: "text",
      validate: (value: unknown) =>
        !value || /^(\/|https:\/\/)/.test(String(value))
          ? true
          : "Đường dẫn nội bộ bắt đầu bằng /, liên kết ngoài bắt đầu bằng https://",
    },
  ],
});

export type LinkData = { label?: string | null; href?: string | null };
export type SiteLayoutData = {
  header: {
    tagline?: string | null;
    menu?: { label?: string | null; href?: string | null; visible?: boolean | null }[];
    cta?: LinkData;
  };
  home: {
    heroKicker?: string | null;
    heroTitle?: string | null;
    heroSummary?: string | null;
    heroPrimary?: LinkData;
    heroSecondary?: LinkData;
    discoverTitle?: string | null;
    discoverCards?: { title?: string | null; href?: string | null }[];
    aboutKicker?: string | null;
    aboutTitle?: string | null;
    aboutLead?: string | null;
    aboutText?: string | null;
    aboutLink?: LinkData;
    expertiseKicker?: string | null;
    expertiseTitle?: string | null;
    expertiseText?: string | null;
    expertiseLink?: LinkData;
    startKicker?: string | null;
    startTitle?: string | null;
    startText?: string | null;
    startCta?: LinkData;
    steps?: { title?: string | null; text?: string | null }[];
  };
  footer: {
    kicker?: string | null;
    title?: string | null;
    invitation?: string | null;
    invitationCta?: LinkData;
    motto?: string | null;
    exploreTitle?: string | null;
    connectTitle?: string | null;
    extraLinks?: LinkData[];
    copyright?: string | null;
  };
  contact: {
    zalo?: string | null;
    facebook?: string | null;
    linkedin?: string | null;
    youtube?: string | null;
    hours?: string | null;
    mapUrl?: string | null;
    mapEmbed?: string | null;
  };
};

const vi: SiteLayoutData = {
  header: {
    tagline: "Tư vấn pháp lý · Việt Nam",
    menu: [
      { label: "Về chúng tôi", href: "/about", visible: true },
      { label: "Chuyên môn", href: "/services", visible: true },
      { label: "Đội ngũ", href: "/lawyers", visible: true },
      { label: "Kinh nghiệm", href: "/experience", visible: true },
      { label: "Góc nhìn", href: "/articles", visible: true },
      { label: "Liên hệ", href: "/contact", visible: true },
    ],
    cta: { label: "Đặt lịch tư vấn", href: "/consultation" },
  },
  home: {
    heroKicker: "Công ty Luật TNHH Vũ Khang Solutions & Partners",
    heroTitle: "Thấu hiểu\nvấn đề.\nVững vàng\nquyết định.",
    heroSummary:
      "Góc nhìn pháp lý rõ ràng cho những quyết định quan trọng — từ hoạt động kinh doanh đến bảo vệ quyền và lợi ích của bạn.",
    heroPrimary: { label: "Trao đổi với Vũ Khang", href: "/consultation" },
    heroSecondary: { label: "Khám phá chuyên môn", href: "/services" },
    discoverTitle: "Bắt đầu từ nhu cầu của bạn",
    discoverCards: [
      { title: "Tìm chuyên môn phù hợp", href: "/services" },
      { title: "Tìm hiểu đội ngũ luật sư", href: "/lawyers" },
      { title: "Gửi yêu cầu tư vấn", href: "/consultation" },
    ],
    aboutKicker: "Về Vũ Khang",
    aboutTitle: "Pháp lý không tách rời\nbối cảnh của bạn.",
    aboutLead:
      "Đằng sau mỗi vấn đề pháp lý là một mục tiêu, một mối quan tâm và một quyết định cần được cân nhắc kỹ lưỡng.",
    aboutText:
      "Hiểu đúng bối cảnh là điểm khởi đầu để xác định vấn đề trọng tâm, đánh giá các lựa chọn và làm rõ bước tiếp theo.",
    aboutLink: { label: "Tìm hiểu về Vũ Khang", href: "/about" },
    expertiseKicker: "Lĩnh vực chuyên môn",
    expertiseTitle: "Góc nhìn chuyên sâu.\nHướng tiếp cận phù hợp.",
    expertiseText: "Tìm hiểu phạm vi hỗ trợ theo từng vấn đề bạn đang quan tâm.",
    expertiseLink: { label: "Tất cả chuyên môn", href: "/services" },
    startKicker: "Cách bắt đầu",
    startTitle: "Rõ ràng từ\ncuộc trao đổi đầu tiên.",
    startText:
      "Một hành trình có trọng tâm, từ việc hiểu nhu cầu đến thống nhất bước tiếp theo.",
    startCta: { label: "Bắt đầu trao đổi", href: "/consultation" },
    steps: [
      { title: "Lắng nghe bối cảnh", text: "Chia sẻ vấn đề, mục tiêu và thời hạn bạn đang cân nhắc." },
      { title: "Làm rõ phạm vi", text: "Trao đổi về hồ sơ cần thiết, phạm vi hỗ trợ và điều kiện dịch vụ." },
      { title: "Thống nhất bước tiếp theo", text: "Lịch hẹn và công việc được xác nhận sau khi hai bên trao đổi." },
    ],
  },
  footer: {
    kicker: "Trao đổi cùng Vũ Khang",
    title: "Bước tiếp theo,\nbắt đầu từ sự rõ ràng.",
    invitation:
      "Chia sẻ vấn đề bạn đang quan tâm để bắt đầu một cuộc trao đổi có trọng tâm.",
    invitationCta: { label: "Gửi yêu cầu tư vấn", href: "/consultation" },
    motto: "Thấu hiểu vấn đề. Vững vàng quyết định.",
    exploreTitle: "Khám phá Vũ Khang",
    connectTitle: "Kết nối",
    extraLinks: [
      { label: "Ngành nghề", href: "/industries" },
      { label: "Cơ hội nghề nghiệp", href: "/careers" },
      { label: "Hướng dẫn khách hàng", href: "/guide" },
      { label: "Tìm kiếm", href: "/search" },
      { label: "Đặt lịch tư vấn", href: "/consultation" },
    ],
    copyright: "Vũ Khang.",
  },
  contact: {},
};

const en: SiteLayoutData = {
  header: {
    tagline: "Legal counsel · Vietnam",
    menu: [
      { label: "Our firm", href: "/about", visible: true },
      { label: "Expertise", href: "/services", visible: true },
      { label: "People", href: "/lawyers", visible: true },
      { label: "Experience", href: "/experience", visible: true },
      { label: "Insights", href: "/articles", visible: true },
      { label: "Contact", href: "/contact", visible: true },
    ],
    cta: { label: "Consultation", href: "/consultation" },
  },
  home: {
    heroKicker: "Vũ Khang · Legal counsel",
    heroTitle: "Understand\nthe matter.\nDecide with\nconfidence.",
    heroSummary:
      "A clear legal perspective on the decisions that matter — from business operations to protecting your rights and interests.",
    heroPrimary: { label: "Talk to Vũ Khang", href: "/consultation" },
    heroSecondary: { label: "Explore expertise", href: "/services" },
    discoverTitle: "Start with what you need",
    discoverCards: [
      { title: "Find the right expertise", href: "/services" },
      { title: "Meet the legal team", href: "/lawyers" },
      { title: "Request a consultation", href: "/consultation" },
    ],
    aboutKicker: "About Vũ Khang",
    aboutTitle: "The law, understood\nin your context.",
    aboutLead:
      "Behind every legal matter is an objective, a concern and a decision that deserves careful consideration.",
    aboutText:
      "Understanding the context is the starting point for identifying the key issues, assessing the options and clarifying the next step.",
    aboutLink: { label: "Discover Vũ Khang", href: "/about" },
    expertiseKicker: "Areas of practice",
    expertiseTitle: "Focused perspectives.\nAn informed approach.",
    expertiseText: "Explore the scope of support for the issues that matter to you.",
    expertiseLink: { label: "All expertise", href: "/services" },
    startKicker: "Getting started",
    startTitle: "Clarity from the\nfirst conversation.",
    startText:
      "A focused journey, from understanding your needs to agreeing on the next step.",
    startCta: { label: "Start a conversation", href: "/consultation" },
    steps: [
      { title: "Understand the context", text: "Share your matter, objectives and the timeline you have in mind." },
      { title: "Clarify the scope", text: "Discuss relevant documents, the scope of support and engagement terms." },
      { title: "Agree on next steps", text: "Appointments and work are confirmed following discussion." },
    ],
  },
  footer: {
    kicker: "Talk to Vũ Khang",
    title: "Your next step\nstarts with clarity.",
    invitation: "Tell us about your matter to start a focused conversation.",
    invitationCta: { label: "Request a consultation", href: "/consultation" },
    motto: "Understand the matter. Decide with confidence.",
    exploreTitle: "Explore Vũ Khang",
    connectTitle: "Connect",
    extraLinks: [
      { label: "Industries", href: "/industries" },
      { label: "Careers", href: "/careers" },
      { label: "Client guide", href: "/guide" },
      { label: "Search", href: "/search" },
      { label: "Request an appointment", href: "/consultation" },
    ],
    copyright: "Vũ Khang.",
  },
  contact: {},
};

/** Bản Trung sinh từ bản Anh qua từ điển zh.ts như phần còn lại của website. */
function toChinese(data: SiteLayoutData): SiteLayoutData {
  const walk = (value: unknown): unknown => {
    if (typeof value === "string") return chinese(value);
    if (Array.isArray(value)) return value.map(walk);
    if (value && typeof value === "object")
      return Object.fromEntries(
        Object.entries(value).map(([k, v]) => [k, k === "href" ? v : walk(v)]),
      );
    return value;
  };
  return walk(data) as SiteLayoutData;
}

export const SITE_LAYOUT_DEFAULTS: Record<Locale, SiteLayoutData> = {
  vi,
  en,
  zh: toChinese(en),
};

export const SiteLayout: GlobalConfig = {
  slug: "site-layout",
  label: "Giao diện website",
  admin: {
    group: "Nội dung website",
    description:
      "Menu, trang chủ, chân trang và liên hệ. Mỗi ô có ba ngôn ngữ — chọn ngôn ngữ ở góc trên bên phải. Ô để trống sẽ dùng bản tiếng Việt.",
    livePreview: {
      url: ({ locale }) =>
        `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${locale?.code || "vi"}`,
    },
    preview: (_doc, { locale }) =>
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${locale || "vi"}`,
  },
  access: { read: () => true, update: editorial },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "header",
          label: "Đầu trang",
          fields: [
            localized("tagline", "Dòng chữ nhỏ trên cùng"),
            {
              name: "menu",
              label: "Menu chính (tối đa 8 mục hiện)",
              type: "array",
              maxRows: 12,
              fields: [
                localized("label", "Nhãn"),
                {
                  name: "href",
                  label: "Đường dẫn (ví dụ /about)",
                  type: "text",
                  required: true,
                  validate: (value: unknown) =>
                    /^(\/|https:\/\/)/.test(String(value ?? ""))
                      ? true
                      : "Đường dẫn nội bộ bắt đầu bằng /, liên kết ngoài bắt đầu bằng https://",
                },
                { name: "visible", label: "Hiển thị", type: "checkbox", defaultValue: true },
              ],
            },
            link("cta", "Nút đặt lịch"),
          ],
        },
        {
          name: "home",
          label: "Trang chủ",
          fields: [
            localized("heroKicker", "Dòng dẫn trên tiêu đề"),
            localized("heroTitle", "Tiêu đề lớn (mỗi dòng xuống hàng một lần)", true),
            localized("heroSummary", "Đoạn mở đầu", true),
            link("heroPrimary", "Nút chính"),
            link("heroSecondary", "Nút phụ"),
            localized("discoverTitle", "Nhãn dải khám phá"),
            {
              name: "discoverCards",
              label: "Ba thẻ khám phá",
              type: "array",
              maxRows: 3,
              fields: [localized("title", "Tiêu đề"), { name: "href", label: "Đường dẫn", type: "text" }],
            },
            localized("aboutKicker", "Mục 01 — nhãn"),
            localized("aboutTitle", "Mục 01 — tiêu đề", true),
            localized("aboutLead", "Mục 01 — câu dẫn", true),
            localized("aboutText", "Mục 01 — đoạn văn", true),
            link("aboutLink", "Mục 01 — liên kết"),
            localized("expertiseKicker", "Mục 02 — nhãn"),
            localized("expertiseTitle", "Mục 02 — tiêu đề", true),
            localized("expertiseText", "Mục 02 — đoạn văn", true),
            link("expertiseLink", "Mục 02 — liên kết"),
            localized("startKicker", "Mục 03 — nhãn"),
            localized("startTitle", "Mục 03 — tiêu đề", true),
            localized("startText", "Mục 03 — đoạn văn", true),
            link("startCta", "Mục 03 — nút"),
            {
              name: "steps",
              label: "Mục 03 — ba bước",
              type: "array",
              maxRows: 3,
              fields: [localized("title", "Tên bước"), localized("text", "Mô tả", true)],
            },
          ],
        },
        {
          name: "footer",
          label: "Chân trang",
          fields: [
            localized("kicker", "Nhãn nhỏ"),
            localized("title", "Tiêu đề", true),
            localized("invitation", "Lời mời", true),
            link("invitationCta", "Nút"),
            localized("motto", "Khẩu hiệu dưới logo"),
            localized("exploreTitle", "Tiêu đề cột 1"),
            localized("connectTitle", "Tiêu đề cột 2"),
            {
              name: "extraLinks",
              label: "Liên kết thêm ở cột 2",
              type: "array",
              fields: [localized("label", "Nhãn"), { name: "href", label: "Đường dẫn", type: "text", required: true }],
            },
            localized("copyright", "Dòng bản quyền (sau năm)"),
          ],
        },
        {
          name: "contact",
          label: "Liên hệ và mạng xã hội",
          fields: [
            { name: "zalo", label: "Zalo (số hoặc liên kết)", type: "text" },
            { name: "facebook", label: "Facebook", type: "text" },
            { name: "linkedin", label: "LinkedIn", type: "text" },
            { name: "youtube", label: "YouTube", type: "text" },
            localized("hours", "Giờ làm việc", true),
            { name: "mapUrl", label: "Liên kết Google Maps", type: "text" },
            {
              name: "mapEmbed",
              label: "Địa chỉ nhúng bản đồ (https://www.google.com/maps/embed?...)",
              type: "text",
              validate: (value: unknown) =>
                !value || String(value).startsWith("https://www.google.com/maps/embed?")
                  ? true
                  : "Chỉ nhận địa chỉ nhúng của Google Maps.",
            },
          ],
        },
      ],
    },
  ],
};
```

Lưu ý: `chinese` hiện nằm ở `src/lib/content.ts` và import `zh.ts`; chuyển hàm `chinese` sang `src/lib/zh.ts` (xuất thêm `export const chinese = ...`) và `content.ts` re-export, để `site-layout.ts` không kéo theo `process.env` của `content.ts` vào cấu hình Payload.

- [ ] **Step 2: Sửa `src/payload.config.ts`**

- Thêm `import { SiteLayout } from "./cms/site-layout";`
- Trong `buildConfig` thêm:

```ts
  localization: {
    locales: [
      { label: "Tiếng Việt", code: "vi" },
      { label: "English", code: "en" },
      { label: "简体中文", code: "zh" },
    ],
    defaultLocale: "vi",
    fallback: true,
  },
```

- `globals: [ {...site-settings...}, SiteLayout ]`, và trong `site-settings` đổi `text("address", "Địa chỉ")` thành `{ name: "address", label: "Địa chỉ", type: "text", localized: true }`; thêm `admin: { group: "Nội dung website", preview: () => \`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/vi/contact\` }` cho `site-settings`.

- [ ] **Step 3: Tạo migration và kiểu**

Run:
```bash
npm run payload -- migrate:create giao-dien-website
npm run payload -- migrate
npm run generate:types
```
Expected: tệp mới trong `src/migrations/`, `src/migrations/index.ts` có thêm mục, `src/payload-types.ts` có `SiteLayout`. Kiểm tra migration chỉ **thêm** bảng `site_layout*`, `site_layout_locales`, `site_settings_locales` và không xóa dữ liệu (`grep -n "DROP TABLE" <migration>` chỉ được thấy trong `down`). Vì `address` chuyển sang localized, migration sinh ra có thể xóa cột `address` ở `site_settings` và tạo bảng `site_settings_locales`: **trước** lệnh xóa cột, chèn bằng tay vào `up`:

```ts
  await db.run(sql`INSERT INTO \`site_settings_locales\` (\`address\`, \`_locale\`, \`_parent_id\`)
    SELECT \`address\`, 'vi', \`id\` FROM \`site_settings\` WHERE \`address\` IS NOT NULL;`)
```

(đặt sau lệnh `CREATE TABLE site_settings_locales` và trước lệnh bỏ cột).

- [ ] **Step 4: Kiểm tra nhanh**

Run: `npm run typecheck && node --env-file=.env --import tsx -e "import('payload').then(async ({getPayload})=>{const {default:c}=await import('./src/payload.config.ts');const p=await getPayload({config:c});console.log(await p.findGlobal({slug:'site-layout',locale:'en'}));process.exit(0)})"`
Expected: in ra đối tượng có `header`, `home`, `footer`, `contact` (rỗng), không lỗi.

- [ ] **Step 5: Commit**

```bash
git add src/cms/site-layout.ts src/lib/zh.ts src/lib/content.ts src/payload.config.ts src/migrations src/payload-types.ts
git commit -m "Global Giao dien website va localization cho global"
```

---

### Task 5: Trang công khai đọc từ global; script nạp mặc định; kiểm thử

**Files:**
- Create: `src/lib/site-layout.ts`, `scripts/prepare-site-layout.ts`
- Modify: `src/lib/content.ts`, `src/components/shell.tsx`, `src/app/(public)/[locale]/layout.tsx`, `src/app/(public)/[locale]/page.tsx`, `src/app/sitemap.ts`, `src/app/(public)/[locale]/[section]/page.tsx` (contact: hiện `hours`, mạng xã hội, bản đồ), `scripts/hosting-setup.mjs` (thêm `prepare-site-layout.ts` vào danh sách), `.github/workflows/ci.yml` (chạy script sau `prepare-pages.ts`)
- Test: `tests/site-layout.spec.ts`

**Interfaces:**
- Produces: `getSiteLayout(locale): Promise<SiteLayoutData>` — luôn trả đủ mọi ô: giá trị DB đè lên `SITE_LAYOUT_DEFAULTS[locale]`; chuỗi rỗng/null trong DB coi như thiếu; mảng rỗng coi như thiếu.
- Produces: `navigationFrom(layout: SiteLayoutData): { slug: string; label: string; href: string }[]` trong `src/lib/content.ts` (chỉ mục `visible !== false`, tối đa 8; `slug` là phần đầu sau `/`).
- `Header` nhận `layout: SiteLayoutData["header"]` và `nav: ReturnType<typeof navigationFrom>`; `Footer` nhận `layout: SiteLayoutData["footer"]`, `nav`, `contact: SiteLayoutData["contact"]`.

- [ ] **Step 1: Viết kiểm thử**

```ts
// tests/site-layout.spec.ts
import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";

async function adminToken(request: any) {
  const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
  const password = credentials.match(/Password: (.+)/)![1].trim();
  const login = await request.post("/api/users/login", {
    data: { email: "admin@local.invalid", password },
  });
  return (await login.json()).token as string;
}

test("menu, hero and footer come from the site-layout global in every language", async ({
  page,
  request,
}) => {
  const token = await adminToken(request);
  const auth = { Authorization: "JWT " + token };
  const before = await (await request.get("/api/globals/site-layout?locale=all")).json();
  try {
    const patch = await request.post("/api/globals/site-layout?locale=vi", {
      headers: auth,
      data: {
        header: {
          menu: [
            { label: "QA Về chúng tôi", href: "/about", visible: true },
            { label: "QA ẩn", href: "/careers", visible: false },
            { label: "Liên hệ", href: "/contact", visible: true },
          ],
        },
        footer: { motto: "QA khẩu hiệu kiểm thử" },
        home: { heroKicker: "QA dòng dẫn" },
      },
    });
    expect(patch.ok()).toBeTruthy();
    await page.goto("/vi");
    await expect(page.locator(".desktop-nav, .mobile-nav").first()).toContainText("QA Về chúng tôi");
    expect(await page.locator("body").textContent()).not.toContain("QA ẩn");
    await expect(page.locator(".footer-motto")).toHaveText("QA khẩu hiệu kiểm thử");
    await expect(page.locator(".hero-kicker")).toContainText("QA dòng dẫn");

    // EN chưa sửa: menu tự rơi về bản mặc định tiếng Anh, không hiện chuỗi tiếng Việt.
    await page.goto("/en");
    await expect(page.locator(".footer-motto")).toHaveText(
      "Understand the matter. Decide with confidence.",
    );

    const bad = await request.post("/api/globals/site-layout?locale=vi", {
      headers: auth,
      data: { header: { menu: [{ label: "x", href: "javascript:alert(1)", visible: true }] } },
    });
    expect(bad.ok()).toBeFalsy();
  } finally {
    for (const locale of ["vi", "en", "zh"])
      await request.post("/api/globals/site-layout?locale=" + locale, {
        headers: auth,
        data: {
          header: { menu: before.header?.menu?.map((m: any) => ({ ...m, label: m.label?.[locale] })) ?? [] },
          footer: { motto: before.footer?.motto?.[locale] ?? "" },
          home: { heroKicker: before.home?.heroKicker?.[locale] ?? "" },
        },
      });
  }
});
```

- [ ] **Step 2: Chạy để thấy thất bại**

Run: `npx playwright test tests/site-layout.spec.ts --project=desktop`
Expected: FAIL — menu vẫn là mảng cứng.

- [ ] **Step 3: Viết `src/lib/site-layout.ts`**

```ts
import { cache } from "react";
import { getCMS } from "./cms";
import type { Locale } from "./locales";
import { SITE_LAYOUT_DEFAULTS, type SiteLayoutData } from "@/cms/site-layout";

const filled = (value: unknown) =>
  Array.isArray(value)
    ? value.length > 0
    : typeof value === "string"
      ? value.trim().length > 0
      : value !== null && value !== undefined;

function merge<T>(defaults: T, data: unknown): T {
  if (Array.isArray(defaults) || typeof defaults !== "object" || defaults === null)
    return (filled(data) ? data : defaults) as T;
  const out: Record<string, unknown> = { ...(defaults as object) };
  const source = (data ?? {}) as Record<string, unknown>;
  for (const key of new Set([...Object.keys(out), ...Object.keys(source)])) {
    const base = (defaults as Record<string, unknown>)[key];
    const value = source[key];
    out[key] =
      base && typeof base === "object" && !Array.isArray(base)
        ? merge(base, value)
        : filled(value)
          ? value
          : base;
  }
  return out as T;
}

/** Dữ liệu global đè lên mặc định trong mã; ô trống dùng mặc định của đúng ngôn ngữ đó. */
export const getSiteLayout = cache(async function getSiteLayout(
  locale: Locale,
): Promise<SiteLayoutData> {
  const defaults = SITE_LAYOUT_DEFAULTS[locale];
  if (!process.env.DATABASE_URL) return defaults;
  try {
    const cms = await getCMS();
    const data = await cms.findGlobal({
      slug: "site-layout",
      locale,
      fallbackLocale: "vi",
      overrideAccess: false,
      depth: 0,
    });
    return merge(defaults, data);
  } catch {
    return defaults;
  }
});
```

- [ ] **Step 4: `navigationFrom` trong `src/lib/content.ts`**

Giữ `navigation` cũ (dùng làm dự phòng nơi chưa có layout), thêm:

```ts
import type { SiteLayoutData } from "@/cms/site-layout";
export type NavItem = { slug: string; label: string; href: string };
export function navigationFrom(layout: SiteLayoutData): NavItem[] {
  return (layout.header.menu ?? [])
    .filter((m) => m.visible !== false && m.href && m.label)
    .slice(0, 8)
    .map((m) => ({
      slug: String(m.href).replace(/^\//, "").split("/")[0],
      label: String(m.label),
      href: String(m.href),
    }));
}
```

- [ ] **Step 5: Header/Footer đọc từ props**

`shell.tsx`: `Header` thêm props `layout: SiteLayoutData["header"]`, `nav: NavItem[]`; thay `navigation.map(([slug, vi, en]) => ...)` bằng `nav.map((item) => ...)` với `href={item.href.startsWith("/") ? "/" + locale + item.href : item.href}` và nhãn `item.label`; mục `slug === "services"` vẫn là nút mở mega menu. Dòng "Tư vấn pháp lý · Việt Nam" → `layout.tagline`. Nút `header-cta` → `layout.cta?.label` và `href`. `Footer` thêm `layout: SiteLayoutData["footer"]`, `nav: NavItem[]`, `contact: SiteLayoutData["contact"]`: kicker, title, invitation, invitationCta, motto, exploreTitle, connectTitle từ `layout`; cột 1 = `nav.slice(0, 4)`, cột 2 = `nav.slice(4)` + `layout.extraLinks`; dòng bản quyền `© {năm} {layout.copyright}`; nếu `contact.facebook/linkedin/youtube/zalo` có giá trị thì thêm danh sách liên kết mạng xã hội (`<a rel="noreferrer" target="_blank">`) dưới `ContactChannels`.

`layout.tsx`: `const layout = await getSiteLayout(locale); const nav = navigationFrom(layout);` truyền vào Header/Footer.

- [ ] **Step 6: Trang chủ đọc từ `layout.home`**

Trong `page.tsx`: `const layout = (await getSiteLayout(locale)).home;` rồi thay từng chuỗi `t(locale, "...", "...")` bằng ô tương ứng theo bảng:

| Vị trí | Ô |
|---|---|
| `.hero-kicker` | `layout.heroKicker` |
| `<h1>` khi `home?.title` trống | `layout.heroTitle.split("\n")` — hai dòng đầu thường, hai dòng sau trong `<span>` (giữ đúng cấu trúc hiện tại; nếu ít hơn 4 dòng thì mọi dòng thường) |
| đoạn `<p>` hero | `home?.summary || layout.heroSummary` |
| hai nút hero | `layout.heroPrimary`, `layout.heroSecondary` |
| `.pathway-label` | `layout.discoverTitle` |
| ba thẻ pathway | `layout.discoverCards` |
| mục 01 | `aboutKicker`, `aboutTitle`, `aboutLead`, `aboutText`, `aboutLink` |
| mục 02 | `expertiseKicker`, `expertiseTitle`, `expertiseText`, `expertiseLink` |
| mục 03 | `startKicker`, `startTitle`, `startText`, `startCta`, `steps` |

Tiêu đề nhiều dòng (`aboutTitle`, ...) render bằng `.split("\n")` xen `<br />`. Đường dẫn nội bộ: `href.startsWith("/") ? "/" + locale + href : href`. Mục 04 (Con người & góc nhìn) và ảnh Sài Gòn giữ nguyên trong mã.

- [ ] **Step 7: Sitemap và trang liên hệ**

`sitemap.ts`: `STATIC_PATHS` tính trong hàm: `const nav = navigationFrom(await getSiteLayout("vi"));` rồi `["", ...nav.filter(n => n.href.startsWith("/")).map(n => n.slug), "industries", "careers", "guide", "consultation", "privacy", "terms"]` khử trùng bằng `new Set`.

`[section]/page.tsx` nhánh `contact`: sau email, nếu `contact.hours` thì `<p>{contact.hours}</p>`; nếu `contact.mapEmbed` thì `<iframe src={contact.mapEmbed} title="Bản đồ" loading="lazy" style={{ width: "100%", height: 320, border: 0 }} />`. CSP hiện có `default-src 'self'`; cần nới `frame-src https://www.google.com` trong `next.config.mjs` chỉ khi có `mapEmbed` — để đơn giản và an toàn: thêm `frame-src 'self' https://www.google.com` vào CSP ở `next.config.mjs` (ghi rõ lý do trong chú thích).

- [ ] **Step 8: Script nạp mặc định**

```ts
// scripts/prepare-site-layout.ts
/**
 * Nạp chữ mặc định của giao diện vào global "Giao diện website" cho ba ngôn ngữ.
 * Chỉ điền ô đang trống; không ghi đè nội dung công ty đã sửa. Chạy lại được.
 *   node --env-file=.env --import tsx scripts/prepare-site-layout.ts
 */
import { getPayload } from "payload";
import config from "../src/payload.config";
import { SITE_LAYOUT_DEFAULTS } from "../src/cms/site-layout";

const cms = await getPayload({ config });
try {
  for (const locale of ["vi", "en", "zh"] as const) {
    const current = (await cms.findGlobal({ slug: "site-layout", locale, depth: 0 })) as Record<string, any>;
    const defaults = SITE_LAYOUT_DEFAULTS[locale] as Record<string, any>;
    const data: Record<string, any> = {};
    let filled = 0;
    for (const tab of Object.keys(defaults)) {
      data[tab] = { ...(current[tab] ?? {}) };
      for (const [key, value] of Object.entries(defaults[tab])) {
        const existing = current[tab]?.[key];
        const empty = Array.isArray(existing) ? existing.length === 0 : existing == null || existing === "";
        if (empty) {
          data[tab][key] = value;
          filled++;
        }
      }
    }
    if (filled) await cms.updateGlobal({ slug: "site-layout", locale, data });
    console.log(`[${locale}] đã điền ${filled} ô trống.`);
  }
} finally {
  await cms.destroy();
}
process.exit(0);
```

Thêm `"prepare-site-layout.ts"` vào danh sách script trong `scripts/hosting-setup.mjs` (sau `prepare-pages.ts`) và một bước tương ứng trong `.github/workflows/ci.yml` sau bước `prepare-pages.ts`. Chạy cục bộ: `node --env-file=.env --import tsx scripts/prepare-site-layout.ts`.

- [ ] **Step 9: Chạy cả bộ kiểm thử**

Run: `npm run typecheck && npm run build && npm test`
Expected: PASS; `navigation.spec.ts`, `seo.spec.ts` (sitemap), `chinese.spec.ts` vẫn đạt vì mặc định giống chữ cũ.

- [ ] **Step 10: Commit**

```bash
git add -A src scripts tests/site-layout.spec.ts next.config.mjs .github/workflows/ci.yml
git commit -m "Menu, trang chu, chan trang doc tu global Giao dien website"
```

---

# ĐỢT 3 — Dịch máy có duyệt

### Task 6: Cờ máy dịch và cổng xuất bản

**Files:**
- Modify: `src/payload.config.ts` (thêm 3 ô vào `contentCollections` sau `isSample`)
- Modify: `src/cms/access.ts` (`publicationGuard`)
- Create: migration
- Test: `tests/translate.spec.ts`

**Interfaces:**
- Produces: ô `machineTranslated` (checkbox, mặc định false, `admin.readOnly`, `admin.position: "sidebar"`), `reviewedBy` (relationship → users, readOnly, sidebar), `reviewedAt` (date, readOnly, sidebar).
- Hook: khi `machineTranslated` chuyển true → false, ghi `reviewedBy = req.user.id`, `reviewedAt = now`. Khi `_status === "published"` mà `machineTranslated` (mới hoặc cũ) còn true → ném lỗi "Bản dịch máy phải được rà soát trước khi xuất bản. Bấm 'Đã rà soát bản dịch' trong cột phải."

- [ ] **Step 1: Viết kiểm thử**

```ts
// tests/translate.spec.ts
import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";

async function adminToken(request: any) {
  const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
  const password = credentials.match(/Password: (.+)/)![1].trim();
  const login = await request.post("/api/users/login", {
    data: { email: "admin@local.invalid", password },
  });
  return (await login.json()).token as string;
}

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
  expect(created.ok()).toBeTruthy();
  const id = (await created.json()).doc.id;
  try {
    const publish = await request.patch("/api/services/" + id, {
      headers: auth,
      data: { _status: "published" },
    });
    expect(publish.ok()).toBeFalsy();
    expect(await publish.text()).toContain("rà soát");
    const reviewed = await request.patch("/api/services/" + id + "?draft=true", {
      headers: auth,
      data: { machineTranslated: false, _status: "draft" },
    });
    expect(reviewed.ok()).toBeTruthy();
    const doc = (await reviewed.json()).doc;
    expect(doc.reviewedAt).toBeTruthy();
    expect(doc.reviewedBy).toBeTruthy();
    const publishAgain = await request.patch("/api/services/" + id, {
      headers: auth,
      data: { reviewState: "approved", _status: "published" },
    });
    expect(publishAgain.ok()).toBeTruthy();
  } finally {
    await request.delete("/api/services/" + id, { headers: auth });
  }
});
```

- [ ] **Step 2: Chạy để thấy thất bại**

Run: `npx playwright test tests/translate.spec.ts --project=desktop`
Expected: FAIL — ô `machineTranslated` không tồn tại nên xuất bản thành công.

- [ ] **Step 3: Thêm ô**

Sau ô `isSample` trong `contentCollections.fields`:

```ts
      {
        name: "machineTranslated",
        label: "Bản dịch máy, chưa duyệt",
        type: "checkbox",
        defaultValue: false,
        admin: {
          position: "sidebar",
          readOnly: true,
          description: "Tắt bằng nút 'Đã rà soát bản dịch' trong bảng Bản dịch.",
        },
      },
      {
        name: "reviewedBy",
        label: "Người rà soát bản dịch",
        type: "relationship",
        relationTo: "users",
        admin: { position: "sidebar", readOnly: true },
      },
      {
        name: "reviewedAt",
        label: "Rà soát lúc",
        type: "date",
        admin: { position: "sidebar", readOnly: true },
      },
```

- [ ] **Step 4: Mở rộng `publicationGuard` (`src/cms/access.ts`)**

Trước khối `if (data._status === "published")`:

```ts
  const wasMachine = originalDoc?.machineTranslated === true;
  const isMachine = data.machineTranslated ?? originalDoc?.machineTranslated;
  if (wasMachine && data.machineTranslated === false) {
    data.reviewedBy = req.user?.id;
    data.reviewedAt = new Date().toISOString();
  }
```

Trong khối `published`, thêm:

```ts
    if (isMachine === true)
      throw new Error(
        "Bản dịch máy phải được rà soát trước khi xuất bản. Bấm 'Đã rà soát bản dịch' trong cột phải.",
      );
```

Lưu ý: `contentChanged` hiện đặt `reviewState = "working"` với mọi thay đổi của người không phải admin/reviewer; thêm `"machineTranslated", "reviewedBy", "reviewedAt"` vào danh sách khóa bỏ qua để bấm "Đã rà soát" không làm mất trạng thái duyệt chuyên môn.

- [ ] **Step 5: Migration, kiểu, kiểm thử**

Run:
```bash
npm run payload -- migrate:create co-ban-dich-may
npm run payload -- migrate
npm run generate:types
npm run typecheck && npm run build && npx playwright test tests/translate.spec.ts --project=desktop
```
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/payload.config.ts src/cms/access.ts src/migrations src/payload-types.ts tests/translate.spec.ts
git commit -m "Co ban dich may va cong xuat ban bat buoc ra soat"
```

---

### Task 7: Bộ dịch: bảng thuật ngữ, duyệt richText, nhà cung cấp Claude và giả lập

**Files:**
- Create: `src/cms/translation/glossary.ts`, `src/cms/translation/richtext.ts`, `src/cms/translation/provider.ts`
- Modify: `package.json` (thêm `@anthropic-ai/sdk`)
- Test: `tests/translate.spec.ts` (kiểm thử hàm thuần, import từ `src`)

**Interfaces:**
- Produces: `collectTexts(node: unknown): string[]` và `replaceTexts(node: unknown, texts: string[]): unknown` (Lexical JSON; duyệt sâu theo `children`, chỉ lấy node `type === "text"` có `text` khác rỗng; `replaceTexts` trả bản sao, không đổi đầu vào).
- Produces: `translateStrings(items: string[], target: "en" | "zh", context: { kind: string }): Promise<string[]>`; ném `TranslationUnavailable` (class) khi không có nhà cung cấp; giới hạn 60.000 ký tự tổng (ném `TranslationTooLarge`).
- Produces: `translationProvider(): "claude" | "mock" | null`.
- Produces: `GLOSSARY: { vi: string; en: string; zh: string }[]`.

- [ ] **Step 1: Cài SDK**

Run: `npm install @anthropic-ai/sdk@latest --save-exact`
Expected: `package.json` có `"@anthropic-ai/sdk": "<phiên bản>"`.

- [ ] **Step 2: Viết kiểm thử hàm thuần (thêm vào `tests/translate.spec.ts`)**

```ts
import { collectTexts, replaceTexts } from "../src/cms/translation/richtext";
import { translateStrings } from "../src/cms/translation/provider";

test("lexical text nodes are collected and replaced in order without touching structure", () => {
  const doc = {
    root: {
      type: "root",
      children: [
        { type: "paragraph", children: [
          { type: "text", text: "Xin chào", format: 1 },
          { type: "linebreak" },
          { type: "link", fields: { url: "https://x" }, children: [{ type: "text", text: "liên kết" }] },
        ] },
        { type: "paragraph", children: [{ type: "text", text: "" }] },
      ],
    },
  };
  expect(collectTexts(doc)).toEqual(["Xin chào", "liên kết"]);
  const out = replaceTexts(doc, ["Hello", "link"]) as any;
  expect(out.root.children[0].children[0]).toEqual({ type: "text", text: "Hello", format: 1 });
  expect(out.root.children[0].children[2].fields.url).toBe("https://x");
  expect(doc.root.children[0].children[0].text).toBe("Xin chào");
});

test("the mock provider tags strings and refuses oversized batches", async () => {
  process.env.TRANSLATION_PROVIDER = "mock";
  expect(await translateStrings(["a", "b"], "en", { kind: "test" })).toEqual(["a [en]", "b [en]"]);
  await expect(
    translateStrings(["x".repeat(60001)], "zh", { kind: "test" }),
  ).rejects.toThrow(/quá dài/);
});
```

- [ ] **Step 3: Chạy để thấy thất bại**

Run: `npx playwright test tests/translate.spec.ts --project=desktop -g "lexical|mock provider"`
Expected: FAIL — module không tồn tại.

- [ ] **Step 4: `glossary.ts`**

```ts
/** Thuật ngữ pháp lý phải dịch nhất quán. Thêm dòng khi công ty góp ý. */
export const GLOSSARY = [
  { vi: "Công ty Luật TNHH Vũ Khang Solutions & Partners", en: "Công ty Luật TNHH Vũ Khang Solutions & Partners", zh: "Công ty Luật TNHH Vũ Khang Solutions & Partners" },
  { vi: "tư vấn pháp lý", en: "legal advice", zh: "法律咨询" },
  { vi: "giải quyết tranh chấp", en: "dispute resolution", zh: "争议解决" },
  { vi: "trọng tài thương mại", en: "commercial arbitration", zh: "商事仲裁" },
  { vi: "hợp đồng", en: "contract", zh: "合同" },
  { vi: "rà soát hợp đồng", en: "contract review", zh: "合同审查" },
  { vi: "doanh nghiệp", en: "enterprise", zh: "企业" },
  { vi: "đầu tư nước ngoài", en: "foreign investment", zh: "外国投资" },
  { vi: "giấy chứng nhận đăng ký đầu tư", en: "investment registration certificate", zh: "投资登记证" },
  { vi: "sở hữu trí tuệ", en: "intellectual property", zh: "知识产权" },
  { vi: "lao động", en: "employment", zh: "劳动" },
  { vi: "bất động sản", en: "real estate", zh: "房地产" },
  { vi: "sổ đỏ", en: "land use right certificate", zh: "土地使用权证" },
  { vi: "khởi kiện", en: "file a lawsuit", zh: "提起诉讼" },
  { vi: "tòa án", en: "court", zh: "法院" },
  { vi: "luật sư", en: "lawyer", zh: "律师" },
  { vi: "văn phòng", en: "office", zh: "办公室" },
  { vi: "yêu cầu tư vấn", en: "consultation request", zh: "咨询申请" },
];
```

- [ ] **Step 5: `richtext.ts`**

```ts
type Node = { type?: string; text?: string; children?: Node[]; [key: string]: unknown };

function walk(node: unknown, visit: (n: Node) => void) {
  if (!node || typeof node !== "object") return;
  const n = node as Node;
  if (n.type === "text" && typeof n.text === "string" && n.text.length) visit(n);
  if (Array.isArray(n.children)) n.children.forEach((c) => walk(c, visit));
  if ("root" in n) walk((n as { root: unknown }).root, visit);
}

/** Mọi chuỗi chữ trong tài liệu Lexical, theo thứ tự đọc. */
export function collectTexts(doc: unknown): string[] {
  const out: string[] = [];
  walk(doc, (n) => out.push(n.text as string));
  return out;
}

/** Bản sao tài liệu với chuỗi thay theo đúng thứ tự; định dạng, liên kết, ảnh giữ nguyên. */
export function replaceTexts(doc: unknown, texts: string[]): unknown {
  const copy = JSON.parse(JSON.stringify(doc));
  let i = 0;
  walk(copy, (n) => {
    if (i < texts.length) n.text = texts[i];
    i++;
  });
  return copy;
}
```

- [ ] **Step 6: `provider.ts`**

```ts
import Anthropic from "@anthropic-ai/sdk";
import { GLOSSARY } from "./glossary";

export class TranslationUnavailable extends Error {}
export class TranslationTooLarge extends Error {}

export const MAX_CHARS = 60000;
const LANGUAGE = { en: "English", zh: "Simplified Chinese (简体中文)" } as const;

export function translationProvider(): "claude" | "mock" | null {
  if (process.env.TRANSLATION_PROVIDER === "mock") return "mock";
  if (process.env.ANTHROPIC_API_KEY) return "claude";
  return null;
}

const SYSTEM = `You translate content for the website of a Vietnamese law firm, Công ty Luật TNHH Vũ Khang Solutions & Partners.
Rules:
- Translate from Vietnamese into the requested language, formal register, plain and precise.
- Keep unchanged: the firm's name, personal names, legal document numbers (e.g. "Luật số 59/2020/QH14"), phone numbers, email addresses, URLs, and placeholders in braces.
- Do not add, drop or summarise content. Preserve line breaks exactly.
- Use this glossary when the term appears:
${GLOSSARY.map((g) => `  "${g.vi}" -> en: "${g.en}", zh: "${g.zh}"`).join("\n")}
Return only JSON of the form {"items": [...]} with exactly one translated string per input string, same order.`;

async function claude(items: string[], target: "en" | "zh"): Promise<string[]> {
  const client = new Anthropic();
  const message = await client.messages
    .stream({
      model: "claude-opus-5",
      max_tokens: 16000,
      system: [{ type: "text", text: SYSTEM, cache_control: { type: "ephemeral" } }],
      output_config: {
        format: {
          type: "json_schema",
          schema: {
            type: "object",
            properties: { items: { type: "array", items: { type: "string" } } },
            required: ["items"],
            additionalProperties: false,
          },
        },
      },
      messages: [
        {
          role: "user",
          content: `Target language: ${LANGUAGE[target]}.\nInput strings as JSON:\n${JSON.stringify(items)}`,
        },
      ],
    })
    .finalMessage();
  if (message.stop_reason === "refusal")
    throw new Error("Dịch vụ dịch từ chối nội dung này.");
  const text = message.content.find((b) => b.type === "text")?.text ?? "";
  const parsed = JSON.parse(text) as { items: unknown };
  if (!Array.isArray(parsed.items) || parsed.items.length !== items.length)
    throw new Error("Kết quả dịch không khớp số đoạn.");
  console.log(
    `[translate] ${target} ${items.length} đoạn, ${message.usage.input_tokens} in / ${message.usage.output_tokens} out tokens`,
  );
  return parsed.items.map(String);
}

/** Dịch một mảng chuỗi. Nhà cung cấp giả lập chỉ cho kiểm thử tự động. */
export async function translateStrings(
  items: string[],
  target: "en" | "zh",
  _context: { kind: string },
): Promise<string[]> {
  const total = items.reduce((n, s) => n + s.length, 0);
  if (total > MAX_CHARS)
    throw new TranslationTooLarge(`Nội dung quá dài (${total} ký tự, tối đa ${MAX_CHARS}).`);
  if (!items.length) return [];
  const provider = translationProvider();
  if (provider === "mock") return items.map((s) => `${s} [${target}]`);
  if (provider === "claude") return claude(items, target);
  throw new TranslationUnavailable("Chưa cấu hình dịch máy: đặt ANTHROPIC_API_KEY trong tệp .env.");
}
```

- [ ] **Step 7: Chạy kiểm thử**

Run: `npm run typecheck && npx playwright test tests/translate.spec.ts --project=desktop -g "lexical|mock provider"`
Expected: PASS. Nếu TypeScript báo `output_config` không có trong kiểu của SDK đã cài, mở `node_modules/@anthropic-ai/sdk/resources/messages/messages.d.ts` tìm tên đúng (`output_config` hoặc `output_format`) và dùng đúng tên đó; không đoán.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json src/cms/translation tests/translate.spec.ts
git commit -m "Bo dich: thuat ngu, duyet richText, nha cung cap Claude va gia lap"
```

---

### Task 8: Endpoint `POST /api/translate` cho bản ghi và global

**Files:**
- Create: `src/cms/translation/endpoint.ts`, `src/lib/rate-limit.ts`
- Modify: `src/app/api/consultation/route.ts` (dùng `overLimit`), `src/payload.config.ts` (`endpoints`)
- Test: `tests/translate.spec.ts`

**Interfaces:**
- Consumes: `translateStrings`, `collectTexts`, `replaceTexts`, `TranslationUnavailable`, `TranslationTooLarge` (Task 7); `editorial` role qua `roleOf`.
- Produces: `POST /api/translate` body JSON:
  - `{ kind: "document", collection, id, targets: ("en"|"zh")[], force?: boolean }` → `{ results: { target, id, created: boolean }[] }`
  - `{ kind: "global", slug: "site-layout" | "site-settings", targets }` → `{ results: { target, fields: number }[] }`
  - 403 chưa đăng nhập/không thuộc nhóm biên tập; 400 body sai; 404 bản ghi không có; 409 `{ error: "exists" }` khi bản đích đã được người sửa tay và không `force`; 413 quá dài; 429 quá hạn mức (20 lần/giờ/người); 503 `{ error, configured: false }` khi chưa cấu hình.
- Produces: `overLimit(bucket: string, limit: number): Promise<boolean>` trong `src/lib/rate-limit.ts` (chuyển nguyên hàm `count` từ route tư vấn, cùng bảng `operations_consultation_rate_limits`).

- [ ] **Step 1: Kiểm thử endpoint (thêm vào `tests/translate.spec.ts`)**

```ts
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
      body: { root: { type: "root", children: [{ type: "paragraph", children: [{ type: "text", text: "Đoạn một" }] }] } },
      scope: [{ item: "Soạn thảo" }],
      seo: { description: "Mô tả QA" },
      _status: "draft",
    },
  });
  const source = (await created.json()).doc;
  const ids: number[] = [source.id];
  try {
    const anon = await request.post("/api/translate", {
      data: { kind: "document", collection: "services", id: source.id, targets: ["en"] },
    });
    expect(anon.status()).toBe(403);

    const run = await request.post("/api/translate", {
      headers: auth,
      data: { kind: "document", collection: "services", id: source.id, targets: ["en", "zh"] },
    });
    test.skip(run.status() === 503, "Dịch máy chưa cấu hình trên máy chủ này (cần TRANSLATION_PROVIDER=mock).");
    expect(run.ok()).toBeTruthy();
    const { results } = await run.json();
    expect(results.map((r: any) => r.target).sort()).toEqual(["en", "zh"]);
    for (const r of results) ids.push(r.id);

    const en = await (await request.get("/api/services/" + results[0].id + "?draft=true", { headers: auth })).json();
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
    await request.patch("/api/services/" + results[0].id + "?draft=true", {
      headers: auth,
      data: { machineTranslated: false, title: "Edited by human", _status: "draft" },
    });
    const again = await request.post("/api/translate", {
      headers: auth,
      data: { kind: "document", collection: "services", id: source.id, targets: ["en"] },
    });
    expect(again.status()).toBe(409);
    const forced = await request.post("/api/translate", {
      headers: auth,
      data: { kind: "document", collection: "services", id: source.id, targets: ["en"], force: true },
    });
    expect(forced.ok()).toBeTruthy();
    expect((await forced.json()).results[0].created).toBe(false);
  } finally {
    for (const id of ids) await request.delete("/api/services/" + id, { headers: auth });
  }
});

test("translating a global fills the EN locale of localized fields", async ({ request }) => {
  const auth = { Authorization: "JWT " + (await adminToken(request)) };
  const before = await (await request.get("/api/globals/site-layout?locale=en")).json();
  const run = await request.post("/api/translate", {
    headers: auth,
    data: { kind: "global", slug: "site-layout", targets: ["en"] },
  });
  test.skip(run.status() === 503, "Dịch máy chưa cấu hình trên máy chủ này.");
  expect(run.ok()).toBeTruthy();
  try {
    const after = await (await request.get("/api/globals/site-layout?locale=en")).json();
    expect(after.footer.motto).toMatch(/\[en\]$/);
  } finally {
    await request.post("/api/globals/site-layout?locale=en", {
      headers: auth,
      data: { footer: { motto: before.footer?.motto ?? "" }, header: { tagline: before.header?.tagline ?? "" } },
    });
  }
});
```

- [ ] **Step 2: Chạy để thấy thất bại**

Run: `npx playwright test tests/translate.spec.ts --project=desktop -g "creates reviewable|fills the EN"`
Expected: FAIL — 404.

- [ ] **Step 3: `src/lib/rate-limit.ts`**

Chuyển hàm `count` (dòng 15–23 của `src/app/api/consultation/route.ts`) thành:

```ts
import { query } from "./operations-db";
/** true khi bucket đã vượt limit trong cửa sổ hiện tại. Bảng dùng chung với biểu mẫu tư vấn. */
export async function overLimit(bucket: string, limit: number) {
  const result = await query(
    "INSERT INTO operations_consultation_rate_limits (bucket, count) VALUES (?, 1) " +
      "ON CONFLICT (bucket) DO UPDATE SET count = operations_consultation_rate_limits.count + 1 " +
      "RETURNING count",
    [bucket],
  );
  return Number(result.rows[0].count) > limit;
}
```

(Sao chép **nguyên văn** câu SQL đang có trong route tư vấn, kể cả `RETURNING`; route tư vấn đổi sang gọi `overLimit`.)

- [ ] **Step 4: `src/cms/translation/endpoint.ts`**

```ts
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

const COLLECTIONS = ["pages", "services", "industries", "lawyers", "experience", "articles", "careers"];
const EDITORIAL = ["admin", "editor", "reviewer", "publisher"];
type Target = "en" | "zh";
const json = (body: unknown, status = 200) => Response.json(body, { status });

/** Các ô chữ của bản ghi cần dịch, theo tên đường dẫn phẳng. */
const PLAIN_FIELDS = ["title", "summary", "keywords", "position", "qualifications", "languages", "location", "audience", "seo.title", "seo.description"];
const ARRAY_FIELDS: Record<string, string[]> = {
  scope: ["item"],
  process: ["heading", "description"],
  faq: ["question", "answer"],
  sources: ["label"],
};

type Slot = { get: () => string; set: (v: string) => void };

function slotsFor(doc: Record<string, any>): Slot[] {
  const slots: Slot[] = [];
  const at = (path: string) => {
    const keys = path.split(".");
    const parent = keys.slice(0, -1).reduce((o, k) => (o ? o[k] : undefined), doc);
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
    if (block.blockType === "callout" && typeof block.body === "string" && block.body.trim())
      slots.push({ get: () => block.body, set: (v) => (block.body = v) });
    if (block.blockType === "text" && block.body) richSlots(block, "body", slots);
  }
  if (doc.body) richSlots(doc, "body", slots);
  if (doc.banner?.caption) at("banner.caption");
  return slots;
}

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

async function translateDocument(req: PayloadRequest, body: any) {
  const { collection, id, force } = body;
  const targets: Target[] = body.targets;
  if (!COLLECTIONS.includes(collection)) return json({ error: "Bộ sưu tập không hợp lệ." }, 400);
  const source = (await req.payload.findByID({ collection, id, draft: true, depth: 0, req })) as Record<string, any>;
  if (!source) return json({ error: "Không tìm thấy bản ghi." }, 404);
  if (source.language !== "vi") return json({ error: "Chỉ dịch từ bản tiếng Việt." }, 400);
  const results: { target: Target; id: unknown; created: boolean }[] = [];
  for (const target of targets) {
    const existing = (
      await req.payload.find({
        collection,
        where: { and: [{ translationKey: { equals: source.translationKey } }, { language: { equals: target } }] },
        draft: true,
        limit: 1,
        depth: 0,
        req,
      })
    ).docs[0] as Record<string, any> | undefined;
    if (existing && existing.machineTranslated !== true && !force) return json({ error: "exists", target }, 409);
    const draft = JSON.parse(JSON.stringify(source)) as Record<string, any>;
    const slots = slotsFor(draft);
    const translated = await translateStrings(slots.map((s) => s.get()), target, { kind: collection });
    slots.forEach((s, i) => s.set(translated[i]));
    for (const key of ["id", "createdAt", "updatedAt", "_status", "reviewedBy", "reviewedAt", "reviewState"]) delete draft[key];
    draft.language = target;
    draft.machineTranslated = true;
    draft.reviewState = "working";
    if (!existing) {
      const clash = await req.payload.count({ collection, where: { and: [{ slug: { equals: source.slug } }, { language: { equals: target } }] }, req });
      draft.slug = clash.totalDocs ? `${source.slug}-${target}` : source.slug;
      const doc = await req.payload.create({ collection, data: draft as never, draft: true, req });
      results.push({ target, id: doc.id, created: true });
    } else {
      delete draft.slug;
      const doc = await req.payload.update({ collection, id: existing.id, data: { ...draft, _status: "draft" } as never, draft: true, req });
      results.push({ target, id: doc.id, created: false });
    }
  }
  return json({ results });
}

const LOCALIZED_GLOBAL_FIELDS: Record<string, string[]> = {
  "site-layout": [
    "header.tagline", "header.menu[].label", "header.cta.label",
    "home.heroKicker", "home.heroTitle", "home.heroSummary", "home.heroPrimary.label", "home.heroSecondary.label",
    "home.discoverTitle", "home.discoverCards[].title", "home.aboutKicker", "home.aboutTitle", "home.aboutLead", "home.aboutText", "home.aboutLink.label",
    "home.expertiseKicker", "home.expertiseTitle", "home.expertiseText", "home.expertiseLink.label",
    "home.startKicker", "home.startTitle", "home.startText", "home.startCta.label", "home.steps[].title", "home.steps[].text",
    "footer.kicker", "footer.title", "footer.invitation", "footer.invitationCta.label", "footer.motto", "footer.exploreTitle", "footer.connectTitle", "footer.extraLinks[].label", "footer.copyright",
    "contact.hours",
  ],
  "site-settings": ["address"],
};

/** Đọc/ghi theo đường dẫn có `[]` cho mảng. */
function pathSlots(obj: Record<string, any>, path: string, slots: Slot[]) {
  const [head, ...rest] = path.split(".");
  if (head.endsWith("[]")) {
    for (const row of obj[head.slice(0, -2)] ?? []) pathSlots(row, rest.join("."), slots);
    return;
  }
  if (!rest.length) {
    if (typeof obj[head] === "string" && obj[head].trim())
      slots.push({ get: () => obj[head], set: (v) => (obj[head] = v) });
    return;
  }
  if (obj[head] && typeof obj[head] === "object") pathSlots(obj[head], rest.join("."), slots);
}

async function translateGlobal(req: PayloadRequest, body: any) {
  const slug = body.slug as string;
  const paths = LOCALIZED_GLOBAL_FIELDS[slug];
  if (!paths) return json({ error: "Global không hợp lệ." }, 400);
  const targets: Target[] = body.targets;
  const vi = (await req.payload.findGlobal({ slug: slug as never, locale: "vi", depth: 0, req })) as Record<string, any>;
  const results: { target: Target; fields: number }[] = [];
  for (const target of targets) {
    const data = JSON.parse(JSON.stringify(vi)) as Record<string, any>;
    const slots: Slot[] = [];
    for (const path of paths) pathSlots(data, path, slots);
    const translated = await translateStrings(slots.map((s) => s.get()), target, { kind: slug });
    slots.forEach((s, i) => s.set(translated[i]));
    for (const key of ["id", "createdAt", "updatedAt", "globalType"]) delete data[key];
    await req.payload.updateGlobal({ slug: slug as never, locale: target, data: data as never, req });
    results.push({ target, fields: slots.length });
  }
  return json({ results });
}

export const translateEndpoint: Endpoint = {
  path: "/translate",
  method: "post",
  handler: async (req) => {
    if (!req.user || !EDITORIAL.includes(roleOf(req.user) || "")) return json({ error: "Cần quyền biên tập." }, 403);
    if (!translationProvider())
      return json({ error: "Chưa cấu hình dịch máy: đặt ANTHROPIC_API_KEY trong tệp .env.", configured: false }, 503);
    let body: any;
    try {
      body = await req.json!();
    } catch {
      return json({ error: "Thân yêu cầu phải là JSON." }, 400);
    }
    const targets = Array.isArray(body?.targets) ? body.targets.filter((t: string) => ["en", "zh"].includes(t)) : [];
    if (!targets.length) return json({ error: "Chọn ít nhất một ngôn ngữ đích (en, zh)." }, 400);
    body.targets = targets;
    await ensureOperationsTable();
    const hour = new Date().toISOString().slice(0, 13);
    if (await overLimit(`translate:${hour}:${req.user.id}`, 20))
      return json({ error: "Đã dùng hết 20 lượt dịch trong giờ này. Thử lại sau." }, 429);
    try {
      if (body.kind === "document") return await translateDocument(req, body);
      if (body.kind === "global") return await translateGlobal(req, body);
      return json({ error: "kind phải là document hoặc global." }, 400);
    } catch (error) {
      if (error instanceof TranslationUnavailable) return json({ error: error.message, configured: false }, 503);
      if (error instanceof TranslationTooLarge) return json({ error: error.message }, 413);
      req.payload.logger.error({ err: error }, "translate failed");
      return json({ error: "Dịch không thành công. Thử lại sau." }, 500);
    }
  },
};
```

Kiểm tra `ensureOperationsTable` có tồn tại và là hàm tạo bảng hạn mức (đọc `src/lib/operations-db.ts:72`); nếu route tư vấn gọi tên khác thì dùng đúng tên đó.

- [ ] **Step 5: Đăng ký endpoint**

`src/payload.config.ts`: `import { translateEndpoint } from "./cms/translation/endpoint";` và trong `buildConfig` thêm `endpoints: [translateEndpoint],`.

- [ ] **Step 6: Bật giả lập khi kiểm thử**

Thêm dòng `TRANSLATION_PROVIDER=mock` vào `.env` cục bộ (không commit) và vào bước khởi động máy chủ trong `.github/workflows/ci.yml` (biến môi trường cạnh `NODE_ENV=production`). `.env.example` thêm:

```
# Dịch máy cho trang quản trị (Anthropic). Để trống thì nút dịch báo "chưa cấu hình".
ANTHROPIC_API_KEY=
# Chỉ dùng cho kiểm thử tự động: TRANSLATION_PROVIDER=mock
```

`.env.production.example` chỉ thêm hai dòng đầu.

- [ ] **Step 7: Chạy kiểm thử**

Run: `npm run typecheck && npm run build && (khởi động lại máy chủ) && npx playwright test tests/translate.spec.ts --project=desktop && npm test`
Expected: PASS toàn bộ.

- [ ] **Step 8: Commit**

```bash
git add -A src tests .env.example .env.production.example .github/workflows/ci.yml
git commit -m "Endpoint dich may cho ban ghi va global, han muc va cong cau hinh"
```

---

### Task 9: Bảng "Bản dịch" và nút dịch global trong trang quản trị

**Files:**
- Create: `src/components/admin/translation-panel.tsx`, `src/components/admin/translate-global-button.tsx`
- Modify: `src/payload.config.ts` (ô `ui` ở `contentCollections` và ở hai global), `src/app/(payload)/admin/importMap.js` (sinh)
- Test: `tests/translate.spec.ts`

**Interfaces:**
- Consumes: `POST /api/translate` (Task 8); REST `GET /api/<collection>?where[translationKey][equals]=…&draft=true&depth=0`.
- Produces: component `TranslationPanel` (ô `translations`, sidebar) và `TranslateGlobalButton` (ô `translateTools`).

- [ ] **Step 1: Kiểm thử giao diện (thêm vào `tests/translate.spec.ts`)**

```ts
test("the translation panel lists three languages and offers AI translation", async ({
  page,
  request,
}) => {
  const auth = { Authorization: "JWT " + (await adminToken(request)) };
  const key = "qa-panel-" + randomUUID();
  const created = await request.post("/api/services?draft=true", {
    headers: auth,
    data: { title: "QA bảng bản dịch", slug: key, translationKey: key, language: "vi", summary: "QA", _status: "draft" },
  });
  const id = (await created.json()).doc.id;
  try {
    const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
    await page.goto("/admin/login");
    await page.locator('input[name="email"]').fill("admin@local.invalid");
    await page.locator('input[name="password"]').fill(credentials.match(/Password: (.+)/)![1].trim());
    await page.locator('button[type="submit"]').click();
    await page.goto(`/admin/collections/services/${id}`);
    const panel = page.locator(".translation-panel");
    await expect(panel).toBeVisible();
    await expect(panel.locator("li")).toHaveCount(3);
    await expect(panel.locator("li", { hasText: "EN" })).toContainText("chưa có");
    await expect(panel.getByRole("button", { name: "Dịch bằng AI sang EN" })).toBeVisible();
  } finally {
    await request.delete("/api/services/" + id, { headers: auth });
  }
});
```

- [ ] **Step 2: Chạy để thấy thất bại**

Run: `npx playwright test tests/translate.spec.ts --project=desktop -g "translation panel"`
Expected: FAIL.

- [ ] **Step 3: `translation-panel.tsx`**

```tsx
"use client";
import { useCallback, useEffect, useState } from "react";
import { Button, toast, useDocumentInfo, useFormFields } from "@payloadcms/ui";

const LANGS = [
  ["vi", "VI", "Tiếng Việt"],
  ["en", "EN", "English"],
  ["zh", "ZH", "简体中文"],
] as const;
type Row = { id: number | string; _status?: string; machineTranslated?: boolean; language: string };

export function TranslationPanel() {
  const { id, collectionSlug } = useDocumentInfo();
  const language = useFormFields(([fields]) => fields.language?.value as string | undefined);
  const translationKey = useFormFields(([fields]) => fields.translationKey?.value as string | undefined);
  const [rows, setRows] = useState<Row[]>([]);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!collectionSlug || !translationKey) return;
    const res = await fetch(
      `/api/${collectionSlug}?where[translationKey][equals]=${encodeURIComponent(translationKey)}&draft=true&depth=0&limit=10`,
      { credentials: "include" },
    );
    if (res.ok) setRows((await res.json()).docs);
  }, [collectionSlug, translationKey]);
  useEffect(() => {
    void load();
  }, [load]);

  async function translate(target: "en" | "zh", force = false) {
    setBusy(target);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "document", collection: collectionSlug, id, targets: [target], force }),
      });
      const body = await res.json();
      if (res.status === 409) {
        if (window.confirm(`Bản ${target.toUpperCase()} đã được người sửa tay. Ghi đè bằng bản dịch máy? Có thể khôi phục từ lịch sử phiên bản.`))
          return translate(target, true);
        return;
      }
      if (!res.ok) throw new Error(body.error || "Dịch không thành công.");
      toast.success(`Đã tạo bản nháp ${target.toUpperCase()}, mở để rà soát.`);
      await load();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusy(null);
    }
  }

  async function markReviewed(row: Row) {
    const res = await fetch(`/api/${collectionSlug}/${row.id}?draft=true`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ machineTranslated: false, _status: row._status === "published" ? "published" : "draft" }),
    });
    if (res.ok) {
      toast.success("Đã ghi nhận rà soát. Tải lại trang để thấy cờ tắt.");
      await load();
    } else toast.error("Không ghi nhận được.");
  }

  const current = rows.find((r) => String(r.id) === String(id));
  return (
    <div className="translation-panel" style={{ marginBottom: 24 }}>
      <h4 style={{ margin: "0 0 8px" }}>Bản dịch</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
        {LANGS.map(([code, short, name]) => {
          const row = rows.find((r) => r.language === code);
          const isCurrent = row && String(row.id) === String(id);
          const status = !row ? "chưa có" : row._status === "published" ? "đã xuất bản" : "nháp";
          return (
            <li key={code} style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: isCurrent ? 600 : 400 }}>
              <span style={{ width: 28 }}>{short}</span>
              <span title={name}>{status}</span>
              {row?.machineTranslated && <span style={{ color: "#b3202c" }}>bản dịch máy, chưa duyệt</span>}
              {row && !isCurrent && <a href={`/admin/collections/${collectionSlug}/${row.id}`}>Mở</a>}
              {row && row.machineTranslated && (isCurrent || true) && (
                <Button size="small" buttonStyle="secondary" onClick={() => markReviewed(row)}>
                  Đã rà soát bản dịch
                </Button>
              )}
            </li>
          );
        })}
      </ul>
      {language === "vi" && id && (
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          {(["en", "zh"] as const).map((target) => (
            <Button key={target} size="small" disabled={busy !== null} onClick={() => translate(target)}>
              {busy === target ? "Đang dịch…" : `Dịch bằng AI sang ${target.toUpperCase()}`}
            </Button>
          ))}
        </div>
      )}
      {language !== "vi" && current?.machineTranslated && (
        <p style={{ fontSize: 12, marginTop: 8 }}>Đọc lướt bản dịch, sửa nếu cần, rồi bấm "Đã rà soát bản dịch" để được xuất bản.</p>
      )}
    </div>
  );
}
```

- [ ] **Step 4: `translate-global-button.tsx`**

```tsx
"use client";
import { useState } from "react";
import { Button, toast, useDocumentInfo } from "@payloadcms/ui";

export function TranslateGlobalButton() {
  const { globalSlug } = useDocumentInfo();
  const [busy, setBusy] = useState<string | null>(null);
  async function run(target: "en" | "zh") {
    setBusy(target);
    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "global", slug: globalSlug, targets: [target] }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Dịch không thành công.");
      toast.success(`Đã dịch ${body.results[0].fields} ô sang ${target.toUpperCase()}. Chuyển ngôn ngữ ở góc trên để rà soát.`);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusy(null);
    }
  }
  return (
    <div style={{ display: "flex", gap: 8, margin: "8px 0 16px" }}>
      {(["en", "zh"] as const).map((t) => (
        <Button key={t} size="small" disabled={busy !== null} onClick={() => run(t)}>
          {busy === t ? "Đang dịch…" : `Dịch từ tiếng Việt sang ${t.toUpperCase()}`}
        </Button>
      ))}
    </div>
  );
}
```

- [ ] **Step 5: Đăng ký ô `ui`**

Trong `contentCollections.fields`, sau `reviewedAt`:

```ts
      {
        name: "translations",
        type: "ui",
        admin: {
          position: "sidebar",
          components: { Field: "/components/admin/translation-panel#TranslationPanel" },
        },
      },
```

Trong `SiteLayout.fields` (trước `tabs`) và `site-settings.fields` (đầu):

```ts
    {
      name: "translateTools",
      type: "ui",
      admin: { components: { Field: "/components/admin/translate-global-button#TranslateGlobalButton" } },
    },
```

Run: `npm run generate:importmap`.

- [ ] **Step 6: Chạy kiểm thử**

Run: `npm run typecheck && npm run build && (khởi động lại) && npx playwright test tests/translate.spec.ts --project=desktop`
Expected: PASS. Nếu `useFormFields` không tìm thấy `fields.language` (tên khóa khác), in `Object.keys(fields)` tạm thời để xác định rồi sửa.

- [ ] **Step 7: Commit**

```bash
git add -A src tests/translate.spec.ts
git commit -m "Bang Ban dich va nut dich may trong trang quan tri"
```

---

# ĐỢT 4 — Trang quản trị gọn hơn, tài liệu, kiểm tra phát hành

### Task 10: Lối tắt, nhóm Nâng cao, nút "Xem trên website", thứ tự nhóm

**Files:**
- Modify: `src/components/admin-dashboard.tsx`, `src/payload.config.ts`
- Test: `tests/admin-polish.spec.ts`

- [ ] **Step 1: Kiểm thử**

```ts
// tests/admin-polish.spec.ts
import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";

test("dashboard shortcuts, collapsed advanced group and preview button", async ({ page }) => {
  const credentials = await fs.readFile(".local/admin-access.txt", "utf8");
  await page.goto("/admin/login");
  await page.locator('input[name="email"]').fill("admin@local.invalid");
  await page.locator('input[name="password"]').fill(credentials.match(/Password: (.+)/)![1].trim());
  await page.locator('button[type="submit"]').click();
  for (const name of ["Viết bài mới", "Sửa trang chủ", "Thêm luật sư", "Sửa giao diện website", "Mở website"])
    await expect(page.getByRole("link", { name })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sửa giao diện website" })).toHaveAttribute("href", "/admin/globals/site-layout");

  await page.goto("/admin/collections/articles/create");
  const advanced = page.locator(".collapsible", { hasText: "Nâng cao" });
  await expect(advanced).toBeVisible();
  await expect(advanced.locator('input[name="translationKey"]')).toBeHidden();
  await expect(page.getByRole("link", { name: "Bảng điều khiển" })).toBeVisible();
});
```

- [ ] **Step 2: Chạy để thấy thất bại**

Run: `npx playwright test tests/admin-polish.spec.ts --project=desktop`
Expected: FAIL.

- [ ] **Step 3: Dashboard**

Trong `admin-dashboard.tsx`, thay khối `div` chứa liên kết bằng:

```tsx
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            ["/admin/collections/articles/create", "Viết bài mới"],
            ["/admin/collections/pages?where[slug][equals]=home&where[language][equals]=vi", "Sửa trang chủ"],
            ["/admin/collections/lawyers/create", "Thêm luật sư"],
            ["/admin/globals/site-layout", "Sửa giao diện website"],
            ...(allowed ? [["/admin/collections/consultation-requests", `Yêu cầu tư vấn mới (${count?.totalDocs ?? 0})`]] : []),
          ].map(([href, label]) => (
            <a key={href} href={href} style={{ padding: "10px 16px", background: "#fff", color: "#101D35", borderRadius: 4, textDecoration: "none", fontWeight: 600 }}>
              {label} →
            </a>
          ))}
          <a href="/vi" target="_blank" rel="noreferrer" style={{ padding: "10px 16px", border: "1px solid #fff", color: "#fff", borderRadius: 4, textDecoration: "none" }}>
            Mở website ↗
          </a>
        </div>
```

Đoạn hướng dẫn phía dưới thêm câu: "Đăng nhập rồi mở website: thanh quản trị ở đầu trang cho phép bật Chế độ sửa và nhảy thẳng tới mục cần sửa."

- [ ] **Step 4: Nhóm Nâng cao và `translationKey` tự sinh**

Trong `contentCollections.fields`: gom `text("slug", ...)`, `text("translationKey", ...)`, ô `keywords` và nhóm `seo` vào:

```ts
      {
        type: "collapsible",
        label: "Nâng cao (đường dẫn, mã liên kết bản dịch, từ khóa, SEO)",
        admin: { initCollapsed: true },
        fields: [ /* slug, translationKey, keywords, seo — chuyển nguyên các định nghĩa hiện có vào đây */ ],
      },
```

`slug` và `translationKey` giữ `required: true`. Thêm hook vào `hooks.beforeValidate` của `contentCollections`:

```ts
      beforeValidate: [
        ({ data }) => {
          if (data && !data.translationKey && data.slug) data.translationKey = data.slug;
          return data;
        },
      ],
```

Giữ `indexes` không đổi (collapsible không có `name` nên không đổi lược đồ; không cần migration).

- [ ] **Step 5: Nút "Xem trên website"**

Trong `contentCollections.admin` thêm:

```ts
      preview: (doc) =>
        `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${doc.language || "vi"}/${slug === "pages" ? "" : slug + "/"}${slug === "pages" && doc.slug === "home" ? "" : doc.slug || ""}${doc._status === "published" ? "" : "?preview=true"}`,
```

(Payload hiện nút Preview cạnh Live Preview khi có `admin.preview`.)

- [ ] **Step 6: Thứ tự nhóm**

Trong `collections: [...]` đặt `...contentCollections, Media` trước, rồi `Requests, Outbox`, rồi `Users` và `redirects`. `admin.user: "users"` không phụ thuộc thứ tự.

- [ ] **Step 7: Chạy kiểm thử cả bộ**

Run: `npm run generate:importmap && npm run typecheck && npm run build && npm test`
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add -A src tests/admin-polish.spec.ts
git commit -m "Trang quan tri: loi tat, nhom Nang cao, nut Xem tren website"
```

---

### Task 11: Kiểm tra phát hành, môi trường, tài liệu, nhật ký nghiệm thu

**Files:**
- Modify: `scripts/release-check.ts`, `src/lib/release-environment.ts`, `docs/ADMIN.vi.md`, `docs/DEPLOY-HOSTING-CPANEL.md`, `docs/ACCEPTANCE.md`, `docs/DEPENDENCIES.md` (qua `node scripts/license-report.mjs`)

- [ ] **Step 1: Cảnh báo bản dịch máy trong `release-check.ts`**

Trong vòng lặp `for (const doc of docs ...)` sau kiểm tra `seo.description`, thêm:

```ts
    if (doc.machineTranslated)
      warnings.push(`Machine translation not reviewed: ${at}`);
```

Và ở đầu, cạnh cảnh báo `TRUST_PROXY_HEADERS`:

```ts
if (!process.env.ANTHROPIC_API_KEY)
  warnings.push("Machine translation disabled: set ANTHROPIC_API_KEY to enable the translate buttons.");
```

`release-environment.ts` không đổi (thiếu khóa không chặn).

- [ ] **Step 2: Tài liệu**

`docs/ADMIN.vi.md` thêm ba mục:

```markdown
## Sửa ngay trên website

Đăng nhập /admin rồi mở website: đầu trang có thanh quản trị. Bấm **Bật chế độ
sửa** — rê chuột lên vùng nào cũng thấy nút "✎ Sửa …", bấm là mở đúng mục đó
với khung xem trước bên cạnh. **Sửa trang này** mở bản ghi của trang đang xem.
Khách truy cập không thấy gì trong số này.

## Giao diện website

Mục **Giao diện website** gồm bốn tab: Đầu trang (menu, nút đặt lịch), Trang
chủ (mọi chữ ở trang chủ), Chân trang, Liên hệ và mạng xã hội. Mỗi ô có ba
ngôn ngữ — chọn VI / EN / ZH ở góc trên bên phải. Ô để trống dùng bản tiếng
Việt. Lưu là có hiệu lực ngay, không qua bản nháp.

## Dịch máy và duyệt

Trên bản ghi tiếng Việt, cột phải có bảng **Bản dịch** với nút *Dịch bằng AI
sang EN / ZH*. Bản dịch được tạo dưới dạng nháp và gắn cờ "Bản dịch máy, chưa
duyệt"; hệ thống **không cho xuất bản** tới khi có người mở bản đó, đọc, sửa
nếu cần và bấm **Đã rà soát bản dịch**. Với Giao diện website và Cài đặt, nút
*Dịch từ tiếng Việt* điền thẳng vào tab EN/ZH để rà soát rồi Lưu. Cần khai
`ANTHROPIC_API_KEY` trong `.env`; mỗi người tối đa 20 lượt dịch một giờ.
```

`docs/DEPLOY-HOSTING-CPANEL.md` Bước 3 (biến môi trường): thêm dòng `ANTHROPIC_API_KEY` với ghi chú "không bắt buộc; thiếu thì nút dịch báo chưa cấu hình". Mục "Cập nhật website về sau": vì `package.json` đổi `dependencies`, lần cập nhật này **phải** tải lại `hosting-node-modules.tar.gz` (lệnh đã có sẵn trong tài liệu).

`docs/ACCEPTANCE.md` thêm mục "Sửa tại chỗ, Giao diện website, dịch máy có duyệt — 14/09/2026" tóm tắt bốn đợt, số kiểm thử mới, và hai giới hạn: dịch máy cần khóa API; Giao diện website không có bản nháp.

Run: `node scripts/license-report.mjs` để cập nhật `docs/DEPENDENCIES.md` (kiểm tra dòng `@anthropic-ai/sdk` là MIT).

- [ ] **Step 3: Chạy toàn bộ**

Run: `npm run typecheck && npm run build && npm test && npm run release:check`
Expected: kiểm thử PASS; release:check hiện cảnh báo về dịch máy chưa cấu hình (không chặn thêm mục mới).

- [ ] **Step 4: Commit**

```bash
git add -A scripts docs src/lib/release-environment.ts
git commit -m "Kiem tra phat hanh, tai lieu quan tri va trien khai cho sua tai cho va dich may"
```

---

### Task 12: Triển khai lên hosting

**Files:** không đổi mã.

- [ ] **Step 1:** `git push origin main`.
- [ ] **Step 2:** GitHub Actions → "Gói bản dựng cho hosting" → Run workflow với `demo_mode=true`, `launch_approved=false` (giữ như hiện tại). Chờ xanh.
- [ ] **Step 3:** cPanel → Setup Node.js App → **Stop App** (hạn mức tiến trình).
- [ ] **Step 4:** Terminal:

```bash
source ~/nodevenv/luatvukhang/*/bin/activate && cd ~/luatvukhang && git pull && git log --oneline -1
rm -rf .next && curl -fL -o ~/hb.tar.gz https://github.com/Harry-Kien/luatvukhang/releases/latest/download/hosting-build.tar.gz && tar -xzf ~/hb.tar.gz -C ~/luatvukhang && rm -f ~/hb.tar.gz && cat .next/BUILD_ID
curl -fL -o ~/nm.tar.gz https://github.com/Harry-Kien/luatvukhang/releases/latest/download/hosting-node-modules.tar.gz && tar -xzf ~/nm.tar.gz -C ~/nodevenv/luatvukhang/22/lib && rm -f ~/nm.tar.gz
node scripts/hosting-setup.mjs --skip-install --skip-build
```

(`hosting-setup` chạy migration và `prepare-site-layout.ts`.) Thêm `ANTHROPIC_API_KEY=` vào `.env` trên hosting khi công ty có khóa.

- [ ] **Step 5:** **Start App**, rồi kiểm chứng: `curl -sI https://luatvukhang.com/api/health/ready | head -1` → 200; đăng nhập `/admin`, mở website, thấy thanh quản trị; mở Giao diện website, đổi khẩu hiệu, Lưu, thấy đổi ở footer.

---

## Tự kiểm tra kế hoạch

- **Phủ spec:** Phần 1 → Task 1–3; Phần 2 → Task 4–5; Phần 3a → Task 4 (localization, `address`), 3b → Task 9, 3c → Task 7–8, 3d → Task 6; Phần 4 → Task 3 (autosave 700 ms) và livePreview của `site-layout` (Task 4); Phần 5 → Task 10 (ngôn ngữ admin mặc định tiếng Việt đã có sẵn qua `i18n.fallbackLanguage: "vi"`, không cần việc thêm); Phần 6 → kiểm thử trong từng task, Task 11–12.
- **Nhất quán tên:** `getEditor`/`isEditMode`/`EDIT_COOKIE` (Task 1) dùng ở Task 2–3; `SITE_LAYOUT_DEFAULTS`/`SiteLayoutData` (Task 4) dùng ở Task 5, 8; `navigationFrom`/`NavItem` (Task 5) dùng ở shell và sitemap; `translateStrings`/`collectTexts`/`replaceTexts`/`TranslationUnavailable`/`TranslationTooLarge`/`translationProvider` (Task 7) dùng ở Task 8; `overLimit` (Task 8) dùng ở route tư vấn; `machineTranslated`/`reviewedBy`/`reviewedAt` (Task 6) dùng ở Task 8–9, 11.
- **Điểm cần xác minh khi làm (đã ghi tại chỗ):** tên tham số structured output của SDK (Task 7 bước 7); khóa `fields.language` trong `useFormFields` (Task 9 bước 6); tên hàm tạo bảng hạn mức (Task 8 bước 4); migration `address` chuyển sang localized (Task 4 bước 3).
