import {useEffect, useState} from 'react';
import "@navikt/ds-css";
import AreaChartCustomAccessibility
    from "../components/charts/AreaChartCustomAccessibility/AreaChartCustomAccessibility";
import HorizontalBarChartCustomAccessibility
    from "../components/charts/HorizontalBarChart/HorizontalBarChartCustomAccessibility";
import {
    VerticalBarChartCustomAccessibilityExample
} from "../components/charts/VerticalBarChartCustomAccessibility/VerticalBarChartCustomAccessibility";
import {fetchAmplitudeData} from "../service/AmplitudeApi";
import AreaChartContainer from "../components/charts/AreaChartCustomAccessibility/AreaChartContainer";


export default function Home(){

    return (
        <div>

            <h1 className="text-2xl font-bold mb-4 text-center">This is the homepage</h1>
            {/*TODO: Charts er lenger til høyre når de er centered fordi centrering starter på y-axis */}
            <div className="flex flex-row justify-between items-center flex-wrap">
                <div className="">
                    <AreaChartContainer />
                </div>
                <div className="">
                    <AreaChartContainer />
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

