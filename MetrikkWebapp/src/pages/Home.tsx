import { useState } from 'react';
import "@navikt/ds-css";
import AreaChartCustomAccessibility
    from "../components/charts/AreaChartCustomAccessibility/AreaChartCustomAccessibility";


export default function Home() {
    return(
        <div>
            <h1>This is the homepage</h1>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap' // This ensures responsiveness
            }}>
                <AreaChartCustomAccessibility/>
            </div>
        </div>
    );
}
