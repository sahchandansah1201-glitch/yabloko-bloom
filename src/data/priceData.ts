/**
 * Single Source of Truth — Прайс-лист клиники «Яблоко»
 * Структура: 5 направлений работы клиники
 */

export interface PriceItem {
  name: string;
  price: string;
  code?: string;
  nomenclatureName?: string;
  bookable?: boolean;
  doctorSlug?: string;
  serviceSlug?: string;
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
    id: "cosmetology",
    title: "Косметология",
    subcategories: [
      {
        title: "Прием врача косметолога",
        items: [
          { name: "Прием врача-косметолога  первичный", price: "Уточняйте", serviceSlug: "consult-cosm" },
          { name: "Прием  врача-косметолога   Повторный в течении 1мес", price: "Уточняйте", serviceSlug: "consult-cosm" },
          { name: "Прием  врача-косметолога Павлюк М.О. первичный", price: "Уточняйте", serviceSlug: "consult-cosm" },
        ],
      },
      {
        title: "Биоревитализация",
        items: [
          { name: "Биоревитализация Jalupro (Ялупро)  HMW 2,5 мл Италия", price: "17 900 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Mesoeye  1мл США", price: "19 900 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация Hair X с пептидами шприц 2 мл, введение препарата по коже волосистой части головы", price: "9 900 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация  NCTF 135  HA  Франция   3  мл", price: "13 200 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация HydroLine extra 4мл Россия", price: "10 600 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация PROFHILO 2 мл. Италия", price: "27 000 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Фракционная мезотерапия (микроигольчатая терапия) лица «СИЯНИЕ и РОВНЫЙ ТОН»  аппарат  Дермапен", price: "7 400 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация HydroLine extra   1 мл.", price: "4 400 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Внутрикожное введение лекарственных препаратов  Бетаметазон", price: "4 800 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация  Nucleospaire DNA RNA 2%  2 мл.", price: "15 700 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация РЕВИ (REVI) eye  стерильный 1.0 % 1 мл.", price: "14 700 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация  РЕВИ Силк (REVI Silk) стерильный 1.2 % 1 мл.", price: "15 800 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация  РЕВИ Силк (REVI Silk) стерильный 1.2 % 2 мл.", price: "20 500 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация  Hyalrepair (Гиалрипайер-07)  фл. 2.5 мл.", price: "9 200 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация  РЕВИ  Стронг  (REVI Strong)  стерильный 1.5 %  2 мл.", price: "22 100 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация РЕВИ  Стронг  (REVI Strong)  стерильный 1.5 %  1 мл.", price: "16 300 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация  Hyalrepair (Гиалрипайер-02)  1.5 мл.", price: "15 300 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация РЕВИ Стайл  (REVI Style) стерильный 1.0% 2 мл.", price: "16 800 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация  РЕВИ Стайл  (REVI Style) стерильный 1.0% 1 мл.", price: "12 600 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация  Hyalrepair 07/10 1мл. Россия", price: "5 000 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Насадка на мезоинжектор Pistor", price: "590 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация Гиалуформ -1.8-02   Мезолифт 1.8%  2мл. Россия", price: "9 200 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация Hyalrepair (Гиалрипайер-04)  1.5 мл.", price: "15 300 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация Hyalrepair (Гиалрипайер-10)  фл. 2.5 мл.", price: "9 200 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация Сферогель Long Fine 0/5 мл.", price: "19 800 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация по коже волосистой части головы  Hair X  2 мл (флакон)", price: "4 000 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация Meso-Wharton P199 1.5 мл", price: "21 500 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация   Meso-Xanthin F199 1.5 мл", price: "21 500 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация  Mira Line Biorevitalization 2 мл.", price: "13 700 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация  NCTF 135  HA  Франция   1.5  мл", price: "8 500 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация BioHyalux MEVITA C 2 мл", price: "8 500 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация BioHyalux MEVITA C 4 мл", price: "13 700 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Биоревитализация BioHyalux MEVITA C 1 мл", price: "3 150 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Мезотерапия Silor DM 5 мл.", price: "4 000 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Мезотерапия Skinsil  Trehalose bLift Booster", price: "8 000 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Мезотерапия Skinsil  White Lift Booster", price: "8 000 ₽", serviceSlug: "biorevitalizatsiya" },
          { name: "Мезотерапия ADN RESTART фл. 4 мл.", price: "7 200 ₽", serviceSlug: "biorevitalizatsiya" },
        ],
      },
      {
        title: "Контурная пластика",
        items: [
          { name: "Контурная пластика лица   Radiesse   3 мл США", price: "66 000 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица  Belotero soft 1 мл. Германия", price: "23 000 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица   Belotero balance", price: "23 100 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица  Radiesse  1.5мл США", price: "35 000 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Использование канюли в процедуре", price: "1 700 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Удаления филлеров Лонгидаза ( 1 фл)", price: "4 800 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица Belotero lip contour 0.6 мл", price: "17 000 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица Repart  PLA", price: "38 900 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица  \"Stylage M\" 1 мл. Франция", price: "22 800 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица ART FILLER Fine lines 1  мл.  (Бельгия)", price: "22 100 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица ART FILLER Universal  1.2 мл (Бельгия)", price: "25 900 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица ART FILLER  Lips 1 мл.  (Бельгия)", price: "25 900 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица ART FILLER Volume 1.2 мл.   (Бельгия)", price: "28 800 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица Belotero lip shape 0.6 мл", price: "17 900 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица Сферогель Long Advanced  0.7 мл", price: "17 400 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица ИАЛ-СИСТЕМ 1.1мл", price: "13 200 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица ИАЛ-СИСТЕМ АСР 1.0 мл", price: "17 900 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица  PLINEST", price: "19 000 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица  Mira Line Deep 1,1 мл.", price: "13 700 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица  Mira Line Deep PLUS 1,1 мл.", price: "13 700 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица Eldermafill  PLA", price: "31 900 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица  SG-22  JUFORA ULTRALINK   M   1 мл.", price: "13 200 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица  SG-23 JUFORA ULTRALINK   L  1 мл.", price: "14 700 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица JUFORA 1 мл", price: "4 750 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица  JUFORA  3 мл", price: "10 600 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика лица  Belotero Intense  (Белотеро Интенс) 1мл", price: "24 000 ₽", serviceSlug: "konturnaya-plastika" },
          { name: "Контурная пластика губ Viscoline Lips", price: "13 000 ₽", serviceSlug: "konturnaya-plastika" },
        ],
      },
      {
        title: "Ботокс",
        items: [
          { name: "Ботокс", price: "147 ₽", serviceSlug: "botoks" },
          { name: "Релатокс", price: "370 ₽", serviceSlug: "botoks" },
          { name: "Гипергидроз лечение 500ед.", price: "44 700 ₽", serviceSlug: "botoks" },
          { name: "Гипергидроз лечение 300 ед.", price: "28 400 ₽", serviceSlug: "botoks" },
        ],
      },
      {
        title: "Чистка лица",
        items: [
          { name: "Ультразвуковая чистка лица", price: "3 200 ₽", serviceSlug: "chistka-litsa" },
          { name: "Чистка лица", price: "4 500 ₽", serviceSlug: "chistka-litsa" },
          { name: "Чистка спины", price: "5 700 ₽", serviceSlug: "chistka-litsa" },
          { name: "Механическая чистка лица", price: "3 700 ₽", serviceSlug: "chistka-litsa" },
          { name: "Комбинированная чистка лица с пилингом доктор Павлюк М.О.", price: "8 500 ₽", serviceSlug: "chistka-litsa" },
          { name: "Уход за кожей вокруг глаз (увлажнение)", price: "1 300 ₽", serviceSlug: "chistka-litsa" },
          { name: "Уход за кожей вокруг глаз (увлажнение) дополнительно к другой процедуре", price: "900 ₽", serviceSlug: "chistka-litsa" },
          { name: "Чистка от прыщей", price: "4 800 ₽", serviceSlug: "chistka-litsa" },
        ],
      },
      {
        title: "Пилинг",
        items: [
          { name: "Пилинг Миндальный", price: "3 400 ₽", serviceSlug: "pilingi" },
          { name: "Пилинг Салициловый", price: "3 400 ₽", serviceSlug: "pilingi" },
          { name: "Пилинг Азелаиновый Anti-acne", price: "3 400 ₽", serviceSlug: "pilingi" },
          { name: "Пилинг Ретиноловый", price: "6 300 ₽", serviceSlug: "pilingi" },
          { name: "Пилинг  для волос TIME TO GROW", price: "3 300 ₽", serviceSlug: "pilingi" },
          { name: "Ультразвуковой пилинг головы", price: "3 300 ₽", serviceSlug: "pilingi" },
          { name: "Приминение пилинга ретинол в протоколе пилинга.", price: "1 300 ₽", serviceSlug: "pilingi" },
          { name: "Пилинг Азелаиновый Anti-acne   спины", price: "5 300 ₽", serviceSlug: "pilingi" },
          { name: "Пилинг (Омолаживающий для зоны вокруг глаз)", price: "900 ₽", serviceSlug: "pilingi" },
          { name: "Пилинг (Омолаживающий для зоны вокруг глаз)  (дополнительно)", price: "650 ₽", serviceSlug: "pilingi" },
          { name: "Пилинг  осветляющий", price: "4 800 ₽", serviceSlug: "pilingi" },
          { name: "Пилинг дополнение к процедуре Пилинг осветляющий", price: "2 700 ₽", serviceSlug: "pilingi" },
          { name: "Пилинг Джеснера", price: "4 350 ₽", serviceSlug: "pilingi" },
          { name: "Пилинг ретиноловый  дополнительно к процедуре", price: "4 500 ₽", serviceSlug: "pilingi" },
          { name: "Пилинг ТСА", price: "4 800 ₽", serviceSlug: "pilingi" },
        ],
      },
      {
        title: "Коллагенотерапия",
        items: [
          { name: "Коллагенотерапия  Тест проба Коллост", price: "3 500 ₽", serviceSlug: "kolostoterapiya" },
          { name: "Коллагенотерапия  Коллост 7%  0.5.мл.", price: "10 600 ₽", serviceSlug: "kolostoterapiya" },
          { name: "Коллагенотерапия Коллост 7%  1.5.мл.", price: "15 300 ₽", serviceSlug: "kolostoterapiya" },
          { name: "Коллагенотерапия Сферогель Light 1 мл", price: "15 800 ₽", serviceSlug: "kolostoterapiya" },
          { name: "Коллагенотерапия  Коллост  Микро 150 мг", price: "22 600 ₽", serviceSlug: "kolostoterapiya" },
          { name: "Коллагенотерапия   Сферогель   Medium  1 шпр. (0,5мл)", price: "11 600 ₽", serviceSlug: "kolostoterapiya" },
          { name: "Коллагенотерапия  Сферогель   Medium  2 шпр.", price: "20 900 ₽", serviceSlug: "kolostoterapiya" },
          { name: "Коллагенотерапия    Коллост 15 %  1.5.мл.", price: "23 900 ₽", serviceSlug: "kolostoterapiya" },
          { name: "Коллагенотерапия     Коллост 7%  1.0 мл.", price: "13 200 ₽", serviceSlug: "kolostoterapiya" },
          { name: "Коллагенотерапия Сферогель Light 0.5 мл", price: "9 200 ₽", serviceSlug: "kolostoterapiya" },
        ],
      },
      {
        title: "Плазмотерапия",
        items: [
          { name: "Плазмотерапия лица Plasmoactive 1 пробирка 4мл", price: "5 500 ₽", serviceSlug: "plazmoterapiya" },
          { name: "Плазмотерапия лица  Plasmoactive 2 пробирки 8 мл", price: "7 800 ₽", serviceSlug: "plazmoterapiya" },
          { name: "Плазмотерапия лица Plasmoactive) 3 пробирки 12мл", price: "10 100 ₽", serviceSlug: "plazmoterapiya" },
          { name: "PRP Плазмотерапия", price: "13 200 ₽", serviceSlug: "plazmoterapiya" },
          { name: "Плазмогель Plasmoactive 1 пробирка 4мл", price: "9 200 ₽", serviceSlug: "plazmoterapiya" },
          { name: "Плазмогель  Plasmoactive  2 пробирки 8 мл", price: "14 600 ₽", serviceSlug: "plazmoterapiya" },
          { name: "Плазмогель Plasmoactive 3  пробирки 12 мл", price: "19 000 ₽", serviceSlug: "plazmoterapiya" },
          { name: "Плазмогель Plasmoactive 4 пробирки 16 мл", price: "22 100 ₽", serviceSlug: "plazmoterapiya" },
          { name: "Плазмотерапия головы Plasmoactive 1 пробирка 4мл", price: "5 500 ₽", serviceSlug: "plazmoterapiya" },
        ],
      },
      {
        title: "Микроигольчатый РФ лифтинг",
        items: [
          { name: "Микроигольчатый  РФ лифтинг растяжки боковая поверхность бедер", price: "16 800 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый  РФ лифтинг растяжки задняя поверхность бедер", price: "16 800 ₽", serviceSlug: "rf-lifting" },
          { name: "Насадка (типса) на микроигольчатый  РФ-лифтинг", price: "8 200 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый РФ лифтинг верхние и нижние веки", price: "11 600 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый РФ лифтинг шея", price: "15 800 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый РФ лифтинг лицо включая верхнее и нижнее веко", price: "21 000 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый РФ лифтинг щеки", price: "15 800 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый РФ лифтинг декольте", price: "17 900 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый  РФ лифтинг лицо исключая область глаз", price: "17 900 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый РФ лифтинг лицо+ шея", price: "28 500 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый РФ лифтинг шея +декольте", price: "27 300 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый РФ лифтинг лицо+шея+декольте", price: "38 900 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый РФ лифтинг растяжки живот полностью", price: "22 100 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый РФ лифтинг растяжки бока", price: "16 800 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый РФ лифтинг растяжки передняя поверхность бедер", price: "16 800 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый РФ-лифтинг . Лоб", price: "11 600 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый РФ лифтинг растяжки ниже или выше пупка", price: "14 700 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый РФ лифтинг растяжки грудь", price: "16 800 ₽", serviceSlug: "rf-lifting" },
          { name: "Микроигольчатый РФ лифтин г лицо (включая верхнее и нижнее веко)+  декольте", price: "30 500 ₽", serviceSlug: "rf-lifting" },
        ],
      },
      {
        title: "РФ лифтинг",
        items: [
          { name: "РФ лифтинг лица", price: "2 700 ₽", serviceSlug: "rf-lifting" },
          { name: "РФ лифтинг лицо+шея", price: "3 200 ₽", serviceSlug: "rf-lifting" },
          { name: "РФ лифтинг лицо+шея+декольте", price: "4 300 ₽", serviceSlug: "rf-lifting" },
          { name: "РФ лифтинг шея", price: "2 100 ₽", serviceSlug: "rf-lifting" },
          { name: "РФ лифтинг зона вокруг глаз", price: "1 400 ₽", serviceSlug: "rf-lifting" },
          { name: "РФ лифтинг зона подбородка", price: "1 400 ₽", serviceSlug: "rf-lifting" },
          { name: "РФ лифтинг лица   дополнительно к другой процедуре", price: "2 200 ₽", serviceSlug: "rf-lifting" },
        ],
      },
      {
        title: "Фотоомоложение",
        items: [
          { name: "Фототерапия Омоложение лица", price: "8 500 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия  лица (Омоложение лица полностью + коррекция пигментных пятен и сосудов)", price: "11 400 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия лица  (Области высыпаний на лице) с фотосенсибилизатором", price: "5 300 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия лица и шеи", price: "11 600 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия  шеи", price: "5 300 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия   декольте.", price: "7 500 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия  лица+ шеи+декольте", price: "15 800 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия омоложение кожи кистей рук", price: "5 300 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия  в области вокруг глаз скулы", price: "4 300 ₽", serviceSlug: "pigmentatsiya" },
        ],
      },
      {
        title: "Лазерная эпиляция",
        items: [
          { name: "Лазерная  эпиляции Живот (муж.)", price: "7 000 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляции  Грудь (муж.)", price: "7 000 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная эпиляция  подмышечные впадины.", price: "3 200 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляции  рук от кисти до локтя", price: "5 300 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляция  рук. От локтя до плеч.", price: "5 300 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляция рук Руки полностью.", price: "9 500 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляция ног  Ноги полностью.", price: "17 000 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляция ног Бедра полностью.", price: "12 000 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляция ног  Голени.", price: "9 500 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляция Межбровья", price: "900 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляция Нос", price: "850 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная эпиляция Щеки.", price: "1 700 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляция Верхней губы", price: "1 300 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляция Подбородка", price: "1 600 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляция Спины мужчины", price: "8 000 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляция  бикини женщины", price: "4 300 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляция глубокое бикини Женщины.", price: "7 400 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная эпиляция межъяг.область женщины", price: "2 450 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляция Зона ягодиц Женщины", price: "5 300 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляция  Зона ягодиц мужщины", price: "5 000 ₽", serviceSlug: "lazernaya-epilyatsiya" },
          { name: "Лазерная  эпиляция ( 1 вспышка)", price: "85 ₽", serviceSlug: "lazernaya-epilyatsiya" },
        ],
      },
      {
        title: "Смас-лифтинг",
        items: [
          { name: "СМАС лифтинг", price: "130 ₽", serviceSlug: "smas-lifting" },
        ],
      },
      {
        title: "Холодная плазма (импульсный спрей)",
        items: [
          { name: "Холодная плазма верхние веки", price: "4 200 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Холодная плазма нижние веки", price: "4 200 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- гусиные лапки", price: "3 200 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- верхние и нижние  веки", price: "6 300 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- нос", price: "1 600 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- морщины вокруг глаз", price: "2 700 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- околоушные морщины", price: "3 200 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- линейные морщины на лбу", price: "3 200 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- зона лба полностью", price: "5 300 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма) - носогубные морщины", price: "2 650 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- лицо (без зоны вокруг глаз)", price: "8 400 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- лицо полностью", price: "10 500 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- лицо и шея", price: "15 800 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- шея", price: "5 300 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- зона декольте", price: "5 300 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)-кисти рук", price: "3 200 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма) - руки (предплечья)", price: "4 200 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- пигментные пятна 1 см2", price: "550 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- шрамы и рубцы до 3см2", price: "2 650 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- живот", price: "10 500 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- грудь", price: "4 200 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- бедра", price: "10 500 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)  - лечение акне, постакне щек", price: "5 300 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- лечение акне, постакне подбородок", price: "3 200 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- волосистая часть головы", price: "3 200 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- обработка ран ожогов", price: "550 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- ступни (трещины, мозоли)", price: "3 200 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- лечение герпеса) 1см2", price: "550 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- лечение псориаза)", price: "500 ₽", serviceSlug: "holodnaya-plazma" },
          { name: "Импульсный спрей (холодная плазма)- межбровье", price: "2 100 ₽", serviceSlug: "holodnaya-plazma" },
        ],
      },
      {
        title: "Пигментация",
        items: [
          { name: "Фототерапия удаление пигментации на лице", price: "8 500 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия  удаление пигментации в области лба", price: "4 300 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия удаление пигментации в области скул", price: "4 300 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия удаление пигментации в области щек", price: "5 400 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия удаление пигментации в области подбородка", price: "3 700 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия  кожи удаление пигментации на кистях", price: "5 400 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия удаление пигментации от плечевого сустава до локтя", price: "10 500 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия удаление пигментации  от локтя до кистей рук", price: "10 500 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия удаление пигментации на плечах", price: "8 500 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия удаление пигментации декольте", price: "7 400 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Фототерапия удаление пигментации  верхняя часть спины", price: "12 600 ₽", serviceSlug: "pigmentatsiya" },
          { name: "Удаление пигментного пятна на аппарате Sharplight за 1 см", price: "750 ₽", serviceSlug: "pigmentatsiya" },
        ],
      },
      {
        title: "Удаление сосудов на лице",
        items: [
          { name: "Удаления сосудов на лице нос", price: "3 700 ₽", serviceSlug: "udalenie-sosudov" },
          { name: "Удаления сосудов на лице крылья носа", price: "3 200 ₽", serviceSlug: "udalenie-sosudov" },
          { name: "Удаления сосудов на лице щеки", price: "5 000 ₽", serviceSlug: "udalenie-sosudov" },
          { name: "Удаления сосудов на лице скулы", price: "4 700 ₽", serviceSlug: "udalenie-sosudov" },
          { name: "Удаления сосудов на лице  подбородок", price: "3 700 ₽", serviceSlug: "udalenie-sosudov" },
          { name: "Удаления сосудов на лице", price: "9 500 ₽", serviceSlug: "udalenie-sosudov" },
        ],
      },
      {
        title: "Термолифтинг",
        items: [
          { name: "Термолифтинг  лица (без зоны лба) + второй подбородок", price: "8 400 ₽", serviceSlug: "rf-lifting" },
          { name: "Термолифтинг шеи", price: "5 300 ₽", serviceSlug: "rf-lifting" },
          { name: "Термолифтинг  Декольте", price: "7 400 ₽", serviceSlug: "rf-lifting" },
          { name: "Термолифтинг Лицо+шея+декольте", price: "15 800 ₽", serviceSlug: "rf-lifting" },
          { name: "Термолифтинг тела  Живот", price: "5 300 ₽", serviceSlug: "rf-lifting" },
          { name: "Термолифтинг тела Внутренняя поверхность бедра", price: "5 300 ₽", serviceSlug: "rf-lifting" },
          { name: "Термолифтинг тела Внутренняя поверхность рук", price: "3 200 ₽", serviceSlug: "rf-lifting" },
          { name: "Термолифтинг тела Ягодицы", price: "5 300 ₽", serviceSlug: "rf-lifting" },
        ],
      },
      {
        title: "Купероз  лечение",
        items: [
          { name: "Удаление купероза нос", price: "3 700 ₽" },
          { name: "Удаление купероза крылья носа.", price: "3 200 ₽" },
          { name: "Удаление купероза щеки", price: "5 300 ₽" },
          { name: "Удаление купероза  скулы", price: "4 700 ₽" },
          { name: "Удаление купероза  подбородок", price: "3 700 ₽" },
          { name: "Удаление купероза лицо полностью", price: "9 500 ₽" },
        ],
      },
      {
        title: "Лечение акне",
        items: [
          { name: "Фототерапия Области высыпаний на лице, с фотосенсибилизатором, лечения акне одна вспышка", price: "85 ₽", serviceSlug: "lechenie-akne" },
          { name: "Фототерапия Лечение акне на лице + шея с фотосенсибилизатором", price: "8 400 ₽", serviceSlug: "lechenie-akne" },
          { name: "Фототерапия  удаление пигментации Фотовспышка", price: "85 ₽", serviceSlug: "lechenie-akne" },
          { name: "Фотосенсибилизатор", price: "1 100 ₽", serviceSlug: "lechenie-akne" },
        ],
      },
      {
        title: "Мезотерапия тела",
        items: [
          { name: "Липолитик 5 мл", price: "5 300 ₽", serviceSlug: "mezoterapiya-tela" },
          { name: "Липолитик 10 мл", price: "9 000 ₽", serviceSlug: "mezoterapiya-tela" },
          { name: "Липолитик 15 мл.", price: "12 300 ₽", serviceSlug: "mezoterapiya-tela" },
        ],
      },
      {
        title: "Массажи лица",
        items: [
          { name: "Миофасциальный массаж лица", price: "2 200 ₽", serviceSlug: "massazh-litsa" },
          { name: "Криомассаж", price: "1 200 ₽", serviceSlug: "massazh-litsa" },
          { name: "Подтяжка  овала лица", price: "6 200 ₽", serviceSlug: "massazh-litsa" },
          { name: "Подтяжка овала лица миофасциальная", price: "7 200 ₽", serviceSlug: "massazh-litsa" },
          { name: "Массаж лица", price: "1 350 ₽", serviceSlug: "massazh-litsa" },
          { name: "Ультразвуковой массаж", price: "1 200 ₽", serviceSlug: "massazh-litsa" },
        ],
      },
      {
        title: "Коррекция фигуры",
        items: [
          { name: "RF лифтинг живота", price: "Уточняйте" },
          { name: "RF лифтинг  ягодицы", price: "2 700 ₽" },
          { name: "RF лифтинг бедра", price: "3 200 ₽" },
          { name: "RF лифтинг тела 2 зоны", price: "3 200 ₽" },
          { name: "RF лифтинг тела 3 зоны", price: "4 300 ₽" },
          { name: "RF лифтинг 4 зоны  (живот, ягодицы, передняя и задняя поверхность бедер,бока)", price: "5 300 ₽" },
          { name: "RFлифтинг растяжки 1 зона. 10х10", price: "6 400 ₽" },
          { name: "RF лифтинг растяжки 2 зоны 20х20", price: "1 100 ₽" },
          { name: "RF  лифтинг растяжки  3 зоны 30х30", price: "1 950 ₽" },
          { name: "Антицеллюлитный +Лимфодренажный массаж+(лазерно-вакуумный массажи или РФ- лифтинг), антицеллюлитное обертывание)", price: "2 650 ₽" },
          { name: "Общий массаж тела при весе до 120кг", price: "8 450 ₽" },
          { name: "Антицеллюлитный массаж  ног", price: "2 800 ₽" },
          { name: "Общий массаж тела при весе до 120кг", price: "2 500 ₽" },
        ],
      },
    ],
  },
  {
    id: "dermatology",
    title: "Дерматология",
    subcategories: [
      {
        title: "Прием врача дерматолога",
        items: [
          { name: "Прием дерматолога Аллам А. Х.", price: "3 000 ₽", serviceSlug: "consult-derm" },
          { name: "Прием дерматолога повторный  Аллам А.Х.", price: "3 000 ₽", serviceSlug: "consult-derm" },
          { name: "Прием дерматолога  Райкова С.А.", price: "2 700 ₽", serviceSlug: "consult-derm" },
          { name: "Прием дерматолога Райкова С.А. повторный", price: "2 700 ₽", serviceSlug: "consult-derm" },
          { name: "Прием дерматовенеролога  Грачева В,С.    первичный", price: "2 500 ₽", serviceSlug: "consult-derm" },
          { name: "Прием  врача- дерматолога  Грачева В,С.    повторный", price: "2 500 ₽", serviceSlug: "consult-derm" },
          { name: "Прием  дерматолога Павлюк М.О.", price: "4 500 ₽", serviceSlug: "consult-derm" },
          { name: "Прием  дерматолога Павлюк М.О. повторный", price: "4 500 ₽", serviceSlug: "consult-derm" },
        ],
      },
      {
        title: "Розацея",
        items: [
          { name: "Прием дерматолога Аллам А. Х.", price: "3 000 ₽", serviceSlug: "rozaceya" },
          { name: "Прием дерматолога повторный  Аллам А.Х.", price: "3 000 ₽", serviceSlug: "rozaceya" },
          { name: "Прием дерматолога  Райкова С.А.", price: "2 700 ₽", serviceSlug: "rozaceya" },
          { name: "Прием дерматолога Райкова С.А. повторный", price: "2 700 ₽", serviceSlug: "rozaceya" },
          { name: "Прием дерматовенеролога  Грачева В,С.    первичный", price: "2 500 ₽", serviceSlug: "rozaceya" },
          { name: "Прием  врача- дерматолога  Грачева В,С.    повторный", price: "2 500 ₽", serviceSlug: "rozaceya" },
          { name: "Прием  дерматолога Павлюк М.О.", price: "4 500 ₽", serviceSlug: "rozaceya" },
          { name: "Прием  дерматолога Павлюк М.О. повторный", price: "4 500 ₽", serviceSlug: "rozaceya" },
        ],
      },
      {
        title: "Лечение акне",
        items: [
          { name: "Фототерапия Области высыпаний на лице, с фотосенсибилизатором, лечения акне одна вспышка", price: "85 ₽", serviceSlug: "lechenie-akne" },
          { name: "Фототерапия Лечение акне на лице + шея с фотосенсибилизатором", price: "8 400 ₽", serviceSlug: "lechenie-akne" },
          { name: "Фототерапия  удаление пигментации Фотовспышка", price: "85 ₽", serviceSlug: "lechenie-akne" },
          { name: "Фотосенсибилизатор", price: "1 100 ₽", serviceSlug: "lechenie-akne" },
          { name: "Пилинг Азелаиновый Anti-acne", price: "3 400 ₽", serviceSlug: "lechenie-akne" },
          { name: "Пилинг Азелаиновый Anti-acne   спины", price: "5 300 ₽", serviceSlug: "lechenie-akne" },
          { name: "Чистка от прыщей", price: "4 800 ₽", serviceSlug: "lechenie-akne" },
        ],
      },
    ],
  },
  {
    id: "trichology",
    title: "Трихология",
    subcategories: [
      {
        title: "Прием врача",
        items: [
          { name: "Трихолог Аллам А.Х.", price: "4 500 ₽", serviceSlug: "consult-triho" },
          { name: "Трихолог Аллам А.Х. повторный", price: "4 500 ₽", serviceSlug: "consult-triho" },
          { name: "Трихолог Райкова С.А.", price: "3 000 ₽", serviceSlug: "consult-triho" },
          { name: "Трихолог Райкова С.А. повторный", price: "3 000 ₽", serviceSlug: "consult-triho" },
          { name: "Трихолог Грачева В.С.", price: "2 900 ₽", serviceSlug: "consult-triho" },
          { name: "Трихолог повторный Грачава В.С.", price: "2 900 ₽", serviceSlug: "consult-triho" },
          { name: "Трихолог Павлюк М.О.", price: "6 000 ₽", serviceSlug: "consult-triho" },
          { name: "Трихолог Павлюк М.О. повторный", price: "6 000 ₽", serviceSlug: "consult-triho" },
        ],
      },
      {
        title: "Диагностика волос",
        items: [
          { name: "Трихоскопия с отчетом. Осмотр кожи под увеличением", price: "2 600 ₽" },
          { name: "Фототрихограмма  волос ( 1 этап) Осмотр кожи под увеличением", price: "700 ₽" },
          { name: "Фототрихограмма 2 этап", price: "2 600 ₽" },
        ],
      },
      {
        title: "Мезотерапия головы",
        items: [
          { name: "Мезотерапия головы Hair X флакон 2 мл Россия", price: "4 000 ₽", serviceSlug: "mezoterapiya-golovy" },
          { name: "Мезотерапия головы безинъекционная", price: "3 300 ₽", serviceSlug: "mezoterapiya-golovy" },
          { name: "Мезотерапия головы Hair X  шприц с пептидами 2 мл Россия", price: "9 900 ₽", serviceSlug: "mezoterapiya-golovy" },
          { name: "Мезотерапия Gag Comlex 1.0 мл.", price: "3 800 ₽", serviceSlug: "mezoterapiya-golovy" },
        ],
      },
      {
        title: "Плазмотерапия",
        items: [
          { name: "Плазмотерапия головы Plasmoactive 1 пробирка 4мл", price: "5 500 ₽", serviceSlug: "plazmoterapiya" },
          { name: "PRP Плазмотерапия", price: "13 200 ₽", serviceSlug: "plazmoterapiya" },
        ],
      },
      {
        title: "Холодная плазма головы",
        items: [
          { name: "Импульсный спрей (холодная плазма)- волосистая часть головы", price: "3 200 ₽", serviceSlug: "holodnaya-plazma-golovy" },
        ],
      },
    ],
  },
  {
    id: "removals",
    title: "Удаление родинок, папиллом, бородавок",
    subcategories: [
      {
        title: "Прием врача",
        items: [
          { name: "Дерматоскопия", price: "1 700 ₽", serviceSlug: "consult-triho" },
        ],
      },
      {
        title: "Удаление папиллом",
        items: [
          { name: "Удаление доброкачественных новообразований кожи методом электрокоагуляции", price: "за 1 шт.", serviceSlug: "udalenie-papillom" },
          { name: "Папиллома 1 шт", price: "1 600 ₽", serviceSlug: "udalenie-papillom" },
          { name: "Папиллома  2 шт", price: "1 200 ₽", serviceSlug: "udalenie-papillom" },
          { name: "Папиллома 3- 5 шт", price: "800 ₽", serviceSlug: "udalenie-papillom" },
          { name: "Папиллома  6-10 шт", price: "600 ₽", serviceSlug: "udalenie-papillom" },
          { name: "Папиллома  более 10 шт. см", price: "500 ₽", serviceSlug: "udalenie-papillom" },
          { name: "Папиллома в паху", price: "1 700 ₽", serviceSlug: "udalenie-papillom" },
          { name: "Папиллома на гениталиях", price: "1 700 ₽", serviceSlug: "udalenie-papillom" },
          { name: "Папилломатозный невус до 0.5 см", price: "1 700 ₽", serviceSlug: "udalenie-papillom" },
          { name: "Мелкие папилломы до 0.1 см 40-60 шт.", price: "12 200 ₽", serviceSlug: "udalenie-papillom" },
          { name: "Мелкие папилломы до 0.1 см 61-80 шт.", price: "17 000 ₽", serviceSlug: "udalenie-papillom" },
          { name: "Папиллома в области век (любой размер)", price: "2 000 ₽", serviceSlug: "udalenie-papillom" },
        ],
      },
      {
        title: "Удаление родинок",
        items: [
          { name: "Удаление доброкачественных новообразований кожи методом электрокоагуляции", price: "за 1 шт.", serviceSlug: "udalenie-rodinok" },
          { name: "Родинки, невусы, фибромы, кератомы до 0.5 см", price: "1 700 ₽", serviceSlug: "udalenie-rodinok" },
          { name: "Родинки, невусы, фибромы, кератомы   0.5-1 см", price: "2 200 ₽", serviceSlug: "udalenie-rodinok" },
          { name: "Родинки, невусы, фибромы, кератомы  более 1см", price: "2 800 ₽", serviceSlug: "udalenie-rodinok" },
          { name: "Удаление милиумов кожи 1 шт./ Более 5шт. – 10%)", price: "600 ₽", serviceSlug: "udalenie-rodinok" },
          { name: "Удаление сосудистой мальформации за 1см", price: "900 ₽", serviceSlug: "udalenie-rodinok" },
          { name: "Удаление звездчатой ангиомы за 1см", price: "1 200 ₽", serviceSlug: "udalenie-rodinok" },
          { name: "Удаление телеангиоэктазий за 1 см.", price: "1 000 ₽", serviceSlug: "udalenie-rodinok" },
        ],
      },
      {
        title: "Удаление бородавок",
        items: [
          { name: "Удаление доброкачественных новообразований кожи методом электрокоагуляции", price: "за 1 шт.", serviceSlug: "udalenie-borodavok" },
          { name: "Бородавки 1шт до 0.3 см", price: "1 600 ₽", serviceSlug: "udalenie-borodavok" },
          { name: "Бородавки 1шт 0.3 -0.5 см", price: "2 000 ₽", serviceSlug: "udalenie-borodavok" },
          { name: "Бородавки 0.5-1 см", price: "2 800 ₽", serviceSlug: "udalenie-borodavok" },
          { name: "Бородавки 1-2 см", price: "3 300 ₽", serviceSlug: "udalenie-borodavok" },
          { name: "Бородавка стопы  до 0,3 см", price: "1 700 ₽", serviceSlug: "udalenie-borodavok" },
          { name: "Бородавка стопы  до 1 см", price: "3 300 ₽", serviceSlug: "udalenie-borodavok" },
          { name: "Бородавка стопы  до 2 см", price: "4 000 ₽", serviceSlug: "udalenie-borodavok" },
          { name: "Криодеструкция кожи", price: "за 1 шт.", serviceSlug: "udalenie-borodavok" },
          { name: "Первичная обработка           Бородавка до 0.3 см", price: "1 200 ₽", serviceSlug: "udalenie-borodavok" },
          { name: "Бородавка до 0.4-0.5 см", price: "1 500 ₽", serviceSlug: "udalenie-borodavok" },
          { name: "Бородавка до 0.6-1 см", price: "1 800 ₽", serviceSlug: "udalenie-borodavok" },
          { name: "Бородавка до 1.1-1.5 см", price: "2 300 ₽", serviceSlug: "udalenie-borodavok" },
          { name: "Повторная обработка           Бородавка до 0.3 см", price: "700 ₽", serviceSlug: "udalenie-borodavok" },
          { name: "Бородавка до 0.4-0.5 см", price: "1 000 ₽", serviceSlug: "udalenie-borodavok" },
          { name: "Бородавка до 0.6-1 см", price: "1 700 ₽", serviceSlug: "udalenie-borodavok" },
          { name: "Бородавкадо 1.1-1.5 см", price: "2 200 ₽", serviceSlug: "udalenie-borodavok" },
        ],
      },
      {
        title: "Удаление гемангиом",
        items: [
          { name: "Удаление доброкачественных новообразований кожи методом электрокоагуляции", price: "за 1 шт." },
          { name: "Удаление гемангиомы до 0.5  см.", price: "1 600 ₽" },
        ],
      },
      {
        title: "Удаление контагиозных моллюсков",
        items: [
          { name: "Удаление контагиозных моллюсков до 0.3 см", price: "900 ₽", serviceSlug: "udalenie-mollyuska" },
          { name: "Удаление контагиозных моллюсков  до 0.5 см", price: "1 200 ₽", serviceSlug: "udalenie-mollyuska" },
        ],
      },
      {
        title: "Удаление ксантелазмов",
        items: [
          { name: "Удаление доброкачественных новообразований кожи методом электрокоагуляции", price: "за 1 шт." },
          { name: "Удаление ксантелазма века 1шт. до 0.5 см", price: "1 900 ₽" },
          { name: "Удаление ксантелазма века 1 шт. до 1 см", price: "3 000 ₽" },
        ],
      },
    ],
  },
  {
    id: "health",
    title: "Здоровье",
    subcategories: [
      {
        title: "Остеопат",
        items: [
          { name: "Остеопат", price: "6 500 ₽", serviceSlug: "osteopat" },
          { name: "Остеопат повторный", price: "6 500 ₽", serviceSlug: "osteopat" },
        ],
      },
      {
        title: "Диетолог",
        items: [
          { name: "Диетолог", price: "4 300 ₽", serviceSlug: "dietolog" },
          { name: "Диетолог повторный", price: "4 300 ₽", serviceSlug: "dietolog" },
          { name: "Программа питания", price: "19 000 ₽", serviceSlug: "dietolog" },
          { name: "Диетологическое сопровождение 7 дней", price: "4 000 ₽", serviceSlug: "dietolog" },
          { name: "Программа  похудения ДУЭТ", price: "40 000 ₽", serviceSlug: "dietolog" },
          { name: "Прграмма похудения СОЛО", price: "28 000 ₽", serviceSlug: "dietolog" },
          { name: "Программа похудения ТРИО", price: "60 000 ₽", serviceSlug: "dietolog" },
          { name: "Сопровождение врача-диетолога в течении 90 дней После прохождения  индивидуальной программы   по снижению лишнего  веса", price: "24 000 ₽", serviceSlug: "dietolog" },
          { name: "Диетолог с биоимпедансометрией", price: "7 000 ₽", serviceSlug: "dietolog" },
          { name: "Диетолог с  биоимпедансометрией повторный", price: "7 000 ₽", serviceSlug: "dietolog" },
        ],
      },
      {
        title: "Невролог",
        items: [
          { name: "Невролог", price: "2 500 ₽", serviceSlug: "nevrolog" },
          { name: "Невролог повторный", price: "2 500 ₽", serviceSlug: "nevrolog" },
        ],
      },
      {
        title: "Нутрициолог",
        items: [
          { name: "Нутрициолог", price: "5 300 ₽", serviceSlug: "nutritsiolog" },
        ],
      },
      {
        title: "Массаж тела",
        items: [
          { name: "Общий массаж тела при весе до 120кг", price: "2 500 ₽" },
          { name: "Общий массаж  при весе более 120кг", price: "2 800 ₽" },
          { name: "Массаж ноги", price: "1 400 ₽" },
          { name: "Массаж спины при весе до 120 кг", price: "1 250 ₽" },
          { name: "Массаж спины при весе более 120 кг", price: "1 500 ₽" },
          { name: "Массаж шеи", price: "700 ₽" },
          { name: "Массаж ног", price: "2 800 ₽" },
          { name: "Массаж рук", price: "800 ₽" },
          { name: "Массаж руки одной", price: "400 ₽" },
          { name: "Массаж головы", price: "700 ₽" },
        ],
      },
      {
        title: "Детский массаж тела",
        items: [
          { name: "Детский общий массаж 1-3 года", price: "900 ₽" },
          { name: "Детский общий массаж 4-6  лет", price: "1 200 ₽" },
          { name: "Детский массаж спины 1-6 лет", price: "700 ₽" },
          { name: "Детский массаж спины 7-11  лет", price: "800 ₽" },
          { name: "Детский массаж спины 12-14 лет", price: "900 ₽" },
          { name: "Детский общий массаж 7-11 лет", price: "1 500 ₽" },
          { name: "Детский общий массаж 12-14 лет", price: "1 900 ₽" },
        ],
      },
      {
        title: "Антицеллюлитный массаж",
        items: [
          { name: "Антицеллюлитный массаж  ног", price: "2 800 ₽" },
          { name: "Антицеллюлитный +Лимфодренажный массаж+(лазерно-вакуумный массажи или РФ- лифтинг), антицеллюлитное обертывание)", price: "8 450 ₽" },
        ],
      },
    ],
  },
];

export function getAllPriceItems(): (PriceItem & { categoryId: string; categoryTitle: string; subcategoryTitle: string })[] {
  const all: (PriceItem & { categoryId: string; categoryTitle: string; subcategoryTitle: string })[] = [];
  for (const cat of priceCategories) {
    for (const sub of cat.subcategories) {
      for (const item of sub.items) {
        all.push({ ...item, categoryId: cat.id, categoryTitle: cat.title, subcategoryTitle: sub.title });
      }
    }
  }
  return all;
}

export function searchPriceItems<T extends PriceItem>(items: T[], query: string): T[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return items.filter((it) =>
    it.name.toLowerCase().includes(q) ||
    (it.code?.toLowerCase().includes(q) ?? false) ||
    (it.nomenclatureName?.toLowerCase().includes(q) ?? false)
  );
}

export function getTotalPriceCount(): number {
  return priceCategories.reduce((sum, c) => sum + c.subcategories.reduce((s, sc) => s + sc.items.length, 0), 0);
}
