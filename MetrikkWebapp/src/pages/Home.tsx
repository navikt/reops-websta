import '@navikt/ds-css';
import { format } from 'date-fns';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { URLSearchComponent } from '../components/SearchComponent/URLSearchComponent.tsx';
import { RangeDatePicker } from '../components/DatePicker/DatePicker.tsx';
import SiteScores from '../components/Siteimprove/SiteScores.tsx';
import SimpleOverviewChartBoard from '../components/Amplitude/SimpleOverviewChartBoard.tsx';
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@navikt/ds-react";
import AreaChartContainer from "../components/charts/AreaChartCustomAccessibility/AreaChartContainer.tsx";
import {eventTypeMappings2} from "../components/charts/dynamicUrlConstructor/EventTypeMappings2.ts";
import AreaChartCustomAccessibility
  from "../components/charts/AreaChartCustomAccessibility/AreaChartCustomAccessibility.tsx";

const Home = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const handleDomainSelect = useCallback((domain: string) => {
    setSelectedDomain(domain);
  }, []);
  const siteScoresRef = useRef<HTMLDivElement>(null);
  const [selectedPath, setSelectedPath] = useState('');
  const handlePathSelection = useCallback((path: string) => {
    setSelectedPath(path);
  }, []);
  const [selectedPageUrl, setSelectedPageUrl] = useState('');
  const handlePageUrl = useCallback((pageUrl: string) => {
    setSelectedPageUrl(pageUrl);
  }, []);
  const [selectedSiteimproveDomain, setSelectedSiteimproveDomain] = useState('');
  const handleSiteimproveDomain = useCallback((siteimproveDomain: string) => {
    setSelectedSiteimproveDomain(siteimproveDomain);
  }, []);

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

  // url routing ---------------------------------------------------------------------------------------------------

  const location = useLocation();
  const navigate = useNavigate();
  const currentUrlRef = useRef(window.location.href);
  const isInitialLoadRef = useRef(true);

  const updateUrl = useCallback(() => {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    params.set('domain', selectedDomain);
    params.set('path', selectedPath);
    params.set('url', selectedPageUrl);
    params.set('startDate', formattedStartDate);
    params.set('endDate', formattedEndDate);
    params.set('siteimproveDomain', selectedSiteimproveDomain);

    const newUrl = `${url.pathname}?${params.toString()}`;
    if (newUrl !== currentUrlRef.current) {
      currentUrlRef.current = newUrl;
      navigate(newUrl, { replace: true });
    }
  }, [selectedDomain, selectedPath, selectedPageUrl, formattedStartDate, formattedEndDate, selectedSiteimproveDomain, navigate]);

  useEffect(() => {
    if (!isInitialLoadRef.current) {
      updateUrl();
    } else {
      isInitialLoadRef.current = false;
    }
  }, [updateUrl]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const domain = params.get('domain') || '';
    const path = params.get('path') || '';
    const pageUrl = params.get('url') || '';
    const startDate = params.get('startDate') || defaultFormattedStartDate;
    const endDate = params.get('endDate') || defaultFormattedEndDate;
    const siteimproveDomain = params.get('siteimproveDomain') || '';

    setSelectedSiteimproveDomain(siteimproveDomain);
    setSelectedDomain(domain);
    setSelectedPath(path);
    setSelectedPageUrl(pageUrl);
    setFormattedStartDate(startDate);
    setFormattedEndDate(endDate);
  }, [location.search]);


  const [buttonText, setButtonText] = useState('Kopier URL');

  const copyUrlToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
        .then(() => {
          console.log('URL copied to clipboard');
          setButtonText('URL er kopiert! Del den med andre på teamet');
          setTimeout(() => {
            setButtonText('Kopier URL');
          }, 10000);
        })
        .catch((err) => {
          console.error('Failed to copy URL: ', err);
        });
  };

  //=================================================================================================================

  const urlFilters = useMemo(() => [
    {
      subprop_type: 'event',
      subprop_key: '[Amplitude] Page Path',
      subprop_op: 'contains',
      subprop_value: [selectedPath],
    },
  ], [selectedPath]);

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
                  pageUrl={selectedPageUrl}
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
              urlFilters ={urlFilters}
          />
        </div>
        {/* {selectedDomain && (
        <h2 className="text-4xl font-semi-bold mb-1 text-left">Siteimprove</h2>
      )} */}

        {selectedDomain && (
            <div className="flex justify-center items-center mt-16">
              <Button variant="primary" onClick={copyUrlToClipboard}>
                {buttonText}
              </Button>
            </div>
        )}
      </div>
  );
};

export default Home;