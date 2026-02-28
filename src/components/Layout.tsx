import { useTranslation } from 'react-i18next';
import { Phone, MapPin, FileCheck, Home, Droplets } from 'lucide-react';
import { StickyNav } from './StickyNav';
import { trackWhatsAppClick } from './Analytics';
import { CountdownTimer } from './CountdownTimer';

export function Layout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const showEmailForm = i18n.language === 'ru' || i18n.language === 'de';

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    if (email) {
      const subject = encodeURIComponent(`Consulta Loteo Ruta 4 - ${i18n.language}`);
      const body = encodeURIComponent(`Email: ${email}\n\nMensaje:`);
      window.location.href = `mailto:info@loteoruta4.com?subject=${subject}&body=${body}`;
    }
  };
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#FFFFFF]" style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: '16px' }}>
      <header>
        <StickyNav />
        <div className="h-16 bg-[#0a0a0a]" />
        <div className="bg-gradient-to-r from-[#004D40] via-[#27AE60] to-[#004D40] overflow-hidden relative shadow-lg py-3 px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
            <span className="text-white text-center md:text-left" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px' }}>
              {t('banner.summerOffer')}
            </span>
            <CountdownTimer targetDate="2026-03-31T23:59:59" />
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-[#000000] py-20 border-t border-[#2a2a2a]" id="contacto">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12 pb-8 border-b border-[#2a2a2a]">
            <div className="flex items-center gap-3 text-[#D0D0D0]">
              <div className="p-2 rounded-lg bg-[#27AE60]/10">
                <FileCheck className="size-5 text-[#27AE60]" />
              </div>
              <span className="text-[15px]" style={{ fontFamily: 'Open Sans, sans-serif' }}>{t('trustBadges.titulo')}</span>
            </div>
            <div className="flex items-center gap-3 text-[#D0D0D0]">
              <div className="p-2 rounded-lg bg-[#27AE60]/10">
                <Home className="size-5 text-[#27AE60]" />
              </div>
              <span className="text-[15px]" style={{ fontFamily: 'Open Sans, sans-serif' }}>{t('trustBadges.escritura')}</span>
            </div>
            <div className="flex items-center gap-3 text-[#D0D0D0]">
              <div className="p-2 rounded-lg bg-[#27AE60]/10">
                <Droplets className="size-5 text-[#27AE60]" />
              </div>
              <span className="text-[15px]" style={{ fontFamily: 'Open Sans, sans-serif' }}>{t('trustBadges.servicios')}</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div className="animate-on-scroll">
              <h3 className="text-[28px] text-[#27AE60] mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, letterSpacing: '0.5px' }}>{t('footer.brand')}</h3>
              <p className="text-[#D0D0D0] text-[16px]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
                {t('footer.description')}
              </p>
            </div>
            <div className="animate-on-scroll">
              <h4 className="text-[#FFFFFF] mb-4 text-[22px]" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>{t('footer.contactTitle')}</h4>
              <div className="space-y-3 text-[16px] text-[#D0D0D0]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                <p className="flex items-center gap-2">
                  <Phone className="size-4 text-[#27AE60]" />
                  <a
                    href={`https://wa.me/543764165357?text=${encodeURIComponent(t('whatsapp.defaultMessage'))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('footer')}
                    className="hover:text-[#27AE60] transition-colors"
                  >
                    +54 3764 165357
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 text-[#27AE60]" />
                  <a href="https://maps.app.goo.gl/fzaRvwUuQHL7kmFK6" target="_blank" rel="noopener noreferrer" className="hover:text-[#27AE60] transition-colors">
                    {t('footer.address')}
                  </a>
                </p>
              </div>
            </div>
            <div className="animate-on-scroll">
              <h4 className="text-[#FFFFFF] mb-4 text-[22px]" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>{t('footer.summerTitle')}</h4>
              <div className="bg-[#27AE60]/10 border border-[#27AE60] rounded-lg p-4">
                <p className="text-[18px] text-[#FFFFFF] mb-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                  {t('footer.summerText')}
                </p>
              </div>
            </div>
            {showEmailForm && (
              <div className="animate-on-scroll md:col-span-1">
                <h4 className="text-[#FFFFFF] mb-4 text-[22px]" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>{t('emailForm.title')}</h4>
                <p className="text-[#D0D0D0] text-[14px] mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>{t('emailForm.subtitle')}</p>
                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2">
                  <input
                    type="email"
                    name="email"
                    placeholder={t('emailForm.placeholder')}
                    required
                    className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2 text-[#FFFFFF] placeholder-[#666] focus:border-[#27AE60] focus:ring-1 focus:ring-[#27AE60] outline-none"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  />
                  <button
                    type="submit"
                    className="bg-[#27AE60] hover:bg-[#1e8449] text-white px-4 py-2 rounded-lg transition-colors"
                    style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
                  >
                    {t('emailForm.submit')}
                  </button>
                </form>
              </div>
            )}
          </div>
          <div className="border-t border-[#2a2a2a] pt-8 text-center">
            <p className="text-[16px] text-[#999999]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('footer.copyright')}
            </p>
            <p className="text-[14px] text-[#777777] mt-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              {t('footer.tagline')}
            </p>
          </div>
        </div>
      </footer>
      <a
        href={`https://wa.me/543764165357?text=${encodeURIComponent(t('whatsapp.defaultMessage'))}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('floating')}
        className="pulse-wa fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50"
        aria-label={t('whatsapp.ariaLabel')}
      >
        <Phone className="size-6" />
      </a>
    </div>
  );
}
