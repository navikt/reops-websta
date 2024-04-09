import { useState, useEffect } from 'react';
import { fetchSiteimproveData } from '../service/SiteimproveApi';
import { UNSAFE_Combobox, Button  } from '@navikt/ds-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


interface SiteItem {
  id: number;
  site_name: string;
  url: string;
  pages: number;
  policies: number;
  product: string[];
  _links: {
    site: {
      href: string;
    };
  };
}

interface SiteScores {
  accessibility_score: number;
  dci_score: number;
  qa_score: number;
  seo_score: number;
}

const SiteimproveSite = () => {
  const [sites, setSites] = useState<SiteItem[]>([]);
  const [selectedSite, setSelectedSite] = useState<SiteItem | null>(null);
  const [scores, setScores] = useState<SiteScores | null>(null);
  const [showScores, setShowScores] = useState(false); // New state for controlling display




  useEffect(() => {
   fetchSiteimproveData('/sites?page=1&page_size=100').then(response => {
    setSites(response?.items || []);

   });

  }, [scores]);
  

  const handleSiteSelect = (event: React.SyntheticEvent<HTMLInputElement>) => {
    console.log("Event:", event); // Check the structure of the event
    console.log("Event Value:", event.currentTarget.value); // Directly log the value
    const siteName = event?.currentTarget.value;
    const site = sites.find(s => s.site_name === siteName);
    setSelectedSite(site ?? null);
    console.log("Selected site:", site); // Debugging line
    
};

  const handleFetchhBtn = async () => {
    if (selectedSite) {
      await fetchScores(selectedSite.id);
      setShowScores(true); // Show scores after fetching
    } else {
      console.log("No site selected");
    }
  };

  const fetchScores = async (siteId: number) => {
    try {
        // Ensure the URL is correctly constructed without typos
        const endpoint = `/sites/${siteId}/dci/history?page=1&page_size=100`;
        const response = await fetchSiteimproveData(endpoint);
        if (response && response.items && response.items.length > 0) {
            // Assuming the most recent scores are at the start of the array
            const latestScores = response.items[0];
            setScores({
                accessibility_score: latestScores.accessibility_score,
                dci_score: latestScores.dci_score,
                qa_score: latestScores.qa_score,
                seo_score: latestScores.seo_score,
            });
        } else {
            // Handle the case where no scores are available
            setScores(null);
        }
    } catch (error) {
        console.error("Error fetching scores:", error);
        setScores(null);
    }
};

  

  return (
    <div className="siteimprove-container relative">
      <h1>Siteimprove Sites</h1>
      <UNSAFE_Combobox
        label
        aria-label="Søk på siden"
        options={sites.map(site => site.site_name)}
        onSelect={handleSiteSelect} // Pass the event handler reference directly
        shouldAutocomplete={true}
    />
    <Button variant="primary" onClick={handleFetchhBtn}>
  Fetch Scores
    </Button>


      {/* Scores Display */}
      {showScores && scores && (
        <div className="mt-4 bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Scores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Accessibility Score */}
            <div className="score-container">
              <CircularProgressbar
                value={scores.accessibility_score}
                text={`${scores.accessibility_score}%`}
              />
              <p className="text-center mt-2">Accessibility Score</p>
            </div>
  
            {/* DCI Score */}
            <div className="score-container">
              <CircularProgressbar
                value={scores.dci_score}
                text={`${scores.dci_score}%`}
                /* Other styles and attributes can be added here */
              />
              <p className="text-center mt-2">DCI Score</p>
            </div>
  
            {/* QA Score */}
            <div className="score-container">
              <CircularProgressbar
                value={scores.qa_score}
                text={`${scores.qa_score}%`}
              />
              <p className="text-center mt-2">QA Score</p>
            </div>
  
            {/* SEO Score */}
            <div className="score-container">
              <CircularProgressbar
                value={scores.seo_score}
                text={`${scores.seo_score}%`}
              />
              <p className="text-center mt-2">SEO Score</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteimproveSite;
