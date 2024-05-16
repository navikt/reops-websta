import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React, { useEffect, useState } from 'react';
import { fetchSiteimproveData } from '../../service/SiteimproveApi.tsx';

const SiteScores = ({ pageUrl, siteimproveSelectedDomain }) => {
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [scoreOverview, setScoreOverview] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [reportLink, setReportLink] = useState(null);

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
          'Error når man skulle hente data, sjekk om du har skrevet in URL riktig '
        );
      }
    };

    fetchData();
  }, [pageUrl, siteimproveSelectedDomain]);

  if (error) {
    return (
      <div className="mt-4 bg-white p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Error</h2>
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
    <div className="w-full">
      <div className="mt-4 bg-white p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2" style={{ color: '#000000' }}>
          Poengsum (av 100)
        </h2>
        <hr className="my-4 border-t-2 border-gray-300" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {scoreOverview && (
            <div className="flex flex-col items-center justify-center w-full p-4">
              <div className="w-40 h-40">
                <CircularProgressbar
                  value={scoreOverview.qa.total}
                  text={`${scoreOverview.qa.total}`}
                  aria-label="Kvalitetsikring av innhold score"
                  styles={buildStyles({
                    pathColor: getColor(scoreOverview.qa.total),
                    textColor: '#000000',
                    textSize: '20px',
                    fontWeight: 'bold',
                  })}
                />
              </div>
              <p
                className="text-center mt-2 font-bold text-lg"
                style={{ color: '#000000' }}
              >{`Kvalitetsikring av innhold`}</p>
            </div>
          )}
          {scoreOverview && (
            <div className="flex flex-col items-center justify-center w-full p-4">
              <div className="w-40 h-40">
                <CircularProgressbar
                  value={scoreOverview.a11y.total}
                  text={`${scoreOverview.a11y.total}`}
                  aria-label="Universell utforming score"
                  styles={buildStyles({
                    pathColor: getColor(scoreOverview.a11y.total),
                    textColor: '#000000',
                    textSize: '20px',
                    fontWeight: 'bold',
                  })}
                />
              </div>
              <p
                className="text-center mt-2 font-bold text-lg"
                style={{ color: '#000000' }}
              >{`Universell utforming`}</p>
            </div>
          )}
          {scoreOverview && (
            <div className="flex flex-col items-center justify-center w-full p-4">
              <div className="w-40 h-40">
                <CircularProgressbar
                  value={scoreOverview.seo.total}
                  text={`${scoreOverview.seo.total}`}
                  aria-label="Søkemotor-optimal score"
                  styles={buildStyles({
                    pathColor: getColor(scoreOverview.seo.total),
                    textColor: '#000000',
                    textSize: '20px',
                    fontWeight: 'bold',
                  })}
                />
              </div>
              <p
                className="text-center mt-2 font-bold text-lg"
                style={{ color: '#000000' }}
              >{`Søkemotor-optimal`}</p>
            </div>
          )}
          {scoreOverview && (
            <div className="flex flex-col items-center justify-center w-full p-4">
              <div className="w-40 h-40">
                <CircularProgressbar
                  value={scoreOverview.total}
                  text={`${scoreOverview.total}`}
                  aria-label="Totalt sett score"
                  styles={buildStyles({
                    pathColor: getColor(scoreOverview.total),
                    textColor: '#000000',
                    textSize: '20px',
                    fontWeight: 'bold',
                  })}
                />
              </div>
              <p
                className="text-center mt-2 font-bold text-lg"
                style={{ color: '#000000' }}
              >{`Totalt sett`}</p>
            </div>
          )}
        </div>
        <hr className="my-4 border-t-2 border-gray-300" />
        {reportLink && (
          <div className="mt-4 bg-white p-4 rounded-lg justify-center items-center">
            <a href={reportLink} target="_blank" rel="noopener noreferrer">
              <p className="text-xl text-center font-semibold mb-2 text-blue-700">
                Detaljert poengsumrapport
              </p>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiteScores;
