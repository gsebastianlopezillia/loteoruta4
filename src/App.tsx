import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
import { LoteCard } from './components/LoteCard';
import { BenefitCard } from './components/BenefitCard';
import { Layout } from './components/Layout';
import { SEOHead } from './components/SEOHead';
import { StructuredData } from './components/StructuredData';
import { Analytics } from './components/Analytics';
import { FAQItem } from './components/FAQItem';
import { Button } from './components/ui/button';
import {
  MapPin,
  Trees,
  Home,
  Droplets,
  Wifi,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Sprout,
  Building2,
  Phone
} from 'lucide-react';
import loteoVistaGeneral from './assets/loteo_vista_general_1.jpeg';
import loteoVistaAerea from './assets/loteo_vista_aerea_2.jpeg';
import loteoCaminosInternos from './assets/loteo_caminos_internos_3.jpeg';
import loteoMonteNativo from './assets/loteo_monte_nativo_4.jpeg';
import loteoAccesoPrincipal from './assets/loteo_acceso_principal_5.jpeg';
import loteoViasCirculacion from './assets/loteo_vias_circulacion_6.jpeg';
import loteoSenderosPeatonales from './assets/loteo_senderos_peatonales_7.jpeg';
import loteoZonasComunes from './assets/loteo_zonas_comunes_8.jpeg';
import loteoAreaVerde from './assets/loteo_area_verde_9.jpeg';
import loteoBiodiversidad from './assets/loteo_biodiversidad_10.jpeg';
import loteoEspaciosNaturales from './assets/loteo_espacios_naturales_11.jpeg';
import loteoUbicacionEstrategica from './assets/loteo_ubicacion_estrategica_12.jpeg';
import { lotes } from './data/lotes';
import { CalculadoraUVA } from './pages/CalculadoraUVA';

const galleryUrls = [
  loteoVistaGeneral,
  loteoVistaAerea,
  loteoCaminosInternos,
  loteoMonteNativo,
  loteoAccesoPrincipal,
  loteoViasCirculacion,
  loteoSenderosPeatonales,
  loteoZonasComunes,
  loteoAreaVerde,
  loteoBiodiversidad,
  loteoEspaciosNaturales,
  loteoUbicacionEstrategica
];

