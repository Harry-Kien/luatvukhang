"use client";
import { useCallback, useEffect, useState } from "react";
import { Button, toast, useDocumentInfo, useFormFields } from "@payloadcms/ui";

const LANGS = [
  ["vi", "VI", "Tiếng Việt"],
  ["en", "EN", "English"],
  ["zh", "ZH", "简体中文"],
] as const;
type Row = {
  id: number | string;
  _status?: string;
  machineTranslated?: boolean;
  language: string;
};

/**
 * Bảng "Bản dịch" ở cột phải: trạng thái ba ngôn ngữ của cùng một nội dung,
 * nút dịch bằng AI (chỉ từ bản tiếng Việt) và nút ghi nhận đã rà soát.
 */
export function TranslationPanel() {
  const { id, collectionSlug } = useDocumentInfo();
  const language = useFormFields(
    ([fields]) => fields.language?.value as string | undefined,
  );
  const translationKey = useFormFields(
    ([fields]) => fields.translationKey?.value as string | undefined,
  );
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
        body: JSON.stringify({
          kind: "document",
          collection: collectionSlug,
          id,
          targets: [target],
          force,
        }),
      });
      const body = await res.json();
      if (res.status === 409) {
        if (
          window.confirm(
            `Bản ${target.toUpperCase()} đã được người sửa tay. Ghi đè bằng bản dịch máy? Có thể khôi phục từ lịch sử phiên bản.`,
          )
        ) {
          setBusy(null);
          return translate(target, true);
        }
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
      body: JSON.stringify({
        machineTranslated: false,
        _status: row._status === "published" ? "published" : "draft",
      }),
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
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "grid",
          gap: 6,
        }}
      >
        {LANGS.map(([code, short, name]) => {
          const row = rows.find((r) => r.language === code);
          const isCurrent = row && String(row.id) === String(id);
          const status = !row
            ? "chưa có"
            : row._status === "published"
              ? "đã xuất bản"
              : "nháp";
          return (
            <li
              key={code}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                flexWrap: "wrap",
                fontWeight: isCurrent ? 600 : 400,
              }}
            >
              <span style={{ width: 28 }}>{short}</span>
              <span title={name}>{status}</span>
              {row?.machineTranslated && (
                <span style={{ color: "#b3202c" }}>
                  bản dịch máy, chưa duyệt
                </span>
              )}
              {row && !isCurrent && (
                <a href={`/admin/collections/${collectionSlug}/${row.id}`}>
                  Mở
                </a>
              )}
              {row?.machineTranslated && (
                <Button
                  size="small"
                  buttonStyle="secondary"
                  onClick={() => markReviewed(row)}
                >
                  Đã rà soát bản dịch
                </Button>
              )}
            </li>
          );
        })}
      </ul>
      {language === "vi" && id && (
        <div
          style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}
        >
          {(["en", "zh"] as const).map((target) => (
            <Button
              key={target}
              size="small"
              disabled={busy !== null}
              onClick={() => translate(target)}
            >
              {busy === target
                ? "Đang dịch…"
                : `Dịch bằng AI sang ${target.toUpperCase()}`}
            </Button>
          ))}
        </div>
      )}
      {language !== "vi" && current?.machineTranslated && (
        <p style={{ fontSize: 12, marginTop: 8 }}>
          Đọc lướt bản dịch, sửa nếu cần, rồi bấm "Đã rà soát bản dịch" để được
          xuất bản.
        </p>
      )}
    </div>
  );
}
