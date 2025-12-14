import { useState, useEffect } from 'react';
import { CountdownTimer } from './components/CountdownTimer';
import { LoteCard } from './components/LoteCard';
import { BenefitCard } from './components/BenefitCard';
import { StickyNav } from './components/StickyNav';
import { FAQItem } from './components/FAQItem';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { 
  MapPin, 
  Trees, 
  Home, 
  Droplets, 
  Wifi, 
  FileCheck,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  Sprout,
  Building2,
  Phone
} from 'lucide-react';
import heroImage from 'figma:asset/906382584b6e2e56b243366dc274344613cd82b8.png';
import vistaDrone from 'figma:asset/8ab312c23624e8532d8f21bf366893fe3bf6de41.png';
import monteNativo from 'figma:asset/36258daf753f34ac4ad44c269f81cd5d94ff1c69.png';
import caminoInterno from 'figma:asset/a88179b02412248a30eab613b5152c20b7084a15.png';

const galleryImages = [
  {
    url: vistaDrone,
    title: 'Vista aérea del loteo',
    description: 'Ruta 4 asfaltada y naturaleza en perfecta armonía'
  },
  {
    url: caminoInterno,
    title: 'Caminos internos',
    description: 'Accesos mantenidos y delimitados entre lotes'
  },
  {
    url: monteNativo,
    title: 'Monte nativo recuperado',
    description: 'Vegetación autóctona y flores silvestres'
  },
  {
    url: heroImage,
    title: 'Perspectiva completa',
    description: 'Vista general del proyecto y ubicación privilegiada'
  }
];

const testimonials = [
  {
    name: 'María',
    photo: 'https://images.unsplash.com/photo-1629149979194-792705755857?w=200',
    text: 'Compré 2 lotes para mi jubilación. ¡Título en mano, ruta asfaltada y paz total – la mejor decisión para escapar de la ciudad! Ya estoy planeando mi casita rodeada de verde.',
    subtitle: '62 años, Directora de escuela jubilada - Buenos Aires'
  },
  {
    name: 'Carlos y Laura',
    photo: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=200',
    text: 'Somos un matrimonio que escapó de la locura urbana: trabajo remote con Starlink, huerta propia, tranquilidad total y ruta práctica – ¡este lugar es ideal!',
    subtitle: 'Desarrolladores remotos - Ex residentes CABA'
  },
  {
    name: 'Daniel',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    text: 'Un trámite super sencillo, un placer hacer negocio con los chicos',
    subtitle: 'Inversor - Buenos Aires'
  }
];

