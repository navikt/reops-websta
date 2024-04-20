import '@navikt/ds-css';
import { format } from "date-fns";
import AreaChartCustomAccessibility from '../components/charts/AreaChartCustomAccessibility/AreaChartCustomAccessibility';
import HorizontalBarChartCustomAccessibility from '../components/charts/HorizontalBarChart/HorizontalBarChartCustomAccessibility';
import { Search } from '@navikt/ds-react';
import { Heading, VStack } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import { VerticalBarChartCustomAccessibilityExample } from '../components/charts/VerticalBarChartCustomAccessibility/VerticalBarChartCustomAccessibility';
import {Test} from "../components/charts/AreaChartCustomAccessibility/test";
import DisplayTableChart from "../components/charts/TableChart/DisplayTableChart.tsx";
import TableChart from "../components/charts/TableChart/TableChart.tsx";

import AreaChartContainer from '../components/charts/AreaChartCustomAccessibility/AreaChartContainer';
import {eventTypeMappings} from "../components/charts/dynamicUrlConstructor/EventTypeMappings.ts";
import {SearchComponent} from "../components/SearchComponent/SearchComponent.tsx";
import {SetStateAction, useCallback, useState} from "react";
import {URLSearchComponent} from "../components/SearchComponent/URLSearchComponent.tsx";
import {RangeDatePicker} from "../components/DatePicker/DatePicker.tsx";

const Home = () => {
    const simpleGuide = 'Trykk her for en enkel guide';

    // Kan hende callback blir brukt til å velge domene
    const [selectedDomain, setSelectedDomain] = useState("100002286");

    const handleDomainSelect = useCallback((domain) => {
        setSelectedDomain(domain);
    }, []);

    // Kan hende callback blir brukt til å velge domene
    const [selecetedPath, setSelectedPath] = useState('');

    const handlePathSelection = useCallback((path) => {
        setSelectedPath(path);
    }, []);

    const [formattedStartDate, setFormattedStartDate] = useState("");
    const [formattedEndDate, setFormattedEndDate] = useState("");

    interface range {
        from?:Date;
        to?:Date
    }
    const handleDateChange = useCallback((range:range) => {
        if (range.from && range.to) {
            // Both from and to values are defined, proceed with formatting
            const startDate = format(range.from, "yyyyMMdd");
            const endDate = format(range.to, "yyyyMMdd");

            // Set the formatted dates in state
            setFormattedStartDate(startDate);
            setFormattedEndDate(endDate);
        } else {
            // Handle the case where either from or to is undefined
            if (!range.from) {
                console.error("Start date is not set.");
            }
            if (!range.to) {
                console.error("End date is not set.");
            }
        }
    }, []);


    console.log(`from home`,selectedDomain)

    return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        This is the homepage
      </h1>
        {/*<SearchComponent onDomainSelect={handleDomainSelect}/>*/}
        <RangeDatePicker onDateChange={handleDateChange}/>
        <URLSearchComponent onDomainSelect={handleDomainSelect} onPagePath={handlePathSelection}/>
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
      {/*TODO: Charts er lenger til høyre når de er centered fordi centrering starter på y-axis */}
        <div className="flex flex-row justify-between items-center flex-wrap">

            {selectedDomain && formattedStartDate && formattedEndDate && (
            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate:formattedStartDate,
                        endDate: formattedEndDate,
                        eventType: eventTypeMappings.pageViewed.eventType
                    }}
                    dimensions={{
                            width: 500,
                            height: 350,
                        }}
                    titles={{
                        chartTitle:"Antall Besøk",
                        xAxisTitle:"Dato",
                        yAxisTitle:"Antall Besøk"
                    }}
                />
            </div>
                )}

            {selectedDomain && formattedStartDate && formattedEndDate && (
            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                        eventType: eventTypeMappings.pageViewedGroupByReferrer.eventType,
                        groupBy:eventTypeMappings.pageViewedGroupByReferrer.groupBy,
                    }}
                    dimensions={{
                        width: 500,
                        height: 350,
                    }}
                    titles={{
                        chartTitle:"Antall Besøk gruppert på henvisning",
                        xAxisTitle:"Dato",
                        yAxisTitle:"Antall Besøk"
                    }}
                />
            </div>)}
            {selectedDomain && formattedStartDate && formattedEndDate && (
            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                        eventType: eventTypeMappings.pageViewedGroupByPagePath.eventType,
                        groupBy: eventTypeMappings.pageViewedGroupByPagePath.groupBy,
                    }}
                    dimensions={{
                        width: 500,
                        height: 350,
                    }}
                    titles={{
                        chartTitle:"Antall Besøk gruppert på sidesti",
                        xAxisTitle:"Dato",
                        yAxisTitle:"Antall Besøk"
                    }}
                />
            </div>)}
            {selectedDomain && formattedStartDate && formattedEndDate && (
            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                        eventType: eventTypeMappings.pageViewedGroupByCity.eventType,
                        groupBy: eventTypeMappings.pageViewedGroupByCity.groupBy,
                    }}
                    dimensions={{
                        width: 500,
                        height: 350,
                    }}
                    titles={{
                        chartTitle:"Antall Besøk gruppert på by",
                        xAxisTitle:"Dato",
                        yAxisTitle:"Antall Besøk"
                    }}
                />
            </div>)}
            {selectedDomain && formattedStartDate && formattedEndDate && (
            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                        eventType: eventTypeMappings.pageViewedGroupByLanguage.eventType,
                        groupBy: eventTypeMappings.pageViewedGroupByLanguage.groupBy,
                    }}
                    dimensions={{
                        width: 500,
                        height: 350,
                    }}
                    titles={{
                        chartTitle:"Antall Besøk gruppert på språk",
                        xAxisTitle:"Dato",
                        yAxisTitle:"Antall Besøk"
                    }}
                />
            </div>)}
            {selectedDomain && formattedStartDate && formattedEndDate && (
            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                        eventType: eventTypeMappings.pageViewedGroupByCountry.eventType,
                        groupBy: eventTypeMappings.pageViewedGroupByCountry.groupBy
                    }}
                    dimensions={{
                        width: 500,
                        height: 350,
                    }}
                    titles={{
                        chartTitle:"Antall Besøk gruppert på land",
                        xAxisTitle:"Dato",
                        yAxisTitle:"Antall Besøk"
                    }}
                />
            </div>)}

            {selectedDomain && formattedStartDate && formattedEndDate && (
            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                        eventType: eventTypeMappings.pageViewedGroupByDayOfWeek.eventType,
                        groupBy: eventTypeMappings.pageViewedGroupByDayOfWeek.groupBy,
                    }}
                    dimensions={{
                        width: 500,
                        height: 350,
                    }}
                    titles={{
                        chartTitle:"Antall Besøk gruppert på ukedag",
                        xAxisTitle:"Dato",
                        yAxisTitle:"Antall Besøk"
                    }}
                />
            </div>)}



            {/*
        <div className="">
          <HorizontalBarChartCustomAccessibility />
        </div>
        <div className="">
          <VerticalBarChartCustomAccessibilityExample />
        </div>
        */}
            {selectedDomain && formattedStartDate && formattedEndDate && (
            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                        eventType: eventTypeMappings.pageViewedGroupByHourOfDay.eventType,
                        groupBy: eventTypeMappings.pageViewedGroupByHourOfDay.groupBy,
                    }}
                    dimensions={{
                        width: 500,
                        height: 350,
                    }}
                    titles={{
                        chartTitle:"Antall Besøk gruppert på klokkeslett gjennom en dag",
                        xAxisTitle:"Dato",
                        yAxisTitle:"Antall Besøk"
                    }}
                />
            </div>)}

            {selectedDomain && formattedStartDate && formattedEndDate && (
                <div className="">
                    <AreaChartContainer
                        teamDomain={selectedDomain}
                        chartType="areaChartMulti"
                        endpointType="segmentation"
                        urlParams={{
                            startDate: formattedStartDate,
                            endDate: formattedEndDate,
                            eventType: eventTypeMappings.pageViewedGroupByCountryFilterByPath.eventType,
                            groupBy: eventTypeMappings.pageViewedGroupByCountryFilterByPath.groupBy,
                            filters: eventTypeMappings.pageViewedGroupByCountryFilterByPath.filters,
                        }}
                        dimensions={{
                            width: 500,
                            height: 350,
                        }}
                        titles={{
                            chartTitle:"Antall Besøk gruppert sidesti",
                            xAxisTitle:"Dato",
                            yAxisTitle:"Antall Besøk"
                        }}
                    />
                </div>)}
            {/*
            {selectedDomain && formattedStartDate && formattedEndDate && (
            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="retentionChart"
                    endpointType="retention"
                    urlParams={{
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                        eventType: eventTypeMappings.pageViewed,
                        secondEventType: eventTypeMappings.pageViewed
                    }}
                    dimensions={{
                        width: 500,
                        height: 350,
                    }}
                    titles={{
                        chartTitle:"Antall gjengående besøk",
                        xAxisTitle:"Dato",
                        yAxisTitle:"Antall Besøk"
                    }}
                />
            </div>)}
            */}


            {/* <Test/> */}
        </div>
    </div>
  );
};

export default Home;
