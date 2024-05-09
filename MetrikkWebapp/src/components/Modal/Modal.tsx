import {useEffect, useRef, useState} from "react";
import {Button, Modal, TextField} from "@navikt/ds-react";
import {RangeDatePicker} from "../DatePicker/DatePicker";
import {eventTypeMappings2} from "../charts/dynamicUrlConstructor/EventTypeMappings2.ts";
import {format} from "date-fns";
import teamsData from "../SearchComponent/teamsData.json"; // Assuming the correct path to your URLSearchComponent

interface Team {
    teamName: string;
    teamAmplitudeDomain: number;
    teamSiteimproveSite: string;
}
export const SettingsModal = ({ onSubmit }) => {
    //titles
    const [chartTitle, setChartTitle] = useState("");
    const [chartXAxisTitle, setChartXAxisTitle] = useState("Dato");
    const [chartYAxisTitle, setchartYAxisTitle] = useState("Antall besøk");
    const ref = useRef<HTMLDialogElement>(null);
    const [inputtedURL, setInputtedURL] = useState("");
    const [selectedDomain, setSelectedDomain] = useState("");
    const [selectedPath, setSelectedPath] = useState("");
    const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);

    const defaultEndDate = new Date(Date.now());
    const defaultStartDate = new Date(new Date().setDate(new Date(Date.now()).getDate()-30));
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);

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

    const filterTeams = (searchTerm: string) => {
        const filtered = teamsData.filter(
            (team) =>
                team.teamName &&
                searchTerm &&
                team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredTeams(filtered);
    };

    const handleSearchChange = (value) => {
        setInputtedURL(value); // Update the inputted URL state
        filterTeams(extractDomain(value)); // Filter teams based on the inputted URL
    };



    const handleSubmit = () => {

        let selectedTeamString = '';
        let selectedPagePath = '';

        if (filteredTeams.length > 0) {
             const selectedTeam = filteredTeams[0];
             selectedTeamString = selectedTeam.teamAmplitudeDomain.toString();
             selectedPagePath = extractPath(inputtedURL);
             console.log('Selected team:', selectedTeam.teamName);
        }

        console.log(format(new Date(startDate), 'yyyyMMdd'))
        console.log(format(new Date(endDate), 'yyyyMMdd'))

       const formData = {
            title:chartTitle,
            xAxisTitle:chartXAxisTitle,
            yAxisTitle:chartYAxisTitle,
            selectedDomain: selectedTeamString,
            selectedPath: selectedPagePath,
            chartType: "areaChartMulti",
            endpointType: "segmentation",
            startDate: format(new Date(startDate), 'yyyyMMdd'),
            endDate: format(new Date(endDate), 'yyyyMMdd'),
            //eventType er foreløpig bare pageViewed
            eventType: eventTypeMappings2.pageViewed.eventType,
            groupBy: eventTypeMappings2.pageViewedGroupByReferrer.groupBy,
            filters: [
                {
                    subprop_type: "event",
                    subprop_key: "[Amplitude] Page Path",
                    subprop_op: "contains",
                    subprop_value: [selectedPagePath],
                },
            ],
        };

        onSubmit(formData);
        closeModal();
    };

    const openModal = () => {
        ref.current?.showModal();
    };

    const closeModal = () => {
        ref.current?.close();
    };

    return (
        <div className="py-12">
            <Button onClick={openModal}>Open Modal</Button>

            <Modal ref={ref} header={{ heading: "Chart Settings" }} width={400}>
                <Modal.Body>
                    <form method="dialog" id="chartSettings" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <TextField label="Graf-Tittel"
                                   value={chartTitle}
                                   onChange={(e) => setChartTitle(e.target.value)}
                        />
                        <TextField label="x akse tittel"
                                   value={chartXAxisTitle}
                                   onChange={(e) => setChartXAxisTitle(e.target.value)}
                        />
                        <TextField label="y akse tittel"
                                   value={chartYAxisTitle}
                                   onChange={(e) => setchartYAxisTitle(e.target.value)}
                        />
                        <TextField label="Skriv in URL fra nettsted for grafen du vil lage"
                                   value={inputtedURL}
                                   onChange={(e) => handleSearchChange(e.target.value)}
                        />
                        <RangeDatePicker onDateChange={(range) => {
                            setStartDate(range.from);
                            setEndDate(range.to);
                        }} />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button form="chartSettings">Apply</Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
