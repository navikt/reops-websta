import '@navikt/ds-css';
import AreaChartCustomAccessibility from '../components/charts/AreaChartCustomAccessibility/AreaChartCustomAccessibility';
import HorizontalBarChartCustomAccessibility from '../components/charts/HorizontalBarChart/HorizontalBarChartCustomAccessibility';
import { Search } from '@navikt/ds-react';
import { Heading, VStack } from '@navikt/ds-react';
import { Link } from 'react-router-dom';

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
      {/* <div className="flex flex-wrap -mx-2">
        <div className="w-1/2 px-2">
          <AreaChartCustomAccessibility />
        </div>
        <div className="w-1/2 px-2">
          <AreaChartCustomAccessibility />
        </div>
        <div className="w-1/2 px-2">
          <HorizontalBarChartCustomAccessibility />
        </div>
        <div className="w-1/2 px-2">
          <HorizontalBarChartCustomAccessibility />
        </div>
      </div> */}
    </div>
  );
};

export default Home;
