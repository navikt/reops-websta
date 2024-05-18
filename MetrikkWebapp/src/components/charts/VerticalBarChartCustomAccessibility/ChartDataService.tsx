import VerticalBarChartContainer from "./VerticalBarChartContainer";
import {eventTypeMappings} from "../fetchUrlConstructor";

export const processVerticalBarChartData = (apiResponse) => {
    if (!apiResponse || !apiResponse.data || !Array.isArray(apiResponse.data.seriesLabels) || !Array.isArray(apiResponse.data.seriesCollapsed)) {
        console.error("Invalid or incomplete data from API", apiResponse);
        return [];
    }

    const { seriesCollapsed, seriesLabels } = apiResponse.data;


    const chartDataPoints = seriesLabels.map((label, index) => {
        const xValue = label[1] ? label[1].toString() : 'Unknown';  // Using the country name from seriesLabels
        const yValue = seriesCollapsed[index] && seriesCollapsed[index][0] ? seriesCollapsed[index][0].value || 0 : 0;

        return {
            x: xValue,
            y: yValue,
            xAxisCalloutAccessibilityData: { ariaLabel: `Country: ${xValue}` },
            callOutAccessibilityData: { ariaLabel: `Value: ${yValue} in ${xValue}` },
        };
    });

    return chartDataPoints.slice(0,12);  // max 12
};

export const processVerticalBarChartDates = (apiResponse) => {
    if (!apiResponse || !apiResponse.data || !Array.isArray(apiResponse.data.series) || !apiResponse.data.xValues) {
        console.error("Invalid or incomplete data from API", apiResponse);
        return [];
    }

    const { series, xValues } = apiResponse.data;

    const chartDataPoints = series[0].map((value, index) => {
        const xValue = xValues[index];
        const yValue = value;

        return {
            x: xValue,  // Now using dates as labels
            y: yValue,
            xAxisCalloutAccessibilityData: { ariaLabel: `Date: ${xValue}` },
            callOutAccessibilityData: { ariaLabel: `Value: ${yValue} on ${xValue}` },
        };
    });

    return chartDataPoints.slice(0,9);
};

const dataProcessingFunctionMap = {
    "verticalBarChart": processVerticalBarChartData,
    "verticalBarChartDates": processVerticalBarChartDates,
};

export function selectDataProcessingFunction(chartType: string | number) {
    return dataProcessingFunctionMap[chartType] || processVerticalBarChartData;
}

