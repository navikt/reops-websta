import '@navikt/ds-css';
import HorizontalBarChartCustomAccessibility from '../components/charts/HorizontalBarChart/HorizontalBarChartCustomAccessibility';
import { Search } from '@navikt/ds-react';
import { Heading, VStack } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import { VerticalBarChartCustomAccessibilityExample } from '../components/charts/VerticalBarChartCustomAccessibility/VerticalBarChartCustomAccessibility';

import AreaChartContainer from '../components/charts/AreaChartCustomAccessibility/AreaChartContainer';
import {eventTypeMappings} from "../components/charts/fetchUrlConstructor";
import TableChart from "../components/charts/TableChart/TableChart.tsx";


const Home = () => {
  const simpleGuide = 'Trykk her for en enkel guide';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        This is the homepage
      </h1>
      <VStack className="items-center mb-3">
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
      {/*TODO: Charts er lenger til høyre når de er centered fordi centrering starter på y-axis */}
      <div className="flex flex-row justify-between items-center flex-wrap">

          <div>
              <TableChart
              />
          </div>{/*
       <div className="">
            <AreaChartContainer
                chartType="areaChart"
                endpointType="segmentation"
                urlParams={{
                    startDate: "20240101",
                    endDate: "20240130",
                    eventType: eventTypeMappings.pageViewed
                }}
            />
        </div>{/*
        <div className="">
            <AreaChartContainer
                chartType="areaChart"
                endpointType="segmentation"
                urlParams={{
                    startDate: "20240101",
                    endDate: "20240130",
                    eventType: eventTypeMappings.pageViewedGroupByReferringDomain
                }}
            />
        </div>
          <div className="">
              <AreaChartContainer
                  chartType="areaChart"
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
                  chartType="areaChart"
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
                  chartType="areaChart"
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
                  chartType="areaChart"
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
                  chartType="areaChart"
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
                  chartType="areaChart"
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
                  chartType="areaChart"
                  endpointType="segmentation"
                  urlParams={{
                      startDate: "20240101",
                      endDate: "20240130",
                      eventType: eventTypeMappings.pageViewedGroupByDayOfWeek
                  }}
              />
          </div>*/}


          <div className="">
              <AreaChartContainer
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
                  chartType="areaChart"
                  endpointType="segmentation"
                  urlParams={{
                      startDate: "20240101",
                      endDate: "20240130",
                      eventType: eventTypeMappings.pageViewed
                  }}
              />
          </div>
        <div className="">
          <HorizontalBarChartCustomAccessibility />
        </div>
        <div className="">
          <VerticalBarChartCustomAccessibilityExample />
        </div>
      </div>
    </div>
  );
};

export default Home;
