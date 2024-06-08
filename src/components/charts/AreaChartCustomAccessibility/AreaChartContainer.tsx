import AreaChartCustomAccessibility from './AreaChartCustomAccessibility';
import { fetchAmplitudeData } from "../../../service/AmplitudeApi";
import { selectDataProcessingFunction } from "./chartDataService";
import {useEffect, useState} from "react";
import {constructEndpointUrl2} from "../dynamicUrlConstructor/constructEndpointUrl2.ts";

interface AreaChartContainerProps {
    chartType: string;
    endpointType: string;
    teamDomain:string
    urlParams: {
        startDate: string;
        endDate: string;
        eventType?: string;
        groupBy?: any[];
        filters?: any[];
        secondEventType?: string; // Optional since it's not always used
        // Add more properties as needed
    };
    dimensions: {
        width: number;
        height: number;
    }
    titles:{
        chartTitle?:string;
        xAxisTitle?: string;
        yAxisTitle?: string;
    }
}


//TODO: Legge til slik at det er mulig å ha forkjellige endepunkt, slik at vi ikke trenger en ny komponent for hver.
const AreaChartContainer: React.FC<AreaChartContainerProps> = ({ teamDomain, chartType, endpointType, urlParams, dimensions, titles }) => {
    const [chartData, setChartData] = useState(null); // Start with null to easily check if data is loaded
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
                console.error("Failed to fetch and process data:", error);
                setError(error); // Set the error state when an error occurs
            }
        };

        fetchData();
    }, [chartType, teamDomain, urlParams.startDate, urlParams.endDate, urlParams.filters]);

    // Modify the return statement to display the error message when an error occurs
    if (error) {
        return <div>Klarte ikke å hente graf fra Amplitude</div>;
    } else {
        return chartData ? <AreaChartCustomAccessibility chartData={chartData} dimensions={dimensions} titles={titles} /> : <div>Henter graf...</div>;
    }
};

export default AreaChartContainer;
