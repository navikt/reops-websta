import {useEffect, useState} from "react";
import {constructEndpointUrl} from "../fetchUrlConstructor.ts";
import TableChart from "./TableChart.tsx";
import {fetchAmplitudeData} from "../../../service/AmplitudeApi.tsx";


const DisplayTableChart = ({ endpointType, urlParams }) => {
    const [chartData, setChartData] = useState(null); // Start with null to easily check if data is loaded


    useEffect( () => {
        try {
            const fetchURL = constructEndpointUrl(endpointType, urlParams);
            const response = fetchAmplitudeData(fetchURL);
            setChartData(response);

        } catch (error) {
            console.error("Failed to fetch and process data:", error);
        }
    })

    return chartData ? <TableChart chartData={chartData} /> : <div>Loading...</div>

}

export default DisplayTableChart;