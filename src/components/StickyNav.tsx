import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';

export function StickyNav() {
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

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'garantias', label: 'Garantías' },
    { id: 'ubicacion', label: 'Ubicación' },
    { id: 'lotes', label: 'Lotes' },
    { id: 'caracteristicas', label: 'Características' },
    { id: 'galeria', label: 'Galería' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hola, quiero información sobre lotes Ruta 4');
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
              Loteo Ruta 4
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
                {item.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleWhatsApp}
            className="bg-[#27AE60] hover:bg-[#1e8449] text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '14px', letterSpacing: '0.3px' }}
          >
            <Phone className="size-4" />
            <span className="hidden md:inline">Contactar</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
