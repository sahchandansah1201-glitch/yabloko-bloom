import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

interface HeaderProps {
  onBookingClick: () => void;
}

export function Header({ onBookingClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Главная" },
    { href: "/services", label: "Услуги" },
    { href: "/specialists", label: "Специалисты" },
    { href: "/about", label: "О клинике" },
    { href: "/contacts", label: "Контакты" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Яблоко - клиника дерматологии и косметологии" 
            className="h-12 w-auto md:h-14"
            width={56}
            height={56}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Phone - visible on md+ */}
          <a 
            href="tel:+79184128585" 
            className="hidden items-center gap-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary md:flex"
          >
            <Phone className="h-4 w-4" />
            +7 (918) 412-85-85
          </a>

          {/* Account button */}
          <Link to="/auth">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
              <span className="sr-only">Личный кабинет</span>
            </Button>
          </Link>

          {/* CTA Button */}
          <Button 
            variant="hero" 
            size="lg" 
            onClick={onBookingClick}
            className="hidden md:flex"
          >
            Записаться
          </Button>

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
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-border bg-card lg:hidden">
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
            <a 
              href="tel:+79184128585" 
              className="flex items-center gap-2 rounded-lg px-4 py-3 font-medium text-foreground/80 transition-colors hover:bg-secondary"
            >
              <Phone className="h-4 w-4" />
              +7 (918) 412-85-85
            </a>
            <Link
              to="/auth"
              className="flex items-center gap-2 rounded-lg px-4 py-3 font-medium text-foreground/80 transition-colors hover:bg-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-4 w-4" />
              Личный кабинет
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
