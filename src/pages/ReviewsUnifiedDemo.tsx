import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowDown, ArrowUp, ExternalLink, Info, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import yandexLogo from "@/assets/review-platforms/yandex.png";
import twoGisLogo from "@/assets/review-platforms/2gis.png";
import googleLogo from "@/assets/review-platforms/google.png";
import prodoctorovLogo from "@/assets/review-platforms/prodoctorov.png";
import "./ReviewsUnifiedDemo.css";

const sources = [
  { name: "Яндекс", logo: yandexLogo, href: "https://yandex.ru/maps/org/yabloko/64934325707/", score: "4,9" },
  { name: "2ГИС", logo: twoGisLogo, href: "https://2gis.ru/krasnodar/firm/70000001033657523", score: "4,8" },
  { name: "Google", logo: googleLogo, href: "https://maps.app.goo.gl/466w7vogWfcf7FUr7", score: "4,7" },
  { name: "ПроДокторов", logo: prodoctorovLogo, href: "https://prodoctorov.ru/krasnodar/lpu/54990-yabloko/", score: "5,0" },
];
type DemoState = "ready" | "empty" | "loading" | "error";
type NativeAdapter = {
  loadNativeBundle: (url: string) => Promise<void>;
  createDemoPayload: (index: number, all: boolean, empty: boolean) => unknown;
  mountNativeDemo: (container: HTMLElement, payload: unknown) => HTMLElement;
};
let adapterPromise: Promise<NativeAdapter> | undefined;
function loadAdapter() {
  if (!adapterPromise) adapterPromise = new Promise<NativeAdapter>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/design/native-reviews-demo.js";
    script.onload = () => {
      const adapter = (window as Window & { NativeReviewsDemo?: NativeAdapter }).NativeReviewsDemo;
      if (adapter) resolve(adapter); else reject(new Error("Local adapter unavailable"));
    };
    script.onerror = () => { adapterPromise = undefined; script.remove(); reject(new Error("Local adapter unavailable")); };
    document.head.append(script);
  });
  return adapterPromise;
}

export default function ReviewsUnifiedDemo() {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [state, setState] = useState<DemoState>("ready");
  const [showAll, setShowAll] = useState(false);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const source = sources[sourceIndex];
  const nativeContainer = useRef<HTMLDivElement>(null);
  const [bundleError, setBundleError] = useState(false);
  useEffect(() => {
    const container = nativeContainer.current;
    if (!container || state === "loading" || state === "error") return;
    let cancelled = false;
    void loadAdapter().then(async adapter => {
      await adapter.loadNativeBundle("/design/native-reviews-widget.js");
      if (!cancelled) adapter.mountNativeDemo(container, adapter.createDemoPayload(sourceIndex, showAll, state === "empty"));
    }).catch(() => { if (!cancelled) setBundleError(true); });
    return () => { cancelled = true; container.replaceChildren(); };
  }, [sourceIndex, showAll, state, bundleError]);
  const chooseSource = (index: number) => { setSourceIndex(index); setShowAll(false); };

  return <main className="reviews-unified-demo">
    <Helmet><title>Макет отзывов — клиника «Яблоко»</title><meta name="robots" content="noindex,nofollow" /><meta name="description" content="Изолированный демонстрационный макет раздела отзывов для согласования." /></Helmet>
    <div className="demo-shell">
      <aside className="demo-banner" role="note"><strong>Макет для согласования.</strong> Демонстрационные отзывы и оценки, не реальные данные площадок</aside>
      <div className="demo-tools"><span id="demo-state-label">Демосостояние</span><Select value={state} onValueChange={value => setState(value as DemoState)}><SelectTrigger aria-labelledby="demo-state-label" className="min-h-12 w-40 bg-card text-base"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="ready">Отзывы</SelectItem><SelectItem value="loading">Загрузка</SelectItem><SelectItem value="empty">Нет отзывов</SelectItem><SelectItem value="error">Ошибка</SelectItem></SelectContent></Select></div>
      <section className="demo-section" aria-labelledby="demo-title">
        <header className="demo-heading"><p className="demo-eyebrow">Нам доверяют</p><h2 id="demo-title">Отзывы пациентов</h2><p className="demo-subtitle">Отзывы с независимых площадок — выберите источник</p></header>
        <div className="demo-source-row">
          <div className="demo-tabs" role="tablist" aria-label="Источники отзывов">
            {sources.map((item, i) => <Button key={item.name} ref={el => { tabs.current[i] = el; }} variant="ghost" className="demo-tab" role="tab" id={`source-${i}`} aria-controls="demo-reviews-panel" aria-selected={i === sourceIndex} tabIndex={i === sourceIndex ? 0 : -1} onClick={() => chooseSource(i)} onKeyDown={event => {
              const key = event.key;
              if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(key)) return;
              event.preventDefault();
              const next = key === "Home" ? 0 : key === "End" ? 3 : (i + (key === "ArrowRight" || key === "ArrowDown" ? 1 : 3)) % 4;
              chooseSource(next); tabs.current[next]?.focus();
            }}><img src={item.logo} width={28} height={28} alt="" />{item.name}</Button>)}
          </div>
          <Button asChild variant="outline" className="demo-cta"><a href="https://new.yaclinic.ru/multilink/" target="_blank" rel="noopener noreferrer">Оставить отзыв<ExternalLink aria-hidden="true" /></a></Button>
        </div>
        <div className="demo-panel" role="tabpanel" id="demo-reviews-panel" aria-labelledby={`source-${sourceIndex}`} tabIndex={0}>
          <p className="demo-caption" role="note">{source.name} · Все оценки, количества, распределения и структурные поля условные. Не подтверждают посещения. «Открыть оригинал» — демоссылка на страницу клиники.</p>
          {(state === "ready" || state === "empty") && !bundleError ? <>
            <div ref={nativeContainer} />
            {state === "ready" && <div className="demo-more"><Button variant="outline" className="demo-cta" aria-expanded={showAll} onClick={() => setShowAll(!showAll)}>{showAll ? <ArrowUp aria-hidden="true" /> : <ArrowDown aria-hidden="true" />}{showAll ? "Свернуть" : "Показать ещё 3"}</Button></div>}
          </> : <div className="demo-empty" role={state === "error" || bundleError ? "alert" : "status"} aria-live="polite">
            {state === "loading" ? <LoaderCircle className="demo-spinner" aria-hidden="true" /> : <Info aria-hidden="true" />}
            <strong>{state === "loading" ? "Загружаем отзывы…" : "Не удалось загрузить отзывы"}</strong>
            <p className="demo-caption">Демонстрационное состояние · {source.name}</p>
            {(state === "error" || bundleError) && <Button variant="outline" className="demo-cta" onClick={() => { setBundleError(false); setState("ready"); }}>Попробовать снова</Button>}
          </div>}
        </div>
      </section>
    </div>
  </main>;
}