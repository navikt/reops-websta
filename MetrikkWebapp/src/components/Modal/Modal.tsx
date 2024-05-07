import { useRef, useState } from "react";
import { Button, Modal } from "@navikt/ds-react";
import { RangeDatePicker } from "../DatePicker/DatePicker";
import { URLSearchComponent } from "../SearchComponent/URLSearchComponent";
import {eventTypeMappings2} from "../charts/dynamicUrlConstructor/EventTypeMappings2.ts";
import {format} from "date-fns"; // Assuming the correct path to your URLSearchComponent

export const SettingsModal = ({ onSubmit }) => {
    const ref = useRef<HTMLDialogElement>(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedDomain, setSelectedDomain] = useState("");
    const [selectedPath, setSelectedPath] = useState("");

    const handleSubmit = () => {

       const formData = {
            selectedDomain,
            selectedPath,
            chartType: "segmentationChartProcessing",
            endpointType: "segmentation",
            startDate: format(new Date(startDate), 'yyyyMMdd'),
            endDate: format(new Date(endDate), 'yyyyMMdd'),
            eventType: eventTypeMappings2.pageViewedGroupByReferrer.eventType,
            groupBy: eventTypeMappings2.pageViewedGroupByReferrer.groupBy,
            filters: [
                {
                    subprop_type: "event",
                    subprop_key: "[Amplitude] Page Path",
                    subprop_op: "contains",
                    subprop_value: [selectedPath],
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
                        <URLSearchComponent
                            onDomainSelect={(domain) => setSelectedDomain(domain)}
                            onPagePath={(path) => setSelectedPath(path)}
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
