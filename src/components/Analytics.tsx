import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface AnalyticsProps {
  gscVerification?: string;
}

const GA_ID = 'G-6JZW63PDGC';

function sendEvent(name: string, params?: Record<string, string | number | boolean | undefined>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  const clean = params ? Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null)
  ) as Record<string, string | number | boolean> : undefined;
  window.gtag('event', name, clean);
}

export function Analytics({ gscVerification }: AnalyticsProps) {
  const location = useLocation();
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

    // Google Analytics 4 - Always load with specific GA ID
    if (typeof window !== 'undefined') {
      // GA4 script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `;
      document.head.appendChild(script2);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location.pathname, location.search]);

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
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackWhatsAppClick(ctaLocation: string) {
  if (typeof window === 'undefined') return;
  sendEvent('whatsapp_click', { cta_location: ctaLocation });
  if (window.fbq) {
    window.fbq('track', 'Contact');
  }
}

export function trackEmailSubmit(language: string) {
  sendEvent('email_submit', { form_location: 'footer', language });
  if (window.fbq) {
    window.fbq('track', 'Contact');
  }
}

export function trackCalculadoraLink(loteNum?: number, precioUSD?: number) {
  sendEvent('calculadora_link', { lote_num: loteNum, precio_usd: precioUSD });
}

export function trackCalculadoraSimulate(params: { loteNum?: number; precioUSD: number; plazo: number }) {
  sendEvent('calculadora_simulate', {
    lote_num: params.loteNum,
    precio_usd: params.precioUSD,
    plazo_meses: params.plazo,
  });
}

export function trackScrollDepth(percent: number, page: string) {
  sendEvent('scroll_depth', { percent, page });
}

export function useScrollDepthTracking() {
  const location = useLocation();
  const firedRef = useRef<Set<number>>(new Set());
  useEffect(() => {
    firedRef.current = new Set();
    const thresholds = [25, 50, 75, 100];
    const page = location.pathname || '/';
    const handler = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);
      for (const t of thresholds) {
        if (pct >= t && !firedRef.current.has(t)) {
          firedRef.current.add(t);
          trackScrollDepth(t, page);
        }
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, [location.pathname]);
}


