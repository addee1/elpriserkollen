import { useMemo, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import type { HourlyPrice, PriceUnit } from '../types';
import UnitToggle from './UnitToggle';

interface Props {
  data: HourlyPrice[];
  unit: PriceUnit;
  onUnitChange: (unit: PriceUnit) => void;
}

const PriceOverview = ({ data, unit, onUnitChange }: Props) => {
  const [showTable, setShowTable] = useState(false);

  const convert = (price: number) => unit === 'kr' ? price : price * 100;
  const unitLabel = unit === 'kr' ? 'kr/kWh' : 'öre/kWh';

  const stats = useMemo(() => {
    const prices = data.map((d) => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    const cheapestHour = data.find((d) => d.price === min)!.hour;
    const expensiveHour = data.find((d) => d.price === max)!.hour;
    return { min, max, avg, cheapestHour, expensiveHour };
  }, [data]);

  const chartData = data.map((d) => ({
    hour: `${String(d.hour).padStart(2, '0')}:00`,
    price: d.price,
  }));

  const fmt = (price: number) => {
    const val = convert(price);
    return unit === 'kr' ? `${val.toFixed(4)} ${unitLabel}` : `${val.toFixed(1)} ${unitLabel}`;
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="section">
      <div className="section__header">
        <h2 className="section__title section__title--no-border">Elprisöversikt</h2>
        <UnitToggle unit={unit} onChange={onUnitChange} />
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card--green">
          <span className="stat-card__label">Billigaste timmen</span>
          <span className="stat-card__value">{pad(stats.cheapestHour)}:00</span>
          <span className="stat-card__detail">{fmt(stats.min)}</span>
        </div>
        <div className="stat-card stat-card--red">
          <span className="stat-card__label">Dyraste timmen</span>
          <span className="stat-card__value">{pad(stats.expensiveHour)}:00</span>
          <span className="stat-card__detail">{fmt(stats.max)}</span>
        </div>
        <div className="stat-card stat-card--cyan">
          <span className="stat-card__label">Dagligt medelpris</span>
          <span className="stat-card__value">{fmt(stats.avg)}</span>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-stroke, #06b6d4)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--chart-stroke, #06b6d4)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="hour"
              stroke="var(--axis-stroke, #2a3f5c)"
              tick={{ fill: 'var(--axis-tick, #7a8ba3)', fontSize: 11 }}
              ticks={['00:00', '04:00', '08:00', '12:00', '16:00', '20:00']}
              axisLine={{ stroke: 'var(--axis-line, #1c3456)' }}
              tickLine={false}/>
            <YAxis
              stroke="var(--axis-stroke, #2a3f5c)"
              tick={{ fill: 'var(--axis-tick, #7a8ba3)', fontSize: 11 }}
              tickFormatter={(v: number) => {
                const val = convert(v);
                return unit === 'kr' ? val.toFixed(2) : val.toFixed(0);
              }}
              axisLine={false}
              tickLine={false}
              width={50}/>
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--tooltip-bg, #1a2d4a)',
                border: '1px solid var(--tooltip-border, #1e3a5c)',
                borderRadius: '8px',
                color: 'var(--tooltip-color, #e2e8f0)',
                fontSize: '0.85rem',
              }}
              formatter={(value: number) => {
                const val = convert(value);
                const display = unit === 'kr' ? val.toFixed(4) : val.toFixed(2);
                return [`${display} ${unitLabel}`, 'Pris'];
              }}
              labelFormatter={(label: string) => `Kl ${label}`}/>
            <ReferenceLine
              y={stats.avg}
              stroke="#eab308"
              strokeDasharray="4 4"
              strokeWidth={1}/>
            <Area
              type="monotone"
              dataKey="price"
              stroke="var(--chart-stroke, #06b6d4)"
              strokeWidth={2}
              fill="url(#priceGrad)"
              dot={false}
              activeDot={{ r: 4, fill: 'var(--chart-stroke, #06b6d4)', stroke: 'var(--bg-body, #0a1628)', strokeWidth: 2 }}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <button className="toggle-table-btn" onClick={() => setShowTable(!showTable)}>
        {showTable ? '▲ Dölj pristabell' : '▼ Visa pristabell'}
      </button>

      {showTable && (
        <div className="price-table-wrapper">
          <table className="price-table">
            <thead>
              <tr>
                <th>Timme</th>
                <th>Pris ({unitLabel})</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => {
                const val = convert(d.price);
                return (
                  <tr
                    key={d.hour}
                    className={
                      d.hour === stats.cheapestHour
                        ? 'price-table__row--cheapest'
                        : d.hour === stats.expensiveHour
                          ? 'price-table__row--expensive'
                          : ''
                    }>
                    <td>
                      {pad(d.hour)}:00–{pad((d.hour + 1) % 24)}:00
                    </td>
                    <td>{unit === 'kr' ? val.toFixed(4) : val.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default PriceOverview;
