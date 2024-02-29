import { AreaChart, DataVizPalette } from '@fluentui/react-charting';
import * as d3 from 'd3-format';

// Refactored to accept chartData and dimensions as props
const AreaChartCustomAccessibility = ({ chartData, dimensions }) => {
    const rootStyle = { width: `${dimensions.width}px`, height: `${dimensions.height}px` };

    return (
        <div style={rootStyle}>
            <AreaChart
                height={dimensions.height}
                width={dimensions.width}
                data={chartData}
                legendsOverflowText="Overflow Items"
                yAxisTickFormat={d3.format('')}
                enablePerfOptimization={true}
                legendProps={{ allowFocusOnLegends: true }}
                enableReflow={true}
                xAxisTitle="Dato" // Title for the X-axis
                yAxisTitle="Antall besøk" // Title for the Y-axis
            />
        </div>
    );
};

export default AreaChartCustomAccessibility;
