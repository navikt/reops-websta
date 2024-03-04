import { useState } from 'react';
import "@navikt/ds-css";

// Simple Chart Placeholder Component
const ChartPlaceholder = () => {
    return (
        <div style={{
            width: '100%',
            height: '300px',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#333',
            margin: '10px',
            borderRadius: '8px'
        }}>
            Chart Placeholder
        </div>
    );
};

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
                <ChartPlaceholder />
                <ChartPlaceholder />
            </div>
        </div>
    );
}
