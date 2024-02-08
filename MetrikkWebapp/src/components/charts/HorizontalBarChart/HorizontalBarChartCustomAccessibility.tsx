import { useEffect, useState } from "react";
import { HorizontalBarChart, IChartProps, DataVizPalette, getColorFromToken } from '@fluentui/react-charting';
import AreaChartCustomAccessibilityExample from "../AreaChartCustomAccessibility/AreaChartCustomAccessibility";

const HorizontalBarChartCustomAccessibility: React.FunctionComponent<{}> = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const jsonResponse = {
            "chartData": {
                "series": [
                    [1, 4, 0, 1, 4, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 4, 1, 3, 0, 1, 1, 1, 1, 1]
                ],
                "seriesLabels": [
                    [0, "/jobbsoknad/"],
                    [2, "/about/"],
                    [1, "/work/"]
                ],
                "xValues": [
                    "2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05",
                    "2024-01-06", "2024-01-07", "2024-01-08", "2024-01-09", "2024-01-10",
                    "2024-01-11", "2024-01-12", "2024-01-13", "2024-01-14", "2024-01-15",
                    "2024-01-16", "2024-01-17", "2024-01-18", "2024-01-19", "2024-01-20",
                    "2024-01-21", "2024-01-22", "2024-01-23", "2024-01-24", "2024-01-25",
                    "2024-01-26", "2024-01-27", "2024-01-28", "2024-01-29", "2024-01-30"
                ]
            }
        };

        const transformedData = jsonResponse.chartData.seriesLabels.map(([xValueNum, legendString]) => {
            const yValue = 100; // Placeholder for demonstration

            return {
                chartData: [{
                    legend: legendString, // Correctly using the string value
                    data: xValueNum,
                    color: getColorFromToken(DataVizPalette.color10),
                    horizontalBarChartdata: {
                        x: xValueNum, // Correctly using the number value, ensuring it's treated as a number
                        y: yValue,
                    },
                    xAxisCalloutData: xValueNum.toString(), // Correctly calling .toString() to convert to string
                    yAxisCalloutData: yValue.toString(), // Correctly calling .toString() to convert to string
                    callOutAccessibilityData: {
                        ariaLabel: `Data point for ${xValueNum} with value ${yValue}`,
                        ariaLabelledBy: 'check',
                        ariaDescribedBy: 'check',
                    },
                }],
                chartTitle: legendString, // Using the string directly, no need to call .toString() here
            };
        });

        setChartData(transformedData);
    }, []);

    return (
        <div style={{ maxWidth: 600 }}>
            <HorizontalBarChart data={chartData} />
        </div>
    );
};

export default HorizontalBarChartCustomAccessibility;