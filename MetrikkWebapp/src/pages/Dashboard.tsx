import { useState } from "react";
import AreaChartContainer from "../components/charts/AreaChartCustomAccessibility/AreaChartContainer.tsx";
import { SettingsModal } from "../components/Modal/Modal.tsx";

const Dashboard = () => {
    const [formData, setFormData] = useState({
        selectedDomain: "",
        selectedPath: "",
        chartType: "",
        endpointType: "",
        startDate: "",
        endDate: "",
        eventType: "",
        filters: [],
    });

    const handleFormSubmit = (data) => {
        setFormData(data);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1>HELLO FROM DASHBOARD ;D</h1>
            <SettingsModal onSubmit={handleFormSubmit} />
            {formData && (
                <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
                    <AreaChartContainer
                        teamDomain={formData.selectedDomain}
                        chartType={formData.chartType}
                        endpointType={formData.endpointType}
                        urlParams={{
                            startDate: formData.startDate,
                            endDate: formData.endDate,
                            eventType: formData.eventType,
                            filters: formData.filters,
                        }}
                        dimensions={{
                            width: 500,
                            height: 350,
                        }}
                        titles={{
                            chartTitle: 'Antall Besøk',
                            xAxisTitle: 'Dato',
                            yAxisTitle: 'Antall Besøk',
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
