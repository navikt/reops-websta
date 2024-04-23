import { Table } from "@navikt/ds-react";

interface AmplitudeResponse {
    data: {
        seriesLabels: string[];
        series: number[][];
    };
}

interface TableChartData {
    something: string,
    total: number,
}

const TableChartDisplay: React.FC<TableChartData> = ({ chartData  }) => {


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
                    {data && data.map((somethng, index) => (
                        <Table.Row key={index}>
                            <Table.HeaderCell scope="row">{countryData.country}</Table.HeaderCell>
                            <Table.DataCell>{countryData.total}</Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}