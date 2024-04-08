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
    console.log(apiResponse)

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


export const processAreaChartDataMultiple = (apiResponse) => {
    const { xValues, series, seriesLabels } = apiResponse.data;
    //console.log(apiResponse)
    // Define a palette of colors for the chart series
    // maybe differentiate colors, so it's easier to see what's what
    const colorPalette = [
        `${DataVizPalette.color1}`,
        `${DataVizPalette.color2}`,
        `${DataVizPalette.color3}`,
        `${DataVizPalette.color4}`,
        `${DataVizPalette.color5}`,
        `${DataVizPalette.color6}`,
        `${DataVizPalette.color7}`,
        `${DataVizPalette.color8}`,
        `${DataVizPalette.color9}`,
        // Add more colors as necessary
    ];



    // Array to hold the chart data for each series
    const chartPoints = series.slice(0,9).map((currentSeries, seriesIndex) => {

        const seriesLabel = seriesLabels[seriesIndex][1]; // Assuming the label is at index 1



        // Generate chart points for the current series
        const points = currentSeries.map((value, index) => ({
            x: new Date(xValues[index]), // making new date for xValues
            y: value,
            xAxisCalloutAccessibilityData: { ariaLabel: `Date: ${xValues[index]}` },
            callOutAccessibilityData: { ariaLabel: `${seriesLabel}: Value ${value} on ${xValues[index]}` },
        }));


        console.log(`points`,points);
        // Dynamically assign a color from the colorPalette based on seriesIndex
        const colorFromPallete = colorPalette[seriesIndex % colorPalette.length];

        return {
            legend: seriesLabel,
            data: points,
            color: colorFromPallete, // Use dynamically assigned color
        };
    });

    // Assemble the final chart data structure
    const chartData = {
        chartTitle: 'Area Chart with Multiple Series',
        lineChartData: chartPoints,
    };

    return chartData;
};

export const processRetentionChartData = (apiResponse) => {
    if (!apiResponse || !apiResponse.data || !apiResponse.data.series || apiResponse.data.series.length === 0) {
        console.error('Invalid or incomplete API response', apiResponse);
        return null; // Or return a default structure that your chart expects
    }

    const { combined, datetimes } = apiResponse.data.series[0];
    const reversedDatetimes = datetimes.reverse();

    // Define a palette of colors for the chart series
    const colorPalette = [
        `${DataVizPalette.color1}`,
        `${DataVizPalette.color2}`,
        `${DataVizPalette.color3}`,
        `${DataVizPalette.color4}`,
        `${DataVizPalette.color5}`,
        `${DataVizPalette.color6}`,
        `${DataVizPalette.color7}`,
        `${DataVizPalette.color8}`,
        `${DataVizPalette.color9}`,
    ];

    // Initialize an empty array to hold the chart data for each series
    const chartData = [];

    // Since we're dealing with a single series for retention, we only need to process one series
    const seriesLabel = "Retention Rate"; // Manually define the series label

    console.log(combined)
    console.log(reversedDatetimes)


    // Generate chart points for the retention series
    const points = combined.map((dataPoint, index) => {
        const { count, outof } = dataPoint;

        let retentionRate;

        if (outof !== 0) {
            retentionRate = Math.round((count / outof) * 100);
        } else {
            retentionRate = 0;
        }

        return {
            x: new Date(reversedDatetimes[index]),
            y: retentionRate,
            xAxisCalloutAccessibilityData: { ariaLabel: `Date: ${reversedDatetimes[index]}` },
            callOutAccessibilityData: { ariaLabel: `Retention Rate: ${retentionRate.toFixed(2)}% on ${reversedDatetimes[index]}` },
        };
    });

    // Use the first color from the palette for the retention series
    const colorFromPalette = colorPalette[0];

    // Push the series data to the chartData array
    chartData.push({
        legend: seriesLabel,
        data: points,
        color: colorFromPalette,
    });

    // Assemble the final chart data structure
    const finalChartData = {
        chartTitle: 'Retention Rate Over Time',
        lineChartData: chartData,
    };

    return finalChartData;
};


/*
//TODO: allow retentioncharts to work, might need to swap to linechart
export const processRetentionChartData = (apiResponse) => {
    // Initial check for the API response's validity
    if (!apiResponse || !apiResponse.data || !apiResponse.data.series || !apiResponse.data.series[0] || !apiResponse.data.dates) {
        //console.error('Invalid API response structure:', apiResponse);
        return {}; // Return an empty object or any other suitable default
    }

    // The provided API response structure indicates 'dates' are directly under 'data'
    const { dates } = apiResponse.data.series[0];

    // Initialize an array to hold the chart points
    let chartPoints = [];

    // Iterate through each date in the 'dates' array
    dates.forEach((date, dateIndex) => {
        let totalForDate = 0;

        // Iterate through each series to accumulate counts for the given date
        apiResponse.data.series.forEach(segment => {
            if (segment.values[date]) {
                // Sum counts for this date across all entries in the segment for the current date
                totalForDate += segment.values[date].reduce((total, currentValue) => total + currentValue.count, 0);
            }
        });

        // Assuming date needs no further formatting for now
        const formattedDate = date; // Adjust date formatting as necessary

        // Create a chart point for this date
        chartPoints.push({
            x: formattedDate,
            y: totalForDate,
            xAxisCalloutAccessibilityData: { ariaLabel: `Date: ${date}` },
            callOutAccessibilityData: { ariaLabel: `Total interactions: ${totalForDate} on ${date}` },
        });
    });

    // Structured return for chart data
    return {
        chartTitle: 'User Retention Over Time',
        lineChartData: [{
            legend: 'Total Interactions',
            data: chartPoints,
            color: 'DataVizPalette.color8', // Replace with actual color code or variable
        }],
    };
};


 */






export const processDataForChartWithSeriesLabels = (response) => {
    // Processing logic here
};

// Example mapping or logic to select the processing function
const dataProcessingFunctionMap = {
    'areaChart': processAreaChartData,
    'areaChartMulti': processAreaChartDataMultiple,
    'areaChartGraph' : processAreaChartDataGraph,
    'seriesLabels': processDataForChartWithSeriesLabels,
    'retentionChart':processRetentionChartData,
};


// kanskje endre navn for bedre refleksjon av datahåndtering på charttype
export function selectDataProcessingFunction(chartType) {
    return dataProcessingFunctionMap[chartType] || processAreaChartData;
}
