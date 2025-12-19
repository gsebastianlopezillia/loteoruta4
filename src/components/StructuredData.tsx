import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  lotesDisponibles: number;
  precioMinimoUSD?: number;
}

export function StructuredData({ lotesDisponibles, precioMinimoUSD = 5000 }: StructuredDataProps) {
  const baseUrl = 'https://loteoruta4.com';
  
  // Schema Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Loteo Ruta 4",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "Loteo Ruta 4 - Terrenos de 1000m² en Misiones con título, asfalto y agua",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bonpland",
      "addressRegion": "Misiones",
      "addressCountry": "AR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -27.523444,
      "longitude": -55.448548
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+54-376-416-5357",
      "contactType": "Sales",
      "availableLanguage": "Spanish"
    }
  };

  // Schema LocalBusiness
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Loteo Ruta 4",
    "image": `${baseUrl}/assets/loteo_vista_general_1.jpeg`,
    "description": "Venta de terrenos de 1000m² en Misiones. Lotes con título individual, acceso por Ruta 4 asfaltada, agua y servicios.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ruta Nacional 4",
      "addressLocality": "Bonpland",
      "addressRegion": "Misiones",
      "postalCode": "3317",
      "addressCountry": "AR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -27.523444,
      "longitude": -55.448548
    },
    "url": baseUrl,
    "telephone": "+54-376-416-5357",
    "priceRange": `$${precioMinimoUSD}+ USD`,
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "20:00"
    }
  };

  // Schema Product (para los lotes disponibles)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Terreno 1000m² - Loteo Ruta 4",
    "description": "Terreno de 1000m² en Misiones con título individual, acceso por Ruta 4 asfaltada, agua y servicios. Ideal para construcción o inversión.",
    "image": `${baseUrl}/assets/loteo_vista_general_1.jpeg`,
    "brand": {
      "@type": "Brand",
      "name": "Loteo Ruta 4"
    },
    "offers": {
      "@type": "AggregateOffer",
      "offerCount": lotesDisponibles,
      "lowPrice": `${precioMinimoUSD}`,
      "highPrice": "6000",
      "priceCurrency": "USD",
      "availability": lotesDisponibles > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": baseUrl
    },
    "category": "Real Estate",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Superficie",
        "value": "1000 m²"
      },
      {
        "@type": "PropertyValue",
        "name": "Ubicación",
        "value": "Ruta Nacional 4, Bonpland, Misiones"
      },
      {
        "@type": "PropertyValue",
        "name": "Título",
        "value": "Individual listo para escriturar"
      },
      {
        "@type": "PropertyValue",
        "name": "Servicios",
        "value": "Agua, Luz, Internet (Starlink), Calles mantenidas"
      }
    ]
  };

  // Schema FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Dónde quedan exactamente los lotes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Quedan sobre Ruta Nacional 4, a 5 km de Bonpland y 15 km de Leandro N. Alem (por la escuela Almafuerte, ex Escuela 629). Acceso directo por ruta asfaltada y también por calle interna."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué servicios tienen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Agua: red vecinal de pozo. Luz: línea en ruta. Internet: excelente servicio con Starlink. Calles: mantenimiento de los caminos internos y la banquina."
        }
      },
      {
        "@type": "Question",
        "name": "¿Tienen título individual listo para escriturar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, todos tienen título individual y están listos para transferir. Somos titulares directos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo es el proceso de compra?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1. Reserva con seña del 20% (se descuenta del total). 2. La escribanía solicita todos los certificados correspondientes. 3. Se escritura tras salida de certificados (general 15-20 días). Trabajamos con la escribanía Lombardi de Posadas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué formas de pago aceptan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Contado en cualquier moneda: pesos argentinos, dólares, guaraníes, reales, USDT, Bitcoin, etc. No financiación por el momento."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es tranquilo y seguro el lugar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Súper tranquilo y seguro. Es una zona rural muy familiar, hay varias casas alrededor, escuela enfrente, vecinos permanentes."
        }
      }
    ]
  };

  // Schema BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Lotes",
        "item": `${baseUrl}#lotes`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Características",
        "item": `${baseUrl}#caracteristicas`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Galería",
        "item": `${baseUrl}#galeria`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "FAQ",
        "item": `${baseUrl}#faq`
      }
    ]
  };

  // Schema AggregateRating (basado en testimonios)
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Loteo Ruta 4",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "3",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(aggregateRatingSchema)}
      </script>
    </Helmet>
  );
}


