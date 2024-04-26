import {useEffect, useState} from "react";
import {constructEndpointUrl} from "../fetchUrlConstructor.ts";
import {fetchAmplitudeData} from "../../../service/AmplitudeApi.tsx";
import {selectDataProcessingFunction} from "./TableChartService"
import TableBox from "./TableBox";
import {constructEndpointUrl2} from "../dynamicUrlConstructor/constructEndpointUrl2.ts";

interface TableChartContainerProps {
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
}

const TableChartContainer: React.FC<TableChartContainerProps> = (
    { teamDomain, chartType, endpointType, urlParams }
) => {
    const [chartData, setChartData] = useState(null); // Start with null to easily check if data is loaded

    useEffect(() => {
        console.log('Fetching data for TableChart...');
        const fetchData = async () => {
            try {
                //const fetchURL = constructEndpointUrl(endpointType, urlParams);
                const fetchURL = constructEndpointUrl2(endpointType, urlParams);
                console.log("fetchURL", fetchURL);
                const response = await fetchAmplitudeData(fetchURL, teamDomain);
                console.log("response", response);
                const processData = selectDataProcessingFunction(chartType);
                console.log("processData", processData)
                const processedChartData = processData(response);
                console.log("processedChartData", processedChartData)

                // Ensure that processedChartData is an array; otherwise set as null
                setChartData(Array.isArray(processedChartData) ? processedChartData : null);
            } catch (error) {
                console.error("Failed to fetch and process data:", error);
                setChartData(null); // Set to null on error
            }
        };


        fetchData();
        //Charttype trengs kanskje ikke, kan hende [] deps holder
    }, [chartType, teamDomain, urlParams.startDate, urlParams.endDate, urlParams.filters]); // Re-fetch and process data if chartType changes

    console.log("TableChartData", chartData)
    return chartData ? <TableBox   data={chartData}/> : <div>Loading...</div>;
};

export default TableChartContainer;
