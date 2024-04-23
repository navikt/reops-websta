//TODO: spørre om de her burde være globale eller ikke

export const eventTypeMappings = {
    pageViewed: `{"event_type":"[Amplitude] Page Viewed"}`,
    pageViewedGroupByCountry: `{"event_type":"[Amplitude] Page Viewed","group_by":[{"type":"user","value":"country"}]}`,
    pageViewedGroupByPagePath:`{"event_type":"[Amplitude] Page Viewed","group_by":[{"type":"event","value":"[Amplitude] Page Path"}]}`,
    pageViewedGroupByReferringDomain: `{"event_type":"[Amplitude] Page Viewed","group_by":[{"type":"user","value":"gp:referring_domain"}]}`,
    pageViewedGroupByReferrer: `{"event_type":"[Amplitude] Page Viewed","group_by":[{"type":"event","value":"referrer"}]}`,
    pageViewedGroupByDayOfWeek: `{"event_type":"[Amplitude] Page Viewed","group_by":[{"type":"day_time_prop","value":"amplitude_day_of_week","group_type":"User"}]}`,
    pageViewedGroupByHourOfDay:`{"event_type":"[Amplitude] Page Viewed","group_by":[{"type":"day_time_prop","value":"amplitude_hour_of_day","group_type":"User"}]}`,
    pageViewedGroupByCity: `{"event_type":"[Amplitude] Page Viewed","group_by":[{"type":"user","value":"city"}]}`,
    pageViewedGroupByLanguage: `{"event_type":"[Amplitude] Page Viewed","group_by":[{"type":"user","value":"language"}]}`,
    //Filter below, not working properly at the moment
    pageViewedFilterByDomainsAndPagePath:`{"event_type":"[Amplitude] Page Viewed"}&start=20240101&end=20240130&filters=[,{"prop":"gp:referrer","op":"contains","values":["github.com%2Fnavikt", "navikt.github.io"]},{"prop":"[Amplitude] Page Path","op":"is","values":["%2Fjobbsoknad%2F"]}]&group_by=[{"type":"user", "value":"gp:referrer"}]`,
    // Add more predefined event types as needed
    pageViewedGroupByOS:``,
    pageViewedGroupByDeviceFamily:`{"event_type":"[Amplitude] Page Viewed","group_by":[{"type":"user","value":"country"}]}`,
    pageViewedGroupByDeviceType:``,
    pageViewedGroupByCountryFilterByPath:`{"event_type":"[Amplitude] Page Viewed","group_by":[{"type":"user","value":"country"}],"filters":[{"subprop_type":"event","subprop_key":"[Amplitude] Page Path","subprop_op":"contains","subprop_value":["/kort-fortalt/1284/"]}]}`,
};

const endpointMappings = {
    segmentation: {
        url: `/2/events/segmentation?e={eventType}&start={startDate}&end={endDate}`,
        defaultEventType: eventTypeMappings.pageViewed, // Default event type for segmentation
    },
    chart: {
        url: `/3/chart/e-xwordsgk/query`, // Static, no placeholders
    },
    retention:{
        url:`/2/retention?se={eventType}&re={secondEventType}&start={startDate}&end={endDate}`,
        defaultEventType: eventTypeMappings.pageViewed, //Default retention for reoccurring users
    },
    filter:{
        //implementation for filter
    }
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

    params.eventType = params.eventType || defaultEventType;

    // Handle secondEventType parameter
    const secondEventType = params.secondEventType ? `&re=${encodeURIComponent(params.secondEventType)}` : '';

    // Replace placeholders with actual parameter values
    Object.keys(params).forEach(key => {
        const valueToReplace = key === 'eventType' || key === 'secondEventType' ? params[key] : params[key]; // Removed JSON.stringify
        endpointTemplate = endpointTemplate.replace(`{${key}}`, encodeURIComponent(valueToReplace));
    });

    // Append secondEventType to the URL
    endpointTemplate = endpointTemplate.replace('{secondEventType}', secondEventType);

    //console.log('Constructed endpoint URL:', endpointTemplate);

    return endpointTemplate;
}
