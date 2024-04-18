import AreaChartCustomAccessibility from './AreaChartCustomAccessibility';
import { fetchAmplitudeData } from "../../../service/AmplitudeApi";
import { selectDataProcessingFunction } from "./chartDataService";
import {useEffect, useState} from "react";
import {constructEndpointUrl} from "../fetchUrlConstructor";

interface AreaChartContainerProps {
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
    //const dimensions = { width: 500, height: 350 };



    useEffect(() => {
        console.log('Fetching data...');
        const fetchData = async () => {
            try {
                const fetchURL = constructEndpointUrl(endpointType, urlParams);
                const response = await fetchAmplitudeData(fetchURL, teamDomain);
                // Dynamically select the processing function based on chartType
                const processData = selectDataProcessingFunction(chartType);
                const processedChartData = processData(response);
                setChartData(processedChartData);
            } catch (error) {
                console.error("Failed to fetch and process data:", error);
            }
        };

        fetchData();
        //Charttype trengs kanskje ikke, kan hende [] deps holder
    }, [chartType, teamDomain, urlParams.startDate, urlParams.endDate]); // Re-fetch and process data if chartType changes

    return chartData ? <AreaChartCustomAccessibility chartData={chartData} dimensions={dimensions} titles={titles} /> : <div>Loading...</div>;
};

export default AreaChartContainer;
