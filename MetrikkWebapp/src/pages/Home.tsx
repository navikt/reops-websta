import '@navikt/ds-css';
import AreaChartCustomAccessibility from '../components/charts/AreaChartCustomAccessibility/AreaChartCustomAccessibility';
import HorizontalBarChartCustomAccessibility from '../components/charts/HorizontalBarChart/HorizontalBarChartCustomAccessibility';
import { Search } from '@navikt/ds-react';
import { Heading, VStack } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import {VerticalBarChartCustomAccessibilityExample} from "../components/charts/VerticalBarChartCustomAccessibility/VerticalBarChartCustomAccessibility";
import {fetchAmplitudeData} from "../service/AmplitudeApi";

import AreaChartContainer from "../components/charts/AreaChartCustomAccessibility/AreaChartContainer";

const Home = () => {
  const simpleGuide = 'Trykk her for en enkel guide';
    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
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
        <h1 className="text-2xl font-bold mb-4 text-center">This is the homepage</h1>
            {/*TODO: Charts er lenger til høyre når de er centered fordi centrering starter på y-axis */}
            <div className="flex flex-row justify-between items-center flex-wrap">
                <div className="">
                    <AreaChartContainer />
                </div>
                <div className="">
                    <AreaChartContainer />
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
