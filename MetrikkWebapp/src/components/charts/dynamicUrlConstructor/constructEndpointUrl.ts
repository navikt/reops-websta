// constructEndpointUrl.ts
import { endpointMappings } from './EndpointMapping.ts'
import {eventTypeMappings} from "./EventTypeMappings.ts";

interface EndpointParams {
    eventType?: string; // Make eventType optional since you provide a default
    secondEventType?: string;
    groupBy?: any[];
    secondGroupBy?: any[];
    filters?: any[];
    secondFilters?: any[];
    startDate?: string;
    endDate?: string;
    [key: string]: any; // Allow for other properties with an index signature
}

export function constructEndpointUrl(type: string, params: EndpointParams = {}) {
    const mapping = endpointMappings[type] || endpointMappings.segmentation;
    let endpointTemplate = mapping.url;

    const eventTypeConfig = eventTypeMappings[params.eventType] || eventTypeMappings.pageViewed;
    const secondEventTypeConfig = eventTypeMappings[params.secondEventType] || eventTypeMappings.pageViewed;

    // Prepare the event configuration
    const eventConfig = {
        event_type: eventTypeConfig.eventType,
        group_by: params.groupBy || eventTypeConfig.groupBy || [],
        filters: params.filters || eventTypeConfig.filters || []
    };

    // Prepare the second event configuration
    const secondEventConfig = {
        event_type: secondEventTypeConfig.eventType,
        group_by: params.secondGroupBy || secondEventTypeConfig.groupBy || [],
        filters: params.secondFilters || secondEventTypeConfig.filters || []
    };

    // Apply default values for group_by and filters if not specified
    if (eventTypeConfig.groupByDefaults) {
        eventConfig.group_by = eventConfig.group_by.map(gb => ({
            type: gb.type || eventTypeConfig.groupByDefaults.type,
            value: gb.value || eventTypeConfig.groupByDefaults.value
        }));
    }

    if (secondEventTypeConfig.groupByDefaults) {
        secondEventConfig.group_by = secondEventConfig.group_by.map(gb => ({
            type: gb.type || secondEventTypeConfig.groupByDefaults.type,
            value: gb.value || secondEventTypeConfig.groupByDefaults.value
        }));
    }

    if (eventTypeConfig.filtersDefaults) {
        eventConfig.filters = eventConfig.filters.map(flt => ({
            subprop_type: flt.subprop_type || eventTypeConfig.filtersDefaults.subprop_type,
            subprop_key: flt.subprop_key || eventTypeConfig.filtersDefaults.subprop_key,
            subprop_op: flt.subprop_op || eventTypeConfig.filtersDefaults.subprop_op,
            subprop_value: flt.subprop_value || eventTypeConfig.filtersDefaults.subprop_value
        }));
    }

    if (secondEventTypeConfig.filtersDefaults) {
        secondEventConfig.filters = secondEventConfig.filters.map(flt => ({
            subprop_type: flt.subprop_type || secondEventTypeConfig.filtersDefaults.subprop_type,
            subprop_key: flt.subprop_key || secondEventTypeConfig.filtersDefaults.subprop_key,
            subprop_op: flt.subprop_op || secondEventTypeConfig.filtersDefaults.subprop_op,
            subprop_value: flt.subprop_value || secondEventTypeConfig.filtersDefaults.subprop_value
        }));
    }

    // Encode the event configurations as JSON strings and insert into the URL
    const eventParam = encodeURIComponent(JSON.stringify(eventConfig));
    const secondEventParam = encodeURIComponent(JSON.stringify(secondEventConfig));

    endpointTemplate = endpointTemplate.replace('{eventType}', eventParam);
    endpointTemplate = endpointTemplate.replace('{secondEventType}', secondEventParam);
    endpointTemplate = endpointTemplate.replace('{startDate}', encodeURIComponent(params.startDate));
    endpointTemplate = endpointTemplate.replace('{endDate}', encodeURIComponent(params.endDate));

    return endpointTemplate;
}