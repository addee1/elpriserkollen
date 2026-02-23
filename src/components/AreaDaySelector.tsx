interface Props {
  area: string;
  day: 'today' | 'tomorrow';
  onAreaChange: (area: string) => void;
  onDayChange: (day: 'today' | 'tomorrow') => void;
}

const areas = ['SE1', 'SE2', 'SE3', 'SE4'];

const AreaDaySelector = ({ area, day, onAreaChange, onDayChange }: Props) => (
  <div className="selector">
    <div className="selector__group">
      <label className="selector__label">Elområde</label>
      <div className="selector__buttons">
        {areas.map((a) => (
          <button
            key={a}
            className={`selector__btn ${area === a ? 'selector__btn--active' : ''}`}
            onClick={() => onAreaChange(a)}>
            {a}
          </button>
        ))}
      </div>
    </div>
    <div className="selector__group">
      <label className="selector__label">Dag</label>
      <div className="selector__buttons">
        <button
          className={`selector__btn ${day === 'today' ? 'selector__btn--active' : ''}`}
          onClick={() => onDayChange('today')}>
          Idag
        </button>
        <button
          className={`selector__btn ${day === 'tomorrow' ? 'selector__btn--active' : ''}`}
          onClick={() => onDayChange('tomorrow')}>
          Imorgon
        </button>
      </div>
    </div>
  </div>
);

export default AreaDaySelector;
