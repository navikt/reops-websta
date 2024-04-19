import { useEffect, useState } from 'react';
import { fetchAmplitudeData } from "../../../service/AmplitudeApi";
import { constructEndpointUrl } from "../fetchUrlConstructor";
import {selectDataProcessingFunction} from "./ChartDataService";
import VerticalBarChartCustomAccessibilityExample from './VerticalBarChartCustomAccessibility';

const VerticalBarChartContainer = ({ chartType, endpointType, urlParams, teamDomain }) => {
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
            } finally {
            }
        };

        fetchData();
    }, [chartType, endpointType, urlParams, teamDomain]);

    return <VerticalBarChartCustomAccessibilityExample chartData={chartData} />;
};

export default VerticalBarChartContainer;
