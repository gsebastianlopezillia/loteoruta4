import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Phone } from 'lucide-react';
import 'react-flagpack/dist/style.css';

const flagsBase = `${import.meta.env.BASE_URL}flags`;
function FlagIcon({ code, size = 's' }: { code: string; size?: 's' | 'm' | 'l' }) {
  return (
    <div className={`flag size-${size} border-radius`}>
      <img src={`${flagsBase}/${size}/${code}.svg`} alt="" width={size === 's' ? 16 : size === 'm' ? 20 : 32} height={size === 's' ? 12 : size === 'm' ? 15 : 24} />
    </div>
  );
}

export function StickyNav() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
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
            <h3
              className="text-[20px] text-[#27AE60] cursor-pointer hover:text-[#2ECC71] transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.5px' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              {t('nav.brand')}
            </h3>
          </div>
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-3 py-2 text-[14px] text-[#D0D0D0] hover:text-[#27AE60] transition-colors rounded-lg hover:bg-[#27AE60]/10"
                style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400 }}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5 rounded-lg border border-[#2a2a2a] p-0.5">
              <button
                type="button"
                onClick={() => i18n.changeLanguage('es')}
                title="Español"
                aria-label="Español"
                style={{ marginInline: '.5rem' }}
                className={`p-1 rounded transition-colors flex items-center justify-center ${i18n.language === 'es' ? 'bg-[#27AE60] ring-1 ring-[#27AE60]' : 'hover:bg-[#27AE60]/20'}`}
              >
                <FlagIcon code="AR" size="s" />
              </button>
              <button
                type="button"
                onClick={() => i18n.changeLanguage('en')}
                title="English"
                aria-label="English"
                style={{ marginInline: '.5rem' }}
                className={`p-1 rounded transition-colors flex items-center justify-center ${i18n.language === 'en' ? 'bg-[#27AE60] ring-1 ring-[#27AE60]' : 'hover:bg-[#27AE60]/20'}`}
              >
                <FlagIcon code="US" size="s" />
              </button>
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
