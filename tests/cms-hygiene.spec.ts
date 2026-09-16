import { test, expect } from "@playwright/test";
import fs from "node:fs/promises";

const COLLECTIONS = [
  "pages",
  "services",
  "industries",
  "lawyers",
  "experience",
  "articles",
  "careers",
] as const;

/**
 * Bản nháp rỗng hoàn toàn không được nằm lại trong CMS.
 *
 * Payload tự lưu bản nháp sau 700ms, nên mỗi lần ai đó bấm "Tạo mới" rồi đổi ý
 * thoát ra là để lại một bản ghi không tiêu đề, không đường dẫn. Chúng không ra
 * tới website, nhưng dồn lại thì danh sách trong /admin toàn dòng trống và biên
 * tập viên không còn nhìn thấy nội dung thật của mình.
 */
test("không còn bản nháp rỗng nào trong CMS", async ({ request }) => {
  const password = (await fs.readFile(".local/admin-access.txt", "utf8"))
    .match(/Password: (.+)/)![1]
    .trim();
  const login = await request.post("/api/users/login", {
    data: { email: "admin@local.invalid", password },
  });
  const headers = { Authorization: "JWT " + (await login.json()).token };
  const empty: string[] = [];
  for (const collection of COLLECTIONS) {
    const response = await request.get(
      `/api/${collection}?draft=true&limit=300&depth=0`,
      { headers },
    );
    for (const doc of (await response.json()).docs as Record<string, any>[])
      if (!String(doc.title ?? "").trim() && !String(doc.slug ?? "").trim())
        empty.push(`${collection}#${doc.id}`);
  }
  expect(empty, "bản ghi không tiêu đề và không đường dẫn").toEqual([]);
});
