/**
 * Single Source of Truth — Прайс-лист клиники «Яблоко»
 * Extracted from "Прайс для печати.xlsx", актуален с 01.01.2026 г.
 */

export interface PriceItem {
  name: string;
  price: string;
  /** medical code e.g. B01.008.001 */
  code?: string;
  /** full nomenclature name per Order 804n */
  nomenclatureName?: string;
  /** high-intent = show booking button */
  bookable?: boolean;
  /** doctor slug for cross-linking */
  doctorSlug?: string;
  /** service page slug for cross-linking */
  serviceSlug?: string;
  /** explanation for variable/from-price */
  variablePriceReason?: string;
}

export interface PriceSubcategory {
  title: string;
  items: PriceItem[];
}

export interface PriceCategory {
  id: string;
  title: string;
  subcategories: PriceSubcategory[];
}

export const priceCategories: PriceCategory[] = [
  {
    id: "dermatology",
    title: "Дерматология",
    subcategories: [
      {
        title: "Приём врача-дерматовенеролога",
        items: [
          { name: "Приём врача-дерматовенеролога первичный (Аллам А.Х.)", price: "3 000 ₽", code: "B01.008.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога первичный", bookable: true, doctorSlug: "allam" },
          { name: "Приём врача-дерматовенеролога повторный (Аллам А.Х.)", price: "3 000 ₽", code: "B01.008.002", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога повторный", bookable: true, doctorSlug: "allam" },
          { name: "Приём врача-дерматовенеролога первичный (Райкова С.А.)", price: "2 700 ₽", code: "B01.008.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога первичный", bookable: true, doctorSlug: "raikova" },
          { name: "Приём врача-дерматовенеролога повторный (Райкова С.А.)", price: "2 700 ₽", code: "B01.008.002", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога повторный", bookable: true, doctorSlug: "raikova" },
          { name: "Приём врача-дерматовенеролога первичный (Грачева В.С.)", price: "2 500 ₽", code: "B01.008.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога первичный", bookable: true, doctorSlug: "gracheva" },
          { name: "Приём врача-дерматовенеролога повторный (Грачева В.С.)", price: "2 500 ₽", code: "B01.008.002", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога повторный", bookable: true, doctorSlug: "gracheva" },
          { name: "Приём врача-дерматовенеролога первичный (Павлюк М.О.)", price: "4 500 ₽", code: "B01.008.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога первичный", bookable: true, doctorSlug: "pavlyuk" },
          { name: "Приём врача-дерматовенеролога повторный (Павлюк М.О.)", price: "4 500 ₽", code: "B01.008.002", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога повторный", bookable: true, doctorSlug: "pavlyuk" },
        ],
      },
      {
        title: "Дерматоскопия",
        items: [
          { name: "Дерматоскопия", price: "1 700 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия)" },
          { name: "Дерматоскопия при удалении новообразования (электрокоагуляция)", price: "850 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия) при удалении новообразования методом электрокоагуляции" },
          { name: "Дерматоскопия при удалении новообразования", price: "400 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия) при удалении новообразования" },
          { name: "Картирование цифровым дерматоскопом (выборочный скрининг)", price: "4 300 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия) — картирование цифровым дерматоскопом (выборочный скрининг)" },
          { name: "Картирование цифровым дерматоскопом (тотальный скрининг)", price: "10 500 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия) — картирование цифровым дерматоскопом (тотальный скрининг)" },
        ],
      },
    ],
  },
  {
    id: "neoplasms",
    title: "Удаление новообразований кожи",
    subcategories: [
      {
        title: "Криодеструкция кожи",
        items: [
          { name: "Дерматоскопия", price: "1 700 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия)" },
          { name: "Первичная обработка — бородавка до 0,3 см", price: "1 200 ₽", code: "A24.01.004", nomenclatureName: "Криодеструкция кожи" },
          { name: "Бородавка 0,4–0,5 см", price: "1 500 ₽", code: "A24.01.004" },
          { name: "Бородавка 0,6–1 см", price: "1 800 ₽", code: "A24.01.004" },
          { name: "Бородавка 1,1–1,5 см", price: "2 300 ₽", code: "A24.01.004" },
          { name: "Повторная обработка — бородавка до 0,3 см", price: "700 ₽", code: "A24.01.004" },
          { name: "Повторная — бородавка 0,4–0,5 см", price: "1 000 ₽", code: "A24.01.004" },
          { name: "Повторная — бородавка 0,6–1 см", price: "1 700 ₽", code: "A24.01.004" },
          { name: "Повторная — бородавка 1,1–1,5 см", price: "2 200 ₽", code: "A24.01.004" },
        ],
      },
      {
        title: "Электрокоагуляция",
        items: [
          { name: "Папиллома 1 шт", price: "1 600 ₽", code: "А16.01.017.001", nomenclatureName: "Удаление доброкачественных новообразований кожи методом электрокоагуляции" },
          { name: "Папиллома 2 шт", price: "1 200 ₽", code: "А16.01.017.001" },
          { name: "Папиллома 3–5 шт", price: "800 ₽", code: "А16.01.017.001" },
          { name: "Папиллома 6–10 шт", price: "600 ₽", code: "А16.01.017.001" },
          { name: "Папиллома более 10 шт", price: "500 ₽", code: "А16.01.017.001" },
          { name: "Папиллома в паху", price: "1 700 ₽", code: "А16.01.017.001" },
          { name: "Папиллома на гениталиях", price: "1 700 ₽", code: "А16.01.017.001" },
          { name: "Папилломатозный невус до 0,5 см", price: "1 700 ₽", code: "А16.01.017.001" },
          { name: "Мелкие папилломы до 0,1 см (40–60 шт)", price: "12 200 ₽", code: "А16.01.017.001" },
          { name: "Мелкие папилломы до 0,1 см (61–80 шт)", price: "17 000 ₽", code: "А16.01.017.001" },
          { name: "Папиллома в области век", price: "2 000 ₽", code: "А16.01.017.001" },
          { name: "Родинки, невусы, фибромы, кератомы до 0,5 см", price: "1 700 ₽", code: "А16.01.017.001" },
          { name: "Родинки, невусы, фибромы, кератомы 0,5–1 см", price: "2 200 ₽", code: "А16.01.017.001" },
          { name: "Родинки, невусы, фибромы, кератомы более 1 см", price: "2 800 ₽", code: "А16.01.017.001" },
          { name: "Бородавки до 0,3 см", price: "1 600 ₽", code: "А16.01.017.001" },
          { name: "Бородавки 0,3–0,5 см", price: "2 000 ₽", code: "А16.01.017.001" },
          { name: "Бородавки 0,5–1 см", price: "2 800 ₽", code: "А16.01.017.001" },
          { name: "Бородавки 1–2 см", price: "3 300 ₽", code: "А16.01.017.001" },
          { name: "Бородавка стопы до 0,3 см", price: "1 700 ₽", code: "А16.01.017.001" },
          { name: "Бородавка стопы до 1 см", price: "3 300 ₽", code: "А16.01.017.001" },
          { name: "Бородавка стопы до 2 см", price: "4 000 ₽", code: "А16.01.017.001" },
          { name: "Удаление гемангиомы до 0,5 см", price: "1 600 ₽", code: "А16.01.017.001" },
          { name: "Удаление ксантелазма века до 0,5 см", price: "1 900 ₽", code: "А16.01.017.001" },
          { name: "Удаление ксантелазма века до 1 см", price: "3 000 ₽", code: "А16.01.017.001" },
          { name: "Удаление контагиозных моллюсков до 0,3 см", price: "900 ₽", code: "A16.01.020" },
          { name: "Удаление контагиозных моллюсков до 0,5 см", price: "1 200 ₽", code: "A16.01.020" },
          { name: "Удаление милиумов 1 шт", price: "600 ₽", code: "A14.01.010" },
          { name: "Удаление сосудистой мальформации за 1 см", price: "900 ₽", code: "A16.01.013" },
          { name: "Удаление звёздчатой ангиомы за 1 см", price: "1 200 ₽", code: "A16.01.014" },
          { name: "Удаление телеангиоэктазий за 1 см", price: "1 000 ₽", code: "A16.01.015" },
        ],
      },
      {
        title: "Дополнительно",
        items: [
          { name: "Патолого-анатомическое исследование материала (1 шт)", price: "3 200 ₽", code: "А08.30.014", nomenclatureName: "Патолого-анатомическое исследование биопсийного (операционного) материала опухолей мягких тканей" },
          { name: "Местная анестезия", price: "700 ₽", code: "B01.003.004.005" },
        ],
      },
    ],
  },
  {
    id: "trichology",
    title: "Трихология",
    subcategories: [
      {
        title: "Приём врача-трихолога",
        items: [
          { name: "Приём трихолога первичный (Аллам А.Х.) + дерматоскопия", price: "4 500 ₽", code: "B01.008.001, А03.01.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога первичный + Осмотр кожи под увеличением (дерматоскопия)", bookable: true, doctorSlug: "allam" },
          { name: "Приём трихолога повторный (Аллам А.Х.) + дерматоскопия", price: "4 500 ₽", code: "B01.008.002, А03.01.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога повторный + Осмотр кожи под увеличением (дерматоскопия)", bookable: true, doctorSlug: "allam" },
          { name: "Приём трихолога первичный (Павлюк М.О.) + дерматоскопия", price: "6 000 ₽", code: "B01.008.001, А03.01.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога первичный + Осмотр кожи под увеличением (дерматоскопия)", bookable: true, doctorSlug: "pavlyuk" },
          { name: "Приём трихолога повторный (Павлюк М.О.) + дерматоскопия", price: "6 000 ₽", code: "B01.008.002, А03.01.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога повторный + Осмотр кожи под увеличением (дерматоскопия)", bookable: true, doctorSlug: "pavlyuk" },
          { name: "Приём трихолога первичный (Райкова С.А.) + дерматоскопия", price: "3 000 ₽", code: "B01.008.001, А03.01.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога первичный + Осмотр кожи под увеличением (дерматоскопия)", bookable: true, doctorSlug: "raikova" },
          { name: "Приём трихолога повторный (Райкова С.А.) + дерматоскопия", price: "3 000 ₽", code: "B01.008.002, А03.01.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога повторный + Осмотр кожи под увеличением (дерматоскопия)", bookable: true, doctorSlug: "raikova" },
          { name: "Трихограмма", price: "2 600 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия) — Трихограмма" },
        ],
      },
      {
        title: "Фототрихограмма",
        items: [
          { name: "Фототрихограмма — 1 этап", price: "700 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия) — 1 этап (Фототрихограмма)" },
          { name: "Фототрихограмма — 2 этап", price: "2 600 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия) — 2 этап (Фототрихограмма)" },
        ],
      },
      {
        title: "Лечение выпадения волос",
        items: [
          { name: "Hair X с пептидами 2 мл (шприц), Россия", price: "9 700 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "trichology" },
          { name: "Hair X 2 мл (флакон)", price: "4 000 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "trichology" },
          { name: "Gag Complex DVL CAPYL 1,0 мл", price: "3 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "trichology" },
          { name: "Плазмолифтинг 1 пробирка (Россия)", price: "5 500 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "trichology" },
          { name: "Плазмолифтинг 2 пробирки (Россия)", price: "7 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "trichology" },
          { name: "PRP-терапия 1 пробирка (Корея)", price: "13 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы — PRP-терапия)", serviceSlug: "trichology" },
          { name: "Лечение очаговой алопеции (Бетаметазон)", price: "4 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "trichology" },
          { name: "Дерматологический пилинг (Time to grow)", price: "3 300 ₽", code: "А16.01.024", nomenclatureName: "Дерматологический пилинг", serviceSlug: "trichology" },
          { name: "Ультразвуковая безинъекционная мезотерапия кожи головы", price: "3 300 ₽", code: "A22.01.001", nomenclatureName: "Ультразвуковое лечение кожи (безинъекционная мезотерапия кожи волосистой части головы)", serviceSlug: "trichology" },
          { name: "Ультразвуковой пилинг волосистой части головы", price: "3 300 ₽", code: "A22.01.001", nomenclatureName: "Ультразвуковое лечение кожи (ультразвуковой пилинг волосистой части головы)", serviceSlug: "trichology" },
          { name: "Обработка импульсным спреем волосистой части головы", price: "3 200 ₽", code: "A17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу (обработка импульсным спреем волосистой части головы)", serviceSlug: "trichology" },
        ],
      },
    ],
  },
  {
    id: "nutritiology",
    title: "Нутрициология",
    subcategories: [
      {
        title: "Приём нутрициолога",
        items: [
          { name: "Приём врача-дерматовенеролога (первичный), нутрициолога", price: "5 300 ₽", code: "B01.008.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога (первичный), нутрициолога", bookable: true },
        ],
      },
    ],
  },
  {
    id: "cosmetology",
    title: "Косметология",
    subcategories: [
      {
        title: "Приём врача-косметолога",
        items: [
          { name: "Приём врача-косметолога первичный", price: "1 600 ₽", code: "В01.008.003", nomenclatureName: "Приём (осмотр, консультация) врача-косметолога первичный", bookable: true },
          { name: "Приём врача-косметолога первичный (Павлюк М.О.)", price: "2 200 ₽", code: "В01.008.003", nomenclatureName: "Приём (осмотр, консультация) врача-косметолога первичный", bookable: true, doctorSlug: "pavlyuk" },
          { name: "Приём врача-косметолога повторный", price: "1 600 ₽", code: "B01.008.004", nomenclatureName: "Приём (осмотр, консультация) врача-косметолога повторный", bookable: true },
          { name: "Приём врача-косметолога повторный (Павлюк М.О.)", price: "2 200 ₽", code: "B01.008.004", nomenclatureName: "Приём (осмотр, консультация) врача-косметолога повторный", bookable: true, doctorSlug: "pavlyuk" },
        ],
      },
    ],
  },
  {
    id: "injection-cosmetology",
    title: "Инъекционная косметология",
    subcategories: [
      {
        title: "Анестезия",
        items: [
          { name: "Аппликационная анестезия кремом 6 грамм", price: "700 ₽", code: "В01.003.004.004", nomenclatureName: "Аппликационная анестезия" },
          { name: "Аппликационная анестезия кремом 3 грамм", price: "350 ₽", code: "В01.003.004.004", nomenclatureName: "Аппликационная анестезия" },
          { name: "Местная анестезия", price: "700 ₽", code: "B01.003.004.001", nomenclatureName: "Местная анестезия" },
        ],
      },
      {
        title: "Мезотерапия и Биоревитализация",
        items: [
          { name: "Гиалуформ Мезолифт 1.8% 2 мл, Россия", price: "9 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "HydroLine extra (Гидролайн), Россия 4 мл", price: "10 600 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "HydroLine extra (Гидролайн), Россия 1 мл", price: "4 400 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "Jalupro HMW 2,5 мл, Италия", price: "17 900 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "HYALREPAIR-02 BIOREPARANT 1.5 мл", price: "15 300 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "HYALREPAIR-04 BIOREPARANT 1.5 мл", price: "15 300 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "HYALREPAIR-07 BIOREPARANT 2.5 мл", price: "9 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "HYALREPAIR-10 BIOREPARANT FORTE 2.5 мл", price: "9 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "HYALREPAIR 7 или 10 BIOREPARANT FORTE 1 мл", price: "4 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "NucleoSpire DNA-RNA 1% 1,3 мл", price: "9 000 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "NucleoSpire DNA-RNA 2% 2 мл", price: "15 700 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "РЕВИ eye стерильный 1.0% 1 мл", price: "14 700 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "РЕВИ Силк стерильный 1.2% 1 мл", price: "15 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "РЕВИ Силк стерильный 1.2% 2 мл", price: "20 500 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "РЕВИ Стронг стерильный 1.5% 1 мл", price: "16 300 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "РЕВИ Стронг стерильный 1.5% 2 мл", price: "22 100 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "РЕВИ Стайл стерильный 1.0% 1 мл", price: "12 600 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "РЕВИ Стайл стерильный 1.0% 2 мл", price: "16 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "NCTF 135 HA Франция 3 мл", price: "13 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "NCTF 135 HA Франция 1,5 мл", price: "8 500 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "Бетаметазон д/инъекций 1 мл", price: "4 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов" },
          { name: "Сферогель Long FINE 0.5 мл", price: "19 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "Сферогель Medium 1 шпр.", price: "11 600 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "Сферогель Medium 2 шпр.", price: "20 900 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "MiriLine Hydro 1 мл", price: "13 700 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "Meso-Wharton P199", price: "21 500 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "Meso-Xanthin P199 1.5 мл", price: "21 500 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "MESOSCULPT C71 1 мл шприц", price: "18 900 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "PROFHILO 2 мл, Италия", price: "27 000 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "BioHyalux MEVITA C 4 мл", price: "13 700 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "BioHyalux MEVITA C 2 мл", price: "8 500 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "BioHyalux MEVITA C 1 мл", price: "3 150 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalization" },
          { name: "Фракционная мезотерапия «Сияние и ровный тон» (Дермапен) 1 мл", price: "7 400 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (фракционная мезотерапия лица «Сияние и ровный тон» — Дермапен)", serviceSlug: "mesotherapy" },
        ],
      },
      {
        title: "Ботулотоксин",
        items: [
          { name: "Диспорт, 1 ед. Франция (до 30 ед.)", price: "147 ₽", code: "A11.01.003", nomenclatureName: "Внутримышечное введение лекарственных препаратов (коррекция мимических морщин препаратом ботулотоксина типа А)", serviceSlug: "botox" },
          { name: "Лечение гипергидроза — Диспорт 500 ед.", price: "44 700 ₽", code: "A11.01.003", nomenclatureName: "Внутримышечное введение лекарственных препаратов (лечение повышенного потоотделения — гипергидроза)", serviceSlug: "botox" },
          { name: "Лечение гипергидроза — Диспорт 300 ед.", price: "28 400 ₽", code: "A11.01.003", nomenclatureName: "Внутримышечное введение лекарственных препаратов (лечение повышенного потоотделения — гипергидроза)", serviceSlug: "botox" },
        ],
      },
      {
        title: "Контурная пластика (филлеры)",
        items: [
          { name: "Radiesse 1.5 мл, США", price: "35 000 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "Radiesse 3.0 мл, США", price: "66 000 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "Belotero soft 1 мл, Германия", price: "23 000 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "Belotero balance + лидокаин 1 мл, Германия", price: "23 100 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "Belotero lip contour 0.6 мл, Германия", price: "17 000 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "Belotero lip shape 0.6 мл, Германия", price: "17 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "Belotero intens 1 мл, Германия", price: "24 000 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "ART FILLER Fine lines 1 мл, Бельгия", price: "22 100 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "ART FILLER Universal 1.2 мл, Бельгия", price: "25 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "ART FILLER Lips 1 мл, Бельгия", price: "25 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "ART FILLER Volume 1.2 мл, Бельгия", price: "28 800 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "Сферогель Long Advanced 0.7 мл, Бельгия", price: "17 400 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "Stylage М 1 мл, Франция", price: "22 800 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "Repart PLA", price: "38 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "Лонгидаза, Россия", price: "4 800 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы" },
          { name: "MiraLine DEEP с лидокаином", price: "13 700 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "MiraLine DEEP", price: "13 700 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "ИАЛ-СИСТЕМ 1.1 мл", price: "13 200 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "ИАЛ-СИСТЕМ АСР 1.0 мл", price: "17 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "PLINEST", price: "19 000 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "Eldermafill PLA", price: "31 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "JUFORA ULTRALINK M 1 мл", price: "13 200 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "JUFORA ULTRALINK L 1 мл", price: "14 700 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "JUFORA 1 мл", price: "4 750 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "JUFORA 3 мл", price: "10 600 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "fillers" },
          { name: "Использование канюли в процедуре", price: "1 700 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы" },
        ],
      },
      {
        title: "Плазмотерапия",
        items: [
          { name: "Plasmoactive 1 пробирка", price: "5 500 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "plasmolifting" },
          { name: "Plasmoactive 2 пробирки", price: "7 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "plasmolifting" },
          { name: "Plasmoactive 3 пробирки", price: "10 100 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "plasmolifting" },
          { name: "Plasmoactive 1 пробирка Плазмогель", price: "9 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "plasmolifting" },
          { name: "Plasmoactive 2 пробирки Плазмогель", price: "14 600 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "plasmolifting" },
          { name: "Plasmoactive 3 пробирки Плазмогель", price: "19 000 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "plasmolifting" },
          { name: "Plasmoactive 4 пробирки Плазмогель", price: "22 100 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "plasmolifting" },
          { name: "PRP-терапия", price: "13 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы — PRP-терапия)", serviceSlug: "plasmolifting" },
        ],
      },
      {
        title: "Липолитики",
        items: [
          { name: "Липолитики 5 мл", price: "5 300 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "lipolytics" },
          { name: "Липолитики 10 мл", price: "9 000 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "lipolytics" },
          { name: "Липолитики 15 мл", price: "12 300 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "lipolytics" },
        ],
      },
      {
        title: "Коллагенотерапия Коллост",
        items: [
          { name: "Тест-проба Коллост", price: "3 500 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы" },
          { name: "Гель Коллост 7% 1,0 мл", price: "13 200 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы" },
          { name: "Гель Коллост 7% 0,5 мл", price: "10 600 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы" },
          { name: "Гель Коллост 7% 1,5 мл", price: "15 300 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы" },
          { name: "Гель Коллост Микро 150 мг", price: "22 600 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы" },
          { name: "Гель Коллост 15% 1,5 мл", price: "23 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы" },
          { name: "Сферогель Long FINE 0.5 мл", price: "19 800 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы" },
          { name: "Сферогель Medium 1 шпр.", price: "11 600 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы" },
          { name: "Сферогель Medium 2 шпр.", price: "20 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы" },
        ],
      },
      {
        title: "Нитевой лифтинг",
        items: [
          { name: "PDO MONO (10 шт)", price: "от 7 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", variablePriceReason: "Стоимость зависит от количества нитей и зоны введения", serviceSlug: "thread-lifting" },
          { name: "PLLA MONO (10 шт)", price: "от 10 500 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", variablePriceReason: "Стоимость зависит от количества нитей и зоны введения", serviceSlug: "thread-lifting" },
          { name: "PLLA screw (10 шт)", price: "от 13 700 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", variablePriceReason: "Стоимость зависит от количества нитей и зоны введения", serviceSlug: "thread-lifting" },
          { name: "PLLA double screw (10 шт)", price: "от 17 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", variablePriceReason: "Стоимость зависит от количества нитей и зоны введения", serviceSlug: "thread-lifting" },
          { name: "PDO screw (10 шт)", price: "от 11 600 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", variablePriceReason: "Стоимость зависит от количества нитей и зоны введения", serviceSlug: "thread-lifting" },
          { name: "PDO double screw (10 шт)", price: "от 15 800 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", variablePriceReason: "Стоимость зависит от количества нитей и зоны введения", serviceSlug: "thread-lifting" },
          { name: "Aptos", price: "от 25 000 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", variablePriceReason: "Стоимость зависит от типа нити, количества и зоны введения", serviceSlug: "thread-lifting" },
        ],
      },
    ],
  },
  {
    id: "hardware-cosmetology",
    title: "Аппаратная косметология",
    subcategories: [
      {
        title: "СМАС-лифтинг Ultraformer",
        items: [
          { name: "Ultraformer — 1 линия", price: "130 ₽", code: "A22.30.022", nomenclatureName: "Высокоинтенсивное сфокусированное ультразвуковое воздействие", serviceSlug: "smas-lifting" },
        ],
      },
      {
        title: "Омоложение импульсным спреем (Холодная плазма)",
        items: [
          { name: "Верхние веки", price: "4 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Нижние веки", price: "4 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Морщины вокруг глаз", price: "2 700 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Гусиные лапки", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Верхние и нижние веки", price: "6 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Нос", price: "1 600 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Морщины вокруг рта", price: "2 650 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Околоушные морщины", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Линейные морщины на лбу", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Межбровье", price: "2 100 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Зона лба полностью", price: "5 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Носогубные морщины", price: "2 650 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Лицо (без зоны вокруг глаз)", price: "8 400 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Омоложение лица полностью", price: "10 500 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Шлифовка лица и шеи", price: "15 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Шея", price: "5 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Декольте", price: "5 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Омоложение рук кисти", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Омоложение рук предплечья", price: "4 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Пигментные пятна 1 см²", price: "от 550 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", variablePriceReason: "Стоимость зависит от площади обработки" },
          { name: "Шлифовка шрамов и рубцов до 3 см²", price: "2 650 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Каждый последующий см", price: "320 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Живот (растяжки/подтяжка)", price: "10 500 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Грудь (растяжки/подтяжка)", price: "4 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Бёдра (растяжки/подтяжка)", price: "10 500 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Лечение акне, постакне — щёки", price: "5 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Лечение акне, постакне — подбородок", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Волосистая часть головы", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Обработка ран, ожогов 1 см²", price: "от 550 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", variablePriceReason: "Стоимость зависит от площади обработки" },
          { name: "Обработка ступней (трещины, мозоли)", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Лечение герпеса 1 см²", price: "от 550 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", variablePriceReason: "Стоимость зависит от площади обработки" },
          { name: "Лечение псориаза", price: "от 550 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", variablePriceReason: "Стоимость зависит от площади обработки" },
        ],
      },
      {
        title: "Фотодинамическая терапия (IPL SHARPLIGHT)",
        items: [
          { name: "Лицо (области высыпания)", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Лицо + шея (области высыпания)", price: "8 400 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
        ],
      },
      {
        title: "Микротоковая терапия",
        items: [
          { name: "Интенсивное увлажнение / лимфодренаж", price: "2 350 ₽", code: "A17.01.010", nomenclatureName: "Микротоковое воздействие при заболеваниях кожи и подкожной клетчатки" },
          { name: "При куперозе и розацеа / Антиакне", price: "2 350 ₽", code: "A17.01.010", nomenclatureName: "Микротоковое воздействие при заболеваниях кожи и подкожной клетчатки" },
          { name: "Интенсивный уход: энзимный пилинг, маска, сыворотка, крем", price: "2 200 ₽", code: "A17.01.010", nomenclatureName: "Микротоковое воздействие при заболеваниях кожи и подкожной клетчатки" },
          { name: "Комплексная программа «Суперлифтинг» (2 часа)", price: "6 300 ₽", code: "A17.01.010, А17.01.008", nomenclatureName: "Микротоковое воздействие при заболеваниях кожи и подкожной клетчатки + Воздействие токами ультравысокой частоты на кожу (миостимуляция, RF-лифтинг, ультразвуковой массаж)" },
        ],
      },
      {
        title: "Миостимуляция лица",
        items: [
          { name: "Электростимуляция мышц", price: "2 350 ₽", code: "A17.02.001", nomenclatureName: "Электростимуляция мышц" },
        ],
      },
      {
        title: "Лазерная биоревитализация",
        items: [
          { name: "Лицо", price: "3 200 ₽", code: "A22.01.005", nomenclatureName: "Низкоинтенсивное лазерное облучение кожи" },
          { name: "Лицо + шея", price: "3 700 ₽", code: "A22.01.005", nomenclatureName: "Низкоинтенсивное лазерное облучение кожи" },
          { name: "Лицо + шея + декольте", price: "4 200 ₽", code: "A22.01.005", nomenclatureName: "Низкоинтенсивное лазерное облучение кожи" },
        ],
      },
      {
        title: "Ультразвуковой массаж",
        items: [
          { name: "Лицо, 20 мин", price: "1 100 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Лицо и шея, 30 мин", price: "1 500 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "1 зона (лоб, глаза, щека, подбородок), 10 мин", price: "550 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
        ],
      },
      {
        title: "Радиочастотный RF-лифтинг",
        items: [
          { name: "Лицо", price: "2 700 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Шея", price: "2 100 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Лицо + шея", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Лицо + шея + декольте", price: "4 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Зона вокруг глаз", price: "1 400 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Зона подбородка", price: "1 400 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "RF-лифтинг лица (доп. к другой процедуре)", price: "2 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
        ],
      },
      {
        title: "RF радиочастотный липолиз (термолиполиз)",
        items: [
          { name: "Живот", price: "2 700 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Ягодицы", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Бёдра", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "2 зоны", price: "4 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "3 зоны", price: "5 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "4 зоны", price: "6 400 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Растяжки — зона 10×10", price: "1 100 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Растяжки — зона 20×20", price: "1 950 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Растяжки — зона 30×30", price: "2 650 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
        ],
      },
      {
        title: "Фракционный микроигольчатый RF-лифтинг (Venus Viva)",
        items: [
          { name: "Типса", price: "8 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Верхние и нижние веки", price: "11 600 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Лицо (включая веки)", price: "21 000 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Лоб", price: "11 600 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Лицо (исключая глаза)", price: "17 900 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Щёки", price: "15 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Шея", price: "15 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Декольте", price: "17 900 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Лицо + шея", price: "28 500 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Шея + декольте", price: "27 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Лицо + шея + декольте", price: "38 900 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Растяжки: живот полностью", price: "22 100 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Растяжки: ниже/выше пупка", price: "14 700 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Растяжки: бока", price: "16 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Растяжки: грудь", price: "16 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Растяжки: передняя поверхность бёдер", price: "16 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Растяжки: боковая поверхность бёдер", price: "16 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
          { name: "Растяжки: задняя поверхность бёдер", price: "16 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу" },
        ],
      },
      {
        title: "Фотоомоложение кожи",
        items: [
          { name: "Омоложение лица", price: "8 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Лицо полностью (расширенный протокол)", price: "11 400 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Омоложение шеи", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Омоложение декольте", price: "7 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Омоложение лица и шеи", price: "11 600 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Омоложение лица, шеи и декольте", price: "15 800 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Омоложение области вокруг глаз (скулы)", price: "4 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Омоложение кистей рук", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
        ],
      },
      {
        title: "Фототерапия: удаление пигментации",
        items: [
          { name: "Удаление пигментации на лице", price: "8 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление пигментации — лоб", price: "4 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление пигментации — скулы", price: "4 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление пигментации — щёки", price: "5 400 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление пигментации — подбородок", price: "3 700 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление пигментации на кистях", price: "5 400 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление пигментации (плечо — локоть)", price: "10 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление пигментации (локоть — кисти)", price: "10 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление пигментации на плечах", price: "8 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление пигментации на декольте", price: "7 400 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление пигментации на верхней части спины", price: "12 600 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление пигментного пятна за 1 см", price: "750 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
        ],
      },
      {
        title: "Фототерапия: удаление сосудистых образований",
        items: [
          { name: "1 вспышка", price: "85 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление купероза на носу", price: "3 700 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление купероза на крыльях носа", price: "3 200 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление купероза на щеках", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление купероза на скулах", price: "4 700 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление купероза на подбородке", price: "3 700 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Удаление купероза лица полностью", price: "9 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
        ],
      },
      {
        title: "Термолифтинг инфракрасный",
        items: [
          { name: "Лицо (без лба) + второй подбородок", price: "8 400 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Шея", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Декольте", price: "7 400 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Лицо + шея + декольте", price: "15 800 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Живот", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Внутренняя поверхность бедра", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Внутренняя поверхность рук", price: "3 200 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
          { name: "Ягодицы", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи" },
        ],
      },
      {
        title: "DPC Эпиляция (Sharplight)",
        items: [
          { name: "Подмышечные впадины", price: "3 200 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
          { name: "От кисти до локтя", price: "5 300 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
          { name: "От локтя до плеч", price: "5 300 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
          { name: "Руки полностью", price: "9 500 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
          { name: "Нос", price: "850 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
          { name: "Щёки", price: "1 700 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
          { name: "Верхняя губа", price: "1 300 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
          { name: "Подбородок", price: "1 600 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
          { name: "Классическое бикини (жен.)", price: "4 300 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
          { name: "Глубокое бикини (жен.)", price: "7 400 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
          { name: "Межъягодичная область (жен.)", price: "2 450 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
          { name: "Ягодицы (жен.)", price: "5 300 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
          { name: "Классическое бикини (муж.)", price: "4 300 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
          { name: "Глубокое бикини (муж.)", price: "7 400 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
          { name: "Межъягодичная область (муж.)", price: "2 500 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
          { name: "Ягодицы (муж.)", price: "5 300 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "dpc-epilation" },
        ],
      },
      {
        title: "Лечение грибка ногтей (фототерапия)",
        items: [
          { name: "1 ноготь", price: "1 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи (лечение грибка ногтей с фотосенсибилизатором)" },
          { name: "2 ногтя", price: "1 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи (лечение грибка ногтей с фотосенсибилизатором)" },
          { name: "3 ногтя", price: "1 700 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи (лечение грибка ногтей с фотосенсибилизатором)" },
          { name: "4 ногтя", price: "1 900 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи (лечение грибка ногтей с фотосенсибилизатором)" },
          { name: "5 ногтей", price: "2 100 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи (лечение грибка ногтей с фотосенсибилизатором)" },
          { name: "10 ногтей", price: "2 700 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи (лечение грибка ногтей с фотосенсибилизатором)" },
          { name: "20 ногтей", price: "4 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи (лечение грибка ногтей с фотосенсибилизатором)" },
        ],
      },
      {
        title: "Прессотерапия",
        items: [
          { name: "1 процедура одной зоны (30 мин)", price: "1 700 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия" },
          { name: "3 процедуры одной зоны", price: "3 800 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия" },
          { name: "5 процедур одной зоны", price: "5 300 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия" },
          { name: "10 процедур одной зоны", price: "9 500 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия" },
          { name: "Дополнительно к другим процедурам", price: "790 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия" },
          { name: "Дополнительная зона (1 процедура)", price: "790 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия" },
          { name: "Дополнительная зона (3 процедуры)", price: "650 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия" },
          { name: "Дополнительная зона (5 процедур)", price: "550 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия" },
          { name: "Дополнительная зона (10 процедур)", price: "500 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия" },
        ],
      },
    ],
  },
  {
    id: "skincare",
    title: "Косметологический уход",
    subcategories: [
      {
        title: "Дерматологический пилинг",
        items: [
          { name: "Пилинг Миндальный", price: "3 400 ₽" },
          { name: "Пилинг Салициловый", price: "3 400 ₽" },
          { name: "Пилинг Азелаиновый", price: "3 400 ₽" },
          { name: "Пилинг Джеснера", price: "4 350 ₽" },
          { name: "Пилинг Ретиноловый", price: "6 300 ₽" },
          { name: "Азелаиновый Anti-acne спины", price: "5 300 ₽" },
          { name: "Крем-пилинг ретинол (в протоколе пилинга)", price: "1 300 ₽" },
          { name: "Пилинг осветляющий", price: "4 800 ₽" },
          { name: "Омолаживающий для зоны вокруг глаз", price: "900 ₽" },
          { name: "Доп. омолаживающий для зоны вокруг глаз", price: "650 ₽" },
          { name: "Пилинг как дополнительная к основной процедуре", price: "2 400 ₽" },
        ],
      },
      {
        title: "Чистка лица",
        items: [
          { name: "Чистка лица атравматичная, ультразвуковая", price: "3 200 ₽" },
          { name: "Чистка лица механическая", price: "3 700 ₽" },
          { name: "Комбинированная чистка лица", price: "4 500 ₽" },
          { name: "Комбинированная чистка лица (Павлюк М.О.)", price: "8 500 ₽" },
          { name: "Лечебная чистка при акне", price: "4 800 ₽" },
          { name: "Чистка кожи спины", price: "5 700 ₽" },
          { name: "Пилинг доп. к чистке лица", price: "2 400 ₽" },
        ],
      },
      {
        title: "Массаж лица",
        items: [
          { name: "Программа для подтяжки лица (60 мин)", price: "2 200 ₽" },
          { name: "Классический массаж лица (30 мин)", price: "1 350 ₽" },
          { name: "Криомассаж кожи", price: "1 200 ₽" },
          { name: "Ультразвуковой массаж лица (15 мин)", price: "1 200 ₽" },
          { name: "Комплексная программа моделирования овала лица (классический)", price: "6 200 ₽" },
          { name: "Комплексная программа моделирования овала лица (миофасциальный)", price: "7 200 ₽" },
        ],
      },
      {
        title: "Лечебный массаж",
        items: [
          { name: "Общий массаж (до 120 кг), 60 мин", price: "2 500 ₽" },
          { name: "Общий массаж (более 120 кг), 60 мин", price: "2 800 ₽" },
          { name: "Массаж спины (до 120 кг)", price: "1 000 ₽" },
          { name: "Массаж спины (более 120 кг)", price: "1 250 ₽" },
          { name: "Массаж шеи + воротниковая область (15 мин)", price: "700 ₽" },
          { name: "Массаж рук (обе)", price: "800 ₽" },
          { name: "Массаж руки (одна)", price: "400 ₽" },
          { name: "Детский массаж (1–3 года)", price: "900 ₽" },
          { name: "Детский массаж (4–5 лет)", price: "1 200 ₽" },
          { name: "Детский массаж (7–11 лет)", price: "1 500 ₽" },
          { name: "Детский массаж (12–14 лет)", price: "1 900 ₽" },
          { name: "Массаж спины детский (1–6 лет)", price: "700 ₽" },
          { name: "Массаж спины детский (7–11 лет)", price: "800 ₽" },
          { name: "Массаж спины детский (12–14 лет)", price: "900 ₽" },
          { name: "Антицеллюлитный/лимфодренажный массаж (60 мин)", price: "2 800 ₽" },
          { name: "Комплексная антицеллюлитная программа", price: "8 450 ₽" },
        ],
      },
    ],
  },
  {
    id: "dietology",
    title: "Диетология",
    subcategories: [
      {
        title: "Приём врача-диетолога",
        items: [
          { name: "Приём врача-диетолога первичный", price: "4 300 ₽", bookable: true },
          { name: "Приём врача-диетолога повторный", price: "4 300 ₽", bookable: true },
          { name: "Приём врача-диетолога + биоимпедансометрия (первичный)", price: "7 000 ₽", bookable: true },
          { name: "Приём врача-диетолога + биоимпедансометрия (повторный)", price: "7 000 ₽", bookable: true },
          { name: "Биоимпедансометрия", price: "2 700 ₽" },
          { name: "Биоимпедансометрия + приём врача-диетолога первичный", price: "5 000 ₽", bookable: true },
          { name: "Генетический тест «Диетология» + консультация", price: "22 900 ₽" },
          { name: "Программа индивидуальной диетотерапии", price: "19 000 ₽" },
          { name: "Программа похудения «Соло»", price: "28 000 ₽" },
          { name: "Программа похудения «Дуэт»", price: "40 000 ₽" },
          { name: "Программа похудения «Трио»", price: "60 000 ₽" },
        ],
      },
    ],
  },
  {
    id: "therapy",
    title: "Терапия",
    subcategories: [
      {
        title: "Приём врача-терапевта",
        items: [
          { name: "Приём врача-терапевта первичный", price: "4 000 ₽", bookable: true },
          { name: "Приём врача-терапевта повторный (в течение 1 мес.)", price: "4 000 ₽", bookable: true },
        ],
      },
    ],
  },
  {
    id: "osteopathy",
    title: "Остеопатия",
    subcategories: [
      {
        title: "Приём врача-остеопата",
        items: [
          { name: "Приём врача-остеопата первичный + остеопатическая коррекция", price: "6 500 ₽", bookable: true },
          { name: "Приём врача-остеопата повторный + остеопатическая коррекция", price: "6 500 ₽", bookable: true },
          { name: "Приём врача-остеопата (дети до 12 лет) первичный", price: "6 500 ₽", bookable: true },
          { name: "Приём врача-остеопата (дети до 12 лет) повторный", price: "6 500 ₽", bookable: true },
        ],
      },
    ],
  },
  {
    id: "neurology",
    title: "Неврология",
    subcategories: [
      {
        title: "Приём врача-невролога",
        items: [
          { name: "Приём врача-невролога первичный", price: "2 500 ₽", bookable: true },
          { name: "Приём врача-невролога повторный", price: "2 500 ₽", bookable: true },
        ],
      },
    ],
  },
  {
    id: "genetics",
    title: "Генетические панели",
    subcategories: [
      {
        title: "Генетическое тестирование",
        items: [
          { name: "Базовый генетический тест «Косметология» (45 генов)", price: "15 800 ₽" },
          { name: "Панель «Трихология» (24 гена)", price: "13 700 ₽" },
          { name: "Панель «Диетология» (48 генов)", price: "17 900 ₽" },
          { name: "Панель «Активное долголетие» (62 гена)", price: "17 900 ₽" },
          { name: "Консультация врача по результатам тестирования", price: "5 000 ₽", bookable: true },
        ],
      },
    ],
  },
  {
    id: "household",
    title: "Бытовые услуги",
    subcategories: [
      {
        title: "Дополнительные услуги",
        items: [
          { name: "Уход за кожей рук (парафинотерапия, массаж, крем)", price: "650 ₽" },
          { name: "Уход за кожей рук (доп. к процедуре)", price: "350 ₽" },
          { name: "Уход за кожей вокруг глаз (увлажнение)", price: "1 100 ₽" },
          { name: "Уход за кожей вокруг глаз (доп. к процедуре)", price: "650 ₽" },
          { name: "Альгинатная маска", price: "1 100 ₽" },
          { name: "Альгинатная маска (доп. к процедуре)", price: "750 ₽" },
          { name: "Скраб тела (по типу кожи)", price: "1 600 ₽" },
          { name: "Обёртывание тела", price: "1 600 ₽" },
          { name: "Антигравитационная маска", price: "2 000 ₽" },
          { name: "Интенсивный уход: энзимный пилинг, маска, сыворотка, крем", price: "2 400 ₽" },
          { name: "Биомеханический массаж лица (БМС)", price: "2 700 ₽" },
        ],
      },
    ],
  },
];

/** Flat list of all items across all categories for search */
export function getAllPriceItems(): (PriceItem & { categoryTitle: string; subcategoryTitle: string; categoryId: string })[] {
  const result: (PriceItem & { categoryTitle: string; subcategoryTitle: string; categoryId: string })[] = [];
  for (const cat of priceCategories) {
    for (const sub of cat.subcategories) {
      for (const item of sub.items) {
        result.push({ ...item, categoryTitle: cat.title, subcategoryTitle: sub.title, categoryId: cat.id });
      }
    }
  }
  return result;
}

/** Search items by name, category, subcategory, OR nomenclature code */
export function searchPriceItems(
  items: ReturnType<typeof getAllPriceItems>,
  query: string
): ReturnType<typeof getAllPriceItems> {
  const q = query.toLowerCase().trim();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.categoryTitle.toLowerCase().includes(q) ||
      item.subcategoryTitle.toLowerCase().includes(q) ||
      (item.code && item.code.toLowerCase().includes(q)) ||
      (item.nomenclatureName && item.nomenclatureName.toLowerCase().includes(q))
  );
}

/** Total number of price items */
export function getTotalPriceCount(): number {
  return priceCategories.reduce((total, cat) =>
    total + cat.subcategories.reduce((s, sub) => s + sub.items.length, 0), 0);
}
