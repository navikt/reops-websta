import { useEffect, useState } from 'react';
import { fetchAmplitudeData } from "../../../service/AmplitudeApi";
import { constructEndpointUrl } from "../fetchUrlConstructor";

import {selectDataProcessingFunction} from "./ChartDataService";
import VerticalBarChartCustomAccessibilityExample from './VerticalBarChartCustomAccessibility';

interface VerticalChartContainerProps {
    chartType: string;
    endpointType: string;
    teamDomain:string
    urlParams: {
        startDate: string;
        endDate: string;
        eventType?: string;
        secondEventType?: string; // Optional since it's not always used
        // Add more properties as needed
    };
}
const VerticalBarChartContainer: React.FC<VerticalChartContainerProps> = ({ teamDomain, chartType, endpointType, urlParams }) => {
    const [chartData, setChartData] = useState();

    console.log("chartdata", chartData);
    console.log("params", chartType, endpointType, urlParams, teamDomain);

    useEffect(() => {
        console.log("fkrelfe")
        const fetchData = async () => {
            console.log("before try")
            try {
                console.log("in try")
                const fetchURL = constructEndpointUrl(endpointType, urlParams);
                console.log("url", fetchURL)
                const response = await fetchAmplitudeData(fetchURL, teamDomain);
                console.log("resp", response)
                const processedChartData = selectDataProcessingFunction(response);
                console.log("pcd", processedChartData)
                setChartData(processedChartData);
            } catch (error) {
                console.log("in error")
                console.error("Failed to fetch and process data:", error);
            }
        };

        fetchData();
    }, [chartType, teamDomain, urlParams.startDate, urlParams.endDate]);

    return chartData ? <VerticalBarChartCustomAccessibilityExample chartData={chartData} />: <div>Loading...</div>;
};

export default VerticalBarChartContainer;
