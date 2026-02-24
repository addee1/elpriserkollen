const About = () => (
    <div className="main-content">
        <div className="info-page">
            <h1>Om ElPriserKollen</h1>
            <div className="info-page__meta">
                <p className="info-page__updated">
                    <span className="info-page__icon">🕒</span>
                    Senast uppdaterad: 24 februari 2026
                </p>
                <div className="info-page__divider"></div>
            </div>
            <p className="info-page__lead">
                ElPriserKollen hjälper dig att förstå och analysera svenska elpriser
                timme för timme, så att du kan planera din elanvändning smartare.
            </p>

            <section>
                <h2>Vad gör tjänsten?</h2>
                <p>
                    Vi visar aktuella spotpriser för samtliga svenska elområden och
                    låter dig identifiera de billigaste timmarna under dygnet.
                </p>
                <p>
                    Du kan även simulera kostnader inklusive avgifter och moms samt
                    beräkna potentiella besparingar vid exempelvis elbilsladdning
                    eller tvätt under billigare tider.
                </p>
            </section>

            <section>
                <h2>Hur fungerar beräkningarna?</h2>
                <p>
                    Alla priser baseras på officiella timpriser. När du lägger till
                    avgifter summerar vi rörliga kostnader, fasta påslag,
                    elöverföring, energiskatt och eventuell moms per kWh.
                </p>
                <p>
                    Observera att fasta abonnemangsavgifter och individuella
                    avtal inte inkluderas.
                </p>
            </section>

            <section>
                <h2>Transparens</h2>
                <p>
                    ElPriserKollen är ett oberoende verktyg som tillhandahålls i
                    informationssyfte. Alla beräkningar är uppskattningar och ska
                    inte betraktas som exakt fakturaunderlag.
                </p>
            </section>

            <section>
                <h2>Utvecklat av</h2>
                <p>
                    Projektet är utvecklat av Addee som ett hobbyprojekt och drivs med målet att göra
                    elpriser mer begripliga för alla.
                </p>
            </section>
        </div>
    </div>
);

export default About;