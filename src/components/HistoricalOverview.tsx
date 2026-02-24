import { useMemo, useState } from "react";
import InfoTooltip from "./InfoTooltip";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts";
import UnitToggle from "./UnitToggle";
import { useHistoricalPrices } from "../hooks/useHistoricalPrices";
import type { PriceUnit } from "../types";

interface Props {
    area: string;
}

const HistoricalOverview = ({ area }: Props) => {
    const [days, setDays] = useState(7);
    const [unit, setUnit] = useState<PriceUnit>("kr");
    const [showTable, setShowTable] = useState(false);

    const { data, isLoading, error } = useHistoricalPrices(area, days);

    const convert = (price: number) =>
        unit === "kr" ? price : price * 100;

    const unitLabel =
        unit === "kr" ? "kr/kWh" : "öre/kWh";

    const stats = useMemo(() => {
        if (!data || data.length === 0) return null;

        const prices = data.map((d: any) => d.avg);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        const avg =
            prices.reduce((a: number, b: number) => a + b, 0) /
            prices.length;

        const cheapestDay = data.find(
            (d: any) => d.avg === min
        )?.date;

        const expensiveDay = data.find(
            (d: any) => d.avg === max
        )?.date;

        return { min, max, avg, cheapestDay, expensiveDay };
    }, [data]);

    if (isLoading)
        return (
            <section className="section">
                <div className="loading-state">
                    Laddar historisk data...
                </div>
            </section>
        );

    if (error || !data || !stats)
        return (
            <section className="section">
                <div className="error-state">
                    Kunde inte hämta historisk data.
                </div>
            </section>
        );

    const chartData = data.map((d: any) => ({
        date: d.date,
        price: d.avg,
    }));

    const fmt = (price: number) => {
        const val = convert(price);
        return unit === "kr"
            ? `${val.toFixed(4)} ${unitLabel}`
            : `${val.toFixed(1)} ${unitLabel}`;
    };

    return (
        <section className="section">

            <div className="section__header">
                <h2 className="section__title section__title--no-border">
                    Historiskt snittpris
                    <InfoTooltip
                        text="Visar dagligt genomsnittligt spotpris per kWh för valt elområde under de senaste 7 eller 30 dagarna. Varje dagspris är ett medelvärde av dygnets timpriser. Avgifter, nätkostnader och individuella elavtal ingår inte."
                    />
                </h2>
            </div>


            <div className="period-selector period-selector--historical">
                <button
                    className={`period-selector__btn ${
                        days === 7
                            ? "period-selector__btn--active"
                            : ""
                    }`}
                    onClick={() => setDays(7)}>
                    7 dagar
                </button>
                <button
                    className={`period-selector__btn ${
                        days === 30
                            ? "period-selector__btn--active"
                            : ""
                    }`}
                    onClick={() => setDays(30)}>
                    30 dagar
                </button>
            </div>

      
            <div className="stats-grid">
                <div className="stat-card stat-card--green">
                    
                    <span className="stat-card__label">
                        Billigaste dagen
                    </span>
                    <span className="stat-card__value">
                        {stats.cheapestDay}
                    </span>
                    <span className="stat-card__detail">
                        {fmt(stats.min)}
                    </span>
                </div>

                <div className="stat-card stat-card--red">
                    
                    <span className="stat-card__label">
                        Dyraste dagen
                    </span>
                    <span className="stat-card__value">
                        {stats.expensiveDay}
                    </span>
                    <span className="stat-card__detail">
                        {fmt(stats.max)}
                  </span>
                </div>

                <div className="stat-card stat-card--cyan">
                    
                    <span className="stat-card__label">
                        {days === 7
                            ? "7-dagars snitt"
                            : "30-dagars snitt"}
                    </span>
                    <span className="stat-card__value">
                        {fmt(stats.avg)}
                    </span>
                </div>
            </div>
          
            <div className="chart-container chart-container--historical">
                
                <div className="chart-container__unit-toggle">
                    <UnitToggle unit={unit} onChange={setUnit} />
                </div>

                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart
                        data={chartData}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -10,
                            bottom: 0,
                        }}>
                        <defs>
                            <linearGradient
                                id="histGrad"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1">
                                <stop
                                    offset="0%"
                                    stopColor="var(--chart-stroke, #06b6d4)"
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="var(--chart-stroke, #06b6d4)"
                                    stopOpacity={0.02}
                                />
                            </linearGradient>
                        </defs>

                        <XAxis
                            dataKey="date"
                            stroke="var(--axis-stroke)"
                            tick={{
                                fill: "var(--axis-tick)",
                                fontSize: 11,
                            }}
                            axisLine={{
                                stroke: "var(--axis-line)",
                            }}
                            tickLine={false}
                        />

                        <YAxis
                            stroke="var(--axis-stroke)"
                            tick={{
                                fill: "var(--axis-tick)",
                                fontSize: 11,
                            }}
                            tickFormatter={(v: number) => {
                                const val = convert(v);
                                return unit === "kr"
                                    ? val.toFixed(2)
                                    : val.toFixed(0);
                            }}
                            axisLine={false}
                            tickLine={false}
                            width={50}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor:
                                    "var(--tooltip-bg)",
                                border:
                                    "1px solid var(--tooltip-border)",
                                borderRadius: "8px",
                                color: "var(--tooltip-color)",
                                fontSize: "0.85rem",
                            }}
                            formatter={(value: number) => {
                                const val = convert(value);
                                return [
                                    unit === "kr"
                                        ? `${val.toFixed(4)} ${unitLabel}`
                                        : `${val.toFixed(2)} ${unitLabel}`,
                                    "Snittpris",
                                ];
                            }}
                            labelFormatter={(label: string) =>
                                `Datum: ${label}`
                            }
                        />

                        <ReferenceLine
                            y={stats.avg}
                            stroke="#eab308"
                            strokeDasharray="4 4"
                            strokeWidth={1}
                        />

                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="var(--chart-stroke)"
                            strokeWidth={2}
                            fill="url(#histGrad)"
                            dot={false}
                            activeDot={{
                                r: 4,
                                fill: "var(--chart-stroke)",
                                stroke: "var(--bg-body)",
                                strokeWidth: 2,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            
            <button
                className="toggle-table-btn"
                onClick={() =>
                    setShowTable(!showTable)
                }>
                {showTable
                    ? "▲ Dölj pristabell"
                    : "▼ Visa pristabell"}
            </button>

            {showTable && (
                <div className="price-table-wrapper">
                    <table className="price-table">
                        <thead>
                        <tr>
                            <th>Datum</th>
                            <th>
                                Snittpris ({unitLabel})
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((d: any) => {
                            const val = convert(d.avg);

                            return (
                                <tr
                                    key={d.date}
                                    className={
                                        d.date ===
                                        stats.cheapestDay
                                            ? "price-table__row--cheapest"
                                            : d.date ===
                                            stats.expensiveDay
                                                ? "price-table__row--expensive"
                                                : ""
                                    }>
                                    <td>{d.date}</td>
                                    <td>
                                        {unit === "kr"
                                            ? val.toFixed(4)
                                            : val.toFixed(2)}
                                    </td>
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

export default HistoricalOverview;