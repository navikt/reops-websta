// Add a function to process the API response into the structure expected by the chart
import {DataVizPalette} from "@fluentui/react-charting";

export const processAreaChartData = (apiResponse)=> {
    const seriesData = apiResponse.data.series[0];
    const xValues = apiResponse.data.xValues;

    const chartPoints = seriesData.map((item, index) => ({
        x: new Date(xValues[index]),
        y: item.value,
        xAxisCalloutAccessibilityData: { ariaLabel: `Date: ${xValues[index]}` },
        callOutAccessibilityData: { ariaLabel: `Value: ${item.value} on ${xValues[index]}` },
    }));

    return {
        chartTitle: 'Area chart Custom Accessibility example',
        lineChartData: [{
            legend: 'Metric Values',
            data: chartPoints,
            color: DataVizPalette.color8,
        }]
    };
}
