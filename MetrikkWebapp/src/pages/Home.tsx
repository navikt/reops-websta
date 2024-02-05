import { useState } from 'react';
import "@navikt/ds-css";
import AreaChartCustomAccessibility
    from "../components/charts/AreaChartCustomAccessibility/AreaChartCustomAccessibility";

export default function Home() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">This is the homepage</h1>
            {/*TODO: Charts er lenger til høyre når de er centered fordi centrering starter på y-axis */}
            <div className="flex flex-row justify-between items-center flex-wrap">
                <div className="">
                    <AreaChartCustomAccessibility />
                </div>
                <div className="">
                    <AreaChartCustomAccessibility />
                </div>
            </div>
        </div>
    );
}

