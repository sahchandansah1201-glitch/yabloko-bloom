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
          { name: "Приём врача-дерматовенеролога первичный (Аллам А.Х.)", price: "3 000 ₽", code: "B01.008.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога первичный", bookable: true, doctorSlug: "allam", serviceSlug: "consult-derm" },
          { name: "Приём врача-дерматовенеролога повторный (Аллам А.Х.)", price: "3 000 ₽", code: "B01.008.002", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога повторный", bookable: true, doctorSlug: "allam", serviceSlug: "consult-derm" },
          { name: "Приём врача-дерматовенеролога первичный (Райкова С.А.)", price: "2 700 ₽", code: "B01.008.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога первичный", bookable: true, doctorSlug: "raykova", serviceSlug: "consult-derm" },
          { name: "Приём врача-дерматовенеролога повторный (Райкова С.А.)", price: "2 700 ₽", code: "B01.008.002", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога повторный", bookable: true, doctorSlug: "raykova", serviceSlug: "consult-derm" },
          { name: "Приём врача-дерматовенеролога первичный (Грачева В.С.)", price: "2 500 ₽", code: "B01.008.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога первичный", bookable: true, doctorSlug: "gracheva", serviceSlug: "consult-derm" },
          { name: "Приём врача-дерматовенеролога повторный (Грачева В.С.)", price: "2 500 ₽", code: "B01.008.002", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога повторный", bookable: true, doctorSlug: "gracheva", serviceSlug: "consult-derm" },
          { name: "Приём врача-дерматовенеролога первичный (Павлюк М.О.)", price: "4 500 ₽", code: "B01.008.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога первичный", bookable: true, doctorSlug: "pavlyuk", serviceSlug: "consult-derm" },
          { name: "Приём врача-дерматовенеролога повторный (Павлюк М.О.)", price: "4 500 ₽", code: "B01.008.002", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога повторный", bookable: true, doctorSlug: "pavlyuk", serviceSlug: "consult-derm" },
        ],
      },
      {
        title: "Дерматоскопия",
        items: [
          { name: "Дерматоскопия", price: "1 700 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия)", serviceSlug: "consult-derm" },
          { name: "Дерматоскопия при удалении новообразования (электрокоагуляция)", price: "850 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия) при удалении новообразования методом электрокоагуляции", serviceSlug: "consult-derm" },
          { name: "Дерматоскопия при удалении новообразования", price: "400 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия) при удалении новообразования", serviceSlug: "consult-derm" },
          { name: "Картирование цифровым дерматоскопом (выборочный скрининг)", price: "4 300 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия) — картирование цифровым дерматоскопом (выборочный скрининг)", serviceSlug: "consult-derm" },
          { name: "Картирование цифровым дерматоскопом (тотальный скрининг)", price: "10 500 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия) — картирование цифровым дерматоскопом (тотальный скрининг)", serviceSlug: "consult-derm" },
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
          { name: "Дерматоскопия", price: "1 700 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия)", serviceSlug: "udalenie-papillom" },
          { name: "Первичная обработка — бородавка до 0,3 см", price: "1 200 ₽", code: "A24.01.004", nomenclatureName: "Криодеструкция кожи", serviceSlug: "udalenie-papillom" },
          { name: "Бородавка 0,4–0,5 см", price: "1 500 ₽", code: "A24.01.004", serviceSlug: "udalenie-papillom" },
          { name: "Бородавка 0,6–1 см", price: "1 800 ₽", code: "A24.01.004", serviceSlug: "udalenie-papillom" },
          { name: "Бородавка 1,1–1,5 см", price: "2 300 ₽", code: "A24.01.004", serviceSlug: "udalenie-papillom" },
          { name: "Повторная обработка — бородавка до 0,3 см", price: "700 ₽", code: "A24.01.004", serviceSlug: "udalenie-papillom" },
          { name: "Повторная — бородавка 0,4–0,5 см", price: "1 000 ₽", code: "A24.01.004", serviceSlug: "udalenie-papillom" },
          { name: "Повторная — бородавка 0,6–1 см", price: "1 700 ₽", code: "A24.01.004", serviceSlug: "udalenie-papillom" },
          { name: "Повторная — бородавка 1,1–1,5 см", price: "2 200 ₽", code: "A24.01.004", serviceSlug: "udalenie-papillom" },
        ],
      },
      {
        title: "Электрокоагуляция",
        items: [
          { name: "Папиллома 1 шт", price: "1 600 ₽", code: "А16.01.017.001", nomenclatureName: "Удаление доброкачественных новообразований кожи методом электрокоагуляции", serviceSlug: "udalenie-papillom" },
          { name: "Папиллома 2 шт", price: "1 200 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Папиллома 3–5 шт", price: "800 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Папиллома 6–10 шт", price: "600 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Папиллома более 10 шт", price: "500 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Папиллома в паху", price: "1 700 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Папиллома на гениталиях", price: "1 700 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Папилломатозный невус до 0,5 см", price: "1 700 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Мелкие папилломы до 0,1 см (40–60 шт)", price: "12 200 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Мелкие папилломы до 0,1 см (61–80 шт)", price: "17 000 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Папиллома в области век", price: "2 000 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Родинки, невусы, фибромы, кератомы до 0,5 см", price: "1 700 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Родинки, невусы, фибромы, кератомы 0,5–1 см", price: "2 200 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Родинки, невусы, фибромы, кератомы более 1 см", price: "2 800 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Бородавки до 0,3 см", price: "1 600 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Бородавки 0,3–0,5 см", price: "2 000 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Бородавки 0,5–1 см", price: "2 800 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Бородавки 1–2 см", price: "3 300 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Бородавка стопы до 0,3 см", price: "1 700 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Бородавка стопы до 1 см", price: "3 300 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Бородавка стопы до 2 см", price: "4 000 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Удаление гемангиомы до 0,5 см", price: "1 600 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Удаление ксантелазма века до 0,5 см", price: "1 900 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Удаление ксантелазма века до 1 см", price: "3 000 ₽", code: "А16.01.017.001", serviceSlug: "udalenie-papillom" },
          { name: "Удаление контагиозных моллюсков до 0,3 см", price: "900 ₽", code: "A16.01.020", serviceSlug: "udalenie-papillom" },
          { name: "Удаление контагиозных моллюсков до 0,5 см", price: "1 200 ₽", code: "A16.01.020", serviceSlug: "udalenie-papillom" },
          { name: "Удаление милиумов 1 шт", price: "600 ₽", code: "A14.01.010", serviceSlug: "udalenie-papillom" },
          { name: "Удаление сосудистой мальформации за 1 см", price: "900 ₽", code: "A16.01.013", serviceSlug: "udalenie-papillom" },
          { name: "Удаление звёздчатой ангиомы за 1 см", price: "1 200 ₽", code: "A16.01.014", serviceSlug: "udalenie-papillom" },
          { name: "Удаление телеангиоэктазий за 1 см", price: "1 000 ₽", code: "A16.01.015", serviceSlug: "udalenie-papillom" },
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
          { name: "Приём трихолога первичный (Аллам А.Х.) + дерматоскопия", price: "4 500 ₽", code: "B01.008.001, А03.01.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога первичный + Осмотр кожи под увеличением (дерматоскопия)", bookable: true, doctorSlug: "allam", serviceSlug: "consult-triho" },
          { name: "Приём трихолога повторный (Аллам А.Х.) + дерматоскопия", price: "4 500 ₽", code: "B01.008.002, А03.01.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога повторный + Осмотр кожи под увеличением (дерматоскопия)", bookable: true, doctorSlug: "allam", serviceSlug: "consult-triho" },
          { name: "Приём трихолога первичный (Павлюк М.О.) + дерматоскопия", price: "6 000 ₽", code: "B01.008.001, А03.01.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога первичный + Осмотр кожи под увеличением (дерматоскопия)", bookable: true, doctorSlug: "pavlyuk", serviceSlug: "consult-triho" },
          { name: "Приём трихолога повторный (Павлюк М.О.) + дерматоскопия", price: "6 000 ₽", code: "B01.008.002, А03.01.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога повторный + Осмотр кожи под увеличением (дерматоскопия)", bookable: true, doctorSlug: "pavlyuk", serviceSlug: "consult-triho" },
          { name: "Приём трихолога первичный (Райкова С.А.) + дерматоскопия", price: "3 000 ₽", code: "B01.008.001, А03.01.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога первичный + Осмотр кожи под увеличением (дерматоскопия)", bookable: true, doctorSlug: "raykova", serviceSlug: "consult-triho" },
          { name: "Приём трихолога повторный (Райкова С.А.) + дерматоскопия", price: "3 000 ₽", code: "B01.008.002, А03.01.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога повторный + Осмотр кожи под увеличением (дерматоскопия)", bookable: true, doctorSlug: "raykova", serviceSlug: "consult-triho" },
          { name: "Трихограмма", price: "2 600 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия) — Трихограмма", serviceSlug: "consult-triho" },
        ],
      },
      {
        title: "Фототрихограмма",
        items: [
          { name: "Фототрихограмма — 1 этап", price: "700 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия) — 1 этап (Фототрихограмма)", serviceSlug: "diagnostika-volos" },
          { name: "Фототрихограмма — 2 этап", price: "2 600 ₽", code: "А03.01.001", nomenclatureName: "Осмотр кожи под увеличением (дерматоскопия) — 2 этап (Фототрихограмма)", serviceSlug: "diagnostika-volos" },
        ],
      },
      {
        title: "Лечение выпадения волос",
        items: [
          { name: "Hair X с пептидами 2 мл (шприц), Россия", price: "9 700 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "inyektsionnaya-trikhologiya" },
          { name: "Hair X 2 мл (флакон)", price: "4 000 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "inyektsionnaya-trikhologiya" },
          { name: "Gag Complex DVL CAPYL 1,0 мл", price: "3 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "inyektsionnaya-trikhologiya" },
          { name: "Плазмолифтинг 1 пробирка (Россия)", price: "5 500 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "inyektsionnaya-trikhologiya" },
          { name: "Плазмолифтинг 2 пробирки (Россия)", price: "7 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "inyektsionnaya-trikhologiya" },
          { name: "PRP-терапия 1 пробирка (Корея)", price: "13 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы — PRP-терапия)", serviceSlug: "inyektsionnaya-trikhologiya" },
          { name: "Лечение очаговой алопеции (Бетаметазон)", price: "4 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "inyektsionnaya-trikhologiya" },
          { name: "Дерматологический пилинг (Time to grow)", price: "3 300 ₽", code: "А16.01.024", nomenclatureName: "Дерматологический пилинг", serviceSlug: "inyektsionnaya-trikhologiya" },
          { name: "Ультразвуковая безинъекционная мезотерапия кожи головы", price: "3 300 ₽", code: "A22.01.001", nomenclatureName: "Ультразвуковое лечение кожи (безинъекционная мезотерапия кожи волосистой части головы)", serviceSlug: "inyektsionnaya-trikhologiya" },
          { name: "Ультразвуковой пилинг волосистой части головы", price: "3 300 ₽", code: "A22.01.001", nomenclatureName: "Ультразвуковое лечение кожи (ультразвуковой пилинг волосистой части головы)", serviceSlug: "inyektsionnaya-trikhologiya" },
          { name: "Обработка импульсным спреем волосистой части головы", price: "3 200 ₽", code: "A17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу (обработка импульсным спреем волосистой части головы)", serviceSlug: "inyektsionnaya-trikhologiya" },
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
          { name: "Приём врача-дерматовенеролога (первичный), нутрициолога", price: "5 300 ₽", code: "B01.008.001", nomenclatureName: "Приём (осмотр, консультация) врача-дерматовенеролога (первичный), нутрициолога", bookable: true, serviceSlug: "nutritsiolog" },
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
          { name: "Приём врача-косметолога первичный", price: "1 600 ₽", code: "В01.008.003", nomenclatureName: "Приём (осмотр, консультация) врача-косметолога первичный", bookable: true, serviceSlug: "consult-cosm" },
          { name: "Приём врача-косметолога первичный (Павлюк М.О.)", price: "2 200 ₽", code: "В01.008.003", nomenclatureName: "Приём (осмотр, консультация) врача-косметолога первичный", bookable: true, doctorSlug: "pavlyuk", serviceSlug: "consult-cosm" },
          { name: "Приём врача-косметолога повторный", price: "1 600 ₽", code: "B01.008.004", nomenclatureName: "Приём (осмотр, консультация) врача-косметолога повторный", bookable: true, serviceSlug: "consult-cosm" },
          { name: "Приём врача-косметолога повторный (Павлюк М.О.)", price: "2 200 ₽", code: "B01.008.004", nomenclatureName: "Приём (осмотр, консультация) врача-косметолога повторный", bookable: true, doctorSlug: "pavlyuk", serviceSlug: "consult-cosm" },
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
          { name: "Гиалуформ Мезолифт 1.8% 2 мл, Россия", price: "9 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "HydroLine extra (Гидролайн), Россия 4 мл", price: "10 600 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "HydroLine extra (Гидролайн), Россия 1 мл", price: "4 400 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "Jalupro HMW 2,5 мл, Италия", price: "17 900 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "HYALREPAIR-02 BIOREPARANT 1.5 мл", price: "15 300 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "HYALREPAIR-04 BIOREPARANT 1.5 мл", price: "15 300 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "HYALREPAIR-07 BIOREPARANT 2.5 мл", price: "9 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "HYALREPAIR-10 BIOREPARANT FORTE 2.5 мл", price: "9 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "HYALREPAIR 7 или 10 BIOREPARANT FORTE 1 мл", price: "4 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "NucleoSpire DNA-RNA 1% 1,3 мл", price: "9 000 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "NucleoSpire DNA-RNA 2% 2 мл", price: "15 700 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "РЕВИ eye стерильный 1.0% 1 мл", price: "14 700 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "РЕВИ Силк стерильный 1.2% 1 мл", price: "15 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "РЕВИ Силк стерильный 1.2% 2 мл", price: "20 500 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "РЕВИ Стронг стерильный 1.5% 1 мл", price: "16 300 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "РЕВИ Стронг стерильный 1.5% 2 мл", price: "22 100 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "РЕВИ Стайл стерильный 1.0% 1 мл", price: "12 600 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "РЕВИ Стайл стерильный 1.0% 2 мл", price: "16 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "NCTF 135 HA Франция 3 мл", price: "13 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "NCTF 135 HA Франция 1,5 мл", price: "8 500 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "Бетаметазон д/инъекций 1 мл", price: "4 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов" },
          { name: "Сферогель Long FINE 0.5 мл", price: "19 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "Сферогель Medium 1 шпр.", price: "11 600 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "Сферогель Medium 2 шпр.", price: "20 900 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "MiriLine Hydro 1 мл", price: "13 700 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "Meso-Wharton P199", price: "21 500 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "Meso-Xanthin P199 1.5 мл", price: "21 500 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "MESOSCULPT C71 1 мл шприц", price: "18 900 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "PROFHILO 2 мл, Италия", price: "27 000 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "BioHyalux MEVITA C 4 мл", price: "13 700 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "BioHyalux MEVITA C 2 мл", price: "8 500 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "BioHyalux MEVITA C 1 мл", price: "3 150 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "biorevitalizatsiya" },
          { name: "Фракционная мезотерапия «Сияние и ровный тон» (Дермапен) 1 мл", price: "7 400 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (фракционная мезотерапия лица «Сияние и ровный тон» — Дермапен)", serviceSlug: "biorevitalizatsiya" },
        ],
      },
      {
        title: "Ботулотоксин",
        items: [
          { name: "Диспорт, 1 ед. Франция (до 30 ед.)", price: "147 ₽", code: "A11.01.003", nomenclatureName: "Внутримышечное введение лекарственных препаратов (коррекция мимических морщин препаратом ботулотоксина типа А)", serviceSlug: "botoks" },
          { name: "Лечение гипергидроза — Диспорт 500 ед.", price: "44 700 ₽", code: "A11.01.003", nomenclatureName: "Внутримышечное введение лекарственных препаратов (лечение повышенного потоотделения — гипергидроза)", serviceSlug: "botoks" },
          { name: "Лечение гипергидроза — Диспорт 300 ед.", price: "28 400 ₽", code: "A11.01.003", nomenclatureName: "Внутримышечное введение лекарственных препаратов (лечение повышенного потоотделения — гипергидроза)", serviceSlug: "botoks" },
        ],
      },
      {
        title: "Контурная пластика (филлеры)",
        items: [
          { name: "Radiesse 1.5 мл, США", price: "35 000 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "Radiesse 3.0 мл, США", price: "66 000 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "Belotero soft 1 мл, Германия", price: "23 000 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "Belotero balance + лидокаин 1 мл, Германия", price: "23 100 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "Belotero lip contour 0.6 мл, Германия", price: "17 000 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "Belotero lip shape 0.6 мл, Германия", price: "17 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "Belotero intens 1 мл, Германия", price: "24 000 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "ART FILLER Fine lines 1 мл, Бельгия", price: "22 100 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "ART FILLER Universal 1.2 мл, Бельгия", price: "25 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "ART FILLER Lips 1 мл, Бельгия", price: "25 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "ART FILLER Volume 1.2 мл, Бельгия", price: "28 800 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "Сферогель Long Advanced 0.7 мл, Бельгия", price: "17 400 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "Stylage М 1 мл, Франция", price: "22 800 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "Repart PLA", price: "38 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "Лонгидаза, Россия", price: "4 800 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы" },
          { name: "MiraLine DEEP с лидокаином", price: "13 700 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "MiraLine DEEP", price: "13 700 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "ИАЛ-СИСТЕМ 1.1 мл", price: "13 200 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "ИАЛ-СИСТЕМ АСР 1.0 мл", price: "17 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "PLINEST", price: "19 000 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "Eldermafill PLA", price: "31 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "JUFORA ULTRALINK M 1 мл", price: "13 200 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "JUFORA ULTRALINK L 1 мл", price: "14 700 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "JUFORA 1 мл", price: "4 750 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "JUFORA 3 мл", price: "10 600 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "konturnaya-plastika" },
          { name: "Использование канюли в процедуре", price: "1 700 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы" },
        ],
      },
      {
        title: "Плазмотерапия",
        items: [
          { name: "Plasmoactive 1 пробирка", price: "5 500 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "plazmoterapiya" },
          { name: "Plasmoactive 2 пробирки", price: "7 800 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "plazmoterapiya" },
          { name: "Plasmoactive 3 пробирки", price: "10 100 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "plazmoterapiya" },
          { name: "Plasmoactive 1 пробирка Плазмогель", price: "9 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "plazmoterapiya" },
          { name: "Plasmoactive 2 пробирки Плазмогель", price: "14 600 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "plazmoterapiya" },
          { name: "Plasmoactive 3 пробирки Плазмогель", price: "19 000 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "plazmoterapiya" },
          { name: "Plasmoactive 4 пробирки Плазмогель", price: "22 100 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы)", serviceSlug: "plazmoterapiya" },
          { name: "PRP-терапия", price: "13 200 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов (введение аутологичной плазмы — PRP-терапия)", serviceSlug: "plazmoterapiya" },
        ],
      },
      {
        title: "Липолитики",
        items: [
          { name: "Липолитики 5 мл", price: "5 300 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "mezoterapiya-tela" },
          { name: "Липолитики 10 мл", price: "9 000 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "mezoterapiya-tela" },
          { name: "Липолитики 15 мл", price: "12 300 ₽", code: "А11.01.003", nomenclatureName: "Внутрикожное введение лекарственных препаратов", serviceSlug: "mezoterapiya-tela" },
        ],
      },
      {
        title: "Коллагенотерапия Коллост",
        items: [
          { name: "Тест-проба Коллост", price: "3 500 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "kolostoterapiya" },
          { name: "Гель Коллост 7% 1,0 мл", price: "13 200 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "kolostoterapiya" },
          { name: "Гель Коллост 7% 0,5 мл", price: "10 600 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "kolostoterapiya" },
          { name: "Гель Коллост 7% 1,5 мл", price: "15 300 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "kolostoterapiya" },
          { name: "Гель Коллост Микро 150 мг", price: "22 600 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "kolostoterapiya" },
          { name: "Гель Коллост 15% 1,5 мл", price: "23 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "kolostoterapiya" },
          { name: "Сферогель Long FINE 0.5 мл", price: "19 800 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "kolostoterapiya" },
          { name: "Сферогель Medium 1 шпр.", price: "11 600 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "kolostoterapiya" },
          { name: "Сферогель Medium 2 шпр.", price: "20 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", serviceSlug: "kolostoterapiya" },
        ],
      },
      {
        title: "Нитевой лифтинг",
        items: [
          { name: "PDO MONO (10 шт)", price: "от 7 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", variablePriceReason: "Стоимость зависит от количества нитей и зоны введения", serviceSlug: "nitevoy-lifting" },
          { name: "PLLA MONO (10 шт)", price: "от 10 500 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", variablePriceReason: "Стоимость зависит от количества нитей и зоны введения", serviceSlug: "nitevoy-lifting" },
          { name: "PLLA screw (10 шт)", price: "от 13 700 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", variablePriceReason: "Стоимость зависит от количества нитей и зоны введения", serviceSlug: "nitevoy-lifting" },
          { name: "PLLA double screw (10 шт)", price: "от 17 900 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", variablePriceReason: "Стоимость зависит от количества нитей и зоны введения", serviceSlug: "nitevoy-lifting" },
          { name: "PDO screw (10 шт)", price: "от 11 600 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", variablePriceReason: "Стоимость зависит от количества нитей и зоны введения", serviceSlug: "nitevoy-lifting" },
          { name: "PDO double screw (10 шт)", price: "от 15 800 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", variablePriceReason: "Стоимость зависит от количества нитей и зоны введения", serviceSlug: "nitevoy-lifting" },
          { name: "Aptos", price: "от 25 000 ₽", code: "А11.01.013", nomenclatureName: "Введение искусственных наполнителей в мягкие ткани с целью коррекции формы", variablePriceReason: "Стоимость зависит от типа нити, количества и зоны введения", serviceSlug: "nitevoy-lifting" },
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
          { name: "Верхние веки", price: "4 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Нижние веки", price: "4 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Морщины вокруг глаз", price: "2 700 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Гусиные лапки", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Верхние и нижние веки", price: "6 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Нос", price: "1 600 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Морщины вокруг рта", price: "2 650 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Околоушные морщины", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Линейные морщины на лбу", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Межбровье", price: "2 100 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Зона лба полностью", price: "5 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Носогубные морщины", price: "2 650 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Лицо (без зоны вокруг глаз)", price: "8 400 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Омоложение лица полностью", price: "10 500 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Шлифовка лица и шеи", price: "15 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Шея", price: "5 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Декольте", price: "5 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Омоложение рук кисти", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Омоложение рук предплечья", price: "4 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Пигментные пятна 1 см²", price: "от 550 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", variablePriceReason: "Стоимость зависит от площади обработки", serviceSlug: "kholodnaya-plazma" },
          { name: "Шлифовка шрамов и рубцов до 3 см²", price: "2 650 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Каждый последующий см", price: "320 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Живот (растяжки/подтяжка)", price: "10 500 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Грудь (растяжки/подтяжка)", price: "4 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Бёдра (растяжки/подтяжка)", price: "10 500 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Лечение акне, постакне — щёки", price: "5 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Лечение акне, постакне — подбородок", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Волосистая часть головы", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Обработка ран, ожогов 1 см²", price: "от 550 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", variablePriceReason: "Стоимость зависит от площади обработки", serviceSlug: "kholodnaya-plazma" },
          { name: "Обработка ступней (трещины, мозоли)", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "kholodnaya-plazma" },
          { name: "Лечение герпеса 1 см²", price: "от 550 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", variablePriceReason: "Стоимость зависит от площади обработки", serviceSlug: "kholodnaya-plazma" },
          { name: "Лечение псориаза", price: "от 550 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", variablePriceReason: "Стоимость зависит от площади обработки", serviceSlug: "kholodnaya-plazma" },
        ],
      },
      {
        title: "Фотодинамическая терапия (IPL SHARPLIGHT)",
        items: [
          { name: "Лицо (области высыпания)", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "fotoомоlozhenie" },
          { name: "Лицо + шея (области высыпания)", price: "8 400 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "fotoомоlozhenie" },
        ],
      },
      {
        title: "Микротоковая терапия",
        items: [
          { name: "Интенсивное увлажнение / лимфодренаж", price: "2 350 ₽", code: "A17.01.010", nomenclatureName: "Микротоковое воздействие при заболеваниях кожи и подкожной клетчатки", serviceSlug: "mikrotokovaya-terapiya" },
          { name: "При куперозе и розацеа / Антиакне", price: "2 350 ₽", code: "A17.01.010", nomenclatureName: "Микротоковое воздействие при заболеваниях кожи и подкожной клетчатки", serviceSlug: "mikrotokovaya-terapiya" },
          { name: "Интенсивный уход: энзимный пилинг, маска, сыворотка, крем", price: "2 200 ₽", code: "A17.01.010", nomenclatureName: "Микротоковое воздействие при заболеваниях кожи и подкожной клетчатки", serviceSlug: "mikrotokovaya-terapiya" },
          { name: "Комплексная программа «Суперлифтинг» (2 часа)", price: "6 300 ₽", code: "A17.01.010, А17.01.008", nomenclatureName: "Микротоковое воздействие при заболеваниях кожи и подкожной клетчатки + Воздействие токами ультравысокой частоты на кожу (миостимуляция, RF-лифтинг, ультразвуковой массаж)", serviceSlug: "mikrotokovaya-terapiya" },
        ],
      },
      {
        title: "Миостимуляция лица",
        items: [
          { name: "Электростимуляция мышц", price: "2 350 ₽", code: "A17.02.001", nomenclatureName: "Электростимуляция мышц", serviceSlug: "mikrotokovaya-terapiya" },
        ],
      },
      {
        title: "Лазерная биоревитализация",
        items: [
          { name: "Лицо", price: "3 200 ₽", code: "A22.01.005", nomenclatureName: "Низкоинтенсивное лазерное облучение кожи", serviceSlug: "lazernaya-biorevitalizatsiya" },
          { name: "Лицо + шея", price: "3 700 ₽", code: "A22.01.005", nomenclatureName: "Низкоинтенсивное лазерное облучение кожи", serviceSlug: "lazernaya-biorevitalizatsiya" },
          { name: "Лицо + шея + декольте", price: "4 200 ₽", code: "A22.01.005", nomenclatureName: "Низкоинтенсивное лазерное облучение кожи", serviceSlug: "lazernaya-biorevitalizatsiya" },
        ],
      },
      {
        title: "Ультразвуковой массаж",
        items: [
          { name: "Лицо, 20 мин", price: "1 100 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "massazh-litsa" },
          { name: "Лицо и шея, 30 мин", price: "1 500 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "massazh-litsa" },
          { name: "1 зона (лоб, глаза, щека, подбородок), 10 мин", price: "550 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "massazh-litsa" },
        ],
      },
      {
        title: "Радиочастотный RF-лифтинг",
        items: [
          { name: "Лицо", price: "2 700 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "rf-lifting" },
          { name: "Шея", price: "2 100 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "rf-lifting" },
          { name: "Лицо + шея", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "rf-lifting" },
          { name: "Лицо + шея + декольте", price: "4 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "rf-lifting" },
          { name: "Зона вокруг глаз", price: "1 400 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "rf-lifting" },
          { name: "Зона подбородка", price: "1 400 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "rf-lifting" },
          { name: "RF-лифтинг лица (доп. к другой процедуре)", price: "2 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "rf-lifting" },
        ],
      },
      {
        title: "RF радиочастотный липолиз (термолиполиз)",
        items: [
          { name: "Живот", price: "2 700 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "korrektsiya-figury" },
          { name: "Ягодицы", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "korrektsiya-figury" },
          { name: "Бёдра", price: "3 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "korrektsiya-figury" },
          { name: "2 зоны", price: "4 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "korrektsiya-figury" },
          { name: "3 зоны", price: "5 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "korrektsiya-figury" },
          { name: "4 зоны", price: "6 400 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "korrektsiya-figury" },
          { name: "Растяжки — зона 10×10", price: "1 100 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "korrektsiya-figury" },
          { name: "Растяжки — зона 20×20", price: "1 950 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "korrektsiya-figury" },
          { name: "Растяжки — зона 30×30", price: "2 650 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "korrektsiya-figury" },
        ],
      },
      {
        title: "Фракционный микроигольчатый RF-лифтинг (Venus Viva)",
        items: [
          { name: "Типса", price: "8 200 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Верхние и нижние веки", price: "11 600 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Лицо (включая веки)", price: "21 000 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Лоб", price: "11 600 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Лицо (исключая глаза)", price: "17 900 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Щёки", price: "15 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Шея", price: "15 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Декольте", price: "17 900 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Лицо + шея", price: "28 500 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Шея + декольте", price: "27 300 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Лицо + шея + декольте", price: "38 900 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Растяжки: живот полностью", price: "22 100 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Растяжки: ниже/выше пупка", price: "14 700 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Растяжки: бока", price: "16 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Растяжки: грудь", price: "16 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Растяжки: передняя поверхность бёдер", price: "16 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Растяжки: боковая поверхность бёдер", price: "16 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
          { name: "Растяжки: задняя поверхность бёдер", price: "16 800 ₽", code: "А17.01.008", nomenclatureName: "Воздействие токами ультравысокой частоты на кожу", serviceSlug: "venus-viva" },
        ],
      },
      {
        title: "Фотоомоложение кожи",
        items: [
          { name: "Омоложение лица", price: "8 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "fotoомоlozhenie" },
          { name: "Лицо полностью (расширенный протокол)", price: "11 400 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "fotoомоlozhenie" },
          { name: "Омоложение шеи", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "fotoомоlozhenie" },
          { name: "Омоложение декольте", price: "7 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "fotoомоlozhenie" },
          { name: "Омоложение лица и шеи", price: "11 600 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "fotoомоlozhenie" },
          { name: "Омоложение лица, шеи и декольте", price: "15 800 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "fotoомоlozhenie" },
          { name: "Омоложение области вокруг глаз (скулы)", price: "4 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "fotoомоlozhenie" },
          { name: "Омоложение кистей рук", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "fotoомоlozhenie" },
        ],
      },
      {
        title: "Фототерапия: удаление пигментации",
        items: [
          { name: "Удаление пигментации на лице", price: "8 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "pigmentatsiya" },
          { name: "Удаление пигментации — лоб", price: "4 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "pigmentatsiya" },
          { name: "Удаление пигментации — скулы", price: "4 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "pigmentatsiya" },
          { name: "Удаление пигментации — щёки", price: "5 400 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "pigmentatsiya" },
          { name: "Удаление пигментации — подбородок", price: "3 700 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "pigmentatsiya" },
          { name: "Удаление пигментации на кистях", price: "5 400 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "pigmentatsiya" },
          { name: "Удаление пигментации (плечо — локоть)", price: "10 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "pigmentatsiya" },
          { name: "Удаление пигментации (локоть — кисти)", price: "10 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "pigmentatsiya" },
          { name: "Удаление пигментации на плечах", price: "8 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "pigmentatsiya" },
          { name: "Удаление пигментации на декольте", price: "7 400 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "pigmentatsiya" },
          { name: "Удаление пигментации на верхней части спины", price: "12 600 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "pigmentatsiya" },
          { name: "Удаление пигментного пятна за 1 см", price: "750 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "pigmentatsiya" },
        ],
      },
      {
        title: "Фототерапия: удаление сосудистых образований",
        items: [
          { name: "1 вспышка", price: "85 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "udalenie-sosudov" },
          { name: "Удаление купероза на носу", price: "3 700 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "udalenie-sosudov" },
          { name: "Удаление купероза на крыльях носа", price: "3 200 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "udalenie-sosudov" },
          { name: "Удаление купероза на щеках", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "udalenie-sosudov" },
          { name: "Удаление купероза на скулах", price: "4 700 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "udalenie-sosudov" },
          { name: "Удаление купероза на подбородке", price: "3 700 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "udalenie-sosudov" },
          { name: "Удаление купероза лица полностью", price: "9 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "udalenie-sosudov" },
        ],
      },
      {
        title: "Термолифтинг инфракрасный",
        items: [
          { name: "Лицо (без лба) + второй подбородок", price: "8 400 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "infrakrasnyj-termolifting" },
          { name: "Шея", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "infrakrasnyj-termolifting" },
          { name: "Декольте", price: "7 400 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "infrakrasnyj-termolifting" },
          { name: "Лицо + шея + декольте", price: "15 800 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "infrakrasnyj-termolifting" },
          { name: "Живот", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "infrakrasnyj-termolifting" },
          { name: "Внутренняя поверхность бедра", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "infrakrasnyj-termolifting" },
          { name: "Внутренняя поверхность рук", price: "3 200 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "infrakrasnyj-termolifting" },
          { name: "Ягодицы", price: "5 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи", serviceSlug: "infrakrasnyj-termolifting" },
        ],
      },
      {
        title: "DPC Эпиляция (Sharplight)",
        items: [
          { name: "Подмышечные впадины", price: "3 200 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "От кисти до локтя", price: "5 300 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "От локтя до плеч", price: "5 300 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Руки полностью", price: "9 500 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Нос", price: "850 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Щёки", price: "1 700 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Верхняя губа", price: "1 300 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Подбородок", price: "1 600 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Классическое бикини (жен.)", price: "4 300 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Глубокое бикини (жен.)", price: "7 400 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Межъягодичная область (жен.)", price: "2 450 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Ягодицы (жен.)", price: "5 300 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Классическое бикини (муж.)", price: "4 300 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Глубокое бикини (муж.)", price: "7 400 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Межъягодичная область (муж.)", price: "2 500 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Ягодицы (муж.)", price: "5 300 ₽", code: "A14.01.013", nomenclatureName: "Проведение эпиляции", serviceSlug: "lazernaya-epilyatsiya" },
        ],
      },
      {
        title: "Лечение грибка ногтей (фототерапия)",
        items: [
          { name: "1 ноготь", price: "1 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи (лечение грибка ногтей с фотосенсибилизатором)", serviceSlug: "lechenie-gribka-nogtey" },
          { name: "2 ногтя", price: "1 500 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи (лечение грибка ногтей с фотосенсибилизатором)", serviceSlug: "lechenie-gribka-nogtey" },
          { name: "3 ногтя", price: "1 700 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи (лечение грибка ногтей с фотосенсибилизатором)", serviceSlug: "lechenie-gribka-nogtey" },
          { name: "4 ногтя", price: "1 900 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи (лечение грибка ногтей с фотосенсибилизатором)", serviceSlug: "lechenie-gribka-nogtey" },
          { name: "5 ногтей", price: "2 100 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи (лечение грибка ногтей с фотосенсибилизатором)", serviceSlug: "lechenie-gribka-nogtey" },
          { name: "10 ногтей", price: "2 700 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи (лечение грибка ногтей с фотосенсибилизатором)", serviceSlug: "lechenie-gribka-nogtey" },
          { name: "20 ногтей", price: "4 300 ₽", code: "A20.01.005", nomenclatureName: "Фототерапия кожи (лечение грибка ногтей с фотосенсибилизатором)", serviceSlug: "lechenie-gribka-nogtey" },
        ],
      },
      {
        title: "Прессотерапия",
        items: [
          { name: "1 процедура одной зоны (30 мин)", price: "1 700 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия", serviceSlug: "pressoterapiya" },
          { name: "3 процедуры одной зоны", price: "3 800 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия", serviceSlug: "pressoterapiya" },
          { name: "5 процедур одной зоны", price: "5 300 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия", serviceSlug: "pressoterapiya" },
          { name: "10 процедур одной зоны", price: "9 500 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия", serviceSlug: "pressoterapiya" },
          { name: "Дополнительно к другим процедурам", price: "790 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия", serviceSlug: "pressoterapiya" },
          { name: "Дополнительная зона (1 процедура)", price: "790 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия", serviceSlug: "pressoterapiya" },
          { name: "Дополнительная зона (3 процедуры)", price: "650 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия", serviceSlug: "pressoterapiya" },
          { name: "Дополнительная зона (5 процедур)", price: "550 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия", serviceSlug: "pressoterapiya" },
          { name: "Дополнительная зона (10 процедур)", price: "500 ₽", code: "A17.30.009", nomenclatureName: "Баровоздействие — прессотерапия конечностей, пневмокомпрессия", serviceSlug: "pressoterapiya" },
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
          { name: "Пилинг Миндальный", price: "3 400 ₽", code: "А16.01.024", nomenclatureName: "Дерматологический пилинг", serviceSlug: "pilingi" },
          { name: "Пилинг Салициловый", price: "3 400 ₽", code: "А16.01.024", nomenclatureName: "Дерматологический пилинг", serviceSlug: "pilingi" },
          { name: "Пилинг Азелаиновый", price: "3 400 ₽", code: "А16.01.024", nomenclatureName: "Дерматологический пилинг", serviceSlug: "pilingi" },
          { name: "Пилинг Джеснера", price: "4 350 ₽", code: "А16.01.024", nomenclatureName: "Дерматологический пилинг", serviceSlug: "pilingi" },
          { name: "Пилинг Ретиноловый", price: "6 300 ₽", code: "А16.01.024", nomenclatureName: "Дерматологический пилинг", serviceSlug: "pilingi" },
          { name: "Азелаиновый Anti-acne спины", price: "5 300 ₽", code: "А16.01.024", nomenclatureName: "Дерматологический пилинг" },
          { name: "Крем-пилинг ретинол (в протоколе пилинга)", price: "1 300 ₽", code: "А16.01.024", nomenclatureName: "Дерматологический пилинг" },
          { name: "Пилинг осветляющий", price: "4 800 ₽", code: "А16.01.024", nomenclatureName: "Дерматологический пилинг" },
          { name: "Омолаживающий для зоны вокруг глаз", price: "900 ₽", code: "А16.01.024", nomenclatureName: "Дерматологический пилинг" },
          { name: "Доп. омолаживающий для зоны вокруг глаз", price: "650 ₽", code: "А16.01.024", nomenclatureName: "Дерматологический пилинг" },
          { name: "Пилинг как дополнительная к основной процедуре", price: "2 400 ₽", code: "А16.01.024", nomenclatureName: "Дерматологический пилинг" },
        ],
      },
      {
        title: "Чистка лица",
        items: [
          { name: "Чистка лица атравматичная, ультразвуковая", price: "3 200 ₽", code: "A14.01.005", nomenclatureName: "Очищение кожи лица и шеи", serviceSlug: "chistka-litsa" },
          { name: "Чистка лица механическая", price: "3 700 ₽", code: "A14.01.005", nomenclatureName: "Очищение кожи лица и шеи", serviceSlug: "chistka-litsa" },
          { name: "Комбинированная чистка лица", price: "4 500 ₽", code: "A14.01.005", nomenclatureName: "Очищение кожи лица и шеи", serviceSlug: "chistka-litsa" },
          { name: "Комбинированная чистка лица (Павлюк М.О.)", price: "8 500 ₽", code: "A14.01.005", nomenclatureName: "Очищение кожи лица и шеи", serviceSlug: "chistka-litsa", doctorSlug: "pavlyuk" },
          { name: "Лечебная чистка при акне", price: "4 800 ₽", code: "A14.01.005", nomenclatureName: "Очищение кожи лица и шеи" },
          { name: "Чистка кожи спины", price: "5 700 ₽", code: "A14.01.005", nomenclatureName: "Очищение кожи лица и шеи" },
          { name: "Пилинг доп. к чистке лица", price: "2 400 ₽", code: "А16.01.024", nomenclatureName: "Дерматологический пилинг (дополнительно к процедуре чистки лица)" },
        ],
      },
      {
        title: "Массаж лица",
        items: [
          { name: "Программа для подтяжки лица (60 мин)", price: "2 200 ₽", code: "A21.01.002", nomenclatureName: "Массаж лица медицинский (программа для подтяжки и молодости лица)", serviceSlug: "massazh-litsa" },
          { name: "Классический массаж лица (30 мин)", price: "1 350 ₽", code: "A21.01.002", nomenclatureName: "Массаж лица медицинский (классический)", serviceSlug: "massazh-litsa" },
          { name: "Криомассаж кожи", price: "1 200 ₽", code: "A24.01.005", nomenclatureName: "Криомассаж кожи", serviceSlug: "massazh-litsa" },
          { name: "Ультразвуковой массаж лица (15 мин)", price: "1 200 ₽", code: "A22.01.001", nomenclatureName: "Ультразвуковое лечение кожи (ультразвуковой массаж лица)", serviceSlug: "massazh-litsa" },
          { name: "Комплексная программа моделирования овала лица (классический)", price: "6 200 ₽", code: "A21.01.002, А17.01.008", nomenclatureName: "Массаж лица медицинский + Воздействие токами ультравысокой частоты на кожу (скрабирование, классический массаж, биомеханический массаж или RF-лифтинг, альгинатная маска)", serviceSlug: "massazh-litsa" },
          { name: "Комплексная программа моделирования овала лица (миофасциальный)", price: "7 200 ₽", code: "A21.01.002, А17.01.008", nomenclatureName: "Массаж лица медицинский + Воздействие токами ультравысокой частоты на кожу (миофасциальный массаж, биомеханический массаж или RF-лифтинг, альгинатная маска)", serviceSlug: "massazh-litsa" },
        ],
      },
      {
        title: "Лечебный массаж",
        items: [
          { name: "Общий массаж (до 120 кг), 60 мин", price: "2 500 ₽", code: "A21.01.001", nomenclatureName: "Общий массаж медицинский", serviceSlug: "massazh" },
          { name: "Общий массаж (более 120 кг), 60 мин", price: "2 800 ₽", code: "A21.01.001", nomenclatureName: "Общий массаж медицинский", serviceSlug: "massazh" },
          { name: "Массаж спины (до 120 кг)", price: "1 000 ₽", code: "А21.03.007", nomenclatureName: "Массаж спины медицинский", serviceSlug: "massazh" },
          { name: "Массаж спины (более 120 кг)", price: "1 250 ₽", code: "A21.01.003", nomenclatureName: "Массаж спины медицинский", serviceSlug: "massazh" },
          { name: "Массаж шеи + воротниковая область (15 мин)", price: "700 ₽", code: "A21.01.003.001", nomenclatureName: "Массаж шеи медицинский + массаж воротниковой области", serviceSlug: "massazh" },
          { name: "Массаж рук (обе)", price: "800 ₽", code: "A21.01.004", nomenclatureName: "Массаж верхней конечности медицинский", serviceSlug: "massazh" },
          { name: "Массаж руки (одна)", price: "400 ₽", code: "A21.01.004", nomenclatureName: "Массаж верхней конечности медицинский", serviceSlug: "massazh" },
          { name: "Детский массаж (1–3 года)", price: "900 ₽", code: "A21.01.001", nomenclatureName: "Общий массаж медицинский тела (детский)", serviceSlug: "massazh" },
          { name: "Детский массаж (4–5 лет)", price: "1 200 ₽", code: "А21.01.001", nomenclatureName: "Общий массаж медицинский тела (детский)", serviceSlug: "massazh" },
          { name: "Детский массаж (7–11 лет)", price: "1 500 ₽", code: "А21.01.001", nomenclatureName: "Общий массаж медицинский тела (детский)", serviceSlug: "massazh" },
          { name: "Детский массаж (12–14 лет)", price: "1 900 ₽", code: "А21.01.001", nomenclatureName: "Общий массаж медицинский тела (детский)", serviceSlug: "massazh" },
          { name: "Массаж спины детский (1–6 лет)", price: "700 ₽", code: "А21.03.007", nomenclatureName: "Массаж спины медицинский (детский)", serviceSlug: "massazh" },
          { name: "Массаж спины детский (7–11 лет)", price: "800 ₽", code: "А21.03.007", nomenclatureName: "Массаж спины медицинский (детский)", serviceSlug: "massazh" },
          { name: "Массаж спины детский (12–14 лет)", price: "900 ₽", code: "А21.03.007", nomenclatureName: "Массаж спины медицинский (детский)", serviceSlug: "massazh" },
          { name: "Антицеллюлитный/лимфодренажный массаж (60 мин)", price: "2 800 ₽", code: "A21.01.009", nomenclatureName: "Массаж нижней конечности медицинский (антицеллюлитный/лимфодренажный массаж, ягодицы + ноги)", serviceSlug: "massazh" },
          { name: "Комплексная антицеллюлитная программа", price: "8 450 ₽", code: "A21.01.009, А17.01.008", nomenclatureName: "Массаж нижней конечности медицинский + Воздействие токами ультравысокой частоты на кожу (лимфодренажный массаж, лазерно-вакуумный массаж или RF-лифтинг, антицеллюлитное обёртывание)", serviceSlug: "massazh" },
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
          { name: "Приём врача-диетолога первичный", price: "4 300 ₽", code: "B01.013.001", nomenclatureName: "Приём (осмотр, консультация) врача-диетолога первичный", bookable: true, serviceSlug: "dietolog" },
          { name: "Приём врача-диетолога повторный", price: "4 300 ₽", code: "B01.013.002", nomenclatureName: "Приём (осмотр, консультация) врача-диетолога повторный", bookable: true, serviceSlug: "dietolog" },
          { name: "Приём врача-диетолога + биоимпедансометрия (первичный)", price: "7 000 ₽", code: "B01.013.001, A05.30.014", nomenclatureName: "Приём (осмотр, консультация) врача-диетолога первичный + Определение процентного соотношения воды, мышечной и жировой ткани с помощью биоимпедансометра", bookable: true, serviceSlug: "dietolog" },
          { name: "Приём врача-диетолога + биоимпедансометрия (повторный)", price: "7 000 ₽", code: "B01.013.002, A05.30.014", nomenclatureName: "Приём (осмотр, консультация) врача-диетолога повторный + Определение процентного соотношения воды, мышечной и жировой ткани с помощью биоимпедансометра", bookable: true, serviceSlug: "dietolog" },
          { name: "Биоимпедансометрия", price: "2 700 ₽", code: "A05.30.014", nomenclatureName: "Определение процентного соотношения воды, мышечной и жировой ткани с помощью биоимпедансометра", serviceSlug: "dietolog" },
          { name: "Биоимпедансометрия + приём врача-диетолога первичный", price: "5 000 ₽", code: "A05.30.014, B01.013.001", nomenclatureName: "Определение процентного соотношения воды, мышечной и жировой ткани с помощью биоимпедансометра + Приём (осмотр, консультация) врача-диетолога первичный (по результатам обследования)", bookable: true, serviceSlug: "dietolog" },
          { name: "Генетический тест «Диетология» + консультация", price: "22 900 ₽", code: "B03.019, A01.30.013", nomenclatureName: "Лабораторная генетика (генетический тест: панель «Диетология») + Сбор анамнеза и жалоб при генетическом консультировании", serviceSlug: "dietolog" },
          { name: "Программа индивидуальной диетотерапии", price: "19 000 ₽", code: "B01.013.002", nomenclatureName: "Приём (осмотр, консультация) врача-диетолога повторный (программа индивидуальной диетотерапии)", serviceSlug: "dietolog" },
          { name: "Программа похудения «Соло»", price: "28 000 ₽", code: "B01.013.001, B01.013.002", nomenclatureName: "Приём (осмотр, консультация) врача-диетолога первичный, повторный (программа похудения «Соло»)", serviceSlug: "dietolog" },
          { name: "Программа похудения «Дуэт»", price: "40 000 ₽", code: "B01.013.001, B01.013.002", nomenclatureName: "Приём (осмотр, консультация) врача-диетолога первичный, повторный (программа похудения «Дуэт»)", serviceSlug: "dietolog" },
          { name: "Программа похудения «Трио»", price: "60 000 ₽", code: "B01.013.001, B01.013.002, B03.019", nomenclatureName: "Приём (осмотр, консультация) врача-диетолога первичный, повторный + Лабораторная генетика (программа похудения «Трио»)", serviceSlug: "dietolog" },
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
          { name: "Приём врача-терапевта первичный", price: "4 000 ₽", code: "В01.047.001", nomenclatureName: "Приём (осмотр, консультация) врача-терапевта первичный", bookable: true, serviceSlug: "terapevt" },
          { name: "Приём врача-терапевта повторный (в течение 1 мес.)", price: "4 000 ₽", code: "В01.047.002", nomenclatureName: "Приём (осмотр, консультация) врача-терапевта повторный", bookable: true, serviceSlug: "terapevt" },
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
          { name: "Приём врача-остеопата первичный + остеопатическая коррекция", price: "6 500 ₽", code: "B01.069.001, A21.30.008", nomenclatureName: "Приём (осмотр, консультация) врача-остеопата первичный + Остеопатическая коррекция соматических дисфункций", bookable: true, serviceSlug: "osteopat" },
          { name: "Приём врача-остеопата повторный + остеопатическая коррекция", price: "6 500 ₽", code: "B01.069.002, A21.30.008", nomenclatureName: "Приём (осмотр, консультация) врача-остеопата повторный + Остеопатическая коррекция соматических дисфункций", bookable: true, serviceSlug: "osteopat" },
          { name: "Приём врача-остеопата (дети до 12 лет) первичный", price: "6 500 ₽", code: "B01.069.001, A21.30.008", nomenclatureName: "Приём (осмотр, консультация) врача-остеопата первичный + Остеопатическая коррекция соматических дисфункций (дети до 12 лет)", bookable: true, serviceSlug: "osteopat" },
          { name: "Приём врача-остеопата (дети до 12 лет) повторный", price: "6 500 ₽", code: "B01.069.002, A21.30.008", nomenclatureName: "Приём (осмотр, консультация) врача-остеопата повторный + Остеопатическая коррекция соматических дисфункций (дети до 12 лет)", bookable: true, serviceSlug: "osteopat" },
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
          { name: "Приём врача-невролога первичный", price: "2 500 ₽", code: "B01.023.001", nomenclatureName: "Приём (осмотр, консультация) врача-невролога первичный", bookable: true, serviceSlug: "nevrolog" },
          { name: "Приём врача-невролога повторный", price: "2 500 ₽", code: "B01.023.002", nomenclatureName: "Приём (осмотр, консультация) врача-невролога повторный", bookable: true, serviceSlug: "nevrolog" },
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
          { name: "Базовый генетический тест «Косметология» (45 генов)", price: "15 800 ₽", code: "B03.019", nomenclatureName: "Лабораторная генетика", serviceSlug: "geneticheskoe-testirovanie" },
          { name: "Панель «Трихология» (24 гена)", price: "13 700 ₽", code: "B03.019", nomenclatureName: "Лабораторная генетика", serviceSlug: "geneticheskoe-testirovanie" },
          { name: "Панель «Диетология» (48 генов)", price: "17 900 ₽", code: "B03.019", nomenclatureName: "Лабораторная генетика", serviceSlug: "geneticheskoe-testirovanie" },
          { name: "Панель «Активное долголетие» (62 гена)", price: "17 900 ₽", code: "B03.019", nomenclatureName: "Лабораторная генетика", serviceSlug: "geneticheskoe-testirovanie" },
          { name: "Консультация врача по результатам тестирования", price: "5 000 ₽", code: "A01.30.013", nomenclatureName: "Сбор анамнеза и жалоб при генетическом консультировании (консультация врача по результатам генетического тестирования)", bookable: true, serviceSlug: "geneticheskoe-testirovanie" },
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
