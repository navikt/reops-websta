import { AreaChart } from '@fluentui/react-charting';
import * as d3 from 'd3-format';

// Refactored to accept chartData and dimensions as props
// Should also contain x and y-axis title
// the interface breaks one chart right now
interface AreaChartCustomAccessibilityProps {
    chartData: {
        chartTitle: string;
        lineChartData: {
            legend: string;
            data: { x: Date; y: number; xAxisCalloutAccessibilityData: { ariaLabel: string }; callOutAccessibilityData: { ariaLabel: string } }[];
            color: string;
        }[];
    };
    dimensions: {
        width: number;
        height: number;
    };
}

const AreaChartCustomAccessibility: React.FC<AreaChartCustomAccessibilityProps>  = ({ chartData, dimensions }) => {
    const rootStyle = { width: `${dimensions.width}px`, height: `${dimensions.height}px` };

    return (
        <div style={rootStyle}>
            <AreaChart
                height={dimensions.height}
                width={dimensions.width}
                data={chartData}
                legendsOverflowText={'Overflow Items'}
                yAxisTickFormat={d3.format('')}
                enablePerfOptimization={true}
                enabledLegendsWrapLines={true}
                legendProps={{ allowFocusOnLegends: true,}}
                xAxisTitle="Dato" // Title for the X-axis
                yAxisTitle="Antall besøk" // Title for the Y-axis
            />
        </div>
    );

};

export default AreaChartCustomAccessibility;
