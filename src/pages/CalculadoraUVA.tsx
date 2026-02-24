import { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ChevronLeft } from 'lucide-react';

const CORS_PROXY = 'https://corsproxy.io/?';
const UVA_BCRA_URL = 'https://www.bcra.gob.ar/PublicacionesEstadisticas/Principales_variables_datos.asp?serie=7913&detalle=Unidad+de+Valor+Adquisitivo+(UVA)';
const uvaLinkHtml = `<a href="${UVA_BCRA_URL}" target="_blank" rel="noopener noreferrer" class="text-[#27AE60] hover:underline">UVAs</a>`;
function fetchBCRA(url: string) {
  return fetch(CORS_PROXY + encodeURIComponent(url)).then((r) => r.json());
}

function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

function tasaMensualPorPlazo(plazoMeses: number): number {
  if (plazoMeses <= 6) return 0.1;
  if (plazoMeses >= 24) return 0.13;
  const t = (plazoMeses - 6) / (24 - 6);
  return 0.1 + (0.13 - 0.1) * Math.sqrt(t);
}

export function CalculadoraUVA() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const loteParam = searchParams.get('lote');
  const precioParam = searchParams.get('precio');
  const precioUSD = Math.max(0, parseFloat(precioParam || '0') || 0);
  const numeroLote = loteParam ? parseInt(loteParam, 10) : null;

  const [valorUVA, setValorUVA] = useState('1774.96');
  const [uvaRequestDate, setUvaRequestDate] = useState<Date | null>(null);
  const [dolarMEP, setDolarMEP] = useState('');
  const [plazo, setPlazo] = useState(12);
  const [apiStatus, setApiStatus] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [resumen, setResumen] = useState('');
  const [tablaRows, setTablaRows] = useState<Array<{ cuotaNum: number; cuotaUVAs: number; cuotaPesos: number; interesPesos: number; amortPesos: number; saldoUVAs: number; saldoPesos: number }>>([]);
  const plazoInputRef = useRef<HTMLInputElement>(null);
  const resultadosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = plazoInputRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY > 0 ? -1 : 1;
      setPlazo((prev) => Math.max(6, Math.min(24, prev + delta)));
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  const cargarDatosBCRA = useCallback(async () => {
    const requestDate = new Date();
    try {
      const [cotResp, monResp] = await Promise.all([
        fetchBCRA('https://api.bcra.gob.ar/estadisticascambiarias/v1.0/Cotizaciones'),
        fetchBCRA('https://api.bcra.gob.ar/estadisticas/v3.0/monetarias'),
      ]);
      if (cotResp.status === 200 && cotResp.results?.detalle) {
        const usd = cotResp.results.detalle.find((x: { codigoMoneda?: string }) => (x.codigoMoneda || '').toUpperCase() === 'USD');
        const mep = cotResp.results.detalle.find((x: { descripcion?: string }) => (x.descripcion || '').toUpperCase().indexOf('MEP') >= 0);
        const cot = (mep && typeof mep.tipoCotizacion === 'number') ? mep.tipoCotizacion : (usd && typeof usd.tipoCotizacion === 'number' ? usd.tipoCotizacion : null);
        if (cot != null) setDolarMEP(String(cot));
      }
      if (monResp.status === 200 && Array.isArray(monResp.results)) {
        const uvaVar = monResp.results.find((x: { descripcion?: string }) => (x.descripcion || '').toUpperCase().indexOf('UVA') >= 0 && (x.descripcion || '').toUpperCase().indexOf('UVI') < 0);
        if (uvaVar && typeof uvaVar.valor === 'number') {
          setValorUVA(String(uvaVar.valor));
          setUvaRequestDate(requestDate);
        } else if (uvaVar?.idVariable) {
          const hasta = uvaVar.fecha || hoyISO();
          const uvaResp = await fetchBCRA(`https://api.bcra.gob.ar/estadisticas/v3.0/monetarias/${uvaVar.idVariable}?desde=${hasta}&hasta=${hasta}&limit=1`);
          if (uvaResp.status === 200 && uvaResp.results?.length) {
            const v = uvaResp.results[uvaResp.results.length - 1];
            if (typeof v.valor === 'number') {
              setValorUVA(String(v.valor));
              setUvaRequestDate(requestDate);
            }
          }
        }
      }
      setApiStatus(t('calculator.apiStatusOk'));
    } catch {
      setApiStatus(t('calculator.apiStatusError'));
    }
  }, [t]);

  useEffect(() => {
    cargarDatosBCRA();
  }, [cargarDatosBCRA]);

  const plazoNum = Math.max(6, Math.min(24, isNaN(plazo) ? 12 : plazo));
  const tasaMensual = tasaMensualPorPlazo(plazoNum);
  const tasaDisplay = (tasaMensual * 100).toFixed(2) + '%';
  const uvaDateLabel = uvaRequestDate
    ? uvaRequestDate.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/')
    : '--/--/----';

  const calcularFinanciacion = () => {
    const dolar = parseFloat(dolarMEP);
    const uva = parseFloat(valorUVA);
    if (precioUSD <= 0 || isNaN(dolar) || dolar <= 0) {
      setApiStatus(t('calculator.completarDatos'));
      return;
    }
    const montoPesos = precioUSD * dolar;
    if (isNaN(uva) || uva <= 0) {
      setApiStatus(t('calculator.completarDatos'));
      return;
    }
    const uvasTotales = montoPesos / uva;
    const potencia = Math.pow(1 + tasaMensual, plazoNum);
    const cuotaUVAs = (uvasTotales * tasaMensual * potencia) / (potencia - 1);
    const cuotaInicialPesos = cuotaUVAs * uva;
    setResumen(
      `<strong>${t('calculator.montoPesos')}:</strong> $${montoPesos.toLocaleString('es-AR', { minimumFractionDigits: 2 })}<br>` +
      `<strong>${t('calculator.uvasTotales').replace('__UVA_LINK__', uvaLinkHtml)}:</strong> ${uvasTotales.toFixed(2)}<br>` +
      `<strong>${t('calculator.cuotaUVAs')}:</strong> ${cuotaUVAs.toFixed(4)} UVAs/mes<br>` +
      `<strong>${t('calculator.cuotaPesos')} (UVA ${uva.toFixed(2)}):</strong> $${cuotaInicialPesos.toLocaleString('es-AR', { minimumFractionDigits: 2 })}<br>` +
      `<strong>Tasa mensual:</strong> ${(tasaMensual * 100).toFixed(2)}% | ${t('calculator.plazoMeses')}: ${plazoNum} meses`
    );
    let saldoUVAs = uvasTotales;
    const rows: Array<{ cuotaNum: number; cuotaUVAs: number; cuotaPesos: number; interesPesos: number; amortPesos: number; saldoUVAs: number; saldoPesos: number }> = [];
    for (let cuotaNum = 1; cuotaNum <= plazoNum; cuotaNum++) {
      const interesUVAs = saldoUVAs * tasaMensual;
      const amortUVAs = cuotaUVAs - interesUVAs;
      saldoUVAs -= amortUVAs;
      if (saldoUVAs < 1e-10) saldoUVAs = 0;
      const cuotaPesos = cuotaUVAs * uva;
      const interesPesos = interesUVAs * uva;
      const amortPesos = amortUVAs * uva;
      const saldoPesos = saldoUVAs * uva;
      rows.push({ cuotaNum, cuotaUVAs, cuotaPesos, interesPesos, amortPesos, saldoUVAs, saldoPesos });
    }
    setTablaRows(rows);
    setShowResult(true);
  };

  useEffect(() => {
    if (showResult && resultadosRef.current) {
      resultadosRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [showResult]);

  return (
    <section className="py-16 bg-[#0a0a0a]">
      <div className="container mx-auto max-w-4xl px-4">
        <Link
          to="/#lotes"
          className="inline-flex items-center gap-2 text-[#27AE60] hover:text-[#2ECC71] mb-8 transition-colors"
          style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '16px' }}
        >
          <ChevronLeft className="size-5" />
          {t('structuredData.breadcrumbLotes')}
        </Link>
        <h1 className="text-[40px] md:text-[48px] leading-tight text-[#FFFFFF] mb-2" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, letterSpacing: '0.3px' }}>
          {t('calculator.title')}
        </h1>
        <p className="text-[18px] text-[#E0E0E0] mb-8" style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}>
          {numeroLote != null ? `${t('loteCard.lote')} ${numeroLote} – ${t('calculator.subtitle')}` : t('calculator.subtitle')}
        </p>

        <div className="bg-[#121212] rounded-xl border border-[#2a2a2a] p-6 md:p-8 shadow-xl">
          <p className="text-sm text-[#888] mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            {apiStatus}
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="montoUSD" className="text-[#888] text-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('calculator.lotePrice')}
              </Label>
              <Input
                id="montoUSD"
                type="text"
                readOnly
                value={precioUSD > 0 ? `$${precioUSD.toLocaleString('es-AR')} USD` : '-'}
                className="mt-1 bg-[#0d0d0d] border-[#1f1f1f] text-[#27AE60] font-semibold cursor-default opacity-90"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              />
            </div>
            <div>
              <Label htmlFor="valorUVA" className="text-[#888] text-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('calculator.valorUVA')} {uvaDateLabel}
              </Label>
              <Input
                id="valorUVA"
                type="number"
                step="0.01"
                value={valorUVA}
                readOnly
                className="mt-1 bg-[#0d0d0d] border-[#1f1f1f] text-[#888] cursor-default opacity-90"
              />
            </div>
            <div>
              <Label htmlFor="dolarMEP" className="text-[#888] text-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('calculator.dolarMEP')}
              </Label>
              <Input
                id="dolarMEP"
                type="number"
                step="0.01"
                value={dolarMEP}
                readOnly
                className="mt-1 bg-[#0d0d0d] border-[#1f1f1f] text-[#888] cursor-default opacity-90"
              />
            </div>
            <div>
              <Label htmlFor="plazo" className="text-[#27AE60] font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('calculator.plazo')}
              </Label>
              <p className="text-xs text-[#666] mt-0.5 mb-1" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('calculator.plazoEditable')}
              </p>
              <Input
                ref={plazoInputRef}
                id="plazo"
                type="number"
                min={6}
                max={24}
                value={plazo}
                onChange={(e) => setPlazo(Math.max(6, Math.min(24, parseInt(e.target.value, 10) || 6)))}
                className="mt-1 bg-[#1a1a1a] border-2 border-[#27AE60]/50 focus:border-[#27AE60] focus:ring-2 focus:ring-[#27AE60]/30 text-[#FFFFFF] cursor-text"
              />
            </div>
            <div>
              <Label htmlFor="tasaDisplay" className="text-[#888] text-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                {t('calculator.tasaMensual')}
              </Label>
              <Input
                id="tasaDisplay"
                readOnly
                value={tasaDisplay}
                className="mt-1 bg-[#0d0d0d] border-[#1f1f1f] text-[#888] cursor-default opacity-90"
              />
            </div>
          </div>
          <Button
            onClick={calcularFinanciacion}
            className="mt-6 w-full bg-[#27AE60] hover:bg-[#1e8449] text-white"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}
          >
            {t('calculator.calcular')}
          </Button>
        </div>

        {showResult && (
          <div ref={resultadosRef} className="mt-10 bg-[#121212] rounded-xl border border-[#2a2a2a] p-6 md:p-8">
            <h2 className="text-[28px] text-[#FFFFFF] mb-4" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600 }}>
              {t('calculator.resultados')}
            </h2>
            <div
              className="text-[#E0E0E0] mb-6 space-y-1 text-[16px]"
              style={{ fontFamily: 'Open Sans, sans-serif', lineHeight: '1.6' }}
              dangerouslySetInnerHTML={{ __html: resumen }}
            />
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-[#2a2a2a] bg-[#27AE60] text-white px-3 py-2 text-right text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{t('calculator.cuotaNum')}</th>
                    <th className="border border-[#2a2a2a] bg-[#27AE60] text-white px-3 py-2 text-right text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{t('calculator.cuotaUVAsCol')}</th>
                    <th className="border border-[#2a2a2a] bg-[#27AE60] text-white px-3 py-2 text-right text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{t('calculator.cuotaPesosCol')}</th>
                    <th className="border border-[#2a2a2a] bg-[#27AE60] text-white px-3 py-2 text-right text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{t('calculator.interes')}</th>
                    <th className="border border-[#2a2a2a] bg-[#27AE60] text-white px-3 py-2 text-right text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{t('calculator.amort')}</th>
                    <th className="border border-[#2a2a2a] bg-[#27AE60] text-white px-3 py-2 text-right text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{t('calculator.saldoUVAs')}</th>
                    <th className="border border-[#2a2a2a] bg-[#27AE60] text-white px-3 py-2 text-right text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{t('calculator.saldoPesos')}</th>
                  </tr>
                </thead>
                <tbody>
                  {tablaRows.map((r) => (
                    <tr key={r.cuotaNum}>
                      <td className="border border-[#2a2a2a] px-3 py-2 text-right text-[#E0E0E0] text-sm">{r.cuotaNum}</td>
                      <td className="border border-[#2a2a2a] px-3 py-2 text-right text-[#E0E0E0] text-sm">{r.cuotaUVAs.toFixed(4)}</td>
                      <td className="border border-[#2a2a2a] px-3 py-2 text-right text-[#E0E0E0] text-sm">${r.cuotaPesos.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                      <td className="border border-[#2a2a2a] px-3 py-2 text-right text-[#E0E0E0] text-sm">${r.interesPesos.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                      <td className="border border-[#2a2a2a] px-3 py-2 text-right text-[#E0E0E0] text-sm">${r.amortPesos.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                      <td className="border border-[#2a2a2a] px-3 py-2 text-right text-[#E0E0E0] text-sm">{r.saldoUVAs.toFixed(4)}</td>
                      <td className="border border-[#2a2a2a] px-3 py-2 text-right text-[#E0E0E0] text-sm">${r.saldoPesos.toLocaleString('es-AR', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p
              className="mt-6 text-sm text-[#888] [&_a]:text-[#27AE60] [&_a]:hover:underline"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
              dangerouslySetInnerHTML={{ __html: t('calculator.nota').replace('__UVA_LINK__', uvaLinkHtml) }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
