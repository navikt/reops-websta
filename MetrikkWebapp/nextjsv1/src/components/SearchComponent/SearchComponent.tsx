import { useEffect, useState } from 'react';
import { UNSAFE_Combobox } from "@navikt/ds-react";
import teamsData from './teamsData.json';

// Define interface for team data
interface Team {
    teamName: string;
    teamAmplitudeDomain: number;
    teamSiteimproveSite: string;
}

export const SearchComponent = ({onDomainSelect}) => {
    const [teams, setTeams] = useState<Team[]>([]);// Specify the type of state as Team[]

    useEffect(() => {
        setTeams(teamsData as unknown as Team[]); // Assert teamsData as Team[]
    }, []);

    const handleToggleSelected = (option: string, isSelected: boolean) => {

        if (isSelected) {
            const selectedTeam= teams.find((teamName) => teamName.teamName == option)
            if(selectedTeam){
            onDomainSelect(selectedTeam.teamAmplitudeDomain.toString());
            }
            console.log(option);
        }
    };

    return (
        <div className="mb-8">
            <UNSAFE_Combobox
                label="Hva er det aller beste teamet borte på NAV noensinne, helt objektivt?"
                options={teams.map(team => team.teamName)} // Map team names for options
                shouldAutocomplete={true}
                onToggleSelected={handleToggleSelected}
            />
        </div>
    );
};

export default SearchComponent;
