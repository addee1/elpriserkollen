const DataSource = () => (
    <div className="main-content">
        <div className="info-page">
            <h1>Datakälla</h1>

            <div className="info-page__meta">
                <p className="info-page__updated">
                    <span className="info-page__icon">🕒</span>
                    Senast uppdaterad: 24 februari 2026
                </p>
                <div className="info-page__divider"></div>
            </div>

            <p className="info-page__lead">
                Elpriserna som visas på ElPriserKollen baseras på offentligt
                tillgängliga timpriser för svenska elområden.
            </p>

            <section>
                <h2>Varifrån kommer priserna?</h2>
                <p>
                    Prisuppgifterna hämtas från{" "}
                    <a
                        href="https://www.elprisetjustnu.se/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        elprisetjustnu.se
                    </a>
                    , som publicerar timvisa spotpriser för Sveriges elområden
                    (SE1–SE4).
                </p>
                <p>
                    Dessa priser baseras i sin tur på officiella day-ahead
                    spotpriser från den nordiska elmarknaden.
                </p>
            </section>

            <section>
                <h2>Uppdatering av priser</h2>
                <p>
                    Elpriser fastställs normalt ett dygn i förväg.
                    Morgondagens priser publiceras vanligtvis runt kl. 13:00.
                </p>
                <p>
                    ElPriserKollen uppdaterar informationen automatiskt när
                    nya priser blir tillgängliga via datakällan.
                </p>
            </section>

            <section>
                <h2>Viktigt att veta</h2>
                <p>
                    Grundpriserna som visas är spotpriser per kWh. Dessa inkluderar
                    inte individuella elavtal, fasta abonnemangsavgifter eller
                    nätavgifter.
                </p>
                <p>
                    ElPriserKollen erbjuder möjlighet att manuellt lägga till
                    rörliga kostnader, fasta påslag, energiskatt och moms för att
                    uppskatta ett mer komplett elpris. Dessa värden anges av
                    användaren och kan variera mellan olika avtal och månader.
                </p>
                <p>
                    Eventuella avvikelser kan förekomma om dataleverantören ändrar
                    eller korrigerar tidigare publicerade priser.
                </p>
            </section>

            <section>
                <h2>Ansvarsfriskrivning</h2>
                <p>
                    ElPriserKollen tillhandahåller information i upplysningssyfte.
                    Vi garanterar inte fullständig korrekthet eller tillgänglighet
                    och ansvarar inte för ekonomiska beslut som fattas baserat
                    på publicerad information.
                </p>
            </section>
        </div>
    </div>
);

export default DataSource;