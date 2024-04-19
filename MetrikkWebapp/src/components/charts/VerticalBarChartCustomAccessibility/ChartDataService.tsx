

export const processVerticalBarChartData = (apiResponse) => {
    if (!apiResponse || !apiResponse.data) {
        console.error("Invalid API response");
        return []; // Return empty array for type consistency
    }

    const { seriesCollapsed, seriesLabels } = apiResponse.data;

    // Create an array of data points and then slice to get only the top 9
    const chartDataPoints = seriesLabels.map((label, index) => ({
        x: label[1], // Use the label as x
        y: seriesCollapsed[index][0].value, // Use the value as y
        xAxisCalloutAccessibilityData: { ariaLabel: `Label: ${label[1]}` },
        callOutAccessibilityData: { ariaLabel: `Value: ${seriesCollapsed[index][0].value} in ${label[1]}` },
    }));
};

const dataProcessingFunctionMap = {
    'verticalBarChart': processVerticalBarChartData,
};

export function selectDataProcessingFunction(chartType: string | number) {
    return dataProcessingFunctionMap[chartType] || processVerticalBarChartData;
}

