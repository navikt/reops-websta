import {DataVizPalette} from "@fluentui/react-charting";


type ApiResponse = {
    data: {
        series: Array<{
            value: number;
        }>;
        xValues: string[];
    };
};

export const processHorizontalChartData = (apiResponse: ApiResponse) => {

}