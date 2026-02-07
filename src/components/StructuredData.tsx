import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface StructuredDataProps {
  lotesDisponibles: number;
  precioMinimoUSD?: number;
}

export function StructuredData({ lotesDisponibles, precioMinimoUSD = 5000 }: StructuredDataProps) {
  const { t, i18n } = useTranslation();
  const baseUrl = 'https://loteoruta4.com';

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": t('seo.siteName'),
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": t('structuredData.organizationDescription'),
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
      "availableLanguage": i18n.language === 'en' ? "English" : "Spanish"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": t('seo.siteName'),
    "image": `${baseUrl}/assets/loteo_vista_general_1.jpeg`,
    "description": t('structuredData.localBusinessDescription'),
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

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": t('structuredData.productName'),
    "description": t('structuredData.productDescription'),
    "image": `${baseUrl}/assets/loteo_vista_general_1.jpeg`,
    "brand": {
      "@type": "Brand",
      "name": t('seo.siteName')
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
      { "@type": "PropertyValue", "name": t('structuredData.propertySurface'), "value": t('structuredData.propertySurfaceValue') },
      { "@type": "PropertyValue", "name": t('structuredData.propertyLocation'), "value": t('structuredData.propertyLocationValue') },
      { "@type": "PropertyValue", "name": t('structuredData.propertyTitle'), "value": t('structuredData.propertyTitleValue') },
      { "@type": "PropertyValue", "name": t('structuredData.propertyServices'), "value": t('structuredData.propertyServicesValue') }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": t('structuredData.faq1q'), "acceptedAnswer": { "@type": "Answer", "text": t('structuredData.faq1a') } },
      { "@type": "Question", "name": t('structuredData.faq2q'), "acceptedAnswer": { "@type": "Answer", "text": t('structuredData.faq2a') } },
      { "@type": "Question", "name": t('structuredData.faq3q'), "acceptedAnswer": { "@type": "Answer", "text": t('structuredData.faq3a') } },
      { "@type": "Question", "name": t('structuredData.faq4q'), "acceptedAnswer": { "@type": "Answer", "text": t('structuredData.faq4a') } },
      { "@type": "Question", "name": t('structuredData.faq5q'), "acceptedAnswer": { "@type": "Answer", "text": t('structuredData.faq5a') } },
      { "@type": "Question", "name": t('structuredData.faq6q'), "acceptedAnswer": { "@type": "Answer", "text": t('structuredData.faq6a') } }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": t('structuredData.breadcrumbHome'), "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": t('structuredData.breadcrumbLotes'), "item": `${baseUrl}#lotes` },
      { "@type": "ListItem", "position": 3, "name": t('structuredData.breadcrumbCaracteristicas'), "item": `${baseUrl}#caracteristicas` },
      { "@type": "ListItem", "position": 4, "name": t('structuredData.breadcrumbGaleria'), "item": `${baseUrl}#galeria` },
      { "@type": "ListItem", "position": 5, "name": t('structuredData.breadcrumbFaq'), "item": `${baseUrl}#faq` }
    ]
  };

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": t('seo.siteName'),
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
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(aggregateRatingSchema)}</script>
    </Helmet>
  );
}
