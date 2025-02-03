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
                                     onValidUrl,
                                   }) => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isValidUrl, setIsValidUrl] = useState(true);

  useEffect(() => {
    setFilteredTeams(teamsData as Team[]);
  }, []);

  const normalizeUrl = (url: string): string => {
  // Remove any whitespace
  url = url.trim();

  // Special handling for nav.no domains
  if (url.includes('nav.no') && !url.includes('.') && !url.startsWith('www.')) {
    url = `www.${url}`;
  }

  // Add https:// if no protocol is present
  if (!url.match(/^[a-zA-Z]+:\/\//)) {
    url = `https://${url}`;
  }

  return url;
};

  const extractDomain = (url) => {
    const match = url.match(/\/\/(?:www\.)?([^\/.]+)\./);
    return match ? match[1] : null;
  };

  const extractPath = (url) => {
    const match = url.match(/\/\/[^\/]+(\/[^?#]*)?/);
    return match ? match[1] || '' : null;
  };

  const handleSearchChange = (value) => {
    const normalizedUrl = normalizeUrl(value);
    setSearchInput(normalizedUrl);
    filterTeams(extractDomain(normalizedUrl));
    setIsValidUrl(validateUrl(normalizedUrl));
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
    const normalizedUrl = normalizeUrl(searchInput);

    if (normalizedUrl.trim() === '') {
      setError('Du må sette inn en URL-adresse.');
      onValidUrl(false);
      return;
    }

    if (!validateUrl(normalizedUrl)) {
      setError('Ugyldig URL-format.');
      onValidUrl(false);
      return;
    }

    if (filteredTeams.length > 0) {
      const selectedTeam = filteredTeams[0];
      onDomainSelect(selectedTeam.teamAmplitudeDomain.toString());
      const path = extractPath(normalizedUrl);
      onPagePath(path);
      onPageUrl(normalizedUrl);
      onSiteimproveDomain(selectedTeam.teamSiteimproveSite.toString());
      setError(null);
      onValidUrl(true);
    } else {
      setError('Nettsiden er ikke lagt til enda, eller du har skrevet inn en ugyldig URL.');
      onValidUrl(false);
    }
  };

  useEffect(() => {
    setSearchInput(pageUrl);
  }, [pageUrl]);

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
            clearButton={true}
            error={error}
            className="w-full"
        />
        {searchInput.length >= 1 && !isValidUrl && (
            <Alert variant="warning" className="mt-6">
              For å sikre at du ser korrekt statistikk, anbefaler vi at du kopierer og limer inn lenken heller enn å skrive den inn selv.
            </Alert>
        )}
        <ReadMore className="mt-3" header="Hvilke nettsider støttes">
          <ul className="list-disc pl-5">
            <li>nav.no</li>
            <li>arbeidsplassen.nav.no</li>
            <li>aksel.nav.no</li>
            <li>arbeidogvelferd.nav.no</li>
            <li>finnhjelpemiddel.nav.no</li>
            <li>mangfoldimai.no</li>
            <li>memu.no</li>
            <li>kunnskapsbanken.net</li>
            <li>workinnorway.no</li>
          </ul>
        </ReadMore>
      </form>
  );
};