import { useState, useMemo } from 'react';
import type { HourlyPrice, PriceUnit } from '../types';
import InfoTooltip from "./InfoTooltip";
interface Props {
  data: HourlyPrice[];
  unit: PriceUnit;
}

const appliances = [
  { name: 'Tvättmaskin', kwh: 1.2 },
  { name: 'Diskmaskin', kwh: 1.0 },
  { name: 'Torktumlare', kwh: 1.5 },
];

const SavingsCalculator = ({ data, unit }: Props) => {
  const [applianceIdx, setApplianceIdx] = useState(0);
  const [hoursPerRun, setHoursPerRun] = useState('1');
  const [timesPerWeek, setTimesPerWeek] = useState('3');
  const [compareHour, setCompareHour] = useState(18);

  const hoursVal = Math.max(1, parseInt(hoursPerRun) || 1);
  const timesVal = Math.max(1, parseInt(timesPerWeek) || 1);

  const cheapestHour = useMemo(
    () => data.reduce((min, d) => (d.price < min.price ? d : min), data[0]).hour,
    [data]
  );

  const result = useMemo(() => {
    const kwh = appliances[applianceIdx].kwh * hoursVal;
    const costChosen = data[compareHour].price * kwh;
    const costCheapest = data[cheapestHour].price * kwh;
    const savingsPerRun = costChosen - costCheapest;
    const monthly = savingsPerRun * timesVal * 4.33;
    const pct = costChosen > 0 ? ((costChosen - costCheapest) / costChosen) * 100 : 0;
    return { costChosen, costCheapest, monthly, pct };
  }, [data, applianceIdx, hoursVal, timesVal, compareHour, cheapestHour]);

  const convert = (price: number) => unit === 'kr' ? price : price * 100;
  const unitShort = unit === 'kr' ? 'kr' : 'öre';
  const pad = (n: number) => String(n).padStart(2, '0');

  const fmtCost = (price: number) => {
    const val = convert(price);
    return unit === 'kr' ? val.toFixed(4) : val.toFixed(2);
  };

  return (
    <section className="section">
      <h2 className="section__title">
        Besparingsberäkning
        <InfoTooltip
            text="Denna beräkning uppskattar hur mycket du kan spara per månad genom att flytta din elanvändning från en vald timme till den billigaste timmen under dagen. Resultatet baseras på dagens spotpriser och angiven förbrukning, och är en uppskattning eftersom elpriser varierar dag för dag."
        />
      </h2>

      <div className="savings-form">
        <div className="savings-form__group">
          <label className="savings-form__label">
            Apparat
            <InfoTooltip
                text="Förbrukningen är ett genomsnittsvärde. Faktisk energianvändning varierar beroende på modell, ålder, temperatur, tvättmängd och program."
            />
          </label>
          <select
              className="savings-form__select"
              value={applianceIdx}
              onChange={(e) => setApplianceIdx(Number(e.target.value))}>
            {appliances.map((a, i) => (
                <option key={i} value={i}>
                {a.name} (~{a.kwh} kWh)
              </option>
            ))}
          </select>
        </div>

        <div className="savings-form__group">
          <label className="savings-form__label">Timmar per körning</label>
          <input
            type="number"
            min={1}
            max={24}
            value={hoursPerRun}
            placeholder="1"
            onChange={(e) => setHoursPerRun(e.target.value)}
            className="savings-form__input"/>
        </div>

        <div className="savings-form__group">
          <label className="savings-form__label">Gånger per vecka</label>
          <input
            type="number"
            min={1}
            max={30}
            value={timesPerWeek}
            placeholder="3"
            onChange={(e) => setTimesPerWeek(e.target.value)}
            className="savings-form__input"/>
        </div>

        <div className="savings-form__group">
          <label className="savings-form__label">Jämför med klockan</label>
          <select
            className="savings-form__select"
            value={compareHour}
            onChange={(e) => setCompareHour(Number(e.target.value))}>
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i}>
                {pad(i)}:00
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="savings-results">
        <div className="savings-results__row">
          <span>Kostnad kl {pad(compareHour)}:00</span>
          <span>{fmtCost(result.costChosen)} {unitShort}</span>
        </div>
        <div className="savings-results__row savings-results__row--highlight">
          <span>Kostnad kl {pad(cheapestHour)}:00 (billigast)</span>
          <span>{fmtCost(result.costCheapest)} {unitShort}</span>
        </div>
        <div className="savings-results__row savings-results__row--savings">
          <span>
            Månatlig besparing
            <InfoTooltip
                text="Denna beräkning baseras på dagens timpriser. Eftersom elpriser varierar dag för dag kan den faktiska besparingen bli högre eller lägre."
            />
          </span>
          <span>{result.monthly.toFixed(2)} kr</span>
        </div>
        <div className="savings-results__row">
          <span>Procentuell skillnad</span>
          <span className="savings-results__percent">{result.pct.toFixed(1)}%</span>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
