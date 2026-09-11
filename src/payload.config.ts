import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig, type CollectionConfig, type Field } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vi } from "@payloadcms/translations/languages/vi";
import { en } from "@payloadcms/translations/languages/en";
import sharp from "sharp";
import { trackSlugChange } from "./cms/redirect-hook";
import { emailAdapter } from "./cms/email";
import {
  isAdmin,
  editorial,
  editorialField,
  reception,
  publicRead,
  publicationGuard,
  roleOf,
} from "./cms/access";
const dirname = path.dirname(fileURLToPath(import.meta.url));
const labels: Record<string, string> = {
  pages: "Chỉnh sửa website",
  services: "Dịch vụ",
  industries: "Ngành nghề",
  lawyers: "Đội ngũ",
  experience: "Kinh nghiệm",
  articles: "Bài viết",
  categories: "Danh mục",
  offices: "Văn phòng",
  recognitions: "Ghi nhận",
  careers: "Tuyển dụng",
};
const text = (name: string, label: string, required = false): Field => ({
  name,
  label,
  type: "text",
  required,
});
const relation = (
  name: string,
  label: string,
  to: string,
  many = true,
): Field =>
  ({
    name,
    label,
    type: "relationship",
    relationTo: to,
    hasMany: many,
  }) as Field;
const blocks: Field = {
  name: "blocks",
  label: "Các khối nội dung",
  type: "blocks",
  blocks: [
    {
      slug: "text",
      labels: { singular: "Khối văn bản", plural: "Khối văn bản" },
      fields: [
        {
          name: "visible",
          label: "Hiển thị",
          type: "checkbox",
          defaultValue: true,
        },
        text("heading", "Tiêu đề", true),
        { name: "body", label: "Nội dung", type: "richText" },
      ],
    },
    {
      slug: "image",
      labels: { singular: "Ảnh và chú thích", plural: "Ảnh và chú thích" },
      fields: [
        {
          name: "visible",
          label: "Hiển thị",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "image",
          label: "Ảnh",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        text("caption", "Chú thích"),
      ],
    },
    {
      slug: "callout",
      labels: { singular: "Điểm nhấn", plural: "Điểm nhấn" },
      fields: [
        {
          name: "visible",
          label: "Hiển thị",
          type: "checkbox",
          defaultValue: true,
        },
        text("heading", "Tiêu đề", true),
        { name: "body", label: "Nội dung", type: "textarea" },
      ],
    },
  ],
};
const contentCollections: CollectionConfig[] = Object.entries(labels).map(
  ([slug, label]) => ({
    slug,
    labels: { singular: label, plural: label },
    admin: {
      useAsTitle: "title",
      group: "Nội dung website",
      defaultColumns: ["title", "language", "reviewState", "_status"],
      description:
        "Mỗi bản ngôn ngữ có quy trình duyệt và xuất bản riêng. Dùng cùng mã liên kết bản dịch và đường dẫn cho hai ngôn ngữ.",
      livePreview: {
        url: ({ data }) =>
          `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/${data.language || "vi"}/${slug === "pages" ? "" : slug + "/"}${slug === "pages" && data.slug === "home" ? "" : data.slug || ""}?preview=true`,
      },
    },
    access: {
      read: publicRead,
      create: editorial,
      update: editorial,
      delete: isAdmin,
      readVersions: editorial,
    },
    versions: { drafts: { autosave: { interval: 1500 } }, maxPerDoc: 50 },
    lockDocuments: { duration: 300 },
    hooks: { beforeChange: [publicationGuard], afterChange: [trackSlugChange] },
    fields: [
      text("title", slug === "lawyers" ? "Họ và tên" : "Tiêu đề", true),
      text("slug", "Đường dẫn (chữ thường, không dấu)", true),
      {
        name: "language",
        label: "Ngôn ngữ",
        type: "select",
        required: true,
        defaultValue: "vi",
        options: [
          { label: "Tiếng Việt", value: "vi" },
          { label: "English", value: "en" },
          { label: "简体中文", value: "zh" },
        ],
      },
      text("translationKey", "Mã liên kết bản dịch", true),
      {
        name: "reviewState",
        label: "Duyệt chuyên môn",
        type: "select",
        defaultValue: "working",
        options: [
          { label: "Đang biên tập", value: "working" },
          { label: "Chờ duyệt", value: "pending" },
          { label: "Đã duyệt", value: "approved" },
        ],
      },
      {
        name: "isSample",
        label: "Nội dung minh họa (không được xuất bản)",
        type: "checkbox",
        defaultValue: false,
      },
      { name: "summary", label: "Tóm tắt", type: "textarea", required: true },
      {
        name: "keywords",
        label: "Từ khóa khách hàng thường gõ",
        type: "textarea",
        admin: {
          description:
            "Cách nói thường ngày của khách, ngăn cách bằng dấu phẩy — ví dụ: sa thải, nghỉ việc, sổ đỏ, kiện ra tòa. Chỉ dùng cho ô tìm kiếm trong website, không hiển thị ra ngoài và không gửi cho công cụ tìm kiếm. Khách hiếm khi gõ đúng tên chính thức của lĩnh vực, nên đây là chỗ bắc cầu giữa cách họ hỏi và cách nội dung được viết.",
        },
      },
      { name: "body", label: "Nội dung chi tiết", type: "richText" },
      blocks,
      ...(slug === "pages"
        ? [
            {
              name: "banner",
              label: "Banner — ảnh nhân sự / thương hiệu",
              type: "group",
              admin: {
                description:
                  "Dùng trang có đường dẫn home để thay banner trang chủ. Ảnh di động có thể để trống để dùng chung ảnh desktop. Tọa độ 0–100%; 50% là giữa ảnh. Xem trước cả hai màn hình trước khi xuất bản.",
              },
              fields: [
                {
                  name: "desktopImage",
                  label: "Ảnh máy tính",
                  type: "upload",
                  relationTo: "media",
                },
                {
                  name: "mobileImage",
                  label: "Ảnh điện thoại (tùy chọn)",
                  type: "upload",
                  relationTo: "media",
                },
                ...["desktop", "mobile"].flatMap((device) =>
                  ["X", "Y"].map((axis) => ({
                    name: device + axis,
                    label:
                      (device === "desktop" ? "Máy tính" : "Điện thoại") +
                      " — điểm lấy nét " +
                      axis +
                      " (%)",
                    type: "number",
                    min: 0,
                    max: 100,
                    defaultValue: 50,
                  })),
                ),
                {
                  name: "fit",
                  label: "Cách hiển thị",
                  type: "select",
                  defaultValue: "cover",
                  options: [
                    { label: "Lấp đầy khung (có cắt ảnh)", value: "cover" },
                    { label: "Hiện toàn bộ ảnh", value: "contain" },
                  ],
                },
                {
                  name: "shade",
                  label: "Độ phủ tối (0–60%)",
                  type: "number",
                  min: 0,
                  max: 60,
                  defaultValue: 15,
                },
                {
                  name: "caption",
                  label: "Chú thích ảnh (không bắt buộc)",
                  type: "text",
                },
              ],
            } as Field,
          ]
        : []),
      ...(["services", "industries"].includes(slug)
        ? ([
            {
              name: "audience",
              label: "Đối tượng / tình huống phù hợp",
              type: "textarea",
            },
            {
              name: "process",
              label: "Quy trình hỗ trợ",
              type: "array",
              fields: [
                text("heading", "Tên bước", true),
                {
                  name: "description",
                  label: "Mô tả",
                  type: "textarea",
                  required: true,
                },
              ],
            },
            {
              name: "faq",
              label: "Câu hỏi thường gặp — cần duyệt chuyên môn",
              type: "array",
              fields: [
                text("question", "Câu hỏi", true),
                {
                  name: "answer",
                  label: "Trả lời",
                  type: "textarea",
                  required: true,
                },
              ],
            },
          ] as Field[])
        : []),
      ...(slug === "careers"
        ? ([
            text("location", "Nơi làm việc"),
            { name: "closingDate", label: "Hạn ứng tuyển", type: "date" },
            {
              name: "applicationEmail",
              label: "Email ứng tuyển",
              type: "email",
            },
          ] as Field[])
        : []),
      ...(slug === "services"
        ? [
            {
              name: "scope",
              label: "Phạm vi hỗ trợ",
              type: "array",
              fields: [text("item", "Nội dung", true)],
            } as Field,
            relation("lawyers", "Luật sư phụ trách", "lawyers"),
            relation("experience", "Kinh nghiệm liên quan", "experience"),
            relation("articles", "Bài liên quan", "articles"),
          ]
        : []),
      ...(slug === "lawyers"
        ? [
            text("position", "Chức danh", true),
            {
              name: "portrait",
              label: "Ảnh chân dung",
              type: "upload",
              relationTo: "media",
            } as Field,
            text("qualifications", "Thông tin nghề nghiệp đã xác minh"),
            text("languages", "Ngôn ngữ sử dụng"),
            relation("services", "Chuyên môn", "services"),
            relation("office", "Văn phòng", "offices", false),
          ]
        : []),
      ...(slug === "articles"
        ? [
            relation("author", "Tác giả", "lawyers", false),
            relation("categories", "Danh mục", "categories"),
            {
              name: "sources",
              label: "Nguồn tham khảo",
              type: "array",
              fields: [
                text("label", "Tên nguồn", true),
                text("url", "Đường dẫn nguồn", true),
              ],
            } as Field,
          ]
        : []),
      ...(slug === "experience"
        ? [
            {
              ...text("disclosureApproval", "Căn cứ được phép công bố", true),
              // Căn cứ nội bộ cho phép công bố một vụ việc. Không hiển thị ở
              // đâu trên website, nhưng REST API trả nguyên văn bản ghi đã xuất
              // bản, nên nếu không chặn ở mức trường thì ai cũng đọc được.
              access: { read: editorialField },
            } as Field,
            relation("services", "Chuyên môn", "services"),
          ]
        : []),
      {
        type: "group",
        name: "seo",
        label: "Hiển thị trên công cụ tìm kiếm",
        fields: [
          text("title", "Tiêu đề kết quả tìm kiếm"),
          { name: "description", label: "Mô tả ngắn", type: "textarea" },
        ],
      },
    ],
    indexes: [
      { fields: ["slug", "language"], unique: true },
      { fields: ["translationKey", "language"], unique: true },
    ],
  }),
);
const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "Tài khoản", plural: "Tài khoản" },
  auth: { maxLoginAttempts: 5, lockTime: 600000, tokenExpiration: 7200 },
  admin: { useAsTitle: "email", group: "Quản trị" },
  access: {
    unlock: isAdmin,
    create: isAdmin,
    read: ({ req }) =>
      roleOf(req.user) === "admin" ? true : { id: { equals: req.user?.id } },
    update: ({ req }) =>
      roleOf(req.user) === "admin" ? true : { id: { equals: req.user?.id } },
    delete: isAdmin,
  },
  fields: [
    text("name", "Họ và tên", true),
    {
      name: "role",
      label: "Vai trò",
      type: "select",
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      access: {
        create: ({ req }) => roleOf(req.user) === "admin",
        update: ({ req }) => roleOf(req.user) === "admin",
      },
      options: [
        { label: "Quản trị hệ thống", value: "admin" },
        { label: "Biên tập viên", value: "editor" },
        { label: "Người duyệt chuyên môn", value: "reviewer" },
        { label: "Người xuất bản", value: "publisher" },
        { label: "Nhân viên tiếp nhận", value: "reception" },
      ],
    },
  ],
};
const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Ảnh", plural: "Thư viện ảnh" },
  admin: { group: "Nội dung website" },
  access: {
    read: () => true,
    create: editorial,
    update: editorial,
    delete: isAdmin,
  },
  upload: {
    staticDir: path.resolve(dirname, "../media"),
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    imageSizes: [
      { name: "card", width: 800 },
      { name: "hero", width: 1600 },
    ],
  },
  fields: [
    text("alt", "Mô tả ảnh cho người không nhìn thấy ảnh", true),
    text("credit", "Tác giả / nguồn ảnh", true),
    text("rights", "Căn cứ quyền sử dụng", true),
  ],
};
const Requests: CollectionConfig = {
  slug: "consultation-requests",
  labels: { singular: "Yêu cầu tư vấn", plural: "Yêu cầu tư vấn" },
  admin: {
    useAsTitle: "reference",
    group: "Tiếp nhận",
    defaultColumns: ["reference", "name", "status", "createdAt"],
  },
  access: {
    read: reception,
    create: () => false,
    update: reception,
    delete: isAdmin,
  },
  fields: [
    { ...text("reference", "Mã yêu cầu", true), unique: true } as Field,
    {
      ...text("idempotencyKey", "Mã chống trùng", true),
      unique: true,
      admin: { hidden: true },
    } as Field,
    text("name", "Họ và tên", true),
    { name: "email", label: "Email", type: "email", required: true },
    text("phone", "Số điện thoại"),
    text("service", "Chuyên môn"),
    text("language", "Ngôn ngữ"),
    {
      name: "message",
      label: "Nội dung yêu cầu",
      type: "textarea",
      required: true,
    },
    {
      name: "consentAt",
      label: "Đồng ý xử lý thông tin lúc",
      type: "date",
      required: true,
    },
    {
      name: "status",
      label: "Trạng thái",
      type: "select",
      defaultValue: "received",
      options: [
        { label: "Đã nhận yêu cầu", value: "received" },
        { label: "Đang liên hệ", value: "contacting" },
        { label: "Đã xác nhận lịch", value: "confirmed" },
        { label: "Đã đóng", value: "closed" },
      ],
    },
    { name: "preferredDate", label: "Ngày mong muốn", type: "date" },
    {
      name: "confirmedAt",
      label: "Lịch đã xác nhận với khách hàng",
      type: "date",
    },
    { name: "internalNotes", label: "Ghi chú nội bộ", type: "textarea" },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.status === "confirmed" && !data.confirmedAt)
          throw new Error("Nhập thời gian đã xác nhận với khách hàng.");
        return data;
      },
    ],
  },
};
const Outbox: CollectionConfig = {
  slug: "notification-outbox",
  labels: { singular: "Thông báo cần gửi", plural: "Thông báo cần gửi" },
  admin: { group: "Tiếp nhận" },
  access: {
    read: reception,
    create: () => false,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    relation("request", "Yêu cầu", "consultation-requests", false),
    {
      name: "status",
      type: "select",
      label: "Trạng thái gửi",
      defaultValue: "pending",
      options: ["pending", "sent", "failed"],
    },
  ],
};
/**
 * Khóa bí mật ký phiên đăng nhập quản trị.
 *
 * Ở production phải dừng hẳn khi thiếu: giá trị dự phòng nằm công khai trong
 * kho mã, nên nếu biến môi trường bị mất hay gõ sai, ứng dụng vẫn khởi động
 * bình thường với một khóa ai cũng biết — đủ để người ngoài tự ký một phiên
 * quản trị và đọc toàn bộ yêu cầu tư vấn của khách. Hỏng lúc khởi động dễ phát
 * hiện hơn nhiều so với một website chạy êm mà không còn bảo vệ gì.
 */
function payloadSecret() {
  const secret = process.env.PAYLOAD_SECRET;
  // Không chặn lúc dựng bản build. Ảnh Docker và CI dựng mà không có bí mật —
  // đó là đúng, bí mật chỉ nên xuất hiện lúc chạy. Chặn ở đây sẽ làm hỏng việc
  // dựng ảnh thay vì bảo vệ được gì.
  const building = process.env.NEXT_PHASE === "phase-production-build";
  if (
    process.env.NODE_ENV === "production" &&
    !building &&
    (secret || "").length < 32
  )
    throw new Error(
      "PAYLOAD_SECRET phải có ít nhất 32 ký tự ngẫu nhiên ở môi trường production. " +
        "Sinh bằng: openssl rand -hex 32",
    );
  return secret || "development-only-set-a-real-secret-before-deployment";
}
export default buildConfig({
  email: emailAdapter,
  secret: payloadSecret(),
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  admin: {
    user: "users",
    importMap: { baseDir: path.resolve(dirname) },
    components: {
      beforeDashboard: ["/components/admin-dashboard#AdminDashboard"],
    },
    livePreview: {
      breakpoints: [
        { label: "Điện thoại", name: "mobile", width: 390, height: 844 },
        { label: "Máy tính", name: "desktop", width: 1440, height: 1000 },
      ],
    },
  },
  i18n: { supportedLanguages: { vi, en }, fallbackLanguage: "vi" },
  collections: [
    Users,
    ...contentCollections,
    Media,
    Requests,
    Outbox,
    {
      slug: "redirects",
      labels: { singular: "Chuyển hướng", plural: "Chuyển hướng" },
      admin: { group: "Quản trị" },
      access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
      fields: [
        { ...text("from", "Đường dẫn cũ", true), unique: true } as Field,
        text("to", "Đường dẫn mới", true),
      ],
      hooks: {
        beforeValidate: [
          ({ data }) => {
            for (const key of ["from", "to"])
              if (data?.[key] && !/^\/(vi|en|zh)\//.test(data[key]))
                throw new Error(
                  "Chỉ dùng đường dẫn nội bộ bắt đầu /vi/ hoặc /en/.",
                );
            if (data?.from === data?.to)
              throw new Error("Đường dẫn mới phải khác đường dẫn cũ.");
            return data;
          },
        ],
      },
    },
  ],
  globals: [
    {
      slug: "site-settings",
      label: "Cài đặt",
      access: { read: () => true, update: isAdmin },
      fields: [
        text("companyName", "Tên công ty chính thức"),
        text("englishName", "Tên tiếng Anh"),
        text("registration", "Thông tin đăng ký hoạt động"),
        text("phone", "Điện thoại"),
        { name: "email", label: "Email tiếp nhận", type: "email" },
        text("address", "Địa chỉ"),
        {
          name: "privacyApproved",
          label: "Chính sách quyền riêng tư đã được rà soát",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },
  ],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      max: 10,
      connectionString:
        process.env.DATABASE_URL || "postgresql://localhost:5434/law",
    },
    push: process.env.NODE_ENV !== "production",
  }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  upload: { limits: { fileSize: 8 * 1024 * 1024 } },
});
