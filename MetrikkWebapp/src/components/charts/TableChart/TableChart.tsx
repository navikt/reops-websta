import { Table } from "@navikt/ds-react";



const TableChart = ( { chartData }) => {
    var dato = "lunsj";

    return (
        <div className={""}>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Land</Table.HeaderCell>
                        <Table.HeaderCell scope="col">{dato}</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {chartData.map(({ name, fnr: dato}, i) => {
                        return (
                            <Table.Row key={i + dato}>
                                <Table.HeaderCell scope="row">{name}</Table.HeaderCell>
                                <Table.DataCell>{dato}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
        </div>
    );
};

export default TableChart;