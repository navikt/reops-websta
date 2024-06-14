import { DatePicker, useRangeDatepicker, Button, Alert } from '@navikt/ds-react';
import { useState } from 'react';

export const RangeDatePicker = ({ onDateChange }: { onDateChange: (range: any) => void }) => {
    const defaultStartDate = new Date(
        new Date().setDate(new Date(Date.now()).getDate() - 30)
    );
    const defaultEndDate = new Date(Date.now());
    const [showAlert, setShowAlert] = useState(false);

    const { datepickerProps, toInputProps, fromInputProps, selectedRange } =
        useRangeDatepicker({
            fromDate: new Date('Aug 23 2021'),
            toDate: defaultEndDate,
            defaultSelected: {
                from: defaultStartDate,
                to: defaultEndDate,
            },
            onRangeChange: (range) => {
                // Update the state variable instead of calling onDateChange
                setSelectedRangeState(range);
            },
        });

    // Add a new state variable to store the selected range
    const [selectedRangeState, setSelectedRangeState] = useState(selectedRange);

    // Call onDateChange when the "Oppdater" button is clicked
    const handleUpdateClick = () => {
        if (onDateChange) {
            onDateChange(selectedRangeState);
            // Show the Alert
            setShowAlert(true);
            // Hide the Alert after 10 seconds
            setTimeout(() => {
                setShowAlert(false);
            }, 7000);
        }
    };

    return (
        <DatePicker {...datepickerProps}>
            <div className="flex flex-col sm:flex-row items-end space-x-0 sm:space-x-4 mb-12">
                <DatePicker.Input {...fromInputProps} label="Fra" className="w-full sm:w-auto mb-4 sm:mb-0"/>
                <DatePicker.Input {...toInputProps} label="Til" className="w-full sm:w-auto mb-4 sm:mb-0"/>
                <div className="w-full sm:w-auto flex flex-col sm:flex-row mt-4 sm:mt-0 h-12 oppdater mb-6 sm:mb-0">
                    <Button onClick={handleUpdateClick} variant="primary" className="mb-4 sm:mb-0 flex-shrink-0">Oppdater dato</Button>
                    {showAlert && (
                        <Alert variant="success" className="mt-5 sm:mt-0 ml-0 sm:ml-4 h-12">
                            Oppdatert!
                        </Alert>
                    )}
                </div>
            </div>
        </DatePicker>
    );
};