import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React, {useEffect, useState} from "react";
import {fetchSiteimproveData} from "../../service/SiteimproveApi.tsx";

const SiteScores = ({ pageUrl, siteimproveSelectedDomain}) => {

    const [selectedPageId, setSelectedPageId] = useState(null)
    const [scoreOverview, setScoreOverview] =useState(null)

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
                    throw new Error('Required properties missing in overviewData');
                }
            } else {
                throw new Error('No items found in response');
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
        };

        fetchData();


    }, [pageUrl, siteimproveSelectedDomain]);

    return (
        <div>
            <div className="mt-4 bg-white p-4 shadow-lg rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Scores</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scoreOverview &&  (
                <div className="score-container">
                    <CircularProgressbar value={scoreOverview.a11y.total} text={`${scoreOverview.a11y.total}`} />
                    <p className="text-center mt-2">{`accessibility`}</p>

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
            </div>
        </div>
    );
};

export default SiteScores;
