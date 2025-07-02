import { Search, Alert, RadioGroup, Stack, Radio} from '@navikt/ds-react';
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
  const [selectedAnalytics, setSelectedAnalytics] = useState("1"); // "1" = Umami, "2" = Amplitude
  const [hasSearched, setHasSearched] = useState(false);

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
    setIsValidUrl(validateUrl(normalizedUrl));
    // Only filter teams if Amplitude is selected
    if (selectedAnalytics === "2") {
      filterTeams(extractDomain(normalizedUrl));
    } else {
      setFilteredTeams(teamsData as Team[]);
    }
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

    if (selectedAnalytics === "1") {
      // Umami: redirect to felgen with encoded URL as q param in the same tab
      const felgenUrl = `https://felgen.ansatt.nav.no/?q=${encodeURIComponent(normalizedUrl)}`;
      window.location.assign(felgenUrl);
      return;
    }

    // Amplitude: existing behavior
    filterTeams(extractDomain(normalizedUrl));
    if (filteredTeams.length > 0) {
      const selectedTeam = filteredTeams[0];
      onDomainSelect(selectedTeam.teamAmplitudeDomain.toString());
      const path = extractPath(normalizedUrl);
      onPagePath(path);
      onPageUrl(normalizedUrl);
      onSiteimproveDomain(selectedTeam.teamSiteimproveSite.toString());
      setError(null);
      onValidUrl(true);
      setHasSearched(true); // Hide radio after amplitude search
    } else {
      setError('Nettsiden er ikke lagt til enda, eller du har skrevet inn en ugyldig URL.');
      onValidUrl(false);
    }
  };

  useEffect(() => {
    setSearchInput(pageUrl);
    setHasSearched(false); // Reset on pageUrl change
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
        <div className="pt-6">
        <RadioGroup
          legend="Datakilde"
          value={selectedAnalytics}
          onChange={value => {
            setSelectedAnalytics(value);
            if (value === "2") {
              filterTeams(extractDomain(searchInput));
            } else {
              setFilteredTeams(teamsData as Team[]);
            }
          }}
        >
          <Stack gap="0 6" direction={{ xs: "column", sm: "row" }} wrap={false}>
            <Radio value="1">Umami</Radio>
            <Radio value="2">Amplitude</Radio>
          </Stack>
        </RadioGroup>
        </div>
        {searchInput.length >= 1 && !isValidUrl && (
            <Alert variant="warning" className="mt-6">
              For å sikre at du ser korrekt statistikk, anbefaler vi at du kopierer og limer inn lenken heller enn å skrive den inn selv.
            </Alert>
        )}
      </form>
  );
};