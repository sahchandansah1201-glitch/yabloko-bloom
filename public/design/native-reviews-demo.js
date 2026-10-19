// Demo-only adapter. Original native bundle is never modified.
export const sourceIds = ["yandex", "2gis", "google", "prodoctorov"];
export const sourceUrls = ["https://yandex.ru/maps/org/yabloko/64934325707/", "https://2gis.ru/krasnodar/firm/70000001033657523", "https://maps.app.goo.gl/466w7vogWfcf7FUr7", "https://prodoctorov.ru/krasnodar/lpu/54990-yabloko/"];
export const demoTexts = ["Спасибо за внимательное отношение и понятные объяснения. Было удобно выбрать время и найти клинику. Перед визитом мне спокойно ответили на вопросы и уточнили детали. На месте всё было организовано понятно: встретили вовремя, подсказали, куда пройти, и не торопили. Особенно понравилось, что можно было задать дополнительные вопросы и получить подробный ответ. Осталось приятное впечатление от общения и организации визита.", "Было легко связаться с клиникой и договориться об удобном времени. Адрес и ориентиры объяснили заранее. Спасибо за спокойное и доброжелательное общение.", "В клинике чисто и спокойно. Меня встретили вовремя, внимательно выслушали и понятно ответили на вопросы. Все организационные детали были ясны ещё до визита.", "Удобно, что информацию о визите можно уточнить заранее. Сотрудники были вежливы и помогли разобраться с расписанием. Спасибо за внимание к деталям.", "Понравилось, что общение было спокойным и без спешки. Нашлось время на все мои вопросы. Клиника оказалась там, где было указано, и добраться было несложно.", "Запись прошла понятно, напоминание о времени было кстати. На месте не пришлось долго ждать. Благодарю за аккуратную организацию и доброжелательную встречу."];
export const chromeOverride = `.rw-header, .rw-tabs { display: none !important; }
.rw-widget { padding: 0 !important; }
.rw-container { max-width: none; margin: 0; }
.rw-panel { padding: 0 !important; margin: 0; border: 0; border-radius: 0; box-shadow: none; }`;
export function createDemoPayload(sourceIndex, showAll = false, empty = false) {
  const source = sourceIds[sourceIndex];
  const reviewUrl = sourceUrls[sourceIndex];
  const reviews = demoTexts.map((_, index) => {
    const text = demoTexts[(index + sourceIndex) % demoTexts.length];
    const common = {
      external_id: `demo-${source}-${index}`, review_url: reviewUrl,
      published_at: `2026-10-${String(18-index).padStart(2, "0")}`,
      published_display: `${18-index} октября 2026 · демо`, text, photos: [],
      business_response: { exists: index % 2 === 0, organization_name: "Клиника «Яблоко» · демонстрационный ответ", published_at: null, published_display: "демо", text: index % 2 === 0 ? "Демонстрационный ответ. Спасибо за обратную связь и добрые слова. Нам важно, чтобы общение было понятным и комфортным." : null }
    };
    const name = `Анонимный посетитель ${index + 1} · демо`;
    const rating = index === 4 ? 4 : 5;
    if (source === "yandex") return {...common, rating, author: {name, profile_url: null, avatar_url: null, local_expert_level: null}, likes_count: null};
    if (source === "2gis") return {...common, rating, author: {name, profile_url: null, avatar_url: null, initials: "АП", reviews_count: null}, topics: [], verification: {verified: false, visits_count: null, label: "Условная демометка — посещение не подтверждено"}, helpful_count: null};
    if (source === "google") return {...common, rating, author: {name, avatar_url: null, reviews_count: 0, photos_count: 0}};
    return {...common, rating: {value: rating, label: "Условная оценка · демо"}, author: {type: "unknown", type_display: name, name: null, masked_phone: null}, verification: {verified: false, label: null}, sections: {history: `Демонстрационный текст, не история пациента. ${text}`, pros: "Демонстрационный текст: Спасибо за внимательное отношение и понятные объяснения.", cons: null}, topics: [], doctor: null, visit: null, branch: null};
  });
  const place = {name: "Клиника «Яблоко» · демонстрационная сводка", rating: 4.8, reviews_count: 6};
  if (source === "yandex") Object.assign(place, {ratings_count: 6});
  // Zero ratings avoids the native automatic 'confirmed ratings' claim.
  if (source === "2gis") Object.assign(place, {ratings_count: 0, category: null, people_say: "Условная демонстрационная сводка, не данные 2ГИС. Спасибо за внимательное отношение и понятные объяснения. Было удобно выбрать время и найти клинику.", chips: []});
  if (source === "google") Object.assign(place, {rating_distribution: {1: 0, 2: 0, 3: 0, 4: 1, 5: 5}});
  if (source === "prodoctorov") Object.assign(place, {clinic_rating: 4.8, doctors_rating: 4.8, mentions: []});
  return {schema_version: "1.0", generated_at: "2026-10-19T05:07:00Z", settings: {section_label: "Нам доверяют", titles: {yandex: "Отзывы пациентов", "2gis": "Отзывы пациентов", google: "Отзывы пациентов", prodoctorov: "Отзывы пациентов"}, subtitle: "", default_source: source, source_order: [source], initial_visible_count: showAll ? 6 : 3, page_size: 3, organization_name: "Клиника «Яблоко» · демо", organization_url: "https://new.yaclinic.ru/multilink/"}, sources: [{source, enabled: true, source_place_id: `demo-${source}`, source_url: reviewUrl, write_review_url: null, place, reviews: empty ? [] : reviews}]};
}
let bundlePromise;
export function loadNativeBundle(url) {
  if (customElements.get("reviews-widget")) return Promise.resolve();
  if (!bundlePromise) bundlePromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = () => customElements.whenDefined("reviews-widget").then(resolve);
    script.onerror = () => { bundlePromise = undefined; script.remove(); reject(new Error("Не удалось загрузить локальный макет")); };
    document.head.append(script);
  });
  return bundlePromise;
}
export function mountNativeDemo(container, payload) {
  const widget = document.createElement("reviews-widget");
  widget.payload = payload; // Set before connecting: never request a data-endpoint.
  container.replaceChildren(widget);
  if (widget.shadowRoot) {
    const style = document.createElement("style");
    style.dataset.demoChrome = "";
    style.textContent = chromeOverride;
    widget.shadowRoot.append(style);
  }
  return widget;
}
