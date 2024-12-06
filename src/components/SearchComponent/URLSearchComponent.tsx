import { Search, Alert, ReadMore } from '@navikt/ds-react';
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
  const [isValidUrl, setIsValidUrl] = useState(true);

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
    setIsValidUrl(validateUrl(value));
  };

  const validateUrl = (url) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/
    return urlRegex.test(url);
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
  if (searchInput.trim() === '') {
    setError('Du må sette inn en URL-adresse.');
    onValidUrl(false); // Notify parent of invalid URL
    return;
  }

  let url = searchInput.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  if (filteredTeams.length > 0) {
    const selectedTeam = filteredTeams[0]; // Assumes the first match is the desired one
    onDomainSelect(selectedTeam.teamAmplitudeDomain.toString());
    const path = extractPath(url);
    onPagePath(path);
    onPageUrl(url);
    onSiteimproveDomain(selectedTeam.teamSiteimproveSite.toString());
    setError(null); // Clear error on successful search
    onValidUrl(true); // Notify parent of valid URL
  } else {
    setError('Nettsiden er ikke lagt til enda, eller du har skrevet inn en ugyldig URL.');
    onValidUrl(false); // Notify parent of invalid URL
  }
};

  useEffect(() => {
    setSearchInput(pageUrl);
  }, [pageUrl]);

  // console.log('pageUrl: ' + pageUrl);

  return (
      <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchSubmit();
          }}
      >
        <Search
            label="Lim inn URL for å se statistikk"
            autoFocus={true}
            value={searchInput}
            onChange={handleSearchChange}
            onSearchClick={handleSearchSubmit}
            variant="primary"
            hideLabel={false}
            clearButton={true} // Adds a clear button that also uses the onClear prop if necessary
            error={error}
            className="w-full"
        />
        {searchInput.length >= 1 && !isValidUrl && (
            <Alert variant="warning" className="mt-6">
              For å sikre at du ser korrekt statistikk, anbefaler vi at du kopierer og limer inn lenken heller enn å skrive den inn selv.
            </Alert>
        )}
        <ReadMore className="mt-3" header="Hvilke nettsider støttes?">
          <ul className="list-disc pl-5">
            <li>nav.no</li>
            <li>Navet (Sharepoint)</li>
            <li>arbeidsplassen.nav.no</li>
            <li>aksel.nav.no</li>
            <li>arbeidogvelferd.nav.no</li>
            <li>finnhjelpemiddel.nav.no</li>
            <li>idebanken.org</li>
            <li>mangfoldimai.no</li>
            <li>memu.no</li>
            <li>kunnskapsbanken.net</li>
            <li>workinnorway.no</li>
          </ul>
        </ReadMore>
      </form>
  );
};