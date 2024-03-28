import { Table } from "@navikt/ds-react";
import {useEffect, useState} from "react";
import {fetchAmplitudeData} from "../../../service/AmplitudeApi.tsx";

interface AmplitudeResponse {
    data: {
        seriesLabels: string[];
        series: number[][];
    };
}

interface CountryData {
    country: string;
    total: number;
}

const TableChart = () => {
    const [data, setData] = useState<CountryData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response: AmplitudeResponse = await fetchAmplitudeData(
                    '/2/events/segmentation?e={"event_type":"[Amplitude] Page Viewed","group_by":[{"type":"user","value":"country"}]}&start=20240101&end=20240130'
                );

                if (response && response.data.seriesLabels && response.data.series) {
                    const countries = response.data.seriesLabels;
                    const rawData = response.data.series;

                    const mappedData = rawData.map((data, index) => {
                        const total = data.reduce((sum, current) => sum + current, 0);
                        return {
                            country: countries[index].slice(1), // Removing the first letter of each country name
                            total: total
                        };
                    });

                    setData(mappedData);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Country</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Total</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data && data.map((countryData, index) => (
                        <Table.Row key={index}>
                            <Table.HeaderCell scope="row">{countryData.country}</Table.HeaderCell>
                            <Table.DataCell>{countryData.total}</Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default TableChart;
