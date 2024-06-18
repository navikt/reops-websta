import {useEffect, useState} from "react";
import { Button, Modal, TextField } from "@navikt/ds-react";
import { RangeDatePicker } from "../DatePicker/DatePickerModal";
import { eventTypeMappings2 } from "../charts/dynamicUrlConstructor/EventTypeMappings2.ts";
import teamsData from "../SearchComponent/teamsData.json";
import GroupBySelect from "../Select/GroupBySelect.tsx";
import { format } from "date-fns";

interface Team {
    teamName: string;
    teamAmplitudeDomain: number;
    teamSiteimproveSite: string;
}

interface GroupBy {
    type: string;
    value: string;
    group_type?: string;
}

interface SettingsModalProps {
    onSubmit: (formData: any) => void;
    title?:string
    size?:string
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onSubmit, title, size }) => {
    const initialFormData = {
        chartTitle: "",
        chartXAxisTitle: "Dato",
        chartYAxisTitle: "Antall besøk",
        inputtedURL: "",
        selectedDomain: "",
        selectedPath: "",
        startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
        endDate: new Date(),
        selectedGroupBy: [] as GroupBy[],
    };

    const [formData, setFormData] = useState(initialFormData);
    const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    const handleGroupByChange = (groupObj: GroupBy[]) => {
        setFormData({ ...formData, selectedGroupBy: groupObj });
    };

    useEffect(() => {
        setFilteredTeams(teamsData as Team[]);
    }, []);

    const handleSearchChange = (value: string) => {
        const inputtedURL = value;
        setFormData({
            ...formData,
            inputtedURL,
            selectedDomain: extractDomain(inputtedURL),
        });
        filterTeams(extractDomain(inputtedURL));
    };

    const handleSubmit = () => {
        const { inputtedURL, selectedGroupBy, startDate, endDate } = formData;
        const selectedTeam = filteredTeams.find(
            (team) => team.teamName.toLowerCase() === extractDomain(inputtedURL).toLowerCase()
        );

        const formDataToSend = {
            title: formData.chartTitle,
            xAxisTitle: formData.chartXAxisTitle,
            yAxisTitle: formData.chartYAxisTitle,
            selectedDomain: selectedTeam?.teamAmplitudeDomain.toString() || "",
            selectedPath: extractPath(inputtedURL),
            chartType: "areaChartMulti",
            endpointType: "segmentation",
            startDate: format(new Date(startDate), "yyyyMMdd"),
            endDate: format(new Date(endDate), "yyyyMMdd"),
            eventType: eventTypeMappings2.pageViewed.eventType,
            groupBy: selectedGroupBy,
            filters: [
                {
                    subprop_type: "event",
                    subprop_key: "[Amplitude] Page Path",
                    subprop_op: "contains",
                    subprop_value: [extractPath(inputtedURL)],
                },
            ],
        };

        onSubmit(formDataToSend);
        closeModal();
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const extractDomain = (url: string): string => {
        const match = url.match(/\/\/(?:www\.)?([^\/.]+)\./);
        return match ? match[1] : "";
    };

    const extractPath = (url: string): string => {
        const match = url.match(/\/\/[^\/]+(\/[^?#]*)?/);
        return match ? match[1] || "" : "";
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

    return (
        <div className="py-12">
            <Button onClick={openModal} size={`${size}`}>{title}</Button>

            <Modal open={modalOpen} onClose={closeModal} header={{ heading: "Lag en graf" }} width={450}>
                <Modal.Body>
                    <form method="dialog" id="chartSettings" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <TextField
                            label="Graftittel"
                            value={formData.chartTitle}
                            onChange={(e) => setFormData({ ...formData, chartTitle: e.target.value })}
                        />
{/*                        <TextField
                            label="x akse tittel"
                            value={formData.chartXAxisTitle}
                            onChange={(e) => setFormData({ ...formData, chartXAxisTitle: e.target.value })}
                        />
                        <TextField
                            label="y akse tittel"
                            value={formData.chartYAxisTitle}
                            onChange={(e) => setFormData({ ...formData, chartYAxisTitle: e.target.value })}
                        />*/}
                        <TextField
                            label="URL til siden du vil lage graf for"
                            className="mt-4"
                            value={formData.inputtedURL}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                        <GroupBySelect onSelectedGroupBy={handleGroupByChange} />
                        <RangeDatePicker
                            onDateChange={(range) => {
                                setFormData({ ...formData, startDate: range.from, endDate: range.to });
                            }}
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button form="chartSettings">Opprett graf</Button>
                    <Button variant="secondary" onClick={closeModal}>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SettingsModal