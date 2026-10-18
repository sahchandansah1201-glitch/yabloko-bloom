import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const platforms = [
  { name: "Яндекс Карты", href: "https://yandex.ru/maps/org/yabloko/64934325707/?ll=38.903861%2C45.026285&z=16" },
  { name: "ПроДокторов", href: "https://prodoctorov.ru/krasnodar/lpu/54990-yabloko/" },
  { name: "2ГИС", href: "https://2gis.ru/krasnodar/firm/70000001033657523" },
  { name: "Google Карты", href: "https://maps.app.goo.gl/466w7vogWfcf7FUr7" },
];

export default function Multilink() {
  return (
    <>
      <Helmet>
        <title>Оставить отзыв — клиника «Яблоко»</title>
        <meta name="description" content="Выберите удобную площадку, чтобы оставить отзыв о клинике «Яблоко»." />
        <meta property="og:title" content="Оставить отзыв — клиника «Яблоко»" />
        <meta property="og:description" content="Выберите удобную площадку, чтобы оставить отзыв о клинике «Яблоко»." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <main className="min-h-screen bg-card px-5 pb-12 pt-8 sm:pt-12">
        <div className="mx-auto w-full max-w-md">
          <img src={logo} alt="Клиника «Яблоко»" width={96} height={96} className="mx-auto h-24 w-24 object-contain" />
          <h1 className="mt-6 text-center text-2xl font-semibold leading-snug tracking-normal sm:text-3xl">
            Оставить отзыв о клинике «Яблоко»
          </h1>
          <p className="mt-3 text-center text-base text-muted-foreground">Выберите удобную площадку</p>
          <nav aria-label="Площадки для отзывов" className="mt-7 flex flex-col gap-3">
            {platforms.map(({ name, href }) => (
              <Button key={name} asChild variant="outline" className="h-auto min-h-14 w-full justify-between gap-4 whitespace-normal rounded-lg px-5 py-4 text-base shadow-none focus-visible:ring-foreground motion-reduce:transition-none">
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} — открыть в новой вкладке`}>
                  <span>{name}</span>
                  <ExternalLink aria-hidden="true" />
                </a>
              </Button>
            ))}
          </nav>
          <div className="mt-6 text-center">
            <Button asChild variant="link" className="h-auto min-h-12 max-w-full whitespace-normal text-sm text-muted-foreground focus-visible:ring-foreground motion-reduce:transition-none">
              <Link to="/"><ArrowLeft aria-hidden="true" />На сайт клиники</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}