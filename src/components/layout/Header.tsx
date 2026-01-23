import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

interface HeaderProps {
  onBookingClick: () => void;
}

export function Header({ onBookingClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/services", label: "Услуги" },
    { href: "/specialists", label: "Врачи" },
    { href: "/prices", label: "Прайс" },
    { href: "/contacts", label: "Контакты" },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-card/80 backdrop-blur-xl border-b border-border/40 shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img 
            src={logo} 
            alt="Яблоко - клиника дерматологии и косметологии" 
            className="h-10 w-auto md:h-12"
            width={48}
            height={48}
          />
          <span className="font-heading font-bold text-xl text-primary hidden sm:inline">
            ЯБЛОКО
          </span>
        </Link>

        {/* Desktop Navigation - Center */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-medium text-foreground/80 transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side - Contact info & CTA */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Address */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <span className="hidden xl:inline">Краснодар, ул. 70-летия Октября, 1/2</span>
            <span className="xl:hidden">Краснодар</span>
          </div>

          {/* Phone */}
          <a 
            href="tel:+79184128585" 
            className="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            <Phone className="h-4 w-4 text-primary" />
            +7 (918) 412-85-85
          </a>

          {/* CTA Button */}
          <Button 
            variant="hero" 
            size="default" 
            onClick={onBookingClick}
          >
            Запись
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">Меню</span>
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-border bg-card/95 backdrop-blur-xl lg:hidden animate-fade-in">
          <nav className="container flex flex-col gap-2 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="rounded-lg px-4 py-3 font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Краснодар, ул. 70-летия Октября, 1/2</span>
            </div>
            <a 
              href="tel:+79184128585" 
              className="flex items-center gap-2 rounded-lg px-4 py-3 font-medium text-foreground/80 transition-colors hover:bg-secondary"
            >
              <Phone className="h-4 w-4 text-primary" />
              +7 (918) 412-85-85
            </a>
            <div className="px-4 pt-2">
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={() => {
                  onBookingClick();
                  setIsMenuOpen(false);
                }}
              >
                Записаться онлайн
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
