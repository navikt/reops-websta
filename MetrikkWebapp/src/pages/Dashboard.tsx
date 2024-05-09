import { useState } from "react";
import AreaChartContainer from "../components/charts/AreaChartCustomAccessibility/AreaChartContainer.tsx";
import { SettingsModal } from "../components/Modal/Modal.tsx";

const Dashboard = () => {
    const [formData, setFormData] = useState({
        //bruker skal kunne skrive tittel
        title:"",
        //bruker skal kunne skrive x akse tittel
        xAxisTitle:"",
        //bruker skal kunne skrive y akse tittel
        yAxisTitle:"",
        //domene skal blir forhåndsvalgt basert på url fra bruker
        selectedDomain: "",
        //path skal blir forhåndsvalgt basert på url fra bruker
        selectedPath: "",
        //skal bare støtte areachart foreløpig som POC
        chartType: "",
        //skal bare støtte areachartmulti
        endpointType: "",
        //speaks for itself
        startDate: "",
        //speaks for itself
        endDate: "",
        //event type er page viewed
        eventType: "",
        //group by fra dropdown
        groupBy: [],
        //filters er alltid basert på pagePath
        filters: [],
    });

    const handleFormSubmit = (data) => {
        setFormData(data);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <h1>HELLO FROM DASHBOARD ;D</h1>
            <SettingsModal onSubmit={handleFormSubmit} />
            {formData && formData.selectedDomain && (
                <div className="p-4 bg-white border border-blue-200 rounded shadow-lg">
                    <AreaChartContainer
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
            )}
        </div>
    );
};

export default Dashboard;
