import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRight, ExternalLink, FileText, Phone, Search, X, Star } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BookingChoiceModal } from "@/components/conversion/BookingChoiceModal";
import { QuickBookingModal } from "@/components/conversion/QuickBookingModal";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { Input } from "@/components/ui/input";
import { clinicDocuments, quickDocumentIds, type ClinicDocument, type DocumentCategory } from "@/data/clinicDocuments";

type Filter = "all" | DocumentCategory;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "organization", label: "Организационные документы" },
  { id: "patients", label: "Пациентам" },
  { id: "consents", label: "Информированные согласия" },
];

const linkProps = { target: "_blank", rel: "noopener noreferrer" } as const;

function DocumentRow({ doc }: { doc: ClinicDocument }) {
  return (
    <li className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <FileText className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
        <div className="min-w-0">
          <p className="break-words text-sm font-medium text-foreground md:text-base">{doc.title}</p>
          <span className="mt-1 inline-block rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-muted-foreground">
            {doc.format}
          </span>
        </div>
      </div>
      <a
        href={doc.href}
        {...linkProps}
        className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full border border-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Открыть документ
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">(откроется в новой вкладке)</span>
      </a>
    </li>
  );
}

export default function DocumentsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [isChoiceOpen, setIsChoiceOpen] = useState(false);
  const [isQuickOpen, setIsQuickOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const q = query.trim().toLocaleLowerCase("ru");
  const bySearch = useMemo(
    () => clinicDocuments.filter((d) => !q || d.title.toLocaleLowerCase("ru").includes(q)),
    [q]
  );
  const results = filter === "all" ? bySearch : bySearch.filter((d) => d.category === filter);
  const count = (f: Filter) => (f === "all" ? bySearch.length : bySearch.filter((d) => d.category === f).length);
  const quick = quickDocumentIds.map((id) => clinicDocuments.find((d) => d.id === id)!).filter(Boolean);

  return (
    <>
      <Helmet>
        <title>Документы клиники — клиника «Яблоко», Краснодар</title>
        <meta
          name="description"
          content="Документы клиники «Яблоко»: оферта, политика обработки персональных данных, положение о платных услугах, информация для пациентов и формы информированного согласия."
        />
        <link rel="canonical" href="https://yabloko-clinic.ru/dokumenty" />
      </Helmet>

      <Header onBookingClick={() => setIsChoiceOpen(true)} />

      <main className="min-h-screen bg-background">
        <section className="bg-gradient-to-b from-secondary to-background py-10 md:py-16">
          <div className="container max-w-4xl">
            <nav aria-label="Навигационная цепочка" className="mb-6 text-sm text-muted-foreground">
              <ol className="flex flex-wrap items-center gap-1">
                <li><Link to="/" className="hover:text-primary">Главная</Link></li>
                <li aria-hidden="true"><ChevronRight className="h-3 w-3" /></li>
                <li aria-current="page" className="font-medium text-foreground">Документы</li>
              </ol>
            </nav>
            <h1 className="font-heading text-fluid-4xl font-bold text-foreground mb-4">Документы клиники</h1>
            <p className="text-fluid-lg text-muted-foreground">
              Здесь собраны организационные документы, информация для пациентов и формы информированного согласия.
            </p>
          </div>
        </section>

        <section aria-labelledby="quick-docs" className="py-8">
          <div className="container max-w-4xl">
            <h2 id="quick-docs" className="font-heading text-xl font-semibold text-foreground mb-4">Ключевые документы</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {quick.map((d) => (
                <li key={d.id}>
                  <a
                    href={d.href}
                    {...linkProps}
                    className="flex h-full min-h-[44px] items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 p-4 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Star className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="min-w-0 flex-1 break-words">{d.title}</span>
                    <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <span className="sr-only">(откроется в новой вкладке)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="all-docs" className="pb-16">
          <div className="container max-w-4xl">
            <h2 id="all-docs" className="font-heading text-xl font-semibold text-foreground mb-4">Все документы</h2>

            <label htmlFor="doc-search" className="mb-2 block text-sm font-medium text-foreground">Найти документ</label>
            <div className="relative mb-4">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                id="doc-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Например, согласие или оферта"
                className="h-12 rounded-full pl-10 pr-12"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Очистить поиск"
                  className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div role="group" aria-label="Категории документов" className="mb-4 flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={`min-h-[44px] max-w-full rounded-full border px-4 text-sm font-medium whitespace-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    filter === f.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:border-primary"
                  }`}
                >
                  {f.label} <span className="opacity-80">({count(f.id)})</span>
                </button>
              ))}
            </div>

            <p aria-live="polite" className="mb-4 text-sm text-muted-foreground">
              Найдено документов: {results.length}
            </p>

            {results.length ? (
              <ul className="space-y-3">
                {results.map((d) => <DocumentRow key={d.id} doc={d} />)}
              </ul>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
                <p className="font-medium text-foreground mb-2">По Вашему запросу документы не найдены</p>
                <p className="text-sm text-muted-foreground mb-4">Попробуйте изменить запрос или выбрать категорию «Все».</p>
                <button
                  type="button"
                  onClick={() => { setQuery(""); setFilter("all"); }}
                  className="min-h-[44px] rounded-full border border-primary px-5 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Сбросить поиск и фильтры
                </button>
              </div>
            )}

            <p className="mt-8 flex items-start gap-2 rounded-lg bg-secondary/50 p-4 text-sm text-muted-foreground">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span>
                Если документ не открывается, Вы можете обратиться в клинику по телефону{" "}
                <a href="tel:+79184128585" className="font-medium text-primary hover:underline">+7 (918) 412-85-85</a>.
              </span>
            </p>
          </div>
        </section>
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
