import AreaChartContainer from '../charts/AreaChartCustomAccessibility/AreaChartContainer.tsx';
import { eventTypeMappings2 } from '../charts/dynamicUrlConstructor/EventTypeMappings2.ts';
import TableChartContainer from '../charts/TableChart/TableChartContainer.tsx';
import VerticalBarChartContainer from '../charts/VerticalBarChartCustomAccessibility/VerticalBarChartContainer.tsx';
import React, { useEffect, useState } from 'react';

interface ChartsBoardProps {
    selectedDomain: string;
    formattedStartDate: string;
    formattedEndDate: string;
    selectedPath: string;
}
const SimpleOverviewChartBoard: React.FC<ChartsBoardProps> = ({
                                                                  selectedDomain,
                                                                  formattedStartDate,
                                                                  formattedEndDate,
                                                                  selectedPath,
                                                              }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharts = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 100));
                setLoading(false);
                console.log("Side: nav.no")
            } catch (error) {
                console.error('Error fetching charts:', error);
            }
        };

        fetchCharts();
    }, []);

    return (
        <>
            {selectedDomain && formattedStartDate && formattedEndDate && (
                <div className="p-4 bg-white border border-blue-200 rounded shadow-lg overflow-auto">
                    <AreaChartContainer
                        teamDomain={selectedDomain}
                        chartType="areaChartMulti"
                        endpointType="segmentation"
                        urlParams={{
                            startDate: formattedStartDate,
                            endDate: formattedEndDate,
                            eventType: eventTypeMappings2.besøk.eventType,
                            filters: [
                                {
                                    subprop_type: 'event',
                                    subprop_key: 'platform',
                                    subprop_op: 'contains',
                                    subprop_value: [selectedPath],
                                },
                            ],
                        }}
                        dimensions={{
                            width: 500,
                            height: 350,
                        }}
                        titles={{
                            chartTitle: 'Antall unike besøkende',
                            xAxisTitle: 'Dato',
                            yAxisTitle: 'Unike besøkende',
                        }}
                    />
                </div>
            )}

            {selectedDomain && formattedStartDate && formattedEndDate  && (
                <div className="p-4 bg-white border border-blue-200 rounded shadow-lg overflow-auto">
                    <AreaChartContainer
                        teamDomain={selectedDomain}
                        chartType="areaChartMulti"
                        endpointType="segmentation"
                        urlParams={{
                            startDate: formattedStartDate,
                            endDate: formattedEndDate,
                            eventType: eventTypeMappings2.besøkGroupByLanguage.eventType,
                            groupBy: eventTypeMappings2.besøkGroupByLanguage.groupBy,
                            filters: [
                                {
                                    subprop_type: 'event',
                                    subprop_key: 'platform',
                                    subprop_op: 'contains',
                                    subprop_value: [selectedPath],
                                },
                            ],
                        }}
                        dimensions={{
                            width: 500,
                            height: 350,
                        }}
                        titles={{
                            chartTitle: 'Språk besøkende benytter',
                            xAxisTitle: 'Dato',
                            yAxisTitle: 'Antall besøk',
                        }}
                    />
                </div>
            )}

            {selectedDomain && formattedStartDate && formattedEndDate && (
                <div className="p-4 bg-white border border-blue-200 rounded shadow-lg overflow-auto">
                    <AreaChartContainer
                        teamDomain={selectedDomain}
                        chartType="areaChartMulti"
                        endpointType="segmentation"
                        urlParams={{
                            startDate: formattedStartDate,
                            endDate: formattedEndDate,
                            eventType: eventTypeMappings2.besøkGroupByCity.eventType,
                            groupBy: eventTypeMappings2.besøkGroupByCity.groupBy,
                            filters: [
                                {
                                    subprop_type: 'event',
                                    subprop_key: 'platform',
                                    subprop_op: 'contains',
                                    subprop_value: [selectedPath],
                                },
                            ],
                        }}
                        dimensions={{
                            width: 500,
                            height: 350,
                        }}
                        titles={{
                            chartTitle: 'Byer siden besøkes fra',
                            xAxisTitle: 'Dato',
                            yAxisTitle: 'Antall besøk',
                        }}
                    />
                </div>
            )}

            {selectedDomain && formattedStartDate && formattedEndDate && (
                <div className="p-4 bg-white border border-blue-200 rounded shadow-lg overflow-auto">
                    <AreaChartContainer
                        teamDomain={selectedDomain}
                        chartType="areaChartMulti"
                        endpointType="segmentation"
                        urlParams={{
                            startDate: formattedStartDate,
                            endDate: formattedEndDate,
                            eventType: eventTypeMappings2.besøkGroupByCountry.eventType,
                            groupBy: eventTypeMappings2.besøkGroupByCountry.groupBy,
                            filters: [
                                {
                                    subprop_type: 'event',
                                    subprop_key: 'platform',
                                    subprop_op: 'contains',
                                    subprop_value: [selectedPath],
                                },
                            ],
                        }}
                        dimensions={{
                            width: 500,
                            height: 350,
                        }}
                        titles={{
                            chartTitle: 'Land siden besøkes fra',
                            xAxisTitle: 'Dato',
                            yAxisTitle: 'Antall besøk',
                        }}
                    />
                </div>
            )}

            {selectedDomain && formattedStartDate && formattedEndDate && (
                <div className="p-4 bg-white border border-blue-200 rounded shadow-lg overflow-auto">
                    <TableChartContainer
                        teamDomain={selectedDomain}
                        chartType="segmentationChartProcessing"
                        endpointType="segmentation"
                        urlParams={{
                            startDate: formattedStartDate,
                            endDate: formattedEndDate,
                            eventType: eventTypeMappings2.besøkGroupByReferrer.eventType,
                            groupBy: eventTypeMappings2.besøkGroupByReferrer.groupBy,
                            filters: [
                                {
                                    subprop_type: 'event',
                                    subprop_key: 'platform',
                                    subprop_op: 'contains',
                                    subprop_value: [selectedPath],
                                },
                            ],
                        }}
                        title="Sider besøkende kommer fra"
                    />
                </div>
            )}

            {selectedDomain && formattedStartDate && formattedEndDate && (
                <div className="p-4 bg-white border border-blue-200 rounded shadow-lg overflow-auto">
                    <TableChartContainer
                        teamDomain={selectedDomain}
                        chartType="segmentationChartProcessing"
                        endpointType="segmentation"
                        urlParams={{
                            startDate: formattedStartDate,
                            endDate: formattedEndDate,
                            eventType: eventTypeMappings2.besøkGroupByPagePath.eventType,
                            groupBy: eventTypeMappings2.besøkGroupByPagePath.groupBy,
                            filters: [
                                {
                                    subprop_type: 'event',
                                    subprop_key: 'platform',
                                    subprop_op: 'contains',
                                    subprop_value: [selectedPath],
                                },
                            ],
                        }}
                        title="Antall besøk på nettadresse(r)"
                    />
                </div>
            )}

            {selectedDomain && formattedStartDate && formattedEndDate && (
                <div className="p-4 bg-white border border-blue-200 rounded shadow-lg overflow-auto">
                    <VerticalBarChartContainer
                        teamDomain={selectedDomain}
                        chartType="verticalBarChart"
                        endpointType="segmentation"
                        urlParams={{
                            startDate: formattedStartDate,
                            endDate: formattedEndDate,
                            eventType:
                            eventTypeMappings2.besøkGroupByDayOfWeek.eventType,
                            groupBy: eventTypeMappings2.besøkGroupByDayOfWeek.groupBy,
                            filters: [
                                {
                                    subprop_type: 'event',
                                    subprop_key: 'platform',
                                    subprop_op: 'contains',
                                    subprop_value: [selectedPath],
                                },
                            ],
                        }}
                        dimensions={{
                            width: 500,
                            height: 350,
                        }}
                        titles={{
                            chartTitle: 'Ukedager siden besøkes (i valgte datoer)',
                            xAxisTitle: 'Ukedager',
                            yAxisTitle: 'Antall besøk',
                        }}
                    />
                </div>
            )}

            {selectedDomain && formattedStartDate && formattedEndDate && (
                <div className="p-4 bg-white border border-blue-200 rounded shadow-lg overflow-auto">
                    <VerticalBarChartContainer
                        teamDomain={selectedDomain}
                        chartType="verticalBarChartHours"
                        endpointType="segmentation"
                        urlParams={{
                            startDate: formattedStartDate,
                            endDate: formattedEndDate,
                            eventType:
                            eventTypeMappings2.besøkGroupByHourOfDay.eventType,
                            groupBy: eventTypeMappings2.besøkGroupByHourOfDay.groupBy,
                            filters: [
                                {
                                    subprop_type: 'event',
                                    subprop_key: 'platform',
                                    subprop_op: 'contains',
                                    subprop_value: [selectedPath],
                                },
                            ],
                        }}
                        dimensions={{
                            width: 500,
                            height: 350,
                        }}
                        titles={{
                            chartTitle: `Klokkeslett siden besøkes (i valgte datoer)`,
                            xAxisTitle: 'Klokkeslett',
                            yAxisTitle: 'Antall besøk',
                        }}
                    />
                </div>
            )}

            {selectedDomain && formattedStartDate && formattedEndDate && (
                <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
                    <TableChartContainer
                        teamDomain={selectedDomain}
                        chartType="segmentationChartProcessing"
                        endpointType="segmentation"
                        urlParams={{
                            startDate: formattedStartDate,
                            endDate: formattedEndDate,
                            eventType: eventTypeMappings2.besøkGroupByOS.eventType,
                            groupBy: eventTypeMappings2.besøkGroupByOS.groupBy,
                            filters: [
                                {
                                    subprop_type: 'event',
                                    subprop_key: 'platform',
                                    subprop_op: 'contains',
                                    subprop_value: [selectedPath],
                                },
                            ],
                        }}
                        title="Nettlesere besøkende benytter"
                    />
                </div>
            )}
            {selectedDomain && formattedStartDate && formattedEndDate && (
                <div className="p-4 bg-white border border-blue-200 rounded shadow-lg overflow-auto">
                    <TableChartContainer
                        teamDomain={selectedDomain}
                        chartType="segmentationChartProcessing"
                        endpointType="segmentation"
                        urlParams={{
                            startDate: formattedStartDate,
                            endDate: formattedEndDate,
                            eventType:
                            eventTypeMappings2.besøkGroupByDeviceType.eventType,
                            groupBy: eventTypeMappings2.besøkGroupByDeviceType.groupBy,
                            filters: [
                                {
                                    subprop_type: 'event',
                                    subprop_key: 'platform',
                                    subprop_op: 'contains',
                                    subprop_value: [selectedPath],
                                },
                            ],
                        }}
                        title = "Operativsystem besøkende benytter"
                    />
                </div>
            )}
        </>
    );
};

export default SimpleOverviewChartBoard;