import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import loteoVistaGeneral from '../assets/loteo_vista_general_1.jpeg';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEOHead({
  title,
  description,
  image = loteoVistaGeneral,
  url = 'https://loteoruta4.com'
}: SEOHeadProps) {
  const { t, i18n } = useTranslation();
  const resolvedTitle = title ?? t('seo.title');
  const resolvedDescription = description ?? t('seo.description');
  const locale = i18n.language === 'en' ? 'en_US' : i18n.language === 'pt' ? 'pt_BR' : i18n.language === 'de' ? 'de_DE' : i18n.language === 'ru' ? 'ru_RU' : 'es_AR';
  const htmlLang = i18n.language === 'en' ? 'en' : i18n.language === 'pt' ? 'pt' : i18n.language === 'de' ? 'de' : i18n.language === 'ru' ? 'ru' : 'es';

  useEffect(() => {
    document.documentElement.lang = htmlLang;
  }, [htmlLang]);

  const fullImageUrl = typeof image === 'string'
    ? (image.startsWith('http') ? image : `${url}${image}`)
    : `${url}/assets/loteo_vista_general_1.jpeg`;

  return (
    <Helmet>
      <html lang={htmlLang} />
      <title>{resolvedTitle}</title>
      <meta name="title" content={resolvedTitle} />
      <meta name="description" content={resolvedDescription} />
      <meta property="og:type" content="product" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content={t('seo.siteName')} />
      <meta property="product:price:amount" content="5000" />
      <meta property="product:price:currency" content="USD" />
      <meta property="product:availability" content="in stock" />
      <meta property="product:condition" content="new" />
      <meta property="product:retailer" content={t('seo.siteName')} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="geo.region" content="AR-N" />
      <meta name="geo.placename" content="Misiones" />
      <meta name="geo.position" content="-27.523444;-55.448548" />
      <meta name="ICBM" content="-27.523444, -55.448548" />
    </Helmet>
  );
}
