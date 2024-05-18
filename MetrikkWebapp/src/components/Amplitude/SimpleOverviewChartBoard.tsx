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
        await new Promise((resolve) => setTimeout(resolve, 2000));
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
                    filters: [
                      {
                        subprop_type: 'event',
                        subprop_key: '[Amplitude] Page Path',
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
                    chartTitle: 'Totalt antall besøk',
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
                    filters: [
                      {
                        subprop_type: 'event',
                        subprop_key: '[Amplitude] Page Path',
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
                    chartTitle: 'Hvilket besøk gruppert på by',
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
                    filters: [
                      {
                        subprop_type: 'event',
                        subprop_key: '[Amplitude] Page Path',
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
                    chartTitle: 'Hvilke land besøkes siden fra?',
                    xAxisTitle: 'Dato',
                    yAxisTitle: 'Antall besøk',
                  }}
              />
            </div>
        )}

        {selectedDomain && formattedStartDate && formattedEndDate && !loading && (
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
                    filters: [
                      {
                        subprop_type: 'event',
                        subprop_key: '[Amplitude] Page Path',
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
                    chartTitle: 'Hvilket språk benytter brukeren seg av?',
                    xAxisTitle: 'Dato',
                    yAxisTitle: 'Antall besøk',
                  }}
              />
            </div>
        )}


        {selectedDomain && formattedStartDate && formattedEndDate && !loading && (
            <div className="p-4 bg-white border border-blue-200 rounded shadow-lg ">
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
                    filters: [
                      {
                        subprop_type: 'event',
                        subprop_key: '[Amplitude] Page Path',
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
                    chartTitle: 'Hvilke ukedager, i angitt tidsrom, besøkes nettsiden mest?',
                    xAxisTitle: 'Ukedager',
                    yAxisTitle: 'Antall besøk',
                  }}
              />
            </div>
        )}

        {selectedDomain && formattedStartDate && formattedEndDate && !loading && (
            <div className="p-4 bg-white border border-blue-200 rounded shadow-lg overflow-auto">
              <VerticalBarChartContainer
                  teamDomain={selectedDomain}
                  chartType="verticalBarChart"
                  endpointType="segmentation"
                  urlParams={{
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    eventType:
                    eventTypeMappings2.pageViewedGroupByHourOfDay.eventType,
                    groupBy: eventTypeMappings2.pageViewedGroupByHourOfDay.groupBy,
                    filters: [
                      {
                        subprop_type: 'event',
                        subprop_key: '[Amplitude] Page Path',
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
                    chartTitle: 'Hvilket klokkeslett, i angitt tidsrom, besøkes nettsiden mest?',
                    xAxisTitle: 'Klokkeslett',
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
                    filters: [
                      {
                        subprop_type: 'event',
                        subprop_key: '[Amplitude] Page Path',
                        subprop_op: 'contains',
                        subprop_value: [selectedPath],
                      },
                    ],
                  }}
                  title="Hvor kommer besøkende fra?"
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
                    filters: [
                      {
                        subprop_type: 'event',
                        subprop_key: '[Amplitude] Page Path',
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
                    filters: [
                      {
                        subprop_type: 'event',
                        subprop_key: '[Amplitude] Page Path',
                        subprop_op: 'contains',
                        subprop_value: [selectedPath],
                      },
                    ],
                  }}
                  dimensions={{
                    width: 500,
                    height: 350,
                  }}
                  title="Hvilken nettleser benytter nettleser brukeren seg av?"
              />
            </div>
        )}
        {selectedDomain && formattedStartDate && formattedEndDate && !loading && (
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
                    filters: [
                      {
                        subprop_type: 'event',
                        subprop_key: '[Amplitude] Page Path',
                        subprop_op: 'contains',
                        subprop_value: [selectedPath],
                      },
                    ],
                  }}
                  dimensions={{
                    width: 500,
                    height: 350,
                  }}
                  title = "Hvilket operativsystem, mobil, PC eller nettbrett benyttes på siden?"
              />
            </div>
        )}
      </>
  );
};

export default SimpleOverviewChartBoard;
