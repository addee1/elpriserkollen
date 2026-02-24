import ThemeSwitcher from './ThemeSwitcher';
import Logo from "../assets/elrpiserkollen-logo.png";
import { Link } from "react-router-dom";
const AppHeader = () => (
  <header className="app-header">
    <div className="app-header__top">
        <h1 className="app-header__title">
            <Link to="/" className="app-header__brand">
                <img
                    src={Logo}
                    alt="ElpriserKollen logotyp"
                    className="app-header__logo"
                />
                <span>ElpriserKollen</span>
            </Link>
        </h1>
        <ThemeSwitcher/>
    </div>
      <p className="app-header__subtitle">Svenska elpriser i realtid</p>
  </header>
);

export default AppHeader;
