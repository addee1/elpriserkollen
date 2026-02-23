import type { PriceUnit } from '../types';

interface Props {
  unit: PriceUnit;
  onChange: (unit: PriceUnit) => void;
}

const UnitToggle = ({ unit, onChange }: Props) => (
  <div className="unit-toggle">
    <button
      className={`unit-toggle__btn ${unit === 'ore' ? 'unit-toggle__btn--active' : ''}`}
      onClick={() => onChange('ore')}>
      Öre
    </button>
    <button
      className={`unit-toggle__btn ${unit === 'kr' ? 'unit-toggle__btn--active' : ''}`}
      onClick={() => onChange('kr')}>
      Kr
    </button>
  </div>
);

export default UnitToggle;
