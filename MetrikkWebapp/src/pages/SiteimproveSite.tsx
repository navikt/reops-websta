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

const SiteimproveSite = () => {
  const [sites, setSites] = useState<SiteItem[]>([]);
  const [filteredSites, setFilteredSites] = useState<SiteItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    // Delay hiding the dropdown so that onClick events on suggestions have time to fire
    setTimeout(() => setIsFocused(false), 200);
  };

  const handleSuggestionClick = (siteId: number) => {
    // Here you could do something when a suggestion is clicked
    console.log(`Site selected: ${siteId}`);
    // Hide the dropdown
    setIsFocused(false);
  };

  // Clicking outside the component will close the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="siteimprove-container relative">
  <h1>Siteimprove Sites</h1>
  <Search
    label="Search sites"
    variant="primary"
    className="search-bar mb-4 w-full"
    value={searchTerm}
    onChange={handleSearchChange}
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
</div>

  );
};

export default SiteimproveSite;
