import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface AnalyticsProps {
  gaId?: string;
  gscVerification?: string;
}

export function Analytics({ gaId, gscVerification }: AnalyticsProps) {
  useEffect(() => {
    // Facebook Pixel
    if (typeof window !== 'undefined') {
      // Facebook Pixel script
      const fbScript = document.createElement('script');
      fbScript.innerHTML = `
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', '933867139112210'); fbq('track', 'PageView');
      `;
      document.head.appendChild(fbScript);

      // Facebook Pixel noscript fallback
      const noscript = document.createElement('noscript');
      const img = document.createElement('img');
      img.height = 1;
      img.width = 1;
      img.src = 'https://www.facebook.com/tr?id=933867139112210&ev=PageView&noscript=1';
      img.style.display = 'none';
      noscript.appendChild(img);
      document.head.appendChild(noscript);
    }

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


