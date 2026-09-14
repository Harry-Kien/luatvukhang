"use client";
import { useState } from "react";
import { Button, toast, useDocumentInfo } from "@payloadcms/ui";

/** Nút dịch các ô đa ngôn ngữ của một global từ bản tiếng Việt sang EN/ZH. */
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
        body: JSON.stringify({
          kind: "global",
          slug: globalSlug,
          targets: [target],
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Dịch không thành công.");
      toast.success(
        `Đã dịch ${body.results[0].fields} ô sang ${target.toUpperCase()}. Chuyển ngôn ngữ ở góc trên để rà soát.`,
      );
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusy(null);
    }
  }
  return (
    <div style={{ display: "flex", gap: 8, margin: "8px 0 16px" }}>
      {(["en", "zh"] as const).map((t) => (
        <Button
          key={t}
          size="small"
          disabled={busy !== null}
          onClick={() => run(t)}
        >
          {busy === t
            ? "Đang dịch…"
            : `Dịch từ tiếng Việt sang ${t.toUpperCase()}`}
        </Button>
      ))}
    </div>
  );
}
