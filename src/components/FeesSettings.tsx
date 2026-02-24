import { useState } from 'react';
import type { FeesConfig } from '../types';
import InfoTooltip from "./InfoTooltip";
interface Props {
  fees: FeesConfig;
  onChange: (fees: FeesConfig) => void;
}

const FeesSettings = ({ fees, onChange }: Props) => {
  const [values, setValues] = useState({
    rorligaKostnader: String(fees.rorligaKostnader || ''),
    fastaPaslag: String(fees.fastaPaslag || ''),
    eloverforing: String(fees.eloverforing || ''),
    energiskatt: String(fees.energiskatt || ''),
  });

  const handleChange = (field: keyof typeof values, raw: string) => {
    setValues((prev) => ({ ...prev, [field]: raw }));
    onChange({ ...fees, [field]: parseFloat(raw) || 0 });
  };

  const update = (partial: Partial<FeesConfig>) => onChange({ ...fees, ...partial });

  return (
    <section className="section">
      <h2 className="section__title">
        Avgifter + Moms
        <InfoTooltip
            text="Här kan du lägga in avgifter från din elfaktura för att få ett mer komplett elpris per kWh. Vi lägger till rörliga kostnader, fasta påslag, elöverföring, energiskatt och eventuell moms. Fasta abonnemangsavgifter och andra månadskostnader ingår inte. Observera att avgifter kan ändras över tid och att resultatet därför är en uppskattning."
        />
      </h2>

      <label className="fees-toggle">
        <input
            type="checkbox"
            checked={fees.enabled}
            onChange={(e) => update({enabled: e.target.checked})}/>
        <span>Beräkna kostnader med avgifter + moms</span>
      </label>

      {fees.enabled && (
          <div className="fees-form">
            <div className="fees-form__section">
              <h3 className="fees-form__section-title">Elhandel</h3>
            <div className="fees-form__group">
              <label>Rörliga kostnader (öre/kWh)</label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={values.rorligaKostnader}
                placeholder="0"
                onChange={(e) => handleChange('rorligaKostnader', e.target.value)}
                className="fees-form__input"/>
            </div>
            <div className="fees-form__group">
              <label>Fasta påslag (öre/kWh)</label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={values.fastaPaslag}
                placeholder="0"
                onChange={(e) => handleChange('fastaPaslag', e.target.value)}
                className="fees-form__input"/>
            </div>
          </div>

          <div className="fees-form__section">
            <h3 className="fees-form__section-title">Elnät</h3>
            <div className="fees-form__group">
              <label>Elöverföring (öre/kWh)</label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={values.eloverforing}
                placeholder="0"
                onChange={(e) => handleChange('eloverforing', e.target.value)}
                className="fees-form__input"/>
            </div>
            <div className="fees-form__group">
              <label>Energiskatt (öre/kWh)</label>
              <input
                type="number"
                min={0}
                step={0.1}
                value={values.energiskatt}
                placeholder="0"
                onChange={(e) => handleChange('energiskatt', e.target.value)}
                className="fees-form__input"/>
            </div>
          </div>

          <div className="fees-form__section">
            <h3 className="fees-form__section-title">Moms</h3>
            <label className="fees-toggle">
              <input
                type="checkbox"
                checked={fees.moms}
                onChange={(e) => update({ moms: e.target.checked })}/>
              <span>Lägg till 25% moms</span>
            </label>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeesSettings;
