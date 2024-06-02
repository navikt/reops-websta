import React, { useEffect, useState } from "react";
import { fetchAmplitudeData } from "../../../service/AmplitudeApi.tsx";
import { selectDataProcessingFunction } from "./TableChartService";
import TableBox from "./TableBox";
import { constructEndpointUrl2 } from "../dynamicUrlConstructor/constructEndpointUrl2.ts";

const TableChartContainer = ({ teamDomain, chartType, endpointType, urlParams, title }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    console.log('Fetching data for TableChart...');
    const fetchData = async () => {
      try {
        const fetchURL = constructEndpointUrl2(endpointType, urlParams);
        const response = await fetchAmplitudeData(fetchURL, teamDomain);
        const processData = selectDataProcessingFunction(chartType);
        const processedChartData = processData(response);

        setChartData(Array.isArray(processedChartData) ? processedChartData : null);
      } catch (error) {
        console.error("Error during fetch:", error);
        setError(error); // Set error state
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchData();
  }, [chartType, teamDomain, urlParams]);

  if (isLoading) {
    return <div>Henter tabell...</div>; // Render loading state
  }

  if (error) {
    console.error("Failed to fetch and process data:", error);
    return <div>Error: Failed to fetch data.</div>; // Render error message
  }

  return chartData ? <TableBox data={chartData} title={title} /> : <div>No data available.</div>;
};

export default TableChartContainer;
