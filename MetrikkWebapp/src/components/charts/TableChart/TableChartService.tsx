import {
    processAreaChartData,
    processAreaChartDataGraph,
    processAreaChartDataMultiple, processRetentionChartData
} from "../AreaChartCustomAccessibility/chartDataService.tsx";

export const processSegmentationTableChart = (
    apiResponse: {
        data: { xValues: string[]; series: number[][]; seriesLabels: [number, string][] };
    }
) => {
    const { xValues, series, seriesLabels } = apiResponse.data;

    const tableData = series.map((currentSeries: number[], seriesIndex: number) => {
        const countryName = seriesLabels[seriesIndex][1]; // Get countryName directly
        const singleTableEntry = currentSeries.map((value, index) => ({
            date: new Date(xValues[index]), // Create new date for xValues
            countryName:countryName,
            visitorAmount: value
        }));

        return singleTableEntry;
    }).flat(); // Flatten the nested arrays to get a single array of table data

    console.log(tableData)
    return tableData;
};

const dataProcessingFunctionMap = {
    'segmentationChartProccesing': processSegmentationTableChart,
};


// kanskje endre navn for bedre refleksjon av datahåndtering på charttype
// charttype er egentlig responsetype for ulik type dataset som segmentation, retention, og andre
export function selectDataProcessingFunction(chartType: string | number) {
    return dataProcessingFunctionMap[chartType] || processSegmentationTableChart;
}
