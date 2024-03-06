//TODO: spørre om de her burde være globale eller ikke

export const eventTypeMappings = {
    pageViewed: `{"event_type":"[Amplitude] Page Viewed"}`,
    userSignedUp: `{"event_type":"[Amplitude] User Signed Up"}`,
    // Add more predefined event types as needed
};

const endpointMappings = {
    segmentation: {
        url: `/2/events/segmentation?e={eventType}&start={startDate}&end={endDate}`,
        defaultEventType: eventTypeMappings.pageViewed, // Default event type for segmentation
    },
    chart: {
        url: `/3/chart/e-xwordsgk/query`, // Static, no placeholders
    },
    // Add more endpoint mappings as needed
};


interface EndpointParams {
    eventType?: string; // Make eventType optional since you provide a default
    startDate?: string;
    endDate?: string;
    [key: string]: any; // Allow for other properties with an index signature
}

export function constructEndpointUrl(type: string, params: EndpointParams = {}) {
    const mapping = endpointMappings[type] || endpointMappings.segmentation;
    let endpointTemplate = mapping.url;
    const defaultEventType = mapping.defaultEventType;

    console.log('Before setting eventType:', params);
    params.eventType = params.eventType || defaultEventType;
    console.log('After setting eventType:', params);
    console.log('Default eventType:', defaultEventType);

    // Replace placeholders with actual parameter values
    Object.keys(params).forEach(key => {
        const valueToReplace = key === 'eventType' ? params[key] : params[key]; // Removed JSON.stringify
        endpointTemplate = endpointTemplate.replace(`{${key}}`, encodeURIComponent(valueToReplace));
    });

    return endpointTemplate;
}

