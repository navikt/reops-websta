import AreaChartContainer from '../charts/AreaChartCustomAccessibility/AreaChartContainer.tsx';
import { eventTypeMappings2 } from '../charts/dynamicUrlConstructor/EventTypeMappings2.ts';
import TableChartContainer from '../charts/TableChart/TableChartContainer.tsx';
import VerticalBarChartContainer from '../charts/VerticalBarChartCustomAccessibility/VerticalBarChartContainer.tsx';
import React, { useEffect, useState } from 'react';

interface ChartsBoardProps {
    selectedDomain: string;
    formattedStartDate: string;
    formattedEndDate: string;
    urlFilters: any[];
}
const SimpleOverviewChartBoard: React.FC<ChartsBoardProps> = ({
                                                                  selectedDomain,
                                                                  formattedStartDate,
                                                                  formattedEndDate,
                                                                  urlFilters,
                                                              }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharts = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 100));
                setLoading(false);
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
                            eventType: eventTypeMappings2.pageViewed.eventType,
                            filters: urlFilters,
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


            {selectedDomain && formattedStartDate && formattedEndDate && (
                <div className="p-4 bg-white border border-blue-200 rounded shadow-lg overflow-auto">
                    <AreaChartContainer
                        teamDomain={selectedDomain}
                        chartType="areaChartMulti"
                        endpointType="segmentation"
                        urlParams={{
                            startDate: formattedStartDate,
                            endDate: formattedEndDate,
                            eventType: eventTypeMappings2.pageViewedGroupByLanguage.eventType,
                            groupBy: eventTypeMappings2.pageViewedGroupByLanguage.groupBy,
                            filters: urlFilters,
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
                            eventType: eventTypeMappings2.pageViewedGroupByCity.eventType,
                            groupBy: eventTypeMappings2.pageViewedGroupByCity.groupBy,
                            filters: urlFilters,
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
                            eventType: eventTypeMappings2.pageViewedGroupByCountry.eventType,
                            groupBy: eventTypeMappings2.pageViewedGroupByCountry.groupBy,
                            filters: urlFilters,
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
                            eventType: eventTypeMappings2.pageViewedGroupByReferrer.eventType,
                            groupBy: eventTypeMappings2.pageViewedGroupByReferrer.groupBy,
                            filters:urlFilters,
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
                            eventType: eventTypeMappings2.pageViewedGroupByPagePath.eventType,
                            groupBy: eventTypeMappings2.pageViewedGroupByPagePath.groupBy,
                            filters: urlFilters,
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
                            eventTypeMappings2.pageViewedGroupByDayOfWeek.eventType,
                            groupBy: eventTypeMappings2.pageViewedGroupByDayOfWeek.groupBy,
                            filters: urlFilters,
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
                            eventTypeMappings2.pageViewedGroupByHourOfDay.eventType,
                            groupBy: eventTypeMappings2.pageViewedGroupByHourOfDay.groupBy,
                            filters: urlFilters,
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
                            eventType: eventTypeMappings2.pageViewedGroupByOS.eventType,
                            groupBy: eventTypeMappings2.pageViewedGroupByOS.groupBy,
                            filters: urlFilters,
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
                            eventTypeMappings2.pageViewedGroupByDeviceType.eventType,
                            groupBy: eventTypeMappings2.pageViewedGroupByDeviceType.groupBy,
                            filters: urlFilters,
                        }}
                        title = "Operativsystem besøkende benytter"
                    />
                </div>
            )}
        </>
    );
};

export default SimpleOverviewChartBoard;