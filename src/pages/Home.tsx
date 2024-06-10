import '@navikt/ds-css';
import {format} from 'date-fns';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {URLSearchComponent} from '../components/SearchComponent/URLSearchComponent.tsx';
import {RangeDatePicker} from '../components/DatePicker/DatePicker.tsx';
import SiteScores from '../components/Siteimprove/SiteScores.tsx';
import SimpleOverviewChartBoard from '../components/Amplitude/SimpleOverviewChartBoard.tsx';
import NavnoSimpleOverviewChartBoard from '../components/Amplitude/NavnoSimpleOverviewChartBoard.tsx';
import {useLocation, useNavigate} from "react-router-dom";
import {Button} from "@navikt/ds-react";

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

    const updateUrl = () => {
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
            navigate(newUrl, {replace: true});
        }
    };

    const [buttonText, setButtonText] = useState('Kopier lenke');
    const [buttonText30, setButtonText30] = useState(' Kopier 30-dagers lenke');

    const copyUrlToClipboard = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => {
                console.log('URL copied to clipboard');
                setButtonText('Delingslenken er kopiert!');
                setTimeout(() => {
                    setButtonText('Lenke for valgte datoer');
                }, 10000);
            })
            .catch((err) => {
                console.error('Klarte ikke å kopiere delingslenken: ', err);
            });
    };

    const copyUrlToClipboard30days = () => {
        const url = new URL(window.location.href);
        const params = url.searchParams;

        // Remove startDate and endDate parameters
        params.delete('startDate');
        params.delete('endDate');

        const newUrl = `${window.location.origin}${url.pathname}?${params.toString()}`;

        navigator.clipboard.writeText(newUrl)
            .then(() => {
                console.log('URL copied to clipboard');
                setButtonText30('Delingslenken er kopiert!');
                setTimeout(() => {
                    setButtonText30('Lenke for siste 30 dager');
                }, 10000);
            })
            .catch((err) => {
                console.error('Klarte ikke å kopiere delingslenken: ', err);
            });
    };

    useEffect(() => {
        if (!isInitialLoadRef.current) {
            updateUrl();
        } else {
            isInitialLoadRef.current = false;
        }
    }, [updateUrl]);

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
        <div className={`flex flex-col  ${!selectedDomain ? 'items-center justify-center mt-24' : ''} p-6`}>
            <h1 className={`text-4xl font-bold mb-6`}>Webstatistikk 📊</h1>

            <div
                className={`flex flex-col ${!selectedDomain ? 'items-center justify-center' : ''} pt-8 pb-5 space-y-6 w-full`}>
                {/* Search Component */}
                <div className="flex flex-col w-full max-w-xl">
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
                    <div className={`flex w-full max-w-lg`}>
                        <RangeDatePicker onDateChange={handleDateChange}/>
                    </div>
                )}
            </div>

            {selectedSiteimproveDomain != "false" && (
                <>
                    {selectedDomain && (
                        <div
                            ref={siteScoresRef}
                        >
                            <SiteScores
                                pageUrl={selectedPageUrl}
                                siteimproveSelectedDomain={selectedSiteimproveDomain}
                            />
                        </div>
                    )}
                </>
            )}

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 ">
                {/*Dersom nav.no viser den en egen rapport*/}
                {selectedDomain === "100000009" ?
                    (<NavnoSimpleOverviewChartBoard
                        selectedDomain={selectedDomain}
                        formattedStartDate={formattedStartDate}
                        formattedEndDate={formattedEndDate}
                        selectedPath={selectedPath}
                    />) :
                    (<SimpleOverviewChartBoard
                        selectedDomain={selectedDomain}
                        formattedStartDate={formattedStartDate}
                        formattedEndDate={formattedEndDate}
                        urlFilters={urlFilters}
                    />)
                }
            </div>

            {selectedDomain && (
                <>
                  <h2 className="text-2xl font-bold mt-16">Delingslenker</h2>
                  <div className="flex flex-col sm:flex-row mt-6 mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button variant="primary" onClick={copyUrlToClipboard} className="max-w-xs sm:max-w-none">
                      {buttonText}
                    </Button>
                    <Button variant="primary" onClick={copyUrlToClipboard30days} className="max-w-xs sm:max-w-none">
                      {buttonText30}
                    </Button>
                  </div>
                  <p className="py-2">30-dagers lenke: Gir deg statistikk for de siste 30 dagene, selv om du har valgt andre datoer. </p>
                </>
            )}
        </div>
    );
};

export default Home;