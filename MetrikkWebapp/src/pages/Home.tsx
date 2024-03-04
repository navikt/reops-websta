import {useEffect, useState} from 'react';
import "@navikt/ds-css";
import AreaChartCustomAccessibility
    from "../components/charts/AreaChartCustomAccessibility/AreaChartCustomAccessibility";
import HorizontalBarChartCustomAccessibility
    from "../components/charts/HorizontalBarChart/HorizontalBarChartCustomAccessibility";
import {
    VerticalBarChartCustomAccessibilityExample
} from "../components/charts/VerticalBarChartCustomAccessibility/VerticalBarChartCustomAccessibility";
import {fetchAmplitudeData} from "../service/AmplitudeApi";


export default function Home(){

    const [data, setData] = useState(null);

    useEffect(()=>{
        const loadData = async () => {
            try{
                const result = await fetchAmplitudeData(`/3/chart/e-xwordsgk/query`);
                setData(result);
            }catch (error){
                console.error("Failed to fetch data: ", error);
                setData(null);
            }
        };

        loadData();
    },[])


    return (
        <div>

            <h1 className="text-2xl font-bold mb-4 text-center">This is the homepage</h1>
            {/*TODO: Charts er lenger til høyre når de er centered fordi centrering starter på y-axis */}
            <div className="flex flex-row justify-between items-center flex-wrap">
                {/* Displaying the fetched data */}
                <div>
                    <h2 className="text-xl font-semibold mb-2">Fetched Data:</h2>
                    {data && (
                        <div>
                            <h2>Series Data</h2>
                            <ul>
                                {/* Assuming we're interested in the first array of the series data */}
                                {data.data.series[0].map((item, index) => (
                                    <li key={index}>Value: {item.value}</li>
                                ))}
                            </ul>
                            <h2>Other Data</h2>
                            {/* Display another piece of data from the response to test */}
                            <p>Time Computed: {data.timeComputed}</p>
                        </div>
                    )}
                </div>
                <div className="">
                    <AreaChartCustomAccessibility />
                </div>
                <div className="">
                    <AreaChartCustomAccessibility />
                </div>
                <div className="">
                    <HorizontalBarChartCustomAccessibility />
                </div>
                <div className="">
                    <VerticalBarChartCustomAccessibilityExample />
                </div>
            </div>
        </div>
    );
}

