import '@navikt/ds-css';
import HorizontalBarChartCustomAccessibility from '../components/charts/HorizontalBarChart/HorizontalBarChartCustomAccessibility';
import { Search } from '@navikt/ds-react';
import { Heading, VStack } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import { VerticalBarChartCustomAccessibilityExample } from '../components/charts/VerticalBarChartCustomAccessibility/VerticalBarChartCustomAccessibility';
import { fetchAmplitudeData } from '../service/AmplitudeApi';
import AreaChartContainer from '../components/charts/AreaChartCustomAccessibility/AreaChartContainer';

const Home = () => {
  const simpleGuide = 'Trykk her for en enkel guide';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        This is the homepage
      </h1>
      <VStack className="items-center mb-6">
        <Link to="/guide" className="text-center hover:underline">
          <Heading size="medium" className="text-blue-600">
            {simpleGuide}
          </Heading>
        </Link>
        <h2 className="text-xl font-bold mb-4 text-center">Søk her:</h2>
      </VStack>
      <form className="w-full max-w-xl mb-8">
        <Search
          label="Søk alle NAV sine sider"
          variant="primary"
          className="w-full"
        />
      </form>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
          <AreaChartContainer chartType={undefined} />
        </div>
        <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">

          <AreaChartContainer chartType={undefined} />
        </div>
        <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
          <HorizontalBarChartCustomAccessibility />
        </div>
        <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
          <VerticalBarChartCustomAccessibilityExample />
        </div>
      </div>
    </div>
  );
};

export default Home;
