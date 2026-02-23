export type PriceUnit = 'ore' | 'kr';

export interface HourlyPrice {
  hour: number;
  price: number; // SEK per kWh
}

export interface FeesConfig {
  enabled: boolean;
  rorligaKostnader: number;
  fastaPaslag: number;
  eloverforing: number;
  energiskatt: number;
  moms: boolean;
}
