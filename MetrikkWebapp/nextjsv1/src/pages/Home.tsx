import '@navikt/ds-css';
import { format } from 'date-fns';
import AreaChartCustomAccessibility from '../components/charts/AreaChartCustomAccessibility/AreaChartCustomAccessibility';
import HorizontalBarChartCustomAccessibility from '../components/charts/HorizontalBarChart/HorizontalBarChartCustomAccessibility';
import { Search } from '@navikt/ds-react';
import { Heading, VStack } from '@navikt/ds-react';
import { Link } from 'react-router-dom';

import AreaChartContainer from '../components/charts/AreaChartCustomAccessibility/AreaChartContainer';
import { eventTypeMappings2 } from '../components/charts/dynamicUrlConstructor/EventTypeMappings2.ts';
import { eventTypeMappings } from '../components/charts/fetchUrlConstructor.ts';
import { SearchComponent } from '../components/SearchComponent/SearchComponent.tsx';
import { SetStateAction, useCallback, useState } from 'react';
import { URLSearchComponent } from '../components/SearchComponent/URLSearchComponent.tsx';
import { RangeDatePicker } from '../components/DatePicker/DatePicker.tsx';
import VerticalBarChartCustomAccessibilityExample from '../components/charts/VerticalBarChartCustomAccessibility/VerticalBarChartCustomAccessibility';
import VerticalBarChartContainer from '../components/charts/VerticalBarChartCustomAccessibility/VerticalBarChartContainer';
import TableChartContainer from '../components/charts/TableChart/TableChartContainer';
import SiteScores from "../components/Siteimprove/SiteScores.tsx";

const Home = () => {
  const simpleGuide = 'Trykk her for en enkel guide';

  // Kan hende callback blir brukt til å velge domene
  const [selectedDomain, setSelectedDomain] = useState('');

  const handleDomainSelect = useCallback((domain:string) => {
    setSelectedDomain(domain);
  }, []);

  // Kan hende callback blir brukt til å velge domene
  const [selectedPath, setSelectedPath] = useState('');

  const handlePathSelection = useCallback((path:string) => {
    setSelectedPath(path);
  }, []);

  const [selectedPageUrl, setSelectedPageUrl] = useState('');

  const handlePageUrl = useCallback((pageUrl:string) => {
    setSelectedPageUrl(pageUrl)
  },[])

  const [selectedSiteimproveDomain , setSelectedSiteimproveDomain] = useState('')

  const handleSiteimproveDomain = useCallback((siteimproveDomain:string) => {
    setSelectedSiteimproveDomain(siteimproveDomain)
  },[])

  console.log("this is my page url",selectedPageUrl)
  console.log("this is my selected siteimprove domain id",selectedSiteimproveDomain)

  //const standardStartDate = new Date(new Date().setDate(standardStartDate.getDate()-30));
  //const standardEndDate = new Date();

  const defaultStartDate = new Date(
    new Date().setDate(new Date(Date.now()).getDate() - 30)
  );
  const defaultEndDate = new Date(Date.now());
  const defaultFormattedStartDate = format(defaultStartDate, 'yyyyMMdd');
  const defaultFormattedEndDate = format(defaultEndDate, 'yyyyMMdd');

  console.log('date today', defaultStartDate);
  console.log('date today minus 30', defaultEndDate);
  console.log('date today Formatted', defaultFormattedStartDate);
  console.log('date today minus 30 Formatted', defaultFormattedEndDate);

  const [formattedStartDate, setFormattedStartDate] = useState(
    defaultFormattedStartDate
  );
  const [formattedEndDate, setFormattedEndDate] = useState(
    defaultFormattedEndDate
  );

  interface range {
    from?: Date;
    to?: Date;
  }
  const handleDateChange = useCallback((range: range) => {
    if (range.from && range.to) {
      // Both from and to values are defined, proceed with formatting
      const startDate = format(range.from, 'yyyyMMdd');
      const endDate = format(range.to, 'yyyyMMdd');

      // Set the formatted dates in state
      setFormattedStartDate(startDate);
      setFormattedEndDate(endDate);
    } else {
      // Handle the case where either from or to is undefined
      if (!range.from) {
        console.error('Start date is not set.');
      }
      if (!range.to) {
        console.error('End date is not set.');
      }
    }
  }, []);

  console.log(`from home`, selectedDomain, `${selectedPath}/`);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Webstatisitkk 📊</h1>
      {/* RangeDatePicker already includes labels */}

      <div className="p-8 space-y-6 ">
        {/* Search Component */}
        <div className="flex flex-col w-full max-w-lg">
          <div className="relative">
            <URLSearchComponent
              className="border p-2 rounded"
              onDomainSelect={handleDomainSelect}
              onPagePath={handlePathSelection}
              onSiteimproveDomain={handleSiteimproveDomain}
              onPageUrl={handlePageUrl}
            />
          </div>
        </div>
        {selectedDomain && (
          <div className="flex items-center justify-center w-full max-w-lg">
            <RangeDatePicker onDateChange={handleDateChange} />
          </div>
        )}
      </div>

      {/*<VStack className="items-center mb-3">
        <Link to="/guide" className="text-center hover:underline">
          <Heading size="medium">{simpleGuide}</Heading>
        </Link>
        <h2 className="text-xl font-bold mb-3 text-center">Søk her:</h2>
      </VStack>
      <form className="w-full max-w-lg px-4">
        <Search
          label="Søk alle NAV sine sider"
          variant="primary"
          className="w-full"
        />
      </form>
      */}


      {selectedDomain &&(
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" >
            <SiteScores
                pageUrl={selectedPageUrl}
                siteimproveSelectedDomain={selectedSiteimproveDomain}
            />
          </div>
      )}

      {/*TODO: Charts er lenger til høyre når de er centered fordi centrering starter på y-axis */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedDomain && formattedStartDate && formattedEndDate && (
          <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
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
          <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
            <AreaChartContainer
              teamDomain={selectedDomain}
              chartType="areaChartMulti"
              endpointType="segmentation"
              urlParams={{
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                eventType:
                  eventTypeMappings2.pageViewedGroupByCountry.eventType,
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
          <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
            <TableChartContainer
              teamDomain={selectedDomain}
              chartType="segmentationChartProcessing"
              endpointType="segmentation"
              urlParams={{
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                eventType:
                  eventTypeMappings2.pageViewedGroupByReferrer.eventType,
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
          <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
            <TableChartContainer
              teamDomain={selectedDomain}
              chartType="segmentationChartProcessing"
              endpointType="segmentation"
              urlParams={{
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                eventType:
                  eventTypeMappings2.pageViewedGroupByPagePath.eventType,
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
          <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
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
          <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
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
        {selectedDomain && formattedStartDate && formattedEndDate && (
          <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
            <AreaChartContainer
              teamDomain={selectedDomain}
              chartType="areaChartMulti"
              endpointType="segmentation"
              urlParams={{
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                eventType:
                  eventTypeMappings2.pageViewedGroupByLanguage.eventType,
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

        {selectedDomain && formattedStartDate && formattedEndDate && (
          <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
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

        {selectedDomain && formattedStartDate && formattedEndDate && (
          <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
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

        {selectedDomain && formattedStartDate && formattedEndDate && (
          <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
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
        {selectedDomain && formattedStartDate && formattedEndDate && (
          <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
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
          <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
            <VerticalBarChartContainer
              teamDomain={selectedDomain}
              chartType="verticalBarChart"
              endpointType="segmentation"
              urlParams={{
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                eventType:
                  eventTypeMappings2.pageViewedGroupByDeviceFamily.eventType,
                groupBy:
                  eventTypeMappings2.pageViewedGroupByDeviceFamily.groupBy,
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
                width: 650,
                height: 400,
              }}
              titles={{
                chartTitle: 'Antall besøk gruppert på enhetens familie',
                xAxisTitle: 'Enhetens familie',
                yAxisTitle: 'Antall besøk',
              }}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;
