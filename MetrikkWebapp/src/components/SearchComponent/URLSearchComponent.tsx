import { Search } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import teamsData from './teamsData.json';

// Define interface for team data
interface Team {
  teamName: string;
  teamAmplitudeDomain: number;
  teamSiteimproveSite: string;
}

export const URLSearchComponent = ({ onDomainSelect, onPagePath }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);

  useEffect(() => {
    setFilteredTeams(teamsData as Team[]);
  }, []);

  // Function to extract domain from URL
  const extractDomain = (url) => {
    const match = url.match(/\/\/(?:www\.)?([^\/.]+)\./);
    return match ? match[1] : null;
  };
  // Function to extract path from URL
  const extractPath = (url) => {
    const match = url.match(/\/\/[^\/]+(\/[^?#]*)?/);
    return match ? match[1] || '' : null;
  };
  const handleSearchChange = (value) => {
    setSearchInput(value);
    //const domain = extractDomain(value)
    filterTeams(extractDomain(value));
    console.log(value); // This logs every change in the input
    //console.log(domain) //domain
  };

  const filterTeams = (searchTerm: string) => {
    const filtered = teamsData.filter(
      (team) =>
        team.teamName &&
        team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(filtered);
  };

  const handleSearchSubmit = () => {
    if (filteredTeams.length > 0) {
      const selectedTeam = filteredTeams[0]; // This assumes the first match is the desired one
      onDomainSelect(selectedTeam.teamAmplitudeDomain.toString());
      const path = extractPath(searchInput);
      onPagePath(path);
      console.log('Selected team:', selectedTeam.teamName);
    }
  };

  return (
    <form role="search" onSubmit={(e) => e.preventDefault()}>
      <Search
        label="Søk alle NAV sine sider"
        onChange={handleSearchChange}
        onSearchClick={handleSearchSubmit}
        variant="primary"
        clearButton={true} // This adds a clear button that also uses the onClear prop if necessary
      />
    </form>
  );
};
