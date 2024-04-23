import { Table } from "@navikt/ds-react";
import React from "react";

interface Data {
    date: any,
    countryName: string;
    visitorAmount: number
}

interface TableChartProps {
    data: Data[];
}

const TableBox: React.FC<TableChartProps> = ( { data }) => {

    return (
        <div>
            <Table zebraStripes>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Country</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Total</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.map((item: any, index: any) => (
                        <Table.Row key={index}>
                            <Table.HeaderCell scope="row">{item.country}</Table.HeaderCell>
                            <Table.DataCell>{item.total}</Table.DataCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );

};

export default TableBox;
