const Terms = () => (
    <div className="main-content">
        <div className="info-page">
            <h1>Användarvillkor</h1>
            <div className="info-page__meta">
                <p className="info-page__updated">
                    <span className="info-page__icon">🕒</span>
                    Senast uppdaterad: 24 februari 2026
                </p>
                <div className="info-page__divider"></div>
            </div>
            <p className="info-page__lead">
                Genom att använda ElPriserKollen accepterar du nedanstående villkor.
            </p>

            <section>
                <h2>Tjänstens syfte</h2>
                <p>
                    ElPriserKollen är ett informationsverktyg som visar och analyserar
                    svenska elpriser timme för timme. Tjänsten är avsedd att ge
                    vägledning och stöd vid planering av elanvändning.
                </p>
            </section>

            <section>
                <h2>Beräkningar och uppskattningar</h2>
                <p>
                    Alla beräkningar, inklusive kostnader och potentiella besparingar,
                    är uppskattningar baserade på tillgänglig prisdata och användarens
                    angivna uppgifter.
                </p>
                <p>
                    Faktiska kostnader kan variera beroende på individuella avtal,
                    fasta avgifter, nätavgifter och förändrade elpriser.
                </p>
            </section>

            <section>
                <h2>Ansvarsbegränsning</h2>
                <p>
                    ElPriserKollen tillhandahålls i befintligt skick och utan garantier
                    för fullständig korrekthet eller tillgänglighet.
                </p>
                <p>
                    Vi ansvarar inte för ekonomiska beslut eller förluster som kan
                    uppstå baserat på information från webbplatsen.
                </p>
            </section>

            <section>
                <h2>Ändringar av tjänsten</h2>
                <p>
                    Vi förbehåller oss rätten att när som helst uppdatera eller ändra
                    innehåll, funktioner och villkor utan föregående meddelande.
                </p>
            </section>

            <section>
                <h2>Kontakt</h2>
                <p>
                    Vid frågor om dessa villkor kan du kontakta utvecklaren via
                    projektets GitHub-sida.
                </p>
            </section>
        </div>
    </div>
);

export default Terms;