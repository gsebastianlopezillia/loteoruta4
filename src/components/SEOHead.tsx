import { Helmet } from 'react-helmet-async';
import loteoVistaGeneral from '../assets/loteo_vista_general_1.jpeg';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEOHead({ 
  title = 'Loteo Ruta 4 - Terrenos de 1000m² en Misiones desde USD 5,000',
  description = 'Terrenos de 1000m² en Misiones desde USD 5,000. Loteo Ruta 4 con título, asfalto, agua y naturaleza. Solo quedan pocos lotes disponibles.',
  image = loteoVistaGeneral,
  url = 'https://loteoruta4.com'
}: SEOHeadProps) {
  // Handle both imported images (Vite) and URL strings
  const fullImageUrl = typeof image === 'string' 
    ? (image.startsWith('http') ? image : `${url}${image}`)
    : `${url}/assets/loteo_vista_general_1.jpeg`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="product" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="es_AR" />
      <meta property="og:site_name" content="Loteo Ruta 4" />

      {/* Product specific meta tags */}
      <meta property="product:price:amount" content="5000" />
      <meta property="product:price:currency" content="USD" />
      <meta property="product:availability" content="in stock" />
      <meta property="product:condition" content="new" />
      <meta property="product:retailer" content="Loteo Ruta 4" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Additional Meta Tags */}
      <meta name="geo.region" content="AR-N" />
      <meta name="geo.placename" content="Misiones" />
      <meta name="geo.position" content="-27.523444;-55.448548" />
      <meta name="ICBM" content="-27.523444, -55.448548" />
    </Helmet>
  );
}


