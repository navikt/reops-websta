import { Search } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import teamsData from './teamsData.json';

interface Team {
  teamName: string;
  teamAmplitudeDomain: number;
  teamSiteimproveSite: number;
}

export const URLSearchComponent = ({
  onDomainSelect,
  pageUrl,
  onPagePath,
  onPageUrl,
  onSiteimproveDomain,
  onValidUrl, // New proppage
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFilteredTeams(teamsData as Team[]);
  }, []);

  const extractDomain = (url) => {
    const match = url.match(/\/\/(?:www\.)?([^\/.]+)\./);
    return match ? match[1] : null;
  };

  const extractPath = (url) => {
    const match = url.match(/\/\/[^\/]+(\/[^?#]*)?/);
    return match ? match[1] || '' : null;
  };

  const handleSearchChange = (value) => {
    setSearchInput(value);
    filterTeams(extractDomain(value));
  };

  const filterTeams = (searchTerm: string) => {
    const filtered = teamsData.filter(
      (team) =>
        team.teamName &&
        searchTerm &&
        team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(filtered);
  };
 // yo
  const handleSearchSubmit = () => {
    if (filteredTeams.length > 0) {
      const selectedTeam = filteredTeams[0]; // Assumes the first match is the desired one
      onDomainSelect(selectedTeam.teamAmplitudeDomain.toString());
      const path = extractPath(searchInput);
      onPagePath(path);
      onPageUrl(searchInput);
      onSiteimproveDomain(selectedTeam.teamSiteimproveSite.toString());
      setError(null); // Clear error on successful search
      onValidUrl(true); // Notify parent of valid URL
    } else {
      setError('Nettsiden er ikke lagt til enda');
      onValidUrl(false); // Notify parent of invalid URL
    }
  };

  useEffect(() => {
    setSearchInput(pageUrl);
  }, [pageUrl]);

  console.log('pageUrl: ' + pageUrl);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchSubmit();
      }}
    >
      <Search
        label="Skriv eller lim inn URL-adresse"
        value={searchInput}
        onChange={handleSearchChange}
        onSearchClick={handleSearchSubmit}
        variant="primary"
        hideLabel={false}
        clearButton={true} // Adds a clear button that also uses the onClear prop if necessary
        error={error}
      />
    </form>
  );
};
