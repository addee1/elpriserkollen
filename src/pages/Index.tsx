import { useState, useMemo } from "react";
import { usePriceData } from "../hooks/usePriceData";
import type { HourlyPrice, FeesConfig, PriceUnit } from "../types";

import AreaDaySelector from "../components/AreaDaySelector";
import PriceOverview from "../components/PriceOverview";
import CheapestPeriod from "../components/CheapestPeriod";
import SavingsCalculator from "../components/SavingsCalculator";
import FeesSettings from "../components/FeesSettings";
import HistoricalOverview from "../components/HistoricalOverview";
function applyFees(data: HourlyPrice[], fees: FeesConfig): HourlyPrice[] {
  if (!fees.enabled) return data;

  return data.map((h) => {
    let price =
        h.price +
        (fees.rorligaKostnader +
            fees.fastaPaslag +
            fees.eloverforing +
            fees.energiskatt) /
        100;

    if (fees.moms) price *= 1.25;

    return { ...h, price };
  });
}

const Index = () => {
  const [area, setArea] = useState("SE3");
  const [day, setDay] = useState<"today" | "tomorrow">("today");
  const [unit, setUnit] = useState<PriceUnit>("ore");

  const [fees, setFees] = useState<FeesConfig>({
    enabled: false,
    rorligaKostnader: 0,
    fastaPaslag: 0,
    eloverforing: 0,
    energiskatt: 0,
    moms: true,
  });

  const { data: rawData, isLoading, error } = usePriceData(area, day);

  const hourlyData = useMemo(() => {
    if (!rawData) return null;
    return applyFees(rawData, fees);
  }, [rawData, fees]);

  return (
      <>
        <AreaDaySelector
            area={area}
            day={day}
            onAreaChange={setArea}
            onDayChange={setDay}
        />

        <FeesSettings fees={fees} onChange={setFees} />

        {isLoading && <div className="loading-state">Laddar priser...</div>}

        {error && (
            <div className="error-state">
              Kunde inte hämta priser.{" "}
              {day === "tomorrow"
                  ? "Morgondagens priser publiceras vanligtvis runt kl 13:00."
                  : "Försök igen senare."}
            </div>
        )}

        {hourlyData && (
            <>
              <PriceOverview
                  data={hourlyData}
                  unit={unit}
                  onUnitChange={setUnit}
              />
              <CheapestPeriod data={hourlyData} unit={unit} />
              <SavingsCalculator data={hourlyData} unit={unit} />
              <HistoricalOverview area={area} />
            </>
        )}
      </>
  );
};

export default Index;