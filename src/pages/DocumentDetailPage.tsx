import { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight, Download, FileText, Info } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingChoiceModal } from "@/components/conversion/BookingChoiceModal";
import { QuickBookingModal } from "@/components/conversion/QuickBookingModal";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { clinicDocuments, type DocumentCategory } from "@/data/clinicDocuments";
import { hasDocumentText, loadDocumentText, type DocBlock } from "@/data/documentTexts";
import { trackEvent } from "@/lib/analytics";

const DOMAIN = "https://yabloko-clinic.ru";
const categoryLabels: Record<DocumentCategory, string> = {
  organization: "Организационные документы",
  patients: "Пациентам",
  consents: "Информированные согласия",
};

const MONTHS = "января|февраля|марта|апреля|мая|июня|июля|августа|сентября|октября|ноября|декабря";
const DATE_RE = new RegExp(`(\\d{1,2}\\.\\d{1,2}\\.\\d{4})|(«?\\d{1,2}»?\\s+(?:${MONTHS})\\s+\\d{4})`, "i");

function blockText(b: DocBlock): string {
  if (b.type === "list") return b.items.join(" ");
  if (b.type === "table") return b.rows.flat().join(" ");
  return b.text;
}

const btnBase =
  "inline-flex min-h-[44px] max-w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-center whitespace-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

