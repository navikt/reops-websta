import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React, {useEffect, useState} from "react";
import {fetchSiteimproveData} from "../../service/SiteimproveApi.tsx";

const SiteScores = ({ pageUrl, siteimproveSelectedDomain}) => {

    const [selectedPageId, setSelectedPageId] = useState(null)
    const [scoreOverview, setScoreOverview] =useState(null)
    const [error, setError] = useState<string | null>(null); // Explicitly define type as string or null
    const [reportLink, setReportLink] =useState(null)

    useEffect(() => {
        const fetchData = async () => {

        try {
            const selectedPageData = await fetchSiteimproveData(`/sites/${siteimproveSelectedDomain}/quality_assurance/inventory/pages?url=${pageUrl}`);

            if (selectedPageData && selectedPageData.items && selectedPageData.items.length > 0) {
                const firstItemId = selectedPageData.items[0].id;
                setSelectedPageId(firstItemId);
                console.log("selectedPageId", firstItemId)

                const overviewData = await fetchSiteimproveData(`/sites/${siteimproveSelectedDomain}/dci/overview?page_id=${firstItemId}`);
                if (overviewData && overviewData.a11y && overviewData.qa && overviewData.seo) {
                    setScoreOverview(overviewData);
                    console.log("overviewData",overviewData)
                } else {
                    setError('error')
                    throw new Error('Fant ingen data for side, sjekk om du har skrevet in URL riktig');
                }

                const reportsHref = await fetchSiteimproveData(`/sites/${siteimproveSelectedDomain}/content/pages/${firstItemId}`)
                if(reportsHref._siteimprove.quality_assurance.page_report.href){
                    setReportLink(reportsHref._siteimprove.quality_assurance.page_report.href)
                }
            } else {
                setError('error')
                throw new Error('Fant ingen side, sjekk om du har skrevet in URL riktig');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
            setError('Error når man skulle hente data, sjekk om du har skrevet in URL riktig ' ); // Set error state
        }

        };

        fetchData();


    }, [pageUrl, siteimproveSelectedDomain]);

    if (error) {
        return (
            <div className="mt-4 bg-white p-4 shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Error</h2>
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mt-4 bg-white p-4 shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Scores</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scoreOverview &&  (
                <div className="score-container">
                    <CircularProgressbar value={scoreOverview.a11y.total} text={`${scoreOverview.a11y.total}`} />
                    <p className="text-center mt-2">{`Accessibility`}</p>

                </div>)}
            {scoreOverview &&  (
                <div className="score-container">
                    <CircularProgressbar value={scoreOverview.qa.total} text={`${scoreOverview.qa.total}`} />
                    <p className="text-center mt-2">{`QA(Quality Assurance)`}</p>

                </div>)}
            {scoreOverview &&  (
                <div className="score-container">
                    <CircularProgressbar value={scoreOverview.seo.total} text={`${scoreOverview.seo.total}`} />
                    <p className="text-center mt-2">{`SEO`}</p>

                </div>)}
            {scoreOverview &&  (
                <div className="score-container">
                    <CircularProgressbar value={scoreOverview.total} text={`${scoreOverview.total}`} />
                    <p className="text-center mt-2">{`Total Page Score`}</p>

                </div>)}
                </div>
                    {reportLink && (
                        <div className="mt-4 bg-white p-4 shadow-lg rounded-lg">
                            <h2 className="text-xl font-semibold mb-2">Quality Assurance Report</h2>
                            <a href={reportLink} target="_blank" rel="noopener noreferrer">View Quality Assurance Report</a>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default SiteScores;
