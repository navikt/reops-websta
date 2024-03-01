import { useState, useEffect } from 'react';
import { AreaChart, DataVizPalette } from '@fluentui/react-charting';
import * as d3 from 'd3-format';

const AreaChartCustomAccessibilityExample = () => {
  const [chartData, setChartData] = useState({
    chartTitle: 'Area chart Custom Accessibility example',
    lineChartData: [],
  });
  const [dimensions, setDimensions] = useState({ width: 650, height: 300 });

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      // Example response, replace this with your actual API call
      const response = {
        data: {
          series: [
            [
              1, 4, 0, 1, 4, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 4,
              1, 3, 0, 1, 1, 1, 1, 1,
            ],
          ],
          xValues: [
            '2024-01-01',
            '2024-01-02',
            '2024-01-03',
            '2024-01-04',
            '2024-01-05',
            '2024-01-06',
            '2024-01-07',
            '2024-01-08',
            '2024-01-09',
            '2024-01-10',
            '2024-01-11',
            '2024-01-12',
            '2024-01-13',
            '2024-01-14',
            '2024-01-15',
            '2024-01-16',
            '2024-01-17',
            '2024-01-18',
            '2024-01-19',
            '2024-01-20',
            '2024-01-21',
            '2024-01-22',
            '2024-01-23',
            '2024-01-24',
            '2024-01-25',
            '2024-01-26',
            '2024-01-27',
            '2024-01-28',
            '2024-01-29',
            '2024-01-30',
          ],
        },
      };

      const seriesData = response.data.series[0];
      const xValues = response.data.xValues;

      const chartPoints = seriesData.map((value, index) => ({
        x: new Date(xValues[index]),
        y: value,
        xAxisCalloutAccessibilityData: { ariaLabel: `Date: ${xValues[index]}` },
        callOutAccessibilityData: {
          ariaLabel: `Value: ${value} on ${xValues[index]}`,
        },
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
