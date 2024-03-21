import { useState, useEffect, useRef } from 'react';
import { fetchSiteimproveData } from '../service/SiteimproveApi';
import { Search } from '@navikt/ds-react';

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

  useEffect(() => {
    fetchSiteimproveData('/sites').then(response => {
      setSites(response?.items || []);
      setFilteredSites(response?.items || []);
    });
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setFilteredSites(sites.filter(site =>
      site.site_name.toLowerCase().includes(value.toLowerCase())
    ));
  };

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
        const latestScores = response.items[0];
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

  const handleSuggestionClick = (siteId: number) => {
    console.log(`Site selected: ${siteId}`);
    fetchScores(siteId);
    setIsFocused(false);
  };

  return (
    <div ref={wrapperRef} className="siteimprove-container relative">
      <h1>Siteimprove Sites</h1>
      <Search
        label="Search sites"
        variant="primary"
        className="search-bar mb-4 w-full"
        value={searchTerm}
        onChange={(value) => handleSearchChange(value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isFocused && filteredSites.length > 0 && (
        <ul className="suggestions-dropdown absolute z-10 w-full bg-white shadow-md mt-1 max-h-60 overflow-auto">
          {filteredSites.map((site) => (
            <li
              key={site.id}
              onClick={() => handleSuggestionClick(site.id)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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
          <ul className="list-disc list-inside">
            <li>Accessibility Score: {scores.accessibility_score}</li>
            <li>DCI Score: {scores.dci_score}</li>
            <li>QA Score: {scores.qa_score}</li>
            <li>SEO Score: {scores.seo_score}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SiteimproveSite;
