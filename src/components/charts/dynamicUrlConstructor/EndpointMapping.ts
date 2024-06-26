import {eventTypeMappings2} from "./EventTypeMappings2.ts";
export const endpointMappings = {
    segmentation: {
        url: `/2/events/segmentation?e={eventType}&start={startDate}&end={endDate}`,
        defaultEventType: eventTypeMappings2.pageViewed, // Default event type for segmentation
    },
    chart: {
        url: `/3/chart/e-xwordsgk/query`, // Static, no placeholders
    },
    retention:{
        url:`/2/retention?se={eventType}&re={secondEventType}&start={startDate}&end={endDate}`,
        defaultEventType: eventTypeMappings2.pageViewed, //Default retention for reoccurring users
    },
    filter:{
        //implementation for filter
    }
    // Add more endpoint mappings as needed
};