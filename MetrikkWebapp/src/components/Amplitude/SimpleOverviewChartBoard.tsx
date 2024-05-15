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
              chartTitle: 'Antall besøk',
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
              chartTitle: 'Antall besøk gruppert på land',
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
              filters: [
                {
                  subprop_type: 'event',
                  subprop_key: '[Amplitude] Page Path',
                  subprop_op: 'contains',
                  subprop_value: [selectedPath],
                },
              ],
            }}
            title="Antall besøk gruppert på henvisning"
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
            title="Antall besøk gruppert på sidesti"
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
                eventTypeMappings2.pageViewedGroupByReferringDomain.eventType,
              groupBy:
                eventTypeMappings2.pageViewedGroupByReferringDomain.groupBy,
              filters: [
                {
                  subprop_type: 'event',
                  subprop_key: '[Amplitude] Page Path',
                  subprop_op: 'contains',
                  subprop_value: [selectedPath],
                },
              ],
            }}
            title="Antall besøk gruppert på henvisende domene"
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
              chartTitle: 'Antall besøk gruppert på by',
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
              chartTitle: 'Antall besøk gruppert på språk',
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
              chartTitle: 'Antall besøk gruppert på ukedag',
              xAxisTitle: 'Ukedag',
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
              chartTitle: 'Antall besøk gruppert på time i døgnet',
              xAxisTitle: 'Time i døgnet',
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
            titles={{
              chartTitle: 'Antall besøk gruppert på operativsystem',
              xAxisTitle: 'Operativsystem',
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
            titles={{
              chartTitle: 'Antall besøk gruppert på enhetstype',
              xAxisTitle: 'Enhetstype',
              yAxisTitle: 'Antall besøk',
            }}
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
                eventTypeMappings2.pageViewedGroupByDeviceFamily.eventType,
              groupBy: eventTypeMappings2.pageViewedGroupByDeviceFamily.groupBy,
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
              chartTitle: 'Antall besøk gruppert på enhetens familie',
              xAxisTitle: 'Enhetens familie',
              yAxisTitle: 'Antall besøk',
            }}
          />
        </div>
      )}
    </>
  );
};

export default SimpleOverviewChartBoard;
