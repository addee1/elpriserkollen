const PrivacyPolicy = () => (
    <div className="main-content">
        <div className="info-page">
            <h1>Integritetspolicy</h1>
            <div className="info-page__meta">
                <p className="info-page__updated">
                    <span className="info-page__icon">🕒</span>
                    Senast uppdaterad: 24 februari 2026
                </p>
                <div className="info-page__divider"></div>
            </div>
            <p className="info-page__lead">
                ElPriserKollen värnar om din integritet. Tjänsten kräver ingen
                registrering och samlar inte in personuppgifter.
            </p>

            <section>
                <h2>Personuppgifter</h2>
                <p>
                Vi samlar inte in, lagrar eller behandlar några personuppgifter.
                    Du kan använda tjänsten helt anonymt.
                </p>
            </section>

            <section>
                <h2>Cookies och lokal lagring</h2>
                <p>
                    ElPriserkollen använder inte cookies för spårning eller
                    marknadsföring.
                </p>
                <p>
                    Webbplatsen kan använda webbläsarens lokala lagring
                    (localStorage) för att spara inställningar, såsom valt tema,
                    för att förbättra användarupplevelsen.
                </p>
            </section>

            <section>
                <h2>Teknisk cache</h2>
                <p>
                    För att förbättra prestanda kan prisdata temporärt lagras i
                    webbläsaren under den aktiva sessionen. Denna information
                    är inte kopplad till någon individ och delas inte med tredje part.
                </p>
            </section>

            <section>
                <h2>Ändringar</h2>
                <p>
                    Om tjänsten i framtiden börjar använda funktioner som
                    kräver behandling av personuppgifter kommer denna policy
                    att uppdateras.
                </p>
            </section>
        </div>
    </div>
);

export default PrivacyPolicy;