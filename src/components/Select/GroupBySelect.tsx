import { Select } from "@navikt/ds-react";
import { eventTypeMappings2 } from "../charts/dynamicUrlConstructor/EventTypeMappings2.ts";

interface GroupBySelectProps {
    onSelectedGroupBy: (groupObj: GroupBy[]) => void; // Update to accept an array of GroupBy objects
}

interface GroupBy {
    type: string;
    value: string;
    group_type?: string;
}

interface EventTypeMapping {
    eventType: string;
    groupBy: GroupBy[];
    filters: any[]; // Replace 'any[]' with the actual type for filters if available
}

const GroupBySelect: React.FC<GroupBySelectProps> = ({ onSelectedGroupBy }) => {
    const handleGroupByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEvent = eventTypeMappings2[event.target.value];
        const selectedGroupBy = selectedEvent?.groupBy; // Access the groupBy array for the selected event
        onSelectedGroupBy(selectedGroupBy); // Pass the selected groupBy array to the callback function
    };

    const groupByOptions = Object.entries(eventTypeMappings2).map(([key, value]) => {
        if (value.groupBy.length === 0) {
            return (
                <option key={key} value={key}>
                    Ingen Gruppering
                </option>
            );
        } else {
            return (
                <option key={key} value={key}>
                    {value.groupBy.map(group => group.value).join(", ")}
                </option>
            );
        }
    });

    return (
        <Select label="Group By" onChange={handleGroupByChange}>
            <option value="">Select Group By</option>
            {groupByOptions}
        </Select>
    );
};

export default GroupBySelect;