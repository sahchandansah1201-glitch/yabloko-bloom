// Статические текстовые версии, однократно извлечённые из оригиналов (pandoc/LibreOffice) при разработке.
// Хранятся как структурированные данные и выводятся React-компонентами с экранированием.
export type DocBlock =
  | { type: "heading"; level: number; text: string }
  | { type: "paragraph"; text: string; strong?: boolean }
  | { type: "list"; ordered: boolean; start?: number; items: string[] }
  | { type: "table"; rows: string[][] };

// doc-7 и doc-21 в источнике ссылаются на один и тот же файл — текст не дублируется.
const TEXT_ALIASES: Record<string, string> = { "doc-21": "doc-7" };

const loaders = import.meta.glob<DocBlock[]>("./*.json", { import: "default" });

export function hasDocumentText(id: string): boolean {
  return `./${TEXT_ALIASES[id] ?? id}.json` in loaders;
}

export async function loadDocumentText(id: string): Promise<DocBlock[] | null> {
  const loader = loaders[`./${TEXT_ALIASES[id] ?? id}.json`];
  if (!loader) return null;
  const blocks = await loader();
  return Array.isArray(blocks) && blocks.length ? blocks : null;
}
