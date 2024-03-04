import { useState, useEffect } from 'react';
import { AreaChart, DataVizPalette } from '@fluentui/react-charting';
import * as d3 from 'd3-format';
import {fetchAmplitudeData} from "../../../service/AmplitudeApi";

const AreaChartCustomAccessibilityExample = () => {

    const [chartData, setChartData] = useState({
        chartTitle: 'Area chart Custom Accessibility example',
        lineChartData: [],
    });
    const [dimensions, setDimensions] = useState({ width: 700, height: 300 });
    const [data, setData] = useState(null);

    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            // Example response, replace this with your actual API call
            const response = await fetchAmplitudeData(`/3/chart/e-xwordsgk/query`);
            setData(response);

      const seriesData = response.data.series[0];
      const xValues = response.data.xValues;

            const chartPoints = seriesData.map((item, index) => ({
                x: new Date(xValues[index]),
                y: item.value,
                xAxisCalloutAccessibilityData: { ariaLabel: `Date: ${xValues[index]}` },
                callOutAccessibilityData: { ariaLabel: `Value: ${item.value} on ${xValues[index]}` },
            }));


      setChartData({
        ...chartData,
        lineChartData: [
          {
            legend: 'Metric Values',
            data: chartPoints,
            color: DataVizPalette.color8,
          },
        ],
      });
    };

    fetchData();
  }, []);

  const rootStyle = {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
  };

  return (
    <div style={rootStyle}>
      <AreaChart
        height={dimensions.height}
        width={dimensions.width}
        data={chartData}
        legendsOverflowText={'Overflow Items'}
        yAxisTickFormat={d3.format('')}
        enablePerfOptimization={true}
        legendProps={{
          allowFocusOnLegends: true,
        }}
        enableReflow={true}
        xAxisTitle="Dato" // Title for the X-axis
        yAxisTitle="Antall besøk" // Title for the Y-axis
      />
    </div>
  );
};

export default AreaChartCustomAccessibilityExample;
