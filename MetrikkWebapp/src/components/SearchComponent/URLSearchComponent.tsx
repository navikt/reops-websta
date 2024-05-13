import { Search } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import teamsData from './teamsData.json';
import { useNavigate } from 'react-router-dom';

// Define interface for team data
interface Team {
  teamName: string;
  teamAmplitudeDomain: number;
  teamSiteimproveSite: number;
}

export const URLSearchComponent = ({ onDomainSelect, onPagePath, onPageUrl, onSiteimproveDomain }) => {
  const navigate = useNavigate();

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

  const handleSearchSubmit = () => {
    if (filteredTeams.length > 0) {

      navigate(`/search?input=${encodeURIComponent(searchInput)}`);
      const selectedTeam = filteredTeams[0]; // This assumes the first match is the desired one
      onDomainSelect(selectedTeam.teamAmplitudeDomain.toString());
      const path = extractPath(searchInput);
      onPagePath(path);
      onPageUrl(searchInput);


      onSiteimproveDomain(selectedTeam.teamSiteimproveSite.toString());
      console.log("searchInput: " + searchInput)
    }
  };

  return (
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <Search
            label="Skriv inn URL her: "
            onChange={handleSearchChange}
            onSearchClick={handleSearchSubmit}
            variant="primary"
            hideLabel={false}
            clearButton={true} // This adds a clear button that also uses the onClear prop if necessary
        />
      </form>
  );
};