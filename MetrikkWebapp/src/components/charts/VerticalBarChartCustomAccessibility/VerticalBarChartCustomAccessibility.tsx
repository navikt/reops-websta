import * as React from 'react';
import { VerticalBarChart, IVerticalBarChartDataPoint } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

interface IVerticalBarChartState {
    isChecked: boolean;
    useSingleColor: boolean;
}

// Full jsonData including all parts provided in your JSON
const jsonData = {
    data: {
        seriesCollapsed: [
            [{ setId: "Norway", value: 10 }],
            [{ setId: "Italy", value: 1 }],
            [{ setId: "United States", value: 2 }],
            [{ setId: "France", value: 2 }],
            [{ setId: "Israel", value: 1 }],
            [{ setId: "Germany", value: 1 }],
            [{ setId: "Finland", value: 1 }],
            [{ setId: "Denmark", value: 1 }],
            [{ setId: "Netherlands", value: 1 }],
        ],
        seriesLabels: [
            [0, "Norway"],
            [0, "Italy"],
            [0, "United States"],
            [0, "France"],
            [0, "Israel"],
            [0, "Germany"],
            [0, "Finland"],
            [0, "Denmark"],
            [0, "Netherlands"],
        ],
        xValues: [
            "2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05",
            "2024-01-06", "2024-01-07", "2024-01-08", "2024-01-09", "2024-01-10",
            "2024-01-11", "2024-01-12", "2024-01-13", "2024-01-14", "2024-01-15",
            "2024-01-16", "2024-01-17", "2024-01-18", "2024-01-19", "2024-01-20",
            "2024-01-21", "2024-01-22", "2024-01-23", "2024-01-24", "2024-01-25",
            "2024-01-26", "2024-01-27", "2024-01-28", "2024-01-29", "2024-01-30",
        ],
    },
};

export class VerticalBarChartCustomAccessibilityExample extends React.Component<{}, IVerticalBarChartState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isChecked: true,
            useSingleColor: true,
        };
    }

    public render(): JSX.Element {
        const { isChecked, useSingleColor } = this.state;

        const points: IVerticalBarChartDataPoint[] = jsonData.data.seriesLabels.map((label, index) => ({
            x: label[1], // Use country name as x
            y: jsonData.data.seriesCollapsed[index][0].value, // Use corresponding value as y
            ...(isChecked && { lineData: { y: jsonData.data.seriesCollapsed[index][0].value, yAxisCalloutData: 'Data' } }),
            callOutAccessibilityData: { ariaLabel: `Series ${index + 1} of ${jsonData.data.seriesLabels.length} ${label[1]} ${jsonData.data.seriesCollapsed[index][0].value}` },
        }));

        const customColors = [DefaultPalette.greenLight, DefaultPalette.green, DefaultPalette.greenDark];

        return (
            <>
                <Checkbox
                    label="Show line (This will draw the line)"
                    checked={isChecked}
                    onChange={this._onChange}
                />

                <div style={{ width: '800px', height: '400px' }}>
                    <VerticalBarChart
                        chartTitle="Vertical Bar Chart Example"
                        data={points}
                        width={800}
                        height={400}
                        barWidth={20}
                        useSingleColor={useSingleColor}
                        yAxisTickCount={6}
                        colors={customColors}
                        hideLegend={true}
                        enableReflow={true}
                    />
                </div>
            </>
        );
    }

    private _onChange = (ev: React.MouseEvent<HTMLElement>, checked: boolean) => {
        this.setState((prevState) => ({
            ...prevState,
            isChecked: checked,
        }));
    };



}
