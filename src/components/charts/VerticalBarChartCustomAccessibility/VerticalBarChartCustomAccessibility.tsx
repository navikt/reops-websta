import React from 'react';
import {
  VerticalBarChart,
  IVerticalBarChartDataPoint,
} from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

interface IVerticalBarChartProps {
  chartData: IVerticalBarChartDataPoint[];
  titles: {
    chartTitle?: string;
    xAxisTitle?: string;
    yAxisTitle?: string;
  };
  dimensions: {
    width: number;
    height: number;
  };
}

export class VerticalBarChartCustomAccessibilityExample extends React.Component<
    IVerticalBarChartProps
    > {
  public render(): JSX.Element {
    const { chartData, titles, dimensions } = this.props;

    const colorPalette = [
      '#ffeb3b',
      '#2196f3',
      '#4caf50',
      '#673ab7',
      '#ff9800',
      '#e91e63',
      '#3f51b5',
      '#cddc39',
      '#9c27b0',
      '#00bcd4',
      '#ff5722',
      '#ffc107',
      '#009688',
      '#8bc34a',
      '#795548',
      '#607d8b',
      '#f44336',
      '#3e2723',
      '#00e676',
      '#6200ea',
    ];

    const coloredChartData = chartData.map((dataPoint, index) => ({
      ...dataPoint,
      color: colorPalette[index % colorPalette.length],
    }));

    const rootStyle = {
      width: `${dimensions.width}px`,
      height: `${dimensions.height-50}px`,
      padding: '0 20px', // Adjust as needed
    };

    return (
        <div className="mb-12">
          <h2 className="text-center font-bold">{titles.chartTitle}</h2>
          <div style={rootStyle}>
            <VerticalBarChart
                data={coloredChartData}
                width={dimensions.width}
                height={dimensions.height}
                barWidth={15}
                yAxisTickCount={6}
                hideLegend={true}
                enableReflow={true}
                xAxisOuterPadding={0.2}
                xAxisPadding={0.1}
                xAxisTitle={titles.xAxisTitle} // Now correctly referenced
                yAxisTitle={titles.yAxisTitle} // Added y-axis title
                styles={{
                  root: { marginLeft: '-20px' }, // Pull the chart towards the left
                }}
            />
          </div>
        </div>
    );
  }
}

export default VerticalBarChartCustomAccessibilityExample;
