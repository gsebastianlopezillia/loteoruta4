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
  const locale = i18n.language === 'en' ? 'en-US' : i18n.language === 'pt' ? 'pt-BR' : i18n.language === 'de' ? 'de-DE' : i18n.language === 'ru' ? 'ru' : 'es-AR';
  const [brlRate, setBrlRate] = useState<number | null>(null);
  const [eurRate, setEurRate] = useState<number | null>(null);
  const [rubRate, setRubRate] = useState<number | null>(null);
  const [ratesLoading, setRatesLoading] = useState(false);

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
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencyData();
    const interval = setInterval(fetchCurrencyData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lang = i18n.language;
    if (lang !== 'pt' && lang !== 'de' && lang !== 'ru') {
      setRatesLoading(false);
      return;
    }
    setRatesLoading(true);
    const fetchRates = async () => {
      try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const json = await res.json();
        const rates = json?.rates ?? {};
        if (lang === 'pt') setBrlRate(typeof rates.BRL === 'number' ? rates.BRL : null);
        if (lang === 'de') setEurRate(typeof rates.EUR === 'number' ? rates.EUR : null);
        if (lang === 'ru') setRubRate(typeof rates.RUB === 'number' ? rates.RUB : null);
      } catch {
        if (lang === 'pt') setBrlRate(null);
        if (lang === 'de') setEurRate(null);
        if (lang === 'ru') setRubRate(null);
      } finally {
        setRatesLoading(false);
      }
    };
    fetchRates();
    const interval = setInterval(fetchRates, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, [i18n.language]);

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

  /** Conversión desde USD (base) solo con tasa obtenida en la visita. */
  const getPriceInBRL = () => (brlRate != null ? usdAmount * brlRate : 0);
  const getPriceInEUR = () => (eurRate != null ? usdAmount * eurRate : 0);
  const getPriceInRUB = () => (rubRate != null ? usdAmount * rubRate : 0);

  const formatCurrencyBRL = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const formatCurrencyEUR = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  const formatCurrencyRUB = (amount: number) => {
    return new Intl.NumberFormat('ru', {
      style: 'currency',
      currency: 'RUB',
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
    ratesLoading,
    getPriceInARS,
    getPriceInBRL,
    getPriceInEUR,
    getPriceInRUB,
    formatCurrency,
    formatCurrencyBRL,
    formatCurrencyEUR,
    formatCurrencyRUB,
    formatDate,
    usdAmount,
    brlRate,
    eurRate,
    rubRate,
  };
}


