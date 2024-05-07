import React, { useEffect, useState } from 'react';
import { fetchAmplitudeData } from '../../../service/AmplitudeApi.tsx';
import { selectDataProcessingFunction } from './TableChartService';
import TableBox from './TableBox';
import { constructEndpointUrl2 } from '../dynamicUrlConstructor/constructEndpointUrl2.ts';

const TableChartContainer = ({
  teamDomain,
  chartType,
  endpointType,
  urlParams,
  title,
}) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    console.log('Fetching data for TableChart...');
    const fetchData = async () => {
      try {
        const fetchURL = constructEndpointUrl2(endpointType, urlParams);
        const response = await fetchAmplitudeData(fetchURL, teamDomain);
        const processData = selectDataProcessingFunction(chartType);
        const processedChartData = processData(response);

        setChartData(
          Array.isArray(processedChartData) ? processedChartData : null
        );
      } catch (error) {
        console.error('Failed to fetch and process data:', error);
        setChartData(null);
      }
    };

    fetchData();
  }, [chartType, teamDomain, urlParams]);

  return chartData ? (
    <TableBox data={chartData} title={title} />
  ) : (
    <div>Loading...</div>
  );
};

export default TableChartContainer;
