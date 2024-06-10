import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React, {useEffect, useState} from 'react';
import {fetchSiteimproveData} from '../../service/SiteimproveApi.tsx';

const SiteScores = ({pageUrl, siteimproveSelectedDomain}) => {
    const [selectedPageId, setSelectedPageId] = useState(null);
    const [scoreOverview, setScoreOverview] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const [reportLink, setReportLink] = useState(null);

    const roundToOneDecimal = (num: number) => {
        return Math.round(num * 10) / 10;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const selectedPageData = await fetchSiteimproveData(
                    `/sites/${siteimproveSelectedDomain}/quality_assurance/inventory/pages?url=${pageUrl}`
                );

                if (
                    selectedPageData &&
                    selectedPageData.items &&
                    selectedPageData.items.length > 0
                ) {
                    const firstItemId = selectedPageData.items[0].id;
                    setSelectedPageId(firstItemId);

                    const overviewData = await fetchSiteimproveData(
                        `/sites/${siteimproveSelectedDomain}/dci/overview?page_id=${firstItemId}`
                    );
                    if (
                        overviewData &&
                        overviewData.a11y &&
                        overviewData.qa &&
                        overviewData.seo
                    ) {
                        setScoreOverview(overviewData);
                    } else {
                        setError('error');
                        throw new Error(
                            'Fant ingen data for side, sjekk om du har skrevet in URL riktig'
                        );
                    }

                    const reportsHref = await fetchSiteimproveData(
                        `/sites/${siteimproveSelectedDomain}/content/pages/${firstItemId}`
                    );
                    if (reportsHref._siteimprove.quality_assurance.page_report.href) {
                        setReportLink(
                            reportsHref._siteimprove.quality_assurance.page_report.href
                        );
                    }
                } else {
                    setError('error');
                    throw new Error(
                        'Fant ingen side, sjekk om du har skrevet in URL riktig'
                    );
                }
            } catch (error) {
                console.error('Error fetching data: ', error);
                setError(
                    'Klarte ikke å hente data fra Siteimprove, sjekk om du har skrevet in URL riktig. '
                );
            }
        };

        fetchData();
    }, [pageUrl, siteimproveSelectedDomain]);

    if (error) {
        return (
            <div className="mt-4 bg-white p-4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Feil med Siteimprove</h2>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    const getColor = (score) => {
        if (score > 75) return '#4caf50';
        if (score > 50) return '#ffeb3b';
        if (score > 25) return '#f44336';
        return '#ff9800';
    };

    return (
        <>
            {!error && (
                <>
                    <div className="w-full">
                        <div className="mt-2 bg-white p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-2" style={{color: '#000000'}}>
                                Poengsum (av 100)
                            </h2>
                            <hr className="my-4 border-t-2 border-gray-300"/>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {scoreOverview && (
                                    <div className="flex flex-col items-center justify-center w-full p-4">
                                        <div className="w-40 h-40">
                                            <CircularProgressbar
                                                className="text-xl font-bold"
                                                value={scoreOverview.qa.total}
                                                text={`${roundToOneDecimal(scoreOverview.qa.total)}`}
                                                aria-label="Kvalitetsikring av innhold score"
                                                styles={buildStyles({
                                                    pathColor: getColor(scoreOverview.qa.total),
                                                    textColor: '#000000',
                                                })}
                                            />
                                        </div>
                                        <h3 className="text-center mt-3 font-bold text-xl">{`Kvalitetsikring av innhold`}</h3>
                                    </div>
                                )}
                                {scoreOverview && (
                                    <div className="flex flex-col items-center justify-center w-full p-4">
                                        <div className="w-40 h-40">
                                            <CircularProgressbar
                                                className="text-xl font-bold"
                                                value={scoreOverview.a11y.total}
                                                text={`${roundToOneDecimal(scoreOverview.a11y.total)}`}
                                                aria-label="Universell utforming score"
                                                styles={buildStyles({
                                                    pathColor: getColor(scoreOverview.a11y.total),
                                                    textColor: '#000000',
                                                })}
                                            />
                                        </div>
                                        <h3 className="text-center mt-3 font-bold text-xl">{`Universell utforming`}</h3>
                                    </div>
                                )}
                                {scoreOverview && (
                                    <div className="flex flex-col items-center justify-center w-full p-4">
                                        <div className="w-40 h-40">
                                            <CircularProgressbar
                                                className="text-xl font-bold"
                                                value={scoreOverview.seo.total}
                                                text={`${roundToOneDecimal(scoreOverview.seo.total)}`}
                                                aria-label="Søkemotor-optimal score"
                                                styles={buildStyles({
                                                    pathColor: getColor(scoreOverview.seo.total),
                                                    textColor: '#000000',
                                                })}
                                            />
                                        </div>
                                        <h3 className="text-center mt-3 font-bold text-xl">{`Søkemotoroptimalisering`}</h3>
                                    </div>
                                )}
                                {scoreOverview && (
                                    <div className="flex flex-col items-center justify-center w-full p-4">
                                        <div className="w-40 h-40">
                                            <CircularProgressbar
                                                className="text-xl font-bold"
                                                value={scoreOverview.total}
                                                text={`${roundToOneDecimal(scoreOverview.total)}`}
                                                aria-label="Total poengsum"
                                                styles={buildStyles({
                                                    pathColor: getColor(scoreOverview.total),
                                                    textColor: '#000000',
                                                })}
                                            />
                                        </div>
                                        <h3
                                            className="text-center mt-3 font-bold text-lg"
                                            style={{color: '#000000'}}
                                        >{`Snittpoeng`}</h3>
                                    </div>
                                )}
                            </div>
                            <hr className="my-4 border-t-2 border-gray-300"/>
                            {reportLink && (
                                <div className="bg-white pl-0 pt-4 ">
                                    {/*              <h3 className="font-bold text-xl text-center">
                Siteimprove rapport
              </h3>*/}
                                    <div
                                        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                        <a href={reportLink} target="_blank" rel="noopener noreferrer">
                                            <p className="text-xl font-bold underline mb-2 text-blue-700">
                                                Rapport med forklaringer (🔐)
                                            </p>
                                        </a>
                                        <a href="https://jira.adeo.no/plugins/servlet/desk/portal/581/create/2641"
                                           target="_blank"
                                           rel="noopener noreferrer">
                                            <p className="text-xl  font-bold underline text-blue-700">
                                                Få Siteimprove tilgang
                                            </p>
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )};
        </>
    )
};

export default SiteScores;