function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('fade-up');
            }, index * 150);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function HomeContent() {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showAllLotes, setShowAllLotes] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const galleryImages = useMemo(() => galleryUrls.map((url, i) => ({
    url,
    title: t(`gallery.images.${i}title`),
    description: t(`gallery.images.${i}desc`)
  })), [t]);
  const testimonials = useMemo(() => [1, 2, 3, 4, 5].map((i) => ({
    text: t(`testimonials.${i}text`),
    subtitle: t(`testimonials.${i}subtitle`)
  })), [t]);

  useScrollAnimation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleWhatsAppMain = () => {
    const message = encodeURIComponent(t('whatsapp.defaultMessage'));
    window.open(`https://wa.me/543764165357?text=${message}`, '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const lotesDisponibles = lotes.filter(l => l.estado === 'disponible').length;

  return (
    <>
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center ken-burns"
              style={{
                backgroundImage: `url(${loteoVistaGeneral})`,
                backgroundAttachment: 'fixed',
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className={`relative z-10 container mx-auto px-4 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-[72px] md:text-[100px] leading-[1.2] text-[#FFFFFF] mb-6 max-w-5xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.5px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                {t('hero.title')}
              </h1>
              <p className="text-[20px] text-[#FFFFFF] mb-8 max-w-3xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
                {t('hero.subtitle')}
              </p>
              <Button
                onClick={handleWhatsAppMain}
                className="bg-[#27AE60] hover:bg-[#1e8449] text-white px-16 py-8 transition-all duration-300 hover:scale-[1.08] shadow-2xl shadow-[#27AE60]/50"
                style={{ borderRadius: '8px', fontSize: '20px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.5px' }}
              >
                <Phone className="mr-2 size-5" />
                {t('hero.cta')}
              </Button>
              <p className="mt-8 text-[16px] text-[#A0A0A0]" style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 300, lineHeight: '1.5' }}>
                {t('hero.lotsLeft', { count: lotesDisponibles })}
              </p>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
              <ChevronRight className="size-8 text-[#004D40] rotate-90" />
            </div>
          </section>

          {/* Sección Dolor/Sueño */}
          <section className="py-32 bg-[#0a0a0a]" id="garantias">
            <div className="container mx-auto max-w-4xl px-4">
              <div className="text-center space-y-6">
                <h2 className="animate-on-scroll text-[48px] md:text-[54px] leading-[1.4] text-[#FFFFFF]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.2px', fontStyle: 'italic' }}>
                  {t('garantias.headline')}
                </h2>
                <p className="animate-on-scroll text-[18px] text-[#E0E0E0] leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
                  {t('garantias.introBefore')}
                  <span className="text-[#27AE60]">{t('garantias.introHighlight')}</span>
                  {t('garantias.introAfter')}
                </p>
                <div className="animate-on-scroll pt-6 space-y-4 text-left bg-[#121212] p-8 rounded-lg border border-[#333]">
                  <h3 className="text-[32px] text-[#27AE60]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.2px' }}>{t('garantias.title')}</h3>
                  <ul className="space-y-3 text-[#E0E0E0]" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '16px', lineHeight: '1.6' }}>
                    <li className="flex items-start gap-3">
                      <FileCheck className="size-5 text-[#27AE60] mt-1 flex-shrink-0" />
                      <span>{t('garantias.item1')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="size-5 text-[#27AE60] mt-1 flex-shrink-0" />
                      <span>{t('garantias.item2')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Droplets className="size-5 text-[#27AE60] mt-1 flex-shrink-0" />
                      <span>{t('garantias.item3')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Home className="size-5 text-[#27AE60] mt-1 flex-shrink-0" />
                      <span>{t('garantias.item4')}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="size-5 text-[#27AE60] mt-1 flex-shrink-0" />
                      <span>{t('garantias.item5')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          {/* Ubicación Privilegiada */}
          <section className="py-24 bg-[#0a0a0a]" id="ubicacion">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="text-center mb-16">
                <h2 className="animate-on-scroll text-[48px] md:text-[56px] leading-[1.2] text-[#FFFFFF] mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>
                  {t('ubicacion.title')} <span className="text-[#27AE60]">{t('ubicacion.titleHighlight')}</span>
                </h2>
                <p className="animate-on-scroll text-[18px] text-[#E0E0E0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
                  {t('ubicacion.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="animate-on-scroll bg-[#121212] rounded-xl overflow-hidden border border-[#2a2a2a] h-[450px] shadow-xl">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.2!2d-55.448548!3d-27.523444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDMxJzI0LjQiUyA1NcKwMjYnNTQuNSJX!5e0!3m2!1ses!2sar!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t('ubicacion.mapTitle')}
                  />
                </div>

                <div className="space-y-4">
                  <div className="animate-on-scroll bg-[#121212] p-6 rounded-xl border border-[#2a2a2a] hover:border-[#27AE60] transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#27AE60]/10 rounded-lg">
                        <MapPin className="size-6 text-[#27AE60] flex-shrink-0" />
                      </div>
                      <div>
                        <h3 className="text-[#FFFFFF] mb-2 text-[20px]" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>{t('ubicacion.card1Title')}</h3>
                        <p className="text-[16px] text-[#D0D0D0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.5' }}>
                          {t('ubicacion.card1Desc')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="animate-on-scroll bg-[#121212] p-6 rounded-xl border border-[#2a2a2a] hover:border-[#27AE60] transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#27AE60]/10 rounded-lg">
                        <Home className="size-6 text-[#27AE60] flex-shrink-0" />
                      </div>
                      <div>
                        <h3 className="text-[#FFFFFF] mb-2 text-[20px]" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>{t('ubicacion.card2Title')}</h3>
                        <p className="text-[16px] text-[#D0D0D0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.5' }}>
                          {t('ubicacion.card2Desc')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="animate-on-scroll bg-[#121212] p-6 rounded-xl border border-[#2a2a2a] hover:border-[#27AE60] transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#27AE60]/10 rounded-lg">
                        <Droplets className="size-6 text-[#27AE60] flex-shrink-0" />
                      </div>
                      <div>
                        <h3 className="text-[#FFFFFF] mb-2 text-[20px]" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>{t('ubicacion.card3Title')}</h3>
                        <p className="text-[16px] text-[#D0D0D0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.5' }}>
                          {t('ubicacion.card3Desc')}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="animate-on-scroll bg-[#121212] p-6 rounded-xl border border-[#2a2a2a] hover:border-[#27AE60] transition-all duration-300 shadow-lg hover:shadow-xl">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#27AE60]/10 rounded-lg">
                        <Building2 className="size-6 text-[#27AE60] flex-shrink-0" />
                      </div>
                      <div>
                        <h3 className="text-[#FFFFFF] mb-2 text-[20px]" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>{t('ubicacion.card4Title')}</h3>
                        <p className="text-[16px] text-[#D0D0D0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.5' }}>
                          {t('ubicacion.card4Desc')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Lotes Disponibles */}
          <section className="py-32 bg-[#121212]" id="lotes">
            <div className="container mx-auto max-w-7xl px-4">
              <div className="text-center mb-12">
                <h2 className="animate-on-scroll text-[48px] md:text-[54px] leading-[1.2] text-[#FFFFFF] mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.2px' }}>
                  {t('lotes.title')} <span className="text-[#27AE60]">{t('lotes.titleHighlight')}</span>
                </h2>
                <p className="animate-on-scroll text-[18px] text-[#E0E0E0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
                  {t('lotes.subtitle')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(showAllLotes ? lotes : lotes.slice(0, 4)).map((lote, index) => (
                  <div
                    key={lote.numero}
                    className="animate-on-scroll"
                    style={{
                      animation: showAllLotes && index >= 4 ? 'fadeIn 0.5s ease-in' : undefined
                    }}
                  >
                    <LoteCard
                      numero={lote.numero}
                      superficie={t('common.surfaceValue')}
                      precioUSD={lote.estado === 'disponible' ? lote.precio : 0}
                      dimensiones={t(lote.forma === 'rectangular' ? 'common.dimensionesRect' : 'common.dimensionesTri')}
                      forma={lote.forma}
                      estado={lote.estado}
                    />
                  </div>
                ))}
              </div>

              {!showAllLotes && lotes.length > 4 && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={() => setShowAllLotes(true)}
                    className="bg-transparent border-2 border-[#27AE60] text-[#27AE60] hover:bg-[#27AE60] hover:text-white px-12 py-6 transition-all duration-300 hover:scale-105"
                    style={{
                      borderRadius: '8px',
                      fontSize: '18px',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: 600,
                      letterSpacing: '0.5px'
                    }}
                  >
                    {t('lotes.showMore')}
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Beneficios */}
          <section className="py-28 bg-[#0a0a0a]" id="caracteristicas">
            <div className="container mx-auto max-w-7xl px-4">
              <div className="text-center mb-16">
                <h2 className="animate-on-scroll text-[48px] md:text-[56px] leading-[1.2] text-[#FFFFFF] mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>
                  {t('benefits.title')} <span className="text-[#27AE60]">{t('benefits.titleHighlight')}</span>
                </h2>
                <p className="animate-on-scroll text-[18px] text-[#E0E0E0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
                  {t('benefits.subtitle')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                <div className="animate-on-scroll">
                  <BenefitCard
                    icon={Trees}
                    title={t('benefits.1title')}
                    description={t('benefits.1desc')}
                  />
                </div>
                <div className="animate-on-scroll">
                  <BenefitCard
                    icon={Sprout}
                    title={t('benefits.2title')}
                    description={t('benefits.2desc')}
                  />
                </div>
                <div className="animate-on-scroll">
                  <BenefitCard
                    icon={TrendingUp}
                    title={t('benefits.3title')}
                    description={t('benefits.3desc')}
                  />
                </div>
                <div className="animate-on-scroll">
                  <BenefitCard
                    icon={TrendingUp}
                    title={t('benefits.4title')}
                    description={t('benefits.4desc')}
                    link="https://www.cronista.com/informacion-gral/construyen-un-mega-puente-internacional-tendra-900-metros-y-unira-argentina-con-brasil/"
                    linkText={t('benefits.4link')}
                  />
                </div>
                <div className="animate-on-scroll">
                  <BenefitCard
                    icon={Wifi}
                    title={t('benefits.5title')}
                    description={t('benefits.5desc')}
                  />
                </div>
                <div className="animate-on-scroll">
                  <BenefitCard
                    icon={FileCheck}
                    title={t('benefits.6title')}
                    description={t('benefits.6desc')}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Galería */}
          <section className="py-[98px] bg-[#121212] px-[0px] pt-[98px] pr-[0px] pb-[48px] pl-[0px]" id="galeria">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="text-center mb-16">
                <h2 className="animate-on-scroll text-[48px] md:text-[56px] leading-[1.2] text-[#FFFFFF] mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>
                  {t('gallery.title')} <span className="text-[#27AE60]">{t('gallery.titleHighlight')}</span>
                </h2>
                <p className="animate-on-scroll text-[18px] text-[#E0E0E0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
                  {t('gallery.subtitle')}
                </p>
              </div>

              <div className="relative animate-on-scroll">
                <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={galleryImages[currentImageIndex].url}
                    alt={galleryImages[currentImageIndex].title}
                    className="w-full h-full object-cover"
                    loading="eager"
                    width={1200}
                    height={500}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-[28px] mb-2 drop-shadow-lg" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>{galleryImages[currentImageIndex].title}</h3>
                    <p className="text-[#F5F5F5] text-[16px] drop-shadow-md" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.5', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{galleryImages[currentImageIndex].description}</p>
                  </div>
                </div>

                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#27AE60]/90 hover:bg-[#27AE60] text-white p-3 rounded-full transition-all shadow-lg"
                  aria-label={t('gallery.prevImage')}
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#27AE60]/90 hover:bg-[#27AE60] text-white p-3 rounded-full transition-all shadow-lg"
                  aria-label={t('gallery.nextImage')}
                >
                  <ChevronRight className="size-6" />
                </button>

                <div className="flex justify-center gap-2 mt-6">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all ${index === currentImageIndex
                          ? 'w-8 bg-[#27AE60]'
                          : 'w-2 bg-[#FFFFFF]/30 hover:bg-[#FFFFFF]/50'
                        }`}
                      aria-label={t('gallery.goToImage', { index: index + 1 })}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`animate-on-scroll relative h-24 rounded-lg overflow-hidden transition-all ${index === currentImageIndex
                        ? 'ring-2 ring-[#27AE60] scale-105'
                        : 'opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={200}
                      height={96}
                    />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Video Recorrido */}
          <section className="py-[98px] bg-[#121212] px-[0px] pt-[48px] pr-[0px] pb-[112px] pl-[0px]">
            <div className="container mx-auto max-w-5xl px-4">
              <div className="animate-on-scroll">
                <div className="relative bg-[#121212] rounded-xl overflow-hidden border border-[#2a2a2a] shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/Gpv1sWGmM-E?si=d9n6pu0FTTBCF2DL"
                    title={t('video.title')}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Testimonio */}
          <section className="py-28 bg-[#0a0a0a]" id="reviews">
            <div className="container mx-auto max-w-5xl px-4">
              <div className="text-center mb-16">
                <h2 className="animate-on-scroll text-[48px] md:text-[56px] leading-[1.2] text-[#FFFFFF] mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>
                  {t('testimonials.title')} <span className="text-[#27AE60]">{t('testimonials.titleHighlight')}</span>
                </h2>
              </div>

              <div className="relative">
                {/* Testimonial Card */}
                <div className="animate-on-scroll bg-[#121212] rounded-xl p-8 md:p-12 border border-[#2a2a2a] shadow-xl min-h-[280px] flex flex-col justify-center">
                  <p className="text-[#27AE60] text-[14px] mb-4 uppercase tracking-wider" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
                    {testimonials[currentTestimonialIndex].subtitle}
                  </p>
                  <p className="text-[18px] text-[#E0E0E0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
                    {testimonials[currentTestimonialIndex].text}
                  </p>
                </div>

                {/* Navigation Buttons */}
                <button
                  onClick={() => setCurrentTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-3 rounded-full bg-[#1a1a1a]/80 hover:bg-[#27AE60]/20 border border-[#333] hover:border-[#27AE60] transition-all duration-300 backdrop-blur-sm group"
                  aria-label={t('testimonials.prev')}
                >
                  <ChevronLeft className="size-6 text-[#999] group-hover:text-[#27AE60] transition-colors" />
                </button>
                <button
                  onClick={() => setCurrentTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 rounded-full bg-[#1a1a1a]/80 hover:bg-[#27AE60]/20 border border-[#333] hover:border-[#27AE60] transition-all duration-300 backdrop-blur-sm group"
                  aria-label={t('testimonials.next')}
                >
                  <ChevronRight className="size-6 text-[#999] group-hover:text-[#27AE60] transition-colors" />
                </button>

                {/* Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonialIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${index === currentTestimonialIndex
                          ? 'w-8 bg-[#27AE60]'
                          : 'w-2 bg-[#333] hover:bg-[#555]'
                        }`}
                      aria-label={t('testimonials.goTo', { index: index + 1 })}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="py-28 bg-[#121212]">
            <div className="container mx-auto max-w-4xl text-center px-4">
              <h2 className="animate-on-scroll text-[48px] md:text-[56px] leading-[1.2] text-[#FFFFFF] mb-6" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>
                {t('cta.title')} <span className="text-[#27AE60]">{t('cta.titleHighlight')}</span>
              </h2>
              <Button
                onClick={handleWhatsAppMain}
                className="animate-on-scroll bg-[#27AE60] hover:bg-[#1e8449] text-white px-16 py-8 transition-all duration-300 hover:scale-[1.08] shadow-2xl shadow-[#27AE60]/40"
                style={{ borderRadius: '60px', fontSize: '20px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.5px' }}
              >
                <Phone className="mr-2 size-5" />
                {t('cta.button')}
              </Button>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-28 bg-[#0a0a0a]" id="faq">
            <div className="container mx-auto max-w-4xl px-4">
              <div className="text-center mb-16">
                <h2 className="animate-on-scroll text-[48px] md:text-[56px] leading-[1.2] text-[#FFFFFF] mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>
                  {t('faq.title')} <span className="text-[#27AE60]">{t('faq.titleHighlight')}</span>
                </h2>
                <p className="animate-on-scroll text-[18px] text-[#E0E0E0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
                  {t('faq.subtitle')}
                </p>
              </div>
              <div className="space-y-4">
                <div className="animate-on-scroll">
                  <FAQItem question={t('faq.q1')}>
                    <p className="mb-3">{t('faq.a1p1')}</p>
                    <p className="mb-3">
                      <strong>{t('faq.a1exact')}</strong><br />
                      <a href="https://maps.app.goo.gl/wkT1nT3xwwUx5bVa8" target="_blank" rel="noopener noreferrer" className="text-[#27AE60] hover:underline">https://maps.app.goo.gl/wkT1nT3xwwUx5bVa8</a>
                    </p>
                    <p>{t('faq.a1p2')}</p>
                  </FAQItem>
                </div>
                <div className="animate-on-scroll">
                  <FAQItem question={t('faq.q2')}>
                    <ul className="space-y-2">
                      <li>{t('faq.a2water')}</li>
                      <li>{t('faq.a2power')}</li>
                      <li>{t('faq.a2internet')}</li>
                      <li>{t('faq.a2streets')}</li>
                    </ul>
                  </FAQItem>
                </div>
                <div className="animate-on-scroll">
                  <FAQItem question={t('faq.q3')}>
                    <p>{t('faq.a3')}</p>
                  </FAQItem>
                </div>
                <div className="animate-on-scroll">
                  <FAQItem question={t('faq.q4')}>
                    <div className="space-y-3">
                      <p><strong className="text-[#27AE60]">{t('faq.a4step1')}</strong></p>
                      <p>{t('faq.a4p1')}</p>
                      <p><strong className="text-[#27AE60]">{t('faq.a4step2')}</strong></p>
                      <p><strong className="text-[#27AE60]">{t('faq.a4step3')}</strong></p>
                      <p className="mt-4">{t('faq.a4p2')}</p>
                      <p className="mt-4"><strong>{t('faq.a4expenses')}</strong></p>
                      <ul className="space-y-1 ml-4">
                        <li>• {t('faq.a4li1')}</li>
                        <li>• {t('faq.a4li2')}</li>
                        <li>• {t('faq.a4li3')}</li>
                        <li>• {t('faq.a4li4')}</li>
                        <li>• {t('faq.a4li5')}</li>
                      </ul>
                    </div>
                  </FAQItem>
                </div>
                <div className="animate-on-scroll">
                  <FAQItem question={t('faq.q5')}>
                    <p className="mb-3">{t('faq.a5p1')}</p>
                    <p>{t('faq.a5p2')}</p>
                  </FAQItem>
                </div>
                <div className="animate-on-scroll">
                  <FAQItem question={t('faq.q6')}>
                    <p>{t('faq.a6')}</p>
                  </FAQItem>
                </div>
              </div>
              <div className="mt-16 text-center">
                <p className="animate-on-scroll text-[18px] text-[#E0E0E0] mb-6" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
                  {t('faq.moreQuestions')}
                </p>
                <Button
                  onClick={handleWhatsAppMain}
                  className="animate-on-scroll bg-transparent border-2 border-[#27AE60] text-[#27AE60] hover:bg-[#27AE60] hover:text-white px-12 py-6 transition-all duration-300 hover:scale-105"
                  style={{ borderRadius: '8px', fontSize: '18px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.5px' }}
                >
                  <Phone className="mr-2 size-5" />
                  {t('faq.whatsappButton')}
                </Button>
              </div>
            </div>
          </section>
    </>
  );
}

export default function App() {
  const lotesDisponibles = lotes.filter(l => l.estado === 'disponible').length;
  return (
    <>
      <SEOHead />
      <StructuredData lotesDisponibles={lotesDisponibles} precioMinimoUSD={5000} />
      <Analytics gscVerification={import.meta.env.VITE_GSC_VERIFICATION} />
      <Routes>
        <Route path="/" element={<Layout><HomeContent /></Layout>} />
        <Route path="/calculadora" element={<Layout><CalculadoraUVA /></Layout>} />
      </Routes>
    </>
  );
}