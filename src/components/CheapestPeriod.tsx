import { useState, useMemo } from 'react';
import type { HourlyPrice, PriceUnit } from '../types';
import InfoTooltip from "./InfoTooltip";
interface Props {
  data: HourlyPrice[];
  unit: PriceUnit;
}

const CheapestPeriod = ({ data, unit }: Props) => {
  const [activePreset, setActivePreset] = useState<number | 'custom'>(2);
  const [customHours, setCustomHours] = useState('3');

  const duration = activePreset === 'custom' ? Math.min(24, Math.max(1, parseInt(customHours) || 1)) : (activePreset as number);

  const result = useMemo(() => {
    const n = Math.min(Math.max(duration, 1), 24);
    let bestStart = 0;
    let bestSum = Infinity;

    for (let start = 0; start <= 24 - n; start++) {
      const sum = data.slice(start, start + n).reduce((acc, d) => acc + d.price, 0);
      if (sum < bestSum) {
        bestSum = sum;
        bestStart = start;
      }
    }

    return {
      start: bestStart,
      end: bestStart + n,
      avg: bestSum / n,
      total: bestSum,
    };
  }, [data, duration]);

  const convert = (price: number) => unit === 'kr' ? price : price * 100;
  const unitLabel = unit === 'kr' ? 'kr/kWh' : 'öre/kWh';
  const unitShort = unit === 'kr' ? 'kr' : 'öre';
  const pad = (n: number) => String(n).padStart(2, '0');

  const fmtPrice = (price: number) => {
    const val = convert(price);
    return unit === 'kr' ? val.toFixed(4) : val.toFixed(2);
  };

  return (
    <section className="section">
      <h2 className="section__title">
        Billigaste tidsperiod
        <InfoTooltip
            text="Vi summerar elpriset timme för timme över vald period (t.ex. 4 timmar i rad) och visar den sammanhängande tidsperiod som har lägst totalkostnad. Perfekt om du exempelvis vill ladda elbilen under flera timmar i sträck."
        />
      </h2>

      <div className="period-selector">
        {[2, 4, 8].map((h) => (
            <button
                key={h}
                className={`period-selector__btn ${activePreset === h ? 'period-selector__btn--active' : ''}`}
                onClick={() => setActivePreset(h)}>
              {h} timmar
            </button>
        ))}
        <button
          className={`period-selector__btn ${activePreset === 'custom' ? 'period-selector__btn--active' : ''}`}
          onClick={() => setActivePreset('custom')}>
          Egen
        </button>
      </div>

      {activePreset === 'custom' && (
        <div className="custom-input">
          <label>Antal timmar:</label>
          <input
            type="number"
            min={1}
            max={24}
            value={customHours}
            placeholder="3"
            onChange={(e) => setCustomHours(e.target.value)}
            className="custom-input__field"/>
        </div>
      )}

      <div className="period-result">
        <div className="period-result__time">
          <span className="period-result__label">Bästa tid</span>
          <span className="period-result__value">
            {pad(result.start)}:00 – {pad(result.end)}:00
          </span>
        </div>
        <div className="period-result__stats">
          <div className="period-result__stat">
            <span className="period-result__stat-label">Medelpris</span>
            <span className="period-result__stat-value">
              {fmtPrice(result.avg)} {unitLabel}
            </span>
          </div>
          <div className="period-result__stat">
            <span className="period-result__stat-label">Totalkostnad</span>
            <span className="period-result__stat-value">
              {fmtPrice(result.total)} {unitShort}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheapestPeriod;
