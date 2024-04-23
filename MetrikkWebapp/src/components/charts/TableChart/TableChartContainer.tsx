import {useEffect, useState} from "react";
import {constructEndpointUrl} from "../fetchUrlConstructor.ts";
import {fetchAmplitudeData} from "../../../service/AmplitudeApi.tsx";
import {selectDataProcessingFunction} from "../AreaChartCustomAccessibility/chartDataService.tsx";
import TableChart from "./TableChart.tsx";

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
}

const TableChartContainer: React.FC<AreaChartContainerProps> = (
    { teamDomain, chartType, endpointType, urlParams }
) => {
    const [chartData, setChartData] = useState(null); // Start with null to easily check if data is loaded

    useEffect(() => {
        console.log('Fetching data for TableChart...');
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
    }, [chartType, teamDomain]); // Re-fetch and process data if chartType changes

    return chartData ? <TableChart  /> : <div>Loading...</div>;
};

export default TableChartContainer;
