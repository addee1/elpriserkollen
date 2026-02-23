import { HourlyPrice } from '../types';

interface RawPriceEntry {
  SEK_per_kWh: number;
  EUR_per_kWh: number;
  EXR: number;
  time_start: string;
  time_end: string;
}

export async function fetchPrices(area: string, day: 'today' | 'tomorrow'): Promise<HourlyPrice[]> {
  const now = new Date();
  const target = day === 'tomorrow'
    ? new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
    : now;

  const year = target.getFullYear();
  const month = String(target.getMonth() + 1).padStart(2, '0');
  const dd = String(target.getDate()).padStart(2, '0');

  const url = `https://www.elprisetjustnu.se/api/v1/prices/${year}/${month}-${dd}_${area}.json`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Kunde inte hämta priser (HTTP ${res.status})`);
  }

  const raw: RawPriceEntry[] = await res.json();

  // CRITICAL: Aggregate quarter-hour values into hourly averages
  const hourlyMap = new Map<number, number[]>();
  for (const entry of raw) {
    const hour = new Date(entry.time_start).getHours();
    if (!hourlyMap.has(hour)) hourlyMap.set(hour, []);
    hourlyMap.get(hour)!.push(entry.SEK_per_kWh);
  }

  // Build exactly 24 hourly values
  const hourlyData: HourlyPrice[] = Array.from({ length: 24 }, (_, i) => {
    const values = hourlyMap.get(i);
    const avg = values && values.length > 0
      ? values.reduce((a, b) => a + b, 0) / values.length
      : 0;
    return { hour: i, price: avg };
  });

  return hourlyData;
}
