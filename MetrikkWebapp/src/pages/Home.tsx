import '@navikt/ds-css';
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
import {eventTypeMappings} from "../components/charts/fetchUrlConstructor";
import {SearchComponent} from "../components/SearchComponent/SearchComponent.tsx";
import {SetStateAction, useCallback, useState} from "react";

const Home = () => {
    const simpleGuide = 'Trykk her for en enkel guide';

    // Kan hende callback blir brukt til å velge domene
    const [selectedDomain, setSelectedDomain] = useState("100002286");

    const handleDomainSelect = useCallback((domain) => {
        setSelectedDomain(domain);
    }, []);

    console.log(`from home`,selectedDomain)

    return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        This is the homepage
      </h1>
      <SearchComponent onDomainSelect={handleDomainSelect}/>
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

            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: "20240101",
                        endDate: "20240130",
                        eventType: eventTypeMappings.pageViewed
                    }}
                />
            </div>


            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: "20240101",
                        endDate: "20240130",
                        eventType: eventTypeMappings.pageViewedGroupByReferrer
                    }}
                />
            </div>
            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: "20240101",
                        endDate: "20240130",
                        eventType: eventTypeMappings.pageViewedGroupByPagePath
                    }}
                />
            </div>
            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: "20240101",
                        endDate: "20240130",
                        eventType: eventTypeMappings.pageViewedGroupByCity
                    }}
                />
            </div>
            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: "20240101",
                        endDate: "20240130",
                        eventType: eventTypeMappings.pageViewedGroupByLanguage
                    }}
                />
            </div>
            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: "20240101",
                        endDate: "20240130",
                        eventType: eventTypeMappings.pageViewedGroupByCountry
                    }}
                />
            </div>


            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: "20240101",
                        endDate: "20240130",
                        eventType: eventTypeMappings.pageViewedGroupByDayOfWeek
                    }}
                />
            </div>



            {/*
        <div className="">
          <HorizontalBarChartCustomAccessibility />
        </div>
        <div className="">
          <VerticalBarChartCustomAccessibilityExample />
        </div>
        */}

            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: "20240101",
                        endDate: "20240130",
                        eventType: eventTypeMappings.pageViewedGroupByHourOfDay
                    }}
                />
            </div>
            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="areaChartMulti"
                    endpointType="segmentation"
                    urlParams={{
                        startDate: "20240309",
                        endDate: "20240408",
                        eventType: eventTypeMappings.pageViewedGroupByCity
                    }}
                />
            </div>

            <div className="">
                <AreaChartContainer
                    teamDomain={selectedDomain}
                    chartType="retentionChart"
                    endpointType="retention"
                    urlParams={{
                        startDate: "20240205",
                        endDate: "20240304",
                        eventType: eventTypeMappings.pageViewed,
                        secondEventType: eventTypeMappings.pageViewed
                    }}
                />
            </div>


            {/* <Test/> */}
        </div>
    </div>
  );
};

export default Home;