const lotes = [
  // Lotes disponibles primero (10-14)
  {
    numero: 10,
    superficie: '1000 mts²',
    precio: '$ 4.500.000',
    dimensiones: '12x80',
    forma: 'rectangular' as const,
    estado: 'disponible' as const
  },
  {
    numero: 11,
    superficie: '1000 mts²',
    precio: '$ 4.500.000',
    dimensiones: '12x80',
    forma: 'rectangular' as const,
    estado: 'disponible' as const
  },
  {
    numero: 12,
    superficie: '1000 mts²',
    precio: '$ 4.500.000',
    dimensiones: '12x80',
    forma: 'rectangular' as const,
    estado: 'disponible' as const
  },
  {
    numero: 13,
    superficie: '1000 mts²',
    precio: '$ 4.500.000',
    dimensiones: '12x80',
    forma: 'rectangular' as const,
    estado: 'disponible' as const
  },
  {
    numero: 14,
    superficie: '1000 mts²',
    precio: '$ 4.500.000',
    dimensiones: '12x80',
    forma: 'rectangular' as const,
    estado: 'disponible' as const
  },
  // Lotes vendidos (1-9)
  {
    numero: 1,
    superficie: '1000 mts²',
    precio: '$ 4.500.000',
    dimensiones: '17x20x17',
    forma: 'triangular' as const,
    estado: 'vendido' as const
  },
  {
    numero: 2,
    superficie: '1000 mts²',
    precio: '$ 4.500.000',
    dimensiones: '12x80',
    forma: 'rectangular' as const,
    estado: 'vendido' as const
  },
  {
    numero: 3,
    superficie: '1000 mts²',
    precio: '$ 4.500.000',
    dimensiones: '12x80',
    forma: 'rectangular' as const,
    estado: 'vendido' as const
  },
  {
    numero: 4,
    superficie: '1000 mts²',
    precio: '$ 4.500.000',
    dimensiones: '12x80',
    forma: 'rectangular' as const,
    estado: 'vendido' as const
  },
  {
    numero: 5,
    superficie: '1000 mts²',
    precio: '$ 4.500.000',
    dimensiones: '12x80',
    forma: 'rectangular' as const,
    estado: 'vendido' as const
  },
  {
    numero: 6,
    superficie: '1000 mts²',
    precio: '$ 4.500.000',
    dimensiones: '12x80',
    forma: 'rectangular' as const,
    estado: 'vendido' as const
  },
  {
    numero: 7,
    superficie: '1000 mts²',
    precio: '$ 4.500.000',
    dimensiones: '12x80',
    forma: 'rectangular' as const,
    estado: 'vendido' as const
  },
  {
    numero: 8,
    superficie: '1000 mts²',
    precio: '$ 4.500.000',
    dimensiones: '12x80',
    forma: 'rectangular' as const,
    estado: 'vendido' as const
  },
  {
    numero: 9,
    superficie: '1000 mts²',
    precio: '$ 4.500.000',
    dimensiones: '12x80',
    forma: 'rectangular' as const,
    estado: 'vendido' as const
  }
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

export default function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showAllLotes, setShowAllLotes] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  useScrollAnimation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleWhatsAppMain = () => {
    const message = encodeURIComponent('Hola, quiero información sobre lotes Ruta 4');
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
    <div className="min-h-screen bg-[#0a0a0a] text-[#FFFFFF]" style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 400, fontSize: '16px' }}>
      {/* Navegación Sticky */}
      <StickyNav />
      
      {/* Banner Superior Animado */}
      <div className="bg-gradient-to-r from-[#004D40] via-[#27AE60] to-[#004D40] overflow-hidden relative shadow-lg" style={{ height: '58px', display: 'flex', alignItems: 'center' }}>
        <div className="animate-scroll whitespace-nowrap">
          <span className="inline-block px-8 text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '16px', letterSpacing: '0.5px' }}>
            🔥 OFERTA LIMITADA: Comprando antes del 31/12/2025 el impuesto inmobiliario de TODO 2026 GRATIS 🔥
          </span>
          <span className="inline-block px-8 text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '16px', letterSpacing: '0.5px' }}>
            🔥 OFERTA LIMITADA: Comprando antes del 31/12/2025 el impuesto inmobiliario de TODO 2026 GRATIS 🔥
          </span>
          <span className="inline-block px-8 text-white" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '16px', letterSpacing: '0.5px' }}>
            🔥 OFERTA LIMITADA: Comprando antes del 31/12/2025 el impuesto inmobiliario de TODO 2026 GRATIS 🔥
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center ken-burns"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className={`relative z-10 container mx-auto px-4 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-[72px] md:text-[100px] leading-[1.2] text-[#FFFFFF] mb-6 max-w-5xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.5px', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Tu terreno de 1000m2 en Misiones desde{' '}
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #27AE60' }}>$4.500.000</span>
          </h1>

          <p className="text-[24px] text-[#E0E0E0] mb-2" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6', fontWeight: 300 }}>
            USD 3,200
          </p>

          <p className="text-[20px] text-[#FFFFFF] mb-8 max-w-3xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
            con Título, Asfalto, Agua
          </p>

          <Button 
            onClick={handleWhatsAppMain}
            className="bg-[#27AE60] hover:bg-[#1e8449] text-white px-16 py-8 transition-all duration-300 hover:scale-[1.08] shadow-2xl shadow-[#27AE60]/50"
            style={{ borderRadius: '8px', fontSize: '20px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.5px' }}
          >
            <Phone className="mr-2 size-5" />
            RESERVAR MI LOTE
          </Button>

          <p className="mt-8 text-[16px] text-[#A0A0A0]" style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 300, lineHeight: '1.5' }}>
            Solo quedan {lotesDisponibles} lotes a este precio exclusivo
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
              ¿Harto de ver tu plata evaporarse en alquiler o inflación en la ciudad?
            </h2>
            <p className="animate-on-scroll text-[18px] text-[#E0E0E0] leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
              Imaginate jubilado o trabajando remote en tu propio paraíso: monte nativo fresco, 
              arroyo a 200m para refrescarte, <span className="text-[#27AE60]">1000m² que parecen un reino</span> (gigante 
              para citadinos, ideal para casa familiar o inversión).
            </p>
            <div className="animate-on-scroll pt-6 space-y-4 text-left bg-[#121212] p-8 rounded-lg border border-[#333]">
              <h3 className="text-[32px] text-[#27AE60]" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.2px' }}>Garantías absolutas:</h3>
              <ul className="space-y-3 text-[#E0E0E0]" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '16px', lineHeight: '1.6' }}>
                <li className="flex items-start gap-3">
                  <FileCheck className="size-5 text-[#27AE60] mt-1 flex-shrink-0" />
                  <span>Título listo para escriturar ya - Sin complicaciones legales</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="size-5 text-[#27AE60] mt-1 flex-shrink-0" />
                  <span>Ruta asfaltada frente - No precisás camioneta ni 4x4</span>
                </li>
                <li className="flex items-start gap-3">
                  <Droplets className="size-5 text-[#27AE60] mt-1 flex-shrink-0" />
                  <span>Servicios agua/luz en puerta - Listo para construir</span>
                </li>
                <li className="flex items-start gap-3">
                  <Home className="size-5 text-[#27AE60] mt-1 flex-shrink-0" />
                  <span>Escuela/colectivo a 150m - Ideal para familias</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="size-5 text-[#27AE60] mt-1 flex-shrink-0" />
                  <span>4km de Bonpland y 15km de Oberá - Cerca de todo sin ruido</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Oferta Exclusiva */}
      <section className="py-32 bg-[#121212]">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center space-y-8">
            <div className="animate-on-scroll bg-gradient-to-r from-[#27AE60]/20 via-[#27AE60]/30 to-[#27AE60]/20 border-2 border-[#27AE60] rounded-lg p-8 px-[32px] py-[24px]">
              <h2 className="text-[48px] md:text-[54px] leading-[1.2] text-[#FFFFFF] mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, letterSpacing: '0.2px' }}>
                <span className="text-[#27AE60] text-[24px]">¡Impuesto 2026 GRATIS si comprás antes 31/12/2025!</span>
              </h2>
              <p className="text-[#E0E0E0] mb-8 text-[16px]" style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 300, lineHeight: '1.5' }}>
                Aprovechá esta oferta exclusiva por tiempo limitado
              </p>
              <CountdownTimer />
            </div>
          </div>
        </div>
      </section>

      {/* Ubicación Privilegiada */}
      <section className="py-24 bg-[#0a0a0a]" id="ubicacion">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="animate-on-scroll text-[48px] md:text-[56px] leading-[1.2] text-[#FFFFFF] mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>
              Ubicación <span className="text-[#27AE60]">Privilegiada</span>
            </h2>
            <p className="animate-on-scroll text-[18px] text-[#E0E0E0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
              Ruta Provincial 4, Almafuerte, Misiones - El equilibrio perfecto entre naturaleza y conectividad
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="animate-on-scroll bg-[#121212] rounded-xl overflow-hidden border border-[#2a2a2a] h-[450px] shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.2!2d-55.40361!3d-27.50806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDMwJzI5LjAiUyA1NcKwMjQnMTMuMCJX!5e0!3m2!1ses!2sar!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Loteo Ruta 4"
              />
            </div>

            <div className="space-y-4">
              <div className="animate-on-scroll bg-[#121212] p-6 rounded-xl border border-[#2a2a2a] hover:border-[#27AE60] transition-all duration-300 shadow-lg hover:shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#27AE60]/10 rounded-lg">
                    <MapPin className="size-6 text-[#27AE60] flex-shrink-0" />
                  </div>
                  <div>
                    <h3 className="text-[#FFFFFF] mb-2 text-[20px]" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>Frente directo a Ruta 4 asfaltada</h3>
                    <p className="text-[16px] text-[#D0D0D0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.5' }}>
                      Acceso fácil todo el año y alta valorización a futuro
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
                    <h3 className="text-[#FFFFFF] mb-2 text-[20px]" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>A 150m de escuela y parada de colectivo</h3>
                    <p className="text-[16px] text-[#D0D0D0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.5' }}>
                      Ideal para familias con nios o proyectos comunitarios
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
                    <h3 className="text-[#FFFFFF] mb-2 text-[20px]" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>200m de arroyo cristalino</h3>
                    <p className="text-[16px] text-[#D0D0D0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.5' }}>
                      Naturaleza pura para refrescarte y conectar con el entorno
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
                    <h3 className="text-[#FFFFFF] mb-2 text-[20px]" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>4km de Bonpland, 15km de Oberá</h3>
                    <p className="text-[16px] text-[#D0D0D0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.5' }}>
                      Cerca de servicios y comercios sin el ruido de la ciudad
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
              Lotes <span className="text-[#27AE60]">Disponibles</span>
            </h2>
            <p className="animate-on-scroll text-[18px] text-[#E0E0E0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
              Elegí el lote perfecto para tu proyecto de vida
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
                  superficie={lote.superficie}
                  precio={lote.precio}
                  dimensiones={lote.dimensiones}
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
                Mostrar más lotes
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
              ¿Por qué <span className="text-[#27AE60]">Loteo Ruta 4?</span>
            </h2>
            <p className="animate-on-scroll text-[18px] text-[#E0E0E0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
              Todo lo que necesitás para tu proyecto de vida o inversión
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <div className="animate-on-scroll">
              <BenefitCard
                icon={Trees}
                title="Monte Nativo Recuperado"
                description="Sombra natural, frescura y ecosistema vivo para disfrutar todo el año"
              />
            </div>
            <div className="animate-on-scroll">
              <BenefitCard
                icon={Sprout}
                title="Suelo Premium"
                description="6a pedregoso que filtra, al ser en pendiente, imposible inundación"
              />
            </div>
            <div className="animate-on-scroll">
              <BenefitCard
                icon={TrendingUp}
                title="Múltiples Posibilidades"
                description="Casa familiar, cabañas turísticas, negocio rutero o renta pasiva forestación"
              />
            </div>
            <div className="animate-on-scroll">
              <BenefitCard
                icon={TrendingUp}
                title="Valorización Segura"
                description="El nuevo puente internacional impulsará la zona exponencialmente"
                link="https://www.cronista.com/informacion-gral/construyen-un-mega-puente-internacional-tendra-900-metros-y-unira-argentina-con-brasil/"
                linkText="Ver Noticia"
              />
            </div>
            <div className="animate-on-scroll">
              <BenefitCard
                icon={Wifi}
                title="Servicios Completos"
                description="Agua en puerta, luz sobre ruta, internet de calidad para trabajo remoto"
              />
            </div>
            <div className="animate-on-scroll">
              <BenefitCard
                icon={FileCheck}
                title="Documentación Perfecta"
                description="Títulos 100% en regla, escrituración inmediata sin trabas burocráticas"
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
              Conocé el <span className="text-[#27AE60]">Proyecto</span>
            </h2>
            <p className="animate-on-scroll text-[18px] text-[#E0E0E0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
              Imágenes reales del loteo y su entorno natural
            </p>
          </div>

          <div className="relative animate-on-scroll">
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
              <img
                src={galleryImages[currentImageIndex].url}
                alt={galleryImages[currentImageIndex].title}
                className="w-full h-full object-cover"
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
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="size-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#27AE60]/90 hover:bg-[#27AE60] text-white p-3 rounded-full transition-all shadow-lg"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="size-6" />
            </button>

            <div className="flex justify-center gap-2 mt-6">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'w-8 bg-[#27AE60]'
                      : 'w-2 bg-[#FFFFFF]/30 hover:bg-[#FFFFFF]/50'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`animate-on-scroll relative h-24 rounded-lg overflow-hidden transition-all ${
                  index === currentImageIndex
                    ? 'ring-2 ring-[#27AE60] scale-105'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
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
                title="Recorrido virtual del loteo" 
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
              Lo que dicen quienes <span className="text-[#27AE60]">ya compraron</span>
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
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="size-6 text-[#999] group-hover:text-[#27AE60] transition-colors" />
            </button>
            <button
              onClick={() => setCurrentTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-3 rounded-full bg-[#1a1a1a]/80 hover:bg-[#27AE60]/20 border border-[#333] hover:border-[#27AE60] transition-all duration-300 backdrop-blur-sm group"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="size-6 text-[#999] group-hover:text-[#27AE60] transition-colors" />
            </button>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonialIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonialIndex
                      ? 'w-8 bg-[#27AE60]'
                      : 'w-2 bg-[#333] hover:bg-[#555]'
                  }`}
                  aria-label={`Ir a testimonio ${index + 1}`}
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
            ¿Listo para una <span className="text-[#27AE60]">buena inversión</span>?
          </h2>
          <p className="animate-on-scroll text-[18px] text-[#E0E0E0] mb-10" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
            No dejes pasar esta oportunidad única. Solo quedan {lotesDisponibles} lotes disponibles 
            con impuesto 2026 gratis hasta el 31/12/2025.
          </p>
          <Button
            onClick={handleWhatsAppMain}
            className="animate-on-scroll bg-[#27AE60] hover:bg-[#1e8449] text-white px-16 py-8 transition-all duration-300 hover:scale-[1.08] shadow-2xl shadow-[#27AE60]/40"
            style={{ borderRadius: '60px', fontSize: '20px', fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.5px' }}
          >
            <Phone className="mr-2 size-5" />
            Consultá disponibilidad ahora
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 bg-[#0a0a0a]" id="faq">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center mb-16">
            <h2 className="animate-on-scroll text-[48px] md:text-[56px] leading-[1.2] text-[#FFFFFF] mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>
              Preguntas <span className="text-[#27AE60]">Frecuentes</span>
            </h2>
            <p className="animate-on-scroll text-[18px] text-[#E0E0E0]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
              Todas las respuestas que necesitás para tomar tu decisión
            </p>
          </div>

          <div className="space-y-4">
            <div className="animate-on-scroll">
              <FAQItem question="¿Dónde quedan exactamente los lotes?">
                <p className="mb-3">
                  Quedan sobre <strong className="text-[#27AE60]">Ruta Nacional 4</strong>, a 5 km de Bonpland y 15 km de Leandro N. Alem (por la escuela Almafuerte, ex Escuela 629).
                </p>
                <p className="mb-3">
                  <strong>Ubicación exacta:</strong><br />
                  <a 
                    href="https://maps.app.goo.gl/wkT1nT3xwwUx5bVa8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#27AE60] hover:underline"
                  >
                    https://maps.app.goo.gl/wkT1nT3xwwUx5bVa8
                  </a>
                </p>
                <p>
                  Acceso directo por ruta asfaltada y también por calle interna.
                </p>
              </FAQItem>
            </div>

            <div className="animate-on-scroll">
              <FAQItem question="¿Qué servicios tienen?">
                <ul className="space-y-2">
                  <li><strong className="text-[#27AE60]">Agua:</strong> red vecinal de pozo.</li>
                  <li><strong className="text-[#27AE60]">Luz:</strong> línea en ruta.</li>
                  <li><strong className="text-[#27AE60]">Internet:</strong> excelente servicio con Starlink.</li>
                  <li><strong className="text-[#27AE60]">Calles:</strong> mantenimiento de los caminos internos y la banquina.</li>
                </ul>
              </FAQItem>
            </div>

            <div className="animate-on-scroll">
              <FAQItem question="¿Tienen título individual listo para escriturar?">
                <p>
                  <strong className="text-[#27AE60]">Sí</strong>, todos tienen título individual y están listos para transferir. Somos titulares directos con mi esposa.
                </p>
              </FAQItem>
            </div>

            <div className="animate-on-scroll">
              <FAQItem question="¿Cómo es el proceso de compra?">
                <div className="space-y-3">
                  <p>
                    <strong className="text-[#27AE60]">1. Reserva con seña del 20%</strong> (se descuenta del total).
                  </p>
                  <p>
                    Esto puede ser por transferencia o en efectivo en la escribanía de elección y se firma la documentación de seña y compromiso de reserva de tierra.
                  </p>
                  <p>
                    <strong className="text-[#27AE60]">2. La escribanía solicita todos los certificados correspondientes</strong> (de dominio e inhibiciones en Rentas).
                  </p>
                  <p>
                    <strong className="text-[#27AE60]">3. Se escritura tras salida de certificados</strong> (general 15-20 días).
                  </p>
                  <p className="mt-4">
                    Trabajamos con la escribanía Lombardi de Posadas (Av. Roque Pérez 1615). Podemos cambiar si el comprador prefiere otra.
                  </p>
                  <p className="mt-4">
                    <strong>Gastos incluidos:</strong>
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>• 50% del Impuesto de Sellos</li>
                    <li>• Certificados administrativos y gastos de protocolo y minutas</li>
                    <li>• Tasa de Inscripción y derecho de escritura de compraventa</li>
                    <li>• Tasa de Inscripción y derecho de escritura de constitución de usufructo</li>
                    <li>• Honorarios de compraventa</li>
                  </ul>
                </div>
              </FAQItem>
            </div>

            <div className="animate-on-scroll">
              <FAQItem question="¿Qué formas de pago aceptan?">
                <p className="mb-3">
                  <strong className="text-[#27AE60]">Contado en cualquier moneda:</strong> pesos argentinos, dólares, guaraníes, reales, USDT, Bitcoin, etc.
                </p>
                <p>
                  <strong>No financiación</strong> por el momento.
                </p>
              </FAQItem>
            </div>

            <div className="animate-on-scroll">
              <FAQItem question="¿Es tranquilo y seguro el lugar?">
                <p>
                  <strong className="text-[#27AE60]">Súper tranquilo y seguro.</strong> Es una zona rural muy familiar, hay varias casas alrededor, escuela enfrente, vecinos permanentes.
                </p>
              </FAQItem>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="animate-on-scroll text-[18px] text-[#E0E0E0] mb-6" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
              ¿Tenés más preguntas? Contactanos directamente
            </p>
            <Button
              onClick={handleWhatsAppMain}
              className="animate-on-scroll bg-transparent border-2 border-[#27AE60] text-[#27AE60] hover:bg-[#27AE60] hover:text-white px-12 py-6 transition-all duration-300 hover:scale-105"
              style={{
                borderRadius: '8px',
                fontSize: '18px',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}
            >
              <Phone className="mr-2 size-5" />
              Consultar por WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000000] py-20 border-t border-[#2a2a2a]" id="contacto">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            <div className="animate-on-scroll">
              <h3 className="text-[28px] text-[#27AE60] mb-4" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 700, letterSpacing: '0.5px' }}>Loteo Ruta 4</h3>
              <p className="text-[#D0D0D0] text-[16px]" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
                Tu escape a Misiones. Terrenos premium con título perfecto en Ruta Provincial 4, Almafuerte.
              </p>
            </div>

            <div className="animate-on-scroll">
              <h4 className="text-[#FFFFFF] mb-4 text-[22px]" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>Contacto</h4>
              <div className="space-y-3 text-[16px] text-[#D0D0D0]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                <p className="flex items-center gap-2">
                  <Phone className="size-4 text-[#27AE60]" />
                  <a href="https://wa.me/543764165357" className="hover:text-[#27AE60] transition-colors">
                    +54 3764 165357
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 text-[#27AE60]" />
                  <a href="https://maps.app.goo.gl/fzaRvwUuQHL7kmFK6" target="_blank" rel="noopener noreferrer" className="hover:text-[#27AE60] transition-colors">
                    Ruta Provincial 4, Almafuerte, Misiones
                  </a>
                </p>
              </div>
            </div>

            <div className="animate-on-scroll">
              <h4 className="text-[#FFFFFF] mb-4 text-[22px]" style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 600, letterSpacing: '0.3px' }}>Oferta Exclusiva</h4>
              <div className="bg-[#27AE60]/10 border border-[#27AE60] rounded-lg p-4">
                <p className="text-[18px] text-[#FFFFFF] mb-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
                  ⏰ Impuesto 2026 GRATIS
                </p>
                <p className="text-[15px] text-[#D0D0D0]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Válido solo hasta 31/12/2025
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#2a2a2a] pt-8 text-center">
            <p className="text-[16px] text-[#999999]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              © 2025 Loteo Ruta 4 - loteoruta4.com - Todos los derechos reservados
            </p>
            <p className="text-[14px] text-[#777777] mt-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              ¡No dejes que se escapen los lotes! Solo {lotesDisponibles} disponibles a este precio.
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/543764165357?text=Hola,%20quiero%20información%20sobre%20lotes%20Ruta%204"
        target="_blank"
        rel="noopener noreferrer"
        className="pulse-wa fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50"
        aria-label="Contactar por WhatsApp"
      >
        <Phone className="size-6" />
      </a>
    </div>
  );
}