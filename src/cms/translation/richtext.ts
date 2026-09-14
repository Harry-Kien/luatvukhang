type Node = {
  type?: string;
  text?: string;
  children?: Node[];
  [key: string]: unknown;
};

function walk(node: unknown, visit: (n: Node) => void) {
  if (!node || typeof node !== "object") return;
  const n = node as Node;
  if (n.type === "text" && typeof n.text === "string" && n.text.length)
    visit(n);
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