function Block({ b, id }: { b: DocBlock; id: string }) {
  switch (b.type) {
    case "heading": {
      const Tag = (b.level <= 2 ? "h2" : b.level === 3 ? "h3" : "h4") as "h2" | "h3" | "h4";
      return (
        <Tag id={id} className="scroll-mt-28 font-heading text-lg font-semibold text-foreground mt-8 mb-3 break-words">
          {b.text}
        </Tag>
      );
    }
    case "paragraph":
      return (
        <p className={`mb-4 whitespace-pre-line break-words ${b.strong ? "font-semibold text-foreground" : ""}`}>{b.text}</p>
      );
    case "list": {
      const cls = "mb-4 space-y-1 pl-6 break-words";
      return b.ordered ? (
        <ol start={b.start} className={`${cls} list-decimal`}>
          {b.items.map((it, i) => <li key={i} className="whitespace-pre-line">{it}</li>)}
        </ol>
      ) : (
        <ul className={`${cls} list-disc`}>
          {b.items.map((it, i) => <li key={i} className="whitespace-pre-line">{it}</li>)}
        </ul>
      );
    }
    case "table":
      return (
        <div className="mb-6 max-w-full overflow-x-auto rounded-lg border border-border" tabIndex={0} role="region" aria-label="Таблица документа">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <tbody>
              {b.rows.map((r, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  {r.map((c, j) => (
                    <td key={j} className="border-r border-border p-2 align-top whitespace-pre-line break-words last:border-r-0">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default function DocumentDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const doc = clinicDocuments.find((d) => d.slug === slug);
  const [blocks, setBlocks] = useState<DocBlock[] | null | undefined>(undefined);
  const [isChoiceOpen, setIsChoiceOpen] = useState(false);
  const [isQuickOpen, setIsQuickOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const tracked = useRef<string | null>(null);

  const params = doc
    ? { document_id: doc.id, document_slug: doc.slug, document_category: doc.category, document_format: doc.format }
    : null;

  useEffect(() => {
    if (!doc) return;
    setBlocks(undefined);
    let alive = true;
    loadDocumentText(doc.id).then((b) => alive && setBlocks(b)).catch(() => alive && setBlocks(null));
    if (tracked.current !== doc.id) {
      tracked.current = doc.id;
      trackEvent("document_view", params!);
    }
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc?.id]);

  const date = useMemo(() => {
    if (!blocks) return null;
    for (const b of blocks) {
      const m = blockText(b).match(DATE_RE);
      if (m) return m[0].replace(/[«»]/g, "");
    }
    return null;
  }, [blocks]);

  const headings = useMemo(
    () => (blocks ?? []).map((b, i) => ({ b, i })).filter((x) => x.b.type === "heading"),
    [blocks]
  );

  if (!doc) {
    return (
      <>
        <Helmet>
          <title>Документ не найден — клиника «Яблоко»</title>
          <meta name="robots" content="noindex,follow" />
        </Helmet>
        <Header onBookingClick={() => setIsChoiceOpen(true)} />
        <main className="min-h-[60vh] bg-background py-16">
          <div className="container max-w-2xl text-center">
            <h1 className="font-heading text-fluid-3xl font-bold text-foreground mb-4">Документ не найден</h1>
            <p className="text-muted-foreground mb-6">Возможно, адрес изменился. Все документы клиники собраны в одном разделе.</p>
            <Link to="/dokumenty" className={`${btnBase} border border-primary text-primary hover:bg-primary hover:text-primary-foreground`}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Ко всем документам
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const indexable = doc.category !== "consents" && hasDocumentText(doc.id) && blocks !== null;
  const canonical = `${DOMAIN}/dokumenty/${doc.slug}`;
  const shortTitle = doc.title.length > 70 ? doc.title.slice(0, 67).trimEnd() + "…" : doc.title;
  const descRaw = `${doc.title} — текстовая версия для ознакомления. Клиника «Яблоко», Краснодар.`;
  const description = descRaw.length > 160 ? descRaw.slice(0, 157).trimEnd() + "…" : descRaw;

  return (
    <>
      <Helmet>
        <title>{`${shortTitle} — клиника «Яблоко»`}</title>
        <meta name="description" content={description} />
        <meta name="robots" content={indexable ? "index,follow" : "noindex,follow"} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={shortTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
      </Helmet>

      <Header onBookingClick={() => setIsChoiceOpen(true)} />

      <main className="min-h-screen bg-background">
        <section className="bg-gradient-to-b from-secondary to-background py-8 md:py-12">
          <div className="container max-w-4xl">
            <nav aria-label="Навигационная цепочка" className="mb-6 text-sm text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-1">
                <li><Link to="/" className="inline-flex min-h-[44px] items-center hover:text-primary">Главная</Link></li>
                <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
                <li><Link to="/dokumenty" className="inline-flex min-h-[44px] items-center hover:text-primary">Документы</Link></li>
                <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
                <li aria-current="page" className="min-w-0 max-w-full break-words font-medium text-foreground line-clamp-2">{doc.title}</li>
              </ol>
            </nav>
            <h1 className="font-heading text-fluid-3xl font-bold text-foreground mb-4 break-words hyphens-auto">{doc.title}</h1>
            <dl className="flex flex-wrap gap-2 text-sm">
              <div className="flex gap-1 rounded-md bg-secondary px-2 py-1"><dt className="text-muted-foreground">Категория:</dt><dd className="font-medium text-foreground">{categoryLabels[doc.category]}</dd></div>
              <div className="flex gap-1 rounded-md bg-secondary px-2 py-1"><dt className="text-muted-foreground">Формат оригинала:</dt><dd className="font-medium text-foreground">{doc.format}</dd></div>
              {date && <div className="flex gap-1 rounded-md bg-secondary px-2 py-1"><dt className="text-muted-foreground">Дата в тексте:</dt><dd className="font-medium text-foreground">{date}</dd></div>}
            </dl>
          </div>
        </section>

        <div className="container max-w-4xl pb-16">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/dokumenty" className={`${btnBase} border border-primary text-primary hover:bg-primary hover:text-primary-foreground`}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Ко всем документам
            </Link>
            <a
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("document_original_click", params!)}
              className={`${btnBase} border border-border bg-card text-foreground hover:border-primary hover:text-primary`}
            >
              <Download className="h-4 w-4" aria-hidden="true" /> Скачать оригинал ({doc.format})
              <span className="sr-only">(откроется в новой вкладке)</span>
            </a>
          </div>

          <p className="mb-8 flex items-start gap-2 rounded-lg bg-secondary/50 p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>Текстовая версия предназначена для ознакомления. Оригинал документа доступен по кнопке «Скачать оригинал».</span>
          </p>

          {headings.length >= 3 && (
            <nav aria-label="Оглавление документа" className="mb-8 rounded-xl border border-border bg-card p-4">
              <p className="mb-2 text-sm font-semibold text-foreground">Оглавление</p>
              <ol className="space-y-1 text-sm">
                {headings.map(({ b, i }) => (
                  <li key={i}>
                    <a href={`#section-${i}`} className="inline-flex min-h-[44px] items-center break-words text-primary hover:underline">
                      {(b as { text: string }).text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <article aria-labelledby="doc-text-title" className="rounded-2xl border border-border bg-card p-4 sm:p-8">
            <h2 id="doc-text-title" className="mb-6 flex items-center gap-2 font-heading text-xl font-semibold text-foreground">
              <FileText className="h-5 w-5 text-primary" aria-hidden="true" /> Текстовая версия документа
            </h2>
            <div className="mx-auto max-w-[72ch] text-base leading-relaxed text-foreground/90">
              {blocks === undefined && <p className="text-muted-foreground" aria-live="polite">Загрузка текста…</p>}
              {blocks === null && (
                <p className="text-muted-foreground">Текстовая версия готовится. Вы можете открыть оригинал документа по кнопке выше.</p>
              )}
              {blocks?.map((b, i) => <Block key={i} b={b} id={`section-${i}`} />)}
            </div>
          </article>
        </div>
      </main>

      <Footer />

      <BookingChoiceModal
        isOpen={isChoiceOpen}
        onClose={() => setIsChoiceOpen(false)}
        onQuickContact={() => setIsQuickOpen(true)}
        onFullBooking={() => setIsBookingOpen(true)}
      />
      <QuickBookingModal isOpen={isQuickOpen} onClose={() => setIsQuickOpen(false)} onBack={() => setIsChoiceOpen(true)} />
      <BookingWizard isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} onBack={() => setIsChoiceOpen(true)} />
    </>
  );
}
