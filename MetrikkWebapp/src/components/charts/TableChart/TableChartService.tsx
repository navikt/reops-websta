export const processSegmentationTableChart = (apiResponse) => {
  const { series, seriesLabels } = apiResponse.data;

  // Create an object to store the sum of visitors for each country
  const countryVisitorTotals = {};

  // Sum up all the visitors for each country
  series.forEach((currentSeries, index) => {
    const countryName = seriesLabels[index][1]; // country name is at the second position
    countryVisitorTotals[countryName] = countryVisitorTotals[countryName] || 0;
    countryVisitorTotals[countryName] += currentSeries.reduce(
      (sum, current) => sum + current,
      0
    );
  });

  // Convert the totals object to an array suitable for table display
  const tableData = Object.entries(countryVisitorTotals).map(
    ([value, totalVisitors]) => ({
      value,
      totalVisitors,
    })
  );

  return tableData.slice(0, 9);
};

const dataProcessingFunctionMap = {
  segmentationChartProcessing: processSegmentationTableChart,
};

// kanskje endre navn for bedre refleksjon av datahåndtering på charttype
// charttype er egentlig responsetype for ulik type dataset som segmentation, retention, og andre
export function selectDataProcessingFunction(chartType: string | number) {
  return dataProcessingFunctionMap[chartType] || processSegmentationTableChart;
}
