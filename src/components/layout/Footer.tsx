import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Instagram, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.jpg";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="Яблоко" 
                className="h-16 w-auto"
                width={64}
                height={64}
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Клиника дерматологии и косметологии. 
              Красота через здоровье.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://wa.me/79184128585" 
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground/70 transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-heading font-semibold">Услуги</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services/cosmetology" className="hover:text-primary">Косметология</Link></li>
              <li><Link to="/services/dermatology" className="hover:text-primary">Дерматология</Link></li>
              <li><Link to="/services/trichology" className="hover:text-primary">Трихология</Link></li>
              <li><Link to="/services/health" className="hover:text-primary">Здоровье</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-heading font-semibold">Информация</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/price" className="hover:text-primary">Цены</Link></li>
              <li><Link to="/specialists" className="hover:text-primary">Специалисты</Link></li>
              <li><Link to="/advice" className="hover:text-primary">Советы экспертов</Link></li>
              <li><Link to="/about" className="hover:text-primary">О клинике</Link></li>
              <li><Link to="/privacy" className="hover:text-primary">Политика конфиденциальности</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-heading font-semibold">Контакты</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>г. Краснодар, ул. 70-летия Октября, 1/2</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+79184128585" className="hover:text-primary">
                  +7 (918) 412-85-85
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Пн-Сб: 9:00 - 20:00<br />Вс: выходной</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="my-8 p-4 rounded-lg bg-secondary/50 border border-border/50">
          <p className="text-sm text-muted-foreground text-center">
            ⚠️ Имеются противопоказания, необходима консультация специалиста. 
            Информация на сайте не является публичной офертой.
          </p>
        </div>

        <hr className="my-6 border-border" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs text-muted-foreground md:flex-row md:text-left">
          <p>© 2024 Клиника "Яблоко". Все права защищены.</p>
          <p>Лицензия № ЛО-23-01-XXXXXX</p>
        </div>
      </div>
    </footer>
  );
}
