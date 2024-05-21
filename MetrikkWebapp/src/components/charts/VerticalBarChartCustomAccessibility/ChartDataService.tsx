import VerticalBarChartContainer from "./VerticalBarChartContainer";
import {eventTypeMappings} from "../fetchUrlConstructor";

export const processVerticalBarChartData = (apiResponse) => {
    if (!apiResponse || !apiResponse.data || !Array.isArray(apiResponse.data.seriesLabels) || !Array.isArray(apiResponse.data.seriesCollapsed)) {
        console.error("Invalid or incomplete data from API", apiResponse);
        return [];
    }

    const { seriesCollapsed, seriesLabels } = apiResponse.data;

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const chartDataPoints = daysOfWeek.map(day => {
        const labelIndex = seriesLabels.findIndex(label => label[1] === day);
        const yValue = labelIndex !== -1 && seriesCollapsed[labelIndex] && seriesCollapsed[labelIndex][0] ? seriesCollapsed[labelIndex][0].value || 0 : 0;

        return {
            x: day,
            y: yValue,
            xAxisCalloutAccessibilityData: { ariaLabel: `Day: ${day}` },
            callOutAccessibilityData: { ariaLabel: `Value: ${yValue} on ${day}` },
        };
    });

    return chartDataPoints;
};


export const processVerticalBarChartDataHours = (apiResponse) => {
    if (!apiResponse || !apiResponse.data || !Array.isArray(apiResponse.data.seriesLabels) || !Array.isArray(apiResponse.data.seriesCollapsed)) {
        console.error("Invalid or incomplete data from API", apiResponse);
        return [];
    }

    const { seriesCollapsed, seriesLabels } = apiResponse.data;

    const chartDataPoints = seriesLabels.map((label, index) => {
        const hour = label[1] ? parseInt(label[1], 10) : null;  // Convert the hour to an integer
        const value = seriesCollapsed[index] && seriesCollapsed[index][0] ? seriesCollapsed[index][0].value || 0 : 0;

        return { hour, value };
    });

    const validChartDataPoints = chartDataPoints.filter(dataPoint => dataPoint.hour !== null);

    validChartDataPoints.sort((a, b) => a.hour - b.hour);

    const splitIndex = validChartDataPoints.findIndex(dataPoint => dataPoint.hour >= 6);

    const rearrangedChartDataPoints = [
        ...validChartDataPoints.slice(splitIndex),
        ...validChartDataPoints.slice(0, splitIndex)
    ];

    const sortedChartDataPoints = rearrangedChartDataPoints.map(dataPoint => {
        return {
            x: dataPoint.hour.toString(),  // Convert the hour back to a string
            y: dataPoint.value,
            xAxisCalloutAccessibilityData: { ariaLabel: `Hour: ${dataPoint.hour}` },
            callOutAccessibilityData: { ariaLabel: `Value: ${dataPoint.value} at hour ${dataPoint.hour}` },
        };
    });

    return sortedChartDataPoints.slice(0, 24);  // Ensure we only take a maximum of 24 points
};


const dataProcessingFunctionMap = {
    "verticalBarChart": processVerticalBarChartData,
    "verticalBarChartHours": processVerticalBarChartDataHours,
};

export function selectDataProcessingFunction(chartType: string | number) {
    return dataProcessingFunctionMap[chartType] || processVerticalBarChartData || processVerticalBarChartDataHours;
}
