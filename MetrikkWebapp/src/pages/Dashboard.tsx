import { useState } from "react";
import AreaChartContainer from "../components/charts/AreaChartCustomAccessibility/AreaChartContainer";
import SettingsModal from "../components/Modal/Modal.tsx"; // Ensure correct path to SettingsModal
import { Button } from "@navikt/ds-react";

interface FormDataInterface {
    title: string;
    xAxisTitle: string;
    yAxisTitle: string;
    selectedDomain: string;
    selectedPath: string;
    chartType: string;
    endpointType: string;
    startDate: string;
    endDate: string;
    eventType: string;
    groupBy: string[];
    filters: {
        subprop_type: string;
        subprop_key: string;
        subprop_op: string;
        subprop_value: string[];
    }[];
}

const Dashboard = () => {
    const [formDataList, setFormDataList] = useState<FormDataInterface[]>([]);

    const handleFormSubmit = (data: FormDataInterface) => {
        setFormDataList([...formDataList, data]);
    };

    const handleDeleteChart = (index: number) => {
        const updatedFormDataList = [...formDataList];
        updatedFormDataList.splice(index, 1);
        setFormDataList(updatedFormDataList);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1>HELLO FROM DASHBOARD ;D</h1>
            <SettingsModal onSubmit={handleFormSubmit} title={`Lag ny graf`} size={`medium`}  />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {formDataList.map((formData, index) => (
                    <div key={index} className="p-4 bg-white border border-blue-200 rounded shadow-lg">
                        <div className="flex justify-center items-center space-x-6">
                        <SettingsModal
                            key={`modal-${index}`}
                            onSubmit={(data) => handleFormSubmit(data)}
                            title={`Endre graf`}
                            size={`small`}
                        />
                        <Button variant="danger" size="small" onClick={() => handleDeleteChart(index)}>Slett Graf</Button>
                        </div>
                        <AreaChartContainer
                            key={`chart-${index}`}
                            teamDomain={formData.selectedDomain}
                            chartType={formData.chartType}
                            endpointType={formData.endpointType}
                            urlParams={{
                                startDate: formData.startDate,
                                endDate: formData.endDate,
                                eventType: formData.eventType,
                                groupBy: formData.groupBy,
                                filters: formData.filters,
                            }}
                            dimensions={{
                                width: 500,
                                height: 350,
                            }}
                            titles={{
                                chartTitle: formData.title,
                                xAxisTitle: formData.xAxisTitle,
                                yAxisTitle: formData.yAxisTitle,
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
