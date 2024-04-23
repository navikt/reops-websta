import { format } from "date-fns";
import { nb } from "date-fns/locale";
import { DatePicker, useRangeDatepicker } from "@navikt/ds-react";

export const RangeDatePicker = ({onDateChange}) => {
    const { datepickerProps, toInputProps, fromInputProps, selectedRange } =
        useRangeDatepicker({
            fromDate: new Date("Aug 23 2019"),
            onRangeChange: (range) => {
                if(onDateChange){
                    onDateChange(range);
                }
                console.log(range)
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