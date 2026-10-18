import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowDown, ArrowUp, ChevronDown, ExternalLink, Info, LoaderCircle, MessageSquare, Star } from "lucide-react";
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
const demoTexts = [
  "Спасибо за внимательное отношение и понятные объяснения. Было удобно выбрать время и найти клинику. Перед визитом мне спокойно ответили на вопросы и уточнили детали. На месте всё было организовано понятно: встретили вовремя, подсказали, куда пройти, и не торопили. Особенно понравилось, что можно было задать дополнительные вопросы и получить подробный ответ. Осталось приятное впечатление от общения и организации визита.",
  "Было легко связаться с клиникой и договориться об удобном времени. Адрес и ориентиры объяснили заранее. Спасибо за спокойное и доброжелательное общение.",
  "В клинике чисто и спокойно. Меня встретили вовремя, внимательно выслушали и понятно ответили на вопросы. Все организационные детали были ясны ещё до визита.",
  "Удобно, что информацию о визите можно уточнить заранее. Сотрудники были вежливы и помогли разобраться с расписанием. Спасибо за внимание к деталям.",
  "Понравилось, что общение было спокойным и без спешки. Нашлось время на все мои вопросы. Клиника оказалась там, где было указано, и добраться было несложно.",
  "Запись прошла понятно, напоминание о времени было кстати. На месте не пришлось долго ждать. Благодарю за аккуратную организацию и доброжелательную встречу.",
];
type DemoState = "ready" | "empty" | "loading" | "error";
type Sort = "newest" | "oldest" | "rating";

function Stars({ rating }: { rating: number }) {
  return <span className="demo-stars" aria-label={`Демонстрационная оценка: ${rating} из 5`}>{Array.from({ length: rating }, (_, i) => <Star key={i} aria-hidden="true" />)}</span>;
}

function DemoReview({ index, sourceIndex }: { index: number; sourceIndex: number }) {
  const [expanded, setExpanded] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const id = `${sourceIndex}-${index}`;
  const text = demoTexts[(index + sourceIndex) % demoTexts.length];
  const long = text.length > 350;
  return <article className="demo-review" data-testid="demo-review">
    <div className="demo-person">
      <span className="demo-avatar" aria-hidden="true">АП</span>
      <div><p className="demo-author">Анонимный посетитель {index + 1}</p><time className="demo-date" dateTime={`2026-10-${String(18 - index).padStart(2, "0")}`}>{18 - index} октября 2026 · демо</time></div>
      <Stars rating={index === 4 ? 4 : 5} />
    </div>
    <p id={`text-${id}`} className={`demo-text ${long && !expanded ? "is-collapsed" : ""}`}>{text}</p>
    {long && <Button variant="link" className="demo-action" aria-expanded={expanded} aria-controls={`text-${id}`} onClick={() => setExpanded(!expanded)}>{expanded ? "Свернуть текст" : "Читать полностью"}</Button>}
    <div className="demo-review-actions">
      <Button asChild variant="link" className="demo-action"><a href={sources[sourceIndex].href} target="_blank" rel="noopener noreferrer">Открыть оригинал <ExternalLink aria-hidden="true" /><span className="demo-caption">демоссылка</span></a></Button>
      {index % 2 === 0 && <Button variant="ghost" className="demo-action" aria-expanded={replyOpen} aria-controls={`reply-${id}`} onClick={() => setReplyOpen(!replyOpen)}><MessageSquare aria-hidden="true" />Ответ клиники<ChevronDown aria-hidden="true" /></Button>}
    </div>
    {replyOpen && <div id={`reply-${id}`} className="demo-reply"><strong>Клиника «Яблоко» · демонстрационный ответ</strong><p>Спасибо за обратную связь и добрые слова. Нам важно, чтобы общение было понятным и комфортным.</p></div>}
  </article>;
}

export default function ReviewsUnifiedDemo() {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [state, setState] = useState<DemoState>("ready");
  const [sort, setSort] = useState<Sort>("newest");
  const [showAll, setShowAll] = useState(false);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const source = sources[sourceIndex];
  const indices = sort === "oldest" ? [5, 4, 3, 2, 1, 0] : sort === "rating" ? [0, 1, 2, 3, 5, 4] : [0, 1, 2, 3, 4, 5];
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
          <div className="demo-summary">
            <div className="demo-summary-main"><span className="demo-score">{source.score}</span><div><Stars rating={5} /><p className="demo-caption">{source.name} · демонстрационная сводка<br />6 демоотзывов · оценка условная</p></div></div>
            {state === "ready" && <div className="demo-sort"><span id="demo-sort-label">Сначала</span><Select value={sort} onValueChange={value => setSort(value as Sort)}><SelectTrigger aria-labelledby="demo-sort-label" className="min-h-12 w-44 bg-card text-base"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="newest">Новые</SelectItem><SelectItem value="oldest">Старые</SelectItem><SelectItem value="rating">Высокие оценки</SelectItem></SelectContent></Select></div>}
          </div>
          {state === "ready" ? <>
            <div key={sourceIndex}>{indices.slice(0, showAll ? 6 : 3).map(index => <DemoReview key={index} index={index} sourceIndex={sourceIndex} />)}</div>
            <div className="demo-more"><Button variant="outline" className="demo-cta" aria-expanded={showAll} onClick={() => setShowAll(!showAll)}>{showAll ? <ArrowUp aria-hidden="true" /> : <ArrowDown aria-hidden="true" />}{showAll ? "Свернуть" : "Показать ещё 3"}</Button></div>
          </> : <div className="demo-empty" role={state === "error" ? "alert" : "status"} aria-live="polite">
            {state === "loading" ? <LoaderCircle className="demo-spinner" aria-hidden="true" /> : <Info aria-hidden="true" />}
            <strong>{state === "loading" ? "Загружаем отзывы…" : state === "empty" ? "Пока нет отзывов для отображения" : "Не удалось загрузить отзывы"}</strong>
            <p className="demo-caption">Демонстрационное состояние · {source.name}</p>
            {state === "error" && <Button variant="outline" className="demo-cta" onClick={() => setState("ready")}>Попробовать снова</Button>}
          </div>}
        </div>
      </section>
    </div>
  </main>;
}