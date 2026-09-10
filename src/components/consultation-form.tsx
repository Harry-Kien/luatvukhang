"use client";
import { officeDate } from "@/lib/appointment-date";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { t, type Locale } from "@/lib/content";
type Values = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  consent: boolean;
  preferredDate: string;
  website: string;
};
export function ConsultationForm({
  locale,
  service,
}: {
  locale: Locale;
  service: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    defaultValues: {
      service,
      name: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
      preferredDate: "",
      website: "",
    },
  });
  const [status, setStatus] = useState("");
  const [done, setDone] = useState(false);
  const key = useRef("");
  async function submit(values: Values) {
    setStatus("");
    if (!key.current) key.current = crypto.randomUUID();
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          language: locale,
          idempotencyKey: key.current,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setStatus(
          t(
            locale,
            data.error || "Chưa gửi được. Vui lòng thử lại.",
            "We could not submit your request. Please try again.",
          ),
        );
        return;
      }
      setDone(true);
      setStatus(
        locale === "zh"
          ? `已收到并保存申请 ${data.reference}。预约尚未确认。`
          : t(
              locale,
              "Đã nhận yêu cầu " +
                data.reference +
                ". Yêu cầu đã được lưu. Lịch hẹn chưa được xác nhận.",
              "Request " +
                data.reference +
                " received and saved. Your appointment is not yet confirmed.",
            ),
      );
    } catch {
      setStatus(
        t(
          locale,
          "Không kết nối được. Dữ liệu vẫn được giữ; vui lòng thử lại.",
          "Connection failed. Your entries are preserved; please try again.",
        ),
      );
    }
  }
  if (done)
    return (
      <div className="status" role="status">
        <h2>{t(locale, "Đã nhận yêu cầu", "Request received")}</h2>
        <p>{status}</p>
      </div>
    );
  const required = t(
    locale,
    "Vui lòng điền thông tin này.",
    "Please complete this field.",
  );
  return (
    <form className="form" noValidate onSubmit={handleSubmit(submit)}>
      <div className="field-grid">
        <div className="field">
          <label htmlFor="name">
            {t(locale, "Họ và tên *", "Full name *")}
          </label>
          <input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name", {
              required,
              minLength: {
                value: 2,
                message: t(
                  locale,
                  "Nhập ít nhất 2 ký tự.",
                  "Enter at least 2 characters.",
                ),
              },
              maxLength: 100,
            })}
          />
          {errors.name && (
            <p id="name-error" className="error">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">
            {locale === "zh" ? "电子邮箱 *" : "Email *"}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email", {
              required,
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t(
                  locale,
                  "Nhập email hợp lệ, ví dụ ten@congty.vn.",
                  "Enter a valid email, such as name@company.com.",
                ),
              },
            })}
          />
          {errors.email && (
            <p id="email-error" className="error">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div className="field-grid">
        <div className="field">
          <label htmlFor="phone">
            {t(locale, "Số điện thoại", "Phone number")}
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            {...register("phone", { maxLength: 25, pattern: /^[+\d\s().-]*$/ })}
          />
          {errors.phone && (
            <p className="error">
              {t(
                locale,
                "Chỉ nhập số và dấu +, -, ( ), dấu cách.",
                "Use digits, spaces and +, -, ( ).",
              )}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="preferredDate">
            {t(
              locale,
              "Ngày mong muốn (không bắt buộc)",
              "Preferred date (optional)",
            )}
          </label>
          <input
            id="preferredDate"
            type="date"
            min={officeDate()}
            {...register("preferredDate")}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="service">
          {t(locale, "Lĩnh vực cần trao đổi", "Area of interest")}
        </label>
        <input id="service" maxLength={160} {...register("service")} />
      </div>
      <div className="field">
        <label htmlFor="message">
          {t(locale, "Mô tả ngắn vấn đề *", "Briefly describe your matter *")}
        </label>
        <textarea
          id="message"
          maxLength={3000}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message ? "message-hint message-error" : "message-hint"
          }
          {...register("message", {
            required,
            minLength: {
              value: 15,
              message: t(
                locale,
                "Mô tả ít nhất 15 ký tự để chúng tôi hiểu nhu cầu.",
                "Please describe your matter in at least 15 characters.",
              ),
            },
          })}
        />
        <small id="message-hint">
          {t(
            locale,
            "15–3.000 ký tự. Không gửi nội dung mật.",
            "15–3,000 characters. Do not include confidential information.",
          )}
        </small>
        {errors.message && (
          <p id="message-error" className="error">
            {errors.message.message}
          </p>
        )}
      </div>
      <div className="trap" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>
      <p className="meta">
        <a href={`/${locale}/privacy`} target="_blank" rel="noreferrer">
          {t(
            locale,
            "Đọc chính sách quyền riêng tư",
            "Read the privacy notice",
          )}
        </a>
        {" · "}
        <a href={`/${locale}/terms`} target="_blank" rel="noreferrer">
          {t(locale, "Điều khoản sử dụng", "Terms of use")}
        </a>
      </p>
      <label className="check-label">
        <input type="checkbox" {...register("consent", { required })} />
        <span>
          {t(
            locale,
            "Tôi đồng ý để thông tin trên được sử dụng nhằm tiếp nhận và liên hệ về yêu cầu này. *",
            "I agree to the use of the information above to process and contact me about this request. *",
          )}
        </span>
      </label>
      {errors.consent && (
        <p className="error">
          {t(
            locale,
            "Cần sự đồng ý của bạn để tiếp nhận yêu cầu.",
            "Your consent is required to process this request.",
          )}
        </p>
      )}
      <button className="button red" disabled={isSubmitting}>
        {isSubmitting
          ? t(locale, "Đang gửi…", "Sending…")
          : t(locale, "Gửi yêu cầu tư vấn", "Send request")}{" "}
        ↗
      </button>
      <div aria-live="polite">
        {status && (
          <p className="status" role="alert">
            {status}
          </p>
        )}
      </div>
    </form>
  );
}
