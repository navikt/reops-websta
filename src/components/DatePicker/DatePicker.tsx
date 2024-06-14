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
        <>
            <DatePicker {...datepickerProps}>
                <div className="flex items-baseline space-x-4">
                    <DatePicker.Input {...fromInputProps} label="Fra" className="w-full sm:w-auto"/>
                    <DatePicker.Input {...toInputProps} label="Til" className="w-full sm:w-auto"/>
                    <div style={{height: 'auto'}}>
                        <Button onClick={handleUpdateClick} variant="primary" className="mt-2 sm:mt-0">Oppdater</Button>
                        {showAlert && (
                            <Alert variant="success" className="mt-2 sm:mt-0">
                                Oppdatert!
                            </Alert>
                        )}
                    </div>
                </div>
            </DatePicker>

        </>
    );
};