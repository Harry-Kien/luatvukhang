import type { Field, GlobalConfig } from "payload";
import { editorial } from "./access";
import type { Locale } from "../lib/locales";
import { chinese } from "../lib/zh";

const localized = (name: string, label: string, textarea = false): Field =>
  ({
    name,
    label,
    type: textarea ? "textarea" : "text",
    localized: true,
  }) as Field;
const hrefValidate = (value: unknown) =>
  !value || /^(\/|https:\/\/)/.test(String(value))
    ? true
    : "Đường dẫn nội bộ bắt đầu bằng /, liên kết ngoài bắt đầu bằng https://";
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
      validate: hrefValidate,
    },
  ],
});

export type LinkData = { label?: string | null; href?: string | null };
export type MenuItem = {
  label?: string | null;
  href?: string | null;
  visible?: boolean | null;
};
export type SiteLayoutData = {
  header: {
    tagline?: string | null;
    menu?: MenuItem[];
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
    expertiseText:
      "Tìm hiểu phạm vi hỗ trợ theo từng vấn đề bạn đang quan tâm.",
    expertiseLink: { label: "Tất cả chuyên môn", href: "/services" },
    startKicker: "Cách bắt đầu",
    startTitle: "Rõ ràng từ\ncuộc trao đổi đầu tiên.",
    startText:
      "Một hành trình có trọng tâm, từ việc hiểu nhu cầu đến thống nhất bước tiếp theo.",
    startCta: { label: "Bắt đầu trao đổi", href: "/consultation" },
    steps: [
      {
        title: "Lắng nghe bối cảnh",
        text: "Chia sẻ vấn đề, mục tiêu và thời hạn bạn đang cân nhắc.",
      },
      {
        title: "Làm rõ phạm vi",
        text: "Trao đổi về hồ sơ cần thiết, phạm vi hỗ trợ và điều kiện dịch vụ.",
      },
      {
        title: "Thống nhất bước tiếp theo",
        text: "Lịch hẹn và công việc được xác nhận sau khi hai bên trao đổi.",
      },
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
    expertiseText:
      "Explore the scope of support for the issues that matter to you.",
    expertiseLink: { label: "All expertise", href: "/services" },
    startKicker: "Getting started",
    startTitle: "Clarity from the\nfirst conversation.",
    startText:
      "A focused journey, from understanding your needs to agreeing on the next step.",
    startCta: { label: "Start a conversation", href: "/consultation" },
    steps: [
      {
        title: "Understand the context",
        text: "Share your matter, objectives and the timeline you have in mind.",
      },
      {
        title: "Clarify the scope",
        text: "Discuss relevant documents, the scope of support and engagement terms.",
      },
      {
        title: "Agree on next steps",
        text: "Appointments and work are confirmed following discussion.",
      },
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

const site = () => process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const SiteLayout: GlobalConfig = {
  slug: "site-layout",
  label: "Giao diện website",
  admin: {
    group: "Nội dung website",
    description:
      "Menu, trang chủ, chân trang và liên hệ. Mỗi ô có ba ngôn ngữ — chọn ngôn ngữ ở góc trên bên phải. Ô để trống sẽ dùng bản tiếng Việt.",
    livePreview: {
      url: ({ locale }) => `${site()}/${locale?.code || "vi"}`,
    },
    preview: (_doc, { locale }) => `${site()}/${locale || "vi"}`,
  },
  access: { read: () => true, update: editorial },
  fields: [
    {
      name: "translateTools",
      type: "ui",
      admin: {
        components: {
          Field:
            "/components/admin/translate-global-button#TranslateGlobalButton",
        },
      },
    },
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
                {
                  name: "visible",
                  label: "Hiển thị",
                  type: "checkbox",
                  defaultValue: true,
                },
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
            localized(
              "heroTitle",
              "Tiêu đề lớn (mỗi dòng xuống hàng một lần)",
              true,
            ),
            localized("heroSummary", "Đoạn mở đầu", true),
            link("heroPrimary", "Nút chính"),
            link("heroSecondary", "Nút phụ"),
            localized("discoverTitle", "Nhãn dải khám phá"),
            {
              name: "discoverCards",
              label: "Ba thẻ khám phá",
              type: "array",
              maxRows: 3,
              fields: [
                localized("title", "Tiêu đề"),
                {
                  name: "href",
                  label: "Đường dẫn",
                  type: "text",
                  validate: hrefValidate,
                },
              ],
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
              fields: [
                localized("title", "Tên bước"),
                localized("text", "Mô tả", true),
              ],
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
              fields: [
                localized("label", "Nhãn"),
                {
                  name: "href",
                  label: "Đường dẫn",
                  type: "text",
                  required: true,
                  validate: hrefValidate,
                },
              ],
            },
            localized("copyright", "Dòng bản quyền (sau năm)"),
          ],
        },
        {
          name: "contact",
          label: "Liên hệ và mạng xã hội",
          fields: [
            { name: "zalo", label: "Zalo (số hoặc liên kết)", type: "text" },
            {
              name: "facebook",
              label: "Facebook",
              type: "text",
              validate: hrefValidate,
            },
            {
              name: "linkedin",
              label: "LinkedIn",
              type: "text",
              validate: hrefValidate,
            },
            {
              name: "youtube",
              label: "YouTube",
              type: "text",
              validate: hrefValidate,
            },
            localized("hours", "Giờ làm việc", true),
            {
              name: "mapUrl",
              label: "Liên kết Google Maps",
              type: "text",
              validate: hrefValidate,
            },
            {
              name: "mapEmbed",
              label:
                "Địa chỉ nhúng bản đồ (https://www.google.com/maps/embed?...)",
              type: "text",
              validate: (value: unknown) =>
                !value ||
                String(value).startsWith("https://www.google.com/maps/embed?")
                  ? true
                  : "Chỉ nhận địa chỉ nhúng của Google Maps.",
            },
          ],
        },
      ],
    },
  ],
};
