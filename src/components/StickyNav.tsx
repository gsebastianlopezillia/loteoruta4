import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ChevronDown } from 'lucide-react';
import 'react-flagpack/dist/style.css';

const flagsBase = `${import.meta.env.BASE_URL}flags`;
const LANGUAGES: { code: string; flag: string; label: string }[] = [
  { code: 'es', flag: 'AR', label: 'Español' },
  { code: 'en', flag: 'US', label: 'English' },
  { code: 'pt', flag: 'BR', label: 'Português' },
  { code: 'de', flag: 'DE', label: 'Deutsch' },
  { code: 'ru', flag: 'RU', label: 'Русский' },
];

function FlagIcon({ code, size = 's' }: { code: string; size?: 's' | 'm' | 'l' }) {
  return (
    <div className={`flag size-${size} border-radius`}>
      <img src={`${flagsBase}/${size}/${code}.svg`} alt="" width={size === 's' ? 16 : size === 'm' ? 20 : 32} height={size === 's' ? 12 : size === 'm' ? 15 : 24} />
    </div>
  );
}

export function StickyNav() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (!isHome) return;
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'garantias', labelKey: 'nav.garantias' },
    { id: 'ubicacion', labelKey: 'nav.ubicacion' },
    { id: 'lotes', labelKey: 'nav.lotes' },
    { id: 'caracteristicas', labelKey: 'nav.caracteristicas' },
    { id: 'galeria', labelKey: 'nav.galeria' },
    { id: 'reviews', labelKey: 'nav.reviews' },
    { id: 'faq', labelKey: 'nav.faq' },
    { id: 'contacto', labelKey: 'nav.contacto' },
  ];

  const handleWhatsApp = () => {
    const message = encodeURIComponent(t('whatsapp.defaultMessage'));
    window.open(`https://wa.me/543764165357?text=${message}`, '_blank');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#121212]/95 backdrop-blur-lg shadow-xl' : 'bg-[#121212]/80 backdrop-blur-sm'
      }`}
      style={{ borderBottom: '1px solid #2a2a2a' }}
    >
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-[20px] text-[#27AE60] cursor-pointer hover:text-[#2ECC71] transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.5px' }}
              onClick={() => isHome && window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t('nav.brand')}
            </Link>
          </div>
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              isHome ? (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-3 py-2 text-[14px] text-[#D0D0D0] hover:text-[#27AE60] transition-colors rounded-lg hover:bg-[#27AE60]/10"
                  style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400 }}
                >
                  {t(item.labelKey)}
                </button>
              ) : (
                <Link
                  key={item.id}
                  to={`/#${item.id}`}
                  className="px-3 py-2 text-[14px] text-[#D0D0D0] hover:text-[#27AE60] transition-colors rounded-lg hover:bg-[#27AE60]/10"
                  style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400 }}
                >
                  {t(item.labelKey)}
                </Link>
              )
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative" ref={langMenuRef}>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setLangOpen((o) => !o); }}
                title={t('nav.language')}
                aria-label={t('nav.language')}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                className="flex items-center gap-1.5 rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] px-2 py-1.5 text-[#D0D0D0] hover:bg-[#27AE60]/10 hover:border-[#27AE60]/30 transition-colors"
              >
                <FlagIcon code={LANGUAGES.find((l) => l.code === i18n.language)?.flag ?? 'AR'} size="s" />
                <span className="text-xs font-medium max-w-[4rem] truncate" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  {LANGUAGES.find((l) => l.code === i18n.language)?.label ?? 'Español'}
                </span>
                <ChevronDown className={`size-4 shrink-0 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <ul
                  role="listbox"
                  className="absolute right-0 top-full mt-1 min-w-[10rem] rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] shadow-xl py-1 z-50"
                >
                  {LANGUAGES.map((lang) => (
                    <li key={lang.code} role="option" aria-selected={i18n.language === lang.code}>
                      <button
                        type="button"
                        onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${i18n.language === lang.code ? 'bg-[#27AE60]/20 text-[#27AE60]' : 'text-[#D0D0D0] hover:bg-[#27AE60]/10'}`}
                        style={{ fontFamily: 'Open Sans, sans-serif' }}
                      >
                        <FlagIcon code={lang.flag} size="s" />
                        {lang.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              onClick={handleWhatsApp}
              className="bg-[#27AE60] hover:bg-[#1e8449] text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '14px', letterSpacing: '0.3px' }}
            >
              <Phone className="size-4" />
              <span className="hidden md:inline">{t('nav.contactar')}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
