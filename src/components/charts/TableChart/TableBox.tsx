import React from 'react';
import { Table } from '@navikt/ds-react';

const TableBox = ({ data, title }) => (
    <div>
        <h2 className="py-3" style={{textAlign: 'center', fontWeight: 'bold'}}>{title}</h2>
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Verdi</Table.HeaderCell>
                    <Table.HeaderCell>Totalt antall besøkende</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map(({value, totalVisitors}, index) => (
                    <Table.Row key={index}>
                        <Table.DataCell>{value}</Table.DataCell>
                        <Table.DataCell>{totalVisitors.toLocaleString('no-NO')}</Table.DataCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
        <p className="text-right mr-4 mt-4 mb-2">Kilde: Amplitude</p>
    </div>
);

export default TableBox;
