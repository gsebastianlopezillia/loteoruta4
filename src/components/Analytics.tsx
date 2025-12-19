import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface AnalyticsProps {
  gaId?: string;
  gscVerification?: string;
}

export function Analytics({ gaId, gscVerification }: AnalyticsProps) {
  useEffect(() => {
    // Google Analytics 4
    if (gaId && typeof window !== 'undefined') {
      // GA4 script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}');
      `;
      document.head.appendChild(script2);

      // Track page views on route changes
      const handleRouteChange = () => {
        if (window.gtag) {
          window.gtag('config', gaId, {
            page_path: window.location.pathname + window.location.search,
          });
        }
      };

      window.addEventListener('popstate', handleRouteChange);
      return () => {
        window.removeEventListener('popstate', handleRouteChange);
      };
    }
  }, [gaId]);

  return (
    <Helmet>
      {gscVerification && (
        <meta name="google-site-verification" content={gscVerification} />
      )}
    </Helmet>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}


