import AreaChartCustomAccessibility from './AreaChartCustomAccessibility';
import { fetchAmplitudeData } from "../../../service/AmplitudeApi";
import { DataVizPalette } from '@fluentui/react-charting';
import {useEffect, useState} from "react";
import {processAreaChartData} from "./chartDataService";

const AreaChartContainer = () => {
    const [chartData, setChartData] = useState({
        chartTitle: 'Area chart Custom Accessibility example',
        lineChartData: [],
    });
    const dimensions = { width: 500, height: 300 };

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetchAmplitudeData(`/3/chart/e-xwordsgk/query`);
                // Process response to match chartData structure expected by AreaChartCustomAccessibility
                const processedChartData = processAreaChartData(response);
                setChartData(processedChartData);
            }catch (e){
                console.error(e);
            }
        };

        fetchData();
    }, []);

    return <AreaChartCustomAccessibility chartData={chartData} dimensions={dimensions} />;
};


export default AreaChartContainer;
