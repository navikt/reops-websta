import React from 'react';
import { Table } from "@navikt/ds-react";

const TableBox = ({ data, title }) => (
    <div>
        <h2 style={{ textAlign: 'center', fontWeight: 'bold'}}>{title}</h2>
        <Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Value</Table.HeaderCell>
                <Table.HeaderCell>Total Visitors</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {data.map(({ countryName, totalVisitors }, index) => (
                <Table.Row key={index}>
                    <Table.DataCell>{countryName}</Table.DataCell>
                    <Table.DataCell>{totalVisitors}</Table.DataCell>
                </Table.Row>
            ))}
        </Table.Body>
    </Table>
    </div>
);


export default TableBox;
