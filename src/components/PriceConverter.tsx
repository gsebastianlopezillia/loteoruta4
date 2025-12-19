import { useCurrencyConversion } from '../hooks/useCurrencyConversion';

interface PriceConverterProps {
  usdAmount?: number;
  showOfficial?: boolean;
}

export function PriceConverter({ usdAmount = 5000, showOfficial = false }: PriceConverterProps) {
  const { data, loading, error, getPriceInARS, formatCurrency, formatDate } = useCurrencyConversion(usdAmount);

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-pulse text-gray-400">Cargando cotización...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <div className="text-red-400 text-sm">Error al cargar cotización</div>
        <div className="text-gray-400 text-xs mt-1">Usando datos de respaldo</div>
      </div>
    );
  }

  if (!data) return null;

  const bluePrice = getPriceInARS('blue');
  const officialPrice = getPriceInARS('oficial');

  
}
