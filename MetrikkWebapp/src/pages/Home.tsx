import '@navikt/ds-css';
import { format } from 'date-fns';
import { useCallback, useEffect, useRef, useState } from 'react';
import { URLSearchComponent } from '../components/SearchComponent/URLSearchComponent.tsx';
import { RangeDatePicker } from '../components/DatePicker/DatePicker.tsx';
import SiteScores from '../components/Siteimprove/SiteScores.tsx';
import SimpleOverviewChartBoard from '../components/Amplitude/SimpleOverviewChartBoard.tsx';


const Home = () => {
  // Kan hende callback blir brukt til å velge domene
  const [selectedDomain, setSelectedDomain] = useState('');

  const handleDomainSelect = useCallback((domain: string) => {
    setSelectedDomain(domain);
  }, []);

  const siteScoresRef = useRef<HTMLDivElement>(null);

  // Kan hende callback blir brukt til å velge domene
  const [selectedPath, setSelectedPath] = useState('');

  const handlePathSelection = useCallback((path: string) => {
    setSelectedPath(path);
  }, []);

  const [selectedPageUrl, setSelectedPageUrl] = useState('');

  const handlePageUrl = useCallback((pageUrl: string) => {
    setSelectedPageUrl(pageUrl);
  }, []);

  const [selectedSiteimproveDomain, setSelectedSiteimproveDomain] =
    useState('');

  const handleSiteimproveDomain = useCallback((siteimproveDomain: string) => {
    setSelectedSiteimproveDomain(siteimproveDomain);
  }, []);

  // const standardStartDate = new Date(new Date().setDate(standardStartDate.getDate()-30));
  // const standardEndDate = new Date();

  const defaultStartDate = new Date(
    new Date().setDate(new Date(Date.now()).getDate() - 30)
  );
  const defaultEndDate = new Date(Date.now());
  const defaultFormattedStartDate = format(defaultStartDate, 'yyyyMMdd');
  const defaultFormattedEndDate = format(defaultEndDate, 'yyyyMMdd');

  const [formattedStartDate, setFormattedStartDate] = useState(
    defaultFormattedStartDate
  );
  const [formattedEndDate, setFormattedEndDate] = useState(
    defaultFormattedEndDate
  );

  // const navigate = useNavigate();
  // navigate(`/search?input=${encodeURIComponent(selectedPageUrl)}?startDate=${formattedStartDate}?endDate=${formattedEndDate}`);

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

  const scrollToSiteScores = () => {
    const siteScoresPosition =
      siteScoresRef.current?.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = siteScoresPosition - window.innerHeight / 3.5;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  const [isValidUrl, setIsValidUrl] = useState(false);

  useEffect(() => {
    if (isValidUrl) {
      scrollToSiteScores();
    }
  }, [isValidUrl]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Webstatistikk 📊</h1>
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
              onValidUrl={setIsValidUrl}
            />
          </div>
        </div>
        {selectedDomain && (
          <div className="flex items-center justify-center w-full max-w-lg">
            <RangeDatePicker onDateChange={handleDateChange} />
          </div>
        )}
      </div>

      {/* <VStack className="items-center mb-3">
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
      {/* TODO: Charts er lenger til høyre når de er centered fordi centrering starter på y-axis */}

      {/* {selectedDomain && (
        <div className="mb-8">
          <Button onClick={scrollToSiteScores}>Poengsum</Button>
        </div>
      )} */}
      {/* {selectedDomain && (
        <h2 className="text-4xl font-semi-bold mb-1 text-left">Amplitude</h2>
      )} */}

      {selectedDomain && (
        <div
          ref={siteScoresRef}
          className="p-4 w-full bg-white border border-blue-200 rounded shadow-lg md:col-span-2 mb-6"
        >
          <SiteScores
            pageUrl={selectedPageUrl}
            siteimproveSelectedDomain={selectedSiteimproveDomain}
          />
        </div>
      )}

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 ">
        <SimpleOverviewChartBoard
          selectedDomain={selectedDomain}
          formattedStartDate={formattedStartDate}
          formattedEndDate={formattedEndDate}
          selectedPath={selectedPath}
        />
      </div>
      {/* {selectedDomain && (
        <h2 className="text-4xl font-semi-bold mb-1 text-left">Siteimprove</h2>
      )} */}
    </div>
  );
};

export default Home;
