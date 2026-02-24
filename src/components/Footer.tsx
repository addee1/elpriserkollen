const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="app-footer">
            <div className="app-footer__inner">
                <div className="app-footer__links">
                    <a href="#">Om ElPrisKollen</a>
                    <a href="#">Datakälla</a>
                    <a href="#">Integritetspolicy</a>
                    <a href="#">Användarvillkor</a>
                </div>

                <div className="app-footer__bottom">
                    <span>© {year} elpriserkollen.se</span>
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