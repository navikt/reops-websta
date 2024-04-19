import React, { useState } from 'react';
import { VerticalBarChart, IVerticalBarChartDataPoint } from '@fluentui/react-charting';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

interface IVerticalBarChartProps {
    chartData: IVerticalBarChartDataPoint[];
}

const VerticalBarChartCustomAccessibilityExample = ({ chartData }) => {
    // State hooks for checkbox and color usage
    const [isChecked, setIsChecked] = useState(true);
    const [useSingleColor, setUseSingleColor] = useState(true);

    // Handle change in checkbox
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setIsChecked(checked);
        setUseSingleColor(checked);
    };

    // Define custom colors based on the palette
    const customColors = [DefaultPalette.greenLight, DefaultPalette.green, DefaultPalette.greenDark];

    return (
        <div style={{ width: '800px', height: '400px' }}>
            <Checkbox
                label="Use single color"
                checked={isChecked}
                onChange={handleChange}
            />
            <VerticalBarChart
                chartTitle="Vertical Bar Chart Example"
                data={chartData}
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
    );
};

export default VerticalBarChartCustomAccessibilityExample;
