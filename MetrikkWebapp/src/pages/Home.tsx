import { useState } from 'react';
import "@navikt/ds-css";
import AreaChartCustomAccessibility
    from "../components/charts/AreaChartCustomAccessibility/AreaChartCustomAccessibility";
import HorizontalBarChartCustomAccessibility
    from "../components/charts/HorizontalBarChart/HorizontalBarChartCustomAccessibility";
import {
    VerticalBarChartCustomAccessibilityExample
} from "../components/charts/VerticalBarChartCustomAccessibility/VerticalBarChartCustomAccessibility";

export default function Home() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-center">This is the homepage</h1>
            {/*TODO: Charts er lenger til høyre når de er centered fordi centrering starter på y-axis */}
            <div className="flex flex-row justify-between items-center flex-wrap">
                <div className="">
                    <AreaChartCustomAccessibility />
                </div>
                <div className="">
                    <AreaChartCustomAccessibility />
                </div>
                <div className="">
                    <HorizontalBarChartCustomAccessibility />
                </div>
                <div className="">
                    <VerticalBarChartCustomAccessibilityExample />
                </div>
            </div>
        </div>
    );
}

