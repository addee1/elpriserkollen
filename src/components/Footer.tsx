import { Link } from "react-router-dom";
const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="app-footer">
            <div className="app-footer__inner">
                <div className="app-footer__links">
                    <Link to="/om-oss">Om ElPriserKollen</Link>
                    <Link to="/datakalla">Datakälla</Link>
                    <Link to="/integritetspolicy">Integritetspolicy</Link>
                    <Link to="/anvandarvillkor">Användarvillkor</Link>
                </div>

                <div className="app-footer__bottom">
                    <span>© {year} elpriserkollen.se | All rights reserved.</span>
                    <span>Developed by{" "}
                        <a href="https://github.com/addee1" target="_blank" rel="noreferrer">Addee</a>{" "}
                        ♥
                    </span>
                </div>

                <div className="app-footer__disclaimer">
                    Priser och beräkningar är vägledande. Faktiska kostnader kan variera beroende på avtal och avgifter.
                </div>
            </div>
        </footer>
    );
};

export default Footer;