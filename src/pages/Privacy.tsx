import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";

const Privacy = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Политика конфиденциальности — клиника «Яблоко»</title>
        <meta name="description" content="Политика обработки персональных данных клиники «Яблоко» в Краснодаре. Порядок сбора, хранения и защиты данных пациентов по ФЗ-152." />
        <link rel="canonical" href="https://yabloko-clinic.ru/privacy" />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Header onBookingClick={() => setIsBookingOpen(true)} />

        <main className="flex-1">
          <div className="container max-w-3xl py-12 md:py-16">
            <h1 className="font-heading text-3xl font-bold mb-8 text-foreground">
              Политика обработки персональных данных
            </h1>

            <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
              <section>
                <h2 className="text-lg font-semibold text-foreground">1. Общие положения</h2>
                <p>
                  Настоящая Политика конфиденциальности (далее — «Политика») определяет порядок обработки
                  и защиты персональных данных пользователей сайта клиники дерматологии и косметологии
                  «Яблоко» (далее — «Клиника», «Оператор»), расположенного по адресу: yabloko-clinic.ru.
                </p>
                <p>
                  Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ
                  «О персональных данных» и иными нормативными правовыми актами Российской Федерации.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">2. Персональные данные, которые мы собираем</h2>
                <p>При использовании сайта и заполнении форм записи Клиника может собирать следующие данные:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Фамилия, имя, отчество</li>
                  <li>Номер телефона</li>
                  <li>Адрес электронной почты</li>
                  <li>Иные данные, добровольно предоставленные пользователем</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">3. Цели обработки персональных данных</h2>
                <p>Персональные данные обрабатываются в следующих целях:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Запись на приём к специалистам клиники</li>
                  <li>Обратная связь и консультирование</li>
                  <li>Информирование об услугах, акциях и специальных предложениях (с согласия пользователя)</li>
                  <li>Исполнение требований законодательства Российской Федерации</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">4. Правовые основания обработки</h2>
                <p>
                  Обработка персональных данных осуществляется на основании согласия субъекта персональных
                  данных, выраженного путём проставления отметки в соответствующем поле при заполнении
                  форм на сайте, а также на основании договора на оказание медицинских услуг.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">5. Защита персональных данных</h2>
                <p>
                  Оператор принимает необходимые и достаточные организационные и технические меры для
                  защиты персональных данных от неправомерного или случайного доступа, уничтожения,
                  изменения, блокирования, копирования, распространения, а также от иных неправомерных
                  действий третьих лиц.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">6. Передача данных третьим лицам</h2>
                <p>
                  Персональные данные пользователей не передаются третьим лицам, за исключением случаев,
                  прямо предусмотренных законодательством Российской Федерации, а также случаев, когда
                  передача необходима для оказания медицинских услуг (например, лабораторная диагностика).
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">7. Права субъекта персональных данных</h2>
                <p>Пользователь имеет право:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Получить информацию об обработке своих персональных данных</li>
                  <li>Требовать уточнения, блокирования или уничтожения персональных данных</li>
                  <li>Отозвать согласие на обработку персональных данных</li>
                </ul>
                <p>
                  Для реализации указанных прав необходимо обратиться по телефону{" "}
                  <a href="tel:+79184128585" className="text-primary hover:underline">+7 (918) 412-85-85</a>{" "}
                  или по адресу: г. Краснодар, ул. 70-летия Октября, 1/2.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">8. Файлы cookie</h2>
                <p>
                  Сайт может использовать файлы cookie для обеспечения корректной работы и улучшения
                  пользовательского опыта. Пользователь может отключить использование cookie в настройках
                  своего браузера.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">9. Изменение Политики</h2>
                <p>
                  Оператор оставляет за собой право вносить изменения в настоящую Политику. Новая редакция
                  вступает в силу с момента её размещения на сайте, если иное не предусмотрено новой
                  редакцией.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">10. Контактная информация</h2>
                <p>
                  Клиника дерматологии и косметологии «Яблоко»<br />
                  Адрес: г. Краснодар, ул. 70-летия Октября, 1/2<br />
                  Телефон:{" "}
                  <a href="tel:+79184128585" className="text-primary hover:underline">+7 (918) 412-85-85</a><br />
                  Режим работы: Пн-Сб 9:00–21:00
                </p>
              </section>
            </div>
          </div>
        </main>

        <Footer />
        <BookingWizard isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      </div>
    </>
  );
};

export default Privacy;
