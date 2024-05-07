import React from 'react';
import {
  VerticalBarChart,
  IVerticalBarChartDataPoint,
} from '@fluentui/react-charting';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

interface IVerticalBarChartProps {
  chartData: IVerticalBarChartDataPoint[]
  titles: {
    chartTitle?: string;
    xAxisTitle?: string;
    yAxisTitle?: string;
  }
  dimensions: {
    width: number;
    height: number;
  };
}

interface IVerticalBarChartState {
  useSingleColor: boolean;
}

export class VerticalBarChartCustomAccessibilityExample extends React.Component<
    IVerticalBarChartProps,
    IVerticalBarChartState
    > {
  constructor(props: IVerticalBarChartProps) {
    super(props);
    this.state = {
      useSingleColor: false,
    };
  }

  private _onChange = (
      ev: React.FormEvent<HTMLInputElement>,
      checked: boolean
  ) => {
    this.setState({ useSingleColor: checked });
  };

  public render(): JSX.Element {
    const { useSingleColor } = this.state;
    const { chartData, titles, dimensions } = this.props;

    const colorPalette = [
      '#4caf50',
      '#2196f3',
      '#ffeb3b',
      '#ff9800',
      '#9c27b0',
      '#e91e63',
      '#673ab7',
      '#3f51b5',
      '#00bcd4',
      '#009688',
      '#8bc34a',
      '#cddc39',
      '#ffc107',
      '#ff5722',
      '#795548',
      '#607d8b',
      '#f44336',
      '#3e2723',
      '#00e676',
      '#6200ea',
    ];

    const colors = chartData.map(
        (_, index) => colorPalette[index % colorPalette.length]
    );

    const rootStyle = {
      width: `${dimensions.width}px`,
      height: `${dimensions.height}px`,
      padding: '0 20px', // Adjust as needed
    };

    return (
        <div className="mb-12">
          <h2 className="text-center font-bold">{titles.chartTitle}</h2>
          <div style={rootStyle}>
          <Checkbox
              label="Bruk én farge"
              checked={useSingleColor}
              onChange={this._onChange}
          />
            <VerticalBarChart
                data={chartData}
                width={dimensions.width}
                height={dimensions.height}
                barWidth={15}
                colors={useSingleColor ? chartData.map(() => DefaultPalette.green) : colors}
                yAxisTickCount={6}
                hideLegend={true}
                enableReflow={true}
                xAxisOuterPadding={0.1}
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