import { useTranslation } from 'react-i18next';
import { Phone, MapPin } from 'lucide-react';
import { StickyNav } from './StickyNav';

export function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#FFFFFF]" style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: '16px' }}>
      <header>
        <StickyNav />
        <div className="h-16 bg-[#0a0a0a]" />
        <div className="bg-gradient-to-r from-[#004D40] via-[#27AE60] to-[#004D40] overflow-hidden relative shadow-lg" style={{ height: '58px', display: 'flex', alignItems: 'center' }}>
          <div className="animate-scroll whitespace-nowrap">
            <span className="inline-block px-8 text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '16px', letterSpacing: '0.5px' }}>
              {t('banner.summerOffer')}
            </span>
            <span className="inline-block px-8 text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '16px', letterSpacing: '0.5px' }}>
              {t('banner.summerOffer')}
            </span>
            <span className="inline-block px-8 text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '16px', letterSpacing: '0.5px' }}>
              {t('banner.summerOffer')}
            </span>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-[#000000] py-20 border-t border-[#2a2a2a]" id="contacto">
        <div className="container mx-auto max-w-6xl px-4">
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
                  <a href="https://wa.me/543764165357" className="hover:text-[#27AE60] transition-colors">+54 3764 165357</a>
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
        className="pulse-wa fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50"
        aria-label={t('whatsapp.ariaLabel')}
      >
        <Phone className="size-6" />
      </a>
    </div>
  );
}
