// Add a function to process the API response into the structure expected by the chart
import {DataVizPalette} from "@fluentui/react-charting";

export const processAreaChartDataGraph = (apiResponse)=> {
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

export const processAreaChartData = (apiResponse) => {
    const { xValues, series } = apiResponse.data;
    const seriesData = series[0]; // Assuming the first series is what we're interested in

    // Map through the series data to construct chart points
    const chartPoints = seriesData.map((yValue, index) => ({
        x: new Date(xValues[index]), // Convert string date to Date object
        y: yValue, // Directly use the number as the y-value
        xAxisCalloutAccessibilityData: { ariaLabel: `Date: ${xValues[index]}` },
        callOutAccessibilityData: { ariaLabel: `Value: ${yValue} on ${xValues[index]}` },
    }));

    return {
        chartTitle: 'Area Chart Without Value Property',
        lineChartData: [{
            legend: 'Metric Values',
            data: chartPoints,
            color: DataVizPalette.color8, // Adjust color as necessary
        }],
    };
};


export const processDataForChartWithSeriesLabels = (response) => {
    // Processing logic here
};

// Example mapping or logic to select the processing function
const dataProcessingFunctionMap = {
    'areaChart': processAreaChartData,
    'areaChartGraph' : processAreaChartDataGraph,
    'seriesLabels': processDataForChartWithSeriesLabels,
};

export function selectDataProcessingFunction(chartType) {
    return dataProcessingFunctionMap[chartType] || processAreaChartData;
}
