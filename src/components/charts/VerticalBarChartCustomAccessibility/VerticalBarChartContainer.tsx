import { useEffect, useState } from 'react';
import { fetchAmplitudeData } from '../../../service/AmplitudeApi';
import { constructEndpointUrl } from '../fetchUrlConstructor';

import { selectDataProcessingFunction } from './ChartDataService';
import VerticalBarChartCustomAccessibilityExample from './VerticalBarChartCustomAccessibility';
import { constructEndpointUrl2 } from '../dynamicUrlConstructor/constructEndpointUrl2.ts';

interface VerticalChartContainerProps {
  chartType: string;
  endpointType: string;
  teamDomain: string;
  urlParams: {
    startDate: string;
    endDate: string;
    eventType?: string;
    secondEventType?: string; // Optional since it's not always used
    groupBy?: any[];
    filters?: any[];
    // Add more properties as needed
  };
  dimensions: {
    width: number;
    height: number;
  };
  titles: {
    chartTitle?: string;
    xAxisTitle?: string;
    yAxisTitle?: string;
  };
}

const VerticalBarChartContainer: React.FC<VerticalChartContainerProps> = ({
                                                                            teamDomain,
                                                                            chartType,
                                                                            endpointType,
                                                                            urlParams,
                                                                            dimensions,
                                                                            titles,
                                                                          }) => {
  const [chartData, setChartData] = useState();
  const [error, setError] = useState(null); // Add an error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchURL = constructEndpointUrl2(endpointType, urlParams);
        const response = await fetchAmplitudeData(fetchURL, teamDomain);
        const processData = selectDataProcessingFunction(chartType);
        const processedChartData = processData(response);
        setChartData(processedChartData);
      } catch (error) {
        console.error('Failed to fetch and process data:', error);
        setError(error); // Set the error state when an error occurs
      }
    };

    fetchData();
  }, [
    chartType,
    teamDomain,
    urlParams.startDate,
    urlParams.endDate,
    urlParams.filters,
  ]);

  // Modify the return statement to display the error message when an error occurs
  if (error) {
    return <div>Klarte ikke å hente graf fra Amplitude</div>;
  } else {
    return chartData ? (
        <VerticalBarChartCustomAccessibilityExample
            chartData={chartData}
            dimensions={dimensions}
            titles={titles}
        />
    ) : (
        <div>Henter graf...</div>
    );
  }
};

export default VerticalBarChartContainer;
