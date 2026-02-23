import ThemeSwitcher from './ThemeSwitcher';

const AppHeader = () => (
  <header className="app-header">
    <div className="app-header__top">
      <h1 className="app-header__title">
        <span className="app-header__icon"></span>
        El-Priser Kollen
      </h1>
      <ThemeSwitcher />
    </div>
    <p className="app-header__subtitle">Svenska elpriser i realtid</p>
  </header>
);

export default AppHeader;
