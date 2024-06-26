import { DatePicker, useRangeDatepicker } from '@navikt/ds-react';

export const RangeDatePicker = ({ onDateChange }) => {
    const defaultStartDate = new Date(
        new Date().setDate(new Date(Date.now()).getDate() - 30)
    );
    const defaultEndDate = new Date(Date.now());

    const { datepickerProps, toInputProps, fromInputProps, selectedRange } =
        useRangeDatepicker({
            fromDate: new Date('Aug 23 2021'),
            defaultSelected: {
                from: defaultStartDate,
                to: defaultEndDate,
            },
            onRangeChange: (range) => {
                if (onDateChange) {
                    onDateChange(range);
                }
                console.log(range);
            },
        });

    return (
        <div className="min-h-32">
            <DatePicker {...datepickerProps}>
                <div className="flex flex-wrap justify-center gap-4">
                    <DatePicker.Input {...fromInputProps} label="Fra" />
                    <DatePicker.Input {...toInputProps} label="Til" />
                </div>
            </DatePicker>
        </div>
    );
};