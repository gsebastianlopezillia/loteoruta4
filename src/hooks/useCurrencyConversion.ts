import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface CurrencyData {
  oficial: {
    value_avg: number;
    value_sell: number;
    value_buy: number;
  };
  blue: {
    value_avg: number;
    value_sell: number;
    value_buy: number;
  };
  oficial_euro: {
    value_avg: number;
    value_sell: number;
    value_buy: number;
  };
  blue_euro: {
    value_avg: number;
    value_sell: number;
    value_buy: number;
  };
  last_update: string;
}

export function useCurrencyConversion(usdAmount: number = 5000) {
  const { t, i18n } = useTranslation();
  const [data, setData] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = i18n.language === 'en' ? 'en-US' : 'es-AR';

  useEffect(() => {
    const fetchCurrencyData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.bluelytics.com.ar/v2/latest');

        if (!response.ok) {
          throw new Error(t('currency.errorFetch'));
        }

        const currencyData: CurrencyData = await response.json();
        setData(currencyData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('currency.errorUnknown'));
        // Fallback data en caso de error
        setData({
          oficial: { value_avg: 1439.50, value_sell: 1465.00, value_buy: 1414.00 },
          blue: { value_avg: 1470.00, value_sell: 1480.00, value_buy: 1460.00 },
          oficial_euro: { value_avg: 1565.00, value_sell: 1593.00, value_buy: 1537.00 },
          blue_euro: { value_avg: 1598.00, value_sell: 1609.00, value_buy: 1587.00 },
          last_update: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencyData();

    // Actualizar cada 5 minutos
    const interval = setInterval(fetchCurrencyData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const getPriceInARS = (rateType: 'oficial' | 'blue' = 'blue') => {
    if (!data) return 0;
    return usdAmount * data[rateType].value_sell;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return {
    data,
    loading,
    error,
    getPriceInARS,
    formatCurrency,
    formatDate,
    usdAmount
  };
}


