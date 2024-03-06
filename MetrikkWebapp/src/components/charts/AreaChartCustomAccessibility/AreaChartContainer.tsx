import AreaChartCustomAccessibility from './AreaChartCustomAccessibility';
import { fetchAmplitudeData } from "../../../service/AmplitudeApi";
import { selectDataProcessingFunction } from "./chartDataService";
import {useEffect, useState} from "react";


//TODO: Legge til slik at det er mulig å ha forkjellige endepunkt, slik at vi ikke trenger en ny komponent for hver.
const AreaChartContainer = ({ chartType }) => {
    const [chartData, setChartData] = useState(null); // Start with null to easily check if data is loaded
    const dimensions = { width: 500, height: 300 };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventType = encodeURIComponent(`{"event_type":"[Amplitude] Page Viewed"}`);
                const startDate = "20240101";
                const endDate = "20240130";
                const response = await fetchAmplitudeData(`/2/events/segmentation?e=${eventType}&start=${startDate}&end=${endDate}`);
                // Dynamically select the processing function based on chartType
                const processData = selectDataProcessingFunction(chartType);
                const processedChartData = processData(response);
                setChartData(processedChartData);
            } catch (error) {
                console.error("Failed to fetch and process data:", error);
            }
        };

        fetchData();
    }, [chartType]); // Re-fetch and process data if chartType changes

    return chartData ? <AreaChartCustomAccessibility chartData={chartData} dimensions={dimensions} /> : <div>Loading...</div>;
};

export default AreaChartContainer;
