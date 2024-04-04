import { useState, useEffect, useRef } from 'react';
import { fetchSiteimproveData } from '../service/SiteimproveApi';
import { Search, Dropdown } from '@navikt/ds-react';
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
  const [filteredSites, setFilteredSites] = useState<SiteItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scores, setScores] = useState<SiteScores | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1) // This is for tracking the focused item
  const [selectedSiteId, setSelectedSiteId] = useState<number | null>(null); // New state for selected site ID


  useEffect(() => {
    fetchSiteimproveData('/sites?page=1&page_size=100').then(response => {
      setSites(response?.items || []);
      setFilteredSites(response?.items || []);
    });
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setFilteredSites(sites.filter(site =>
      site.site_name.toLowerCase().includes(value.toLowerCase())
    ));
    setActiveIndex(-1);
  };

  const handleSuggestionClick = (siteId: number) => {
    const site = sites.find(site => site.id === siteId)
    if (site) { 
    setSearchTerm(site.site_name)
    setIsFocused(false);
    setSelectedSiteId(siteId)
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedSiteId) {
        fetchScores(selectedSiteId);
    } else {

    }
  }

  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < filteredSites.length) {
        const siteName = filteredSites[activeIndex].site_name;
        setSearchTerm(siteName);
    }
  }, [activeIndex, filteredSites]);

  const handleFocus = () => {
    setIsFocused(true);
  };

    const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200);
    };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  const fetchScores = async (siteId: number) => {
    try {
      const response = await fetchSiteimproveData(`/sites/${siteId}/dci/history`);
      if (response && response.items && response.items.length > 0) {
        const latestScores = response.items[response.items.length - 1];
        setScores({
          accessibility_score: latestScores.accessibility_score,
          dci_score: latestScores.dci_score,
          qa_score: latestScores.qa_score,
          seo_score: latestScores.seo_score
        });
      } else {
        //If there are no scores to be shown
        setScores(null)
      }
    } catch (error) {
      console.error("Error fetching scores:", error);
      setScores(null);
    }
  };

  return (
    <div ref={wrapperRef} className="siteimprove-container relative">
      <h1>Siteimprove Sites</h1>
      <form role="search" onSubmit={handleFormSubmit}>
        <Search
          label="Search sites"
          variant="primary"
          className="search-bar mb-4 w-full"
          value={searchTerm}
          onChange={(value) => handleSearchChange(value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </form>
      {isFocused && filteredSites.length > 0 && (
        <ul className="suggestions-dropdown relative z-50 w-full bg-white shadow-md mt-1 max-h-60 overflow-auto">
          {filteredSites.map((site, index) => (
            <li
              key={site.id}
              onClick={() => handleSuggestionClick(site.id)}
              onMouseEnter={() => setActiveIndex(index)}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${index === activeIndex ? 'bg-gray-100' : ''}`}
            >
              {site.site_name}
            </li>
          ))}
        </ul>
      )}
      {/* Scores Display */}
      {scores && (
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
