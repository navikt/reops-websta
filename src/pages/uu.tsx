import {Heading} from "@navikt/ds-react";

function Accessibility() {
    return (
        <div className="App">
            <main>
                <div style={{maxWidth: "600px", marginLeft: "auto", marginRight: "auto"}}>
                    <Heading style={{color: "rgba(0, 80, 119, 1)"}} spacing level="1" size="large">Tilgjengelighetserklæring</Heading>
                    <div className="mb-12 mt-5 max-w-2xl font-serif">
                        <p className="mb-4 leading-normal">Innblikk skal være tilgjengelig for alle. Det betyr at vi har som mål å følge lovpålagte krav til universell utforming. Vår ambisjon er i tillegg at du skal ha en god brukeropplevelse enten du bruker hjelpeteknologi (for eksempel skjermleser) eller ikke.</p>

                        <p className="mb-4 leading-normal">Alle virksomheter i offentlig sektor skal ha en tilgjengelighetserklæring. WCAG 2.1 på nivå AA er lovpålagt i Norge. Erklæringen beskriver hvert suksesskriterium i WCAG, og om nettstedet imøtekommer disse kravene.</p>

                        {/*<p className="mb-4 leading-normal"><a className="underline" href="https://uustatus.no/nb/erklaringer/publisert/d537c65c-f4bd-4f30-be2b-3a8808a42cf0">Tilgjengelighetserklæring for felgen.intern.nav.no (uustatus.no).</a></p>*/}

                        <h2 className="pb-4 pt-4 text-2xl">Feil, mangler og forbedringsforslag</h2>
                        <p className="leading-normal">Hvis du opplever problemer eller har forslag til forbedringer hører vi veldig gjerne fra deg! Feil og mangler kan rapporteres til <a className="underline" href="mailto:eilif.johansen@nav.no">eilif.johansen@nav.no</a>, eller <a className="underline" href="https://nav-it.slack.com/archives/C02UGFS2J4B">#researchops</a> på Slack.</p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Accessibility