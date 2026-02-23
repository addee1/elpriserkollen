import { useState, useEffect, useRef } from 'react';

type Theme = 'default' | 'black' | 'white';

const themes: { value: Theme; label: string }[] = [
  { value: 'default', label: 'Mörk blå' },
  { value: 'black', label: 'Svart' },
  { value: 'white', label: 'Ljus' },
];

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('elpris-theme') as Theme) || 'default';
  });
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('elpris-theme', theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem('elpris-theme') as Theme | null;
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="theme-switcher" ref={ref}>
      <button
        className="theme-switcher__btn"
        onClick={() => setOpen(!open)}
        aria-label="Byt tema">
        🌙️
      </button>
      {open && (
        <div className="theme-switcher__dropdown">
          {themes.map((t) => (
            <button
              key={t.value}
              className={`theme-switcher__option ${theme === t.value ? 'theme-switcher__option--active' : ''}`}
              onClick={() => { setTheme(t.value); setOpen(false); }}>
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
