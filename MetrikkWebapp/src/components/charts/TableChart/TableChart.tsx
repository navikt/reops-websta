import { Table } from "@navikt/ds-react";
import {useEffect, useState} from "react";
import {fetchAmplitudeData} from "../../../service/AmplitudeApi.tsx";



const TableChart = ( { chartData }) => {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAmplitudeData('/2/events/segmentation?e={"event_type":"[Amplitude] Page Viewed","group_by":[{"type":"user","value":"country"}]}&start=20240101&end=20240130')
            setData(response)
            console.log(response)

            const countries = response.data.seriesLabels;
            console.log(countries)
        }
        fetchData()
    }, []);

    var dato = "lunsj";

    return (
        <div className={""}>
            <Table>
                <Table.Header>
                    <Table.Row>
                        {/* props for kolloner, burde kanskje være array*/}
                        <Table.HeaderCell scope="col">Land</Table.HeaderCell>
                        <Table.HeaderCell scope="col">{dato}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {/*
                    {chartData.map(({name, fnr: antall}, i) => {
                        return (
                            <Table.Row key={i + dato}>
                                <Table.HeaderCell scope="row">{name}</Table.HeaderCell>
                                <Table.DataCell>{antall}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                    */}
                </Table.Body>
            </Table>
        </div>
    );
};

export default TableChart;