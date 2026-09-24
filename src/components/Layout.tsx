import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/lib/languageContext';
import { languages, Language } from '@/lib/i18n';
import { Menu, X, Phone, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import terawetLogo from '@/assets/terawet-logo.png';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/catalog', label: t('nav.catalog') },
    { path: '/about', label: t('nav.about') },
    { path: '/application', label: t('nav.application') },
    { path: '/contacts', label: t('nav.contacts') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <img src={terawetLogo} alt="Terawet" className="h-8 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="flex items-center gap-1">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`text-lg px-1 py-0.5 rounded transition-all ${
                    lang === l.code ? 'bg-primary/10 scale-110' : 'opacity-60 hover:opacity-100'
                  }`}
                  title={l.label}
                >
                  {l.flag}
                </button>
              ))}
            </div>

            <a href="tel:+380502365858" className="hidden md:flex items-center gap-1 text-sm text-primary font-medium">
              <Phone className="h-4 w-4" />
              +380502365858
            </a>

            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a href="tel:+380502365858" className="flex items-center gap-1 text-sm text-primary font-medium pt-2 border-t border-border">
              <Phone className="h-4 w-4" />
              +380502365858
            </a>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-lg text-primary mb-3">
                <img src={terawetLogo} alt="Terawet" className="h-7 w-auto" />
              </div>
              <p className="text-sm text-muted-foreground">{t('about.text').slice(0, 120)}...</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">{t('contacts.title')}</h3>
              <p className="text-sm text-muted-foreground">📞 +380502365858</p>
              <p className="text-sm text-muted-foreground">👤 Бендик Дмитро</p>
              <p className="text-sm text-muted-foreground">📍 м. Кропивницький, вул. Арсенія Тарковського 61, кв. 2</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">{t('footer.orderTitle')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('footer.orderText')}{' '}
                <a href="https://t.me/Terawet_bot" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">@Terawet_bot</a>
                {' '}{t('footer.orderText2')}
              </p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} TERAWET. {t('footer.rights')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
