import React from 'react';
import { VerticalBarChart, IVerticalBarChartDataPoint } from '@fluentui/react-charting';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { DefaultPalette } from '@fluentui/react/lib/Styling';

interface IVerticalBarChartProps {
    chartData: IVerticalBarChartDataPoint[];
}

interface IVerticalBarChartState {
    useSingleColor: boolean;
}

export class VerticalBarChartCustomAccessibilityExample extends React.Component<IVerticalBarChartProps, IVerticalBarChartState> {
    constructor(props: IVerticalBarChartProps) {
        super(props);
        this.state = {
            useSingleColor: false,
        };
    }

    private _onChange = (ev: React.FormEvent<HTMLInputElement>, checked: boolean) => {
        this.setState({ useSingleColor: checked });
    };

    public render(): JSX.Element {
        const { useSingleColor } = this.state;
        const { chartData } = this.props;

        const colorPalette = [
            '#4caf50', '#2196f3', '#ffeb3b', '#ff9800', '#9c27b0',
            '#e91e63', '#673ab7', '#3f51b5', '#00bcd4', '#009688',
            '#8bc34a', '#cddc39', '#ffc107', '#ff5722', '#795548',
            '#607d8b', '#f44336', '#3e2723', '#00e676', '#6200ea',
        ];

        const colors = chartData.map((_, index) => colorPalette[index % colorPalette.length]);

        return (
            <div style={{ width: '800px', height: '400px' }}>
                <Checkbox
                    label="Use single color"
                    checked={useSingleColor}
                    onChange={this._onChange}
                />
                <VerticalBarChart
                    chartTitle="Vertical Bar Chart"
                    data={chartData}
                    width={800}
                    height={400}
                    barWidth={20}
                    colors={useSingleColor ? chartData.map(() => DefaultPalette.green) : colors}
                    yAxisTickCount={6}
                    hideLegend={true}
                    enableReflow={true}
                />
            </div>
        );
    }
}

export default VerticalBarChartCustomAccessibilityExample;
