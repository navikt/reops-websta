// constructEndpointUrl.ts
import { endpointMappings } from './EndpointMapping.ts'
import { eventTypeMappings } from "./EventTypeMappings.ts";

interface EndpointParams {
    eventType?: string;
    secondEventType?: string;
    groupBy?: any[];
    secondGroupBy?: any[];
    filters?: any[];
    secondFilters?: any[];
    startDate?: string;
    endDate?: string;
    [key: string]: any;
}

export function constructEndpointUrl(type: string, params: EndpointParams = {}) {
    const mapping = endpointMappings[type] || endpointMappings.segmentation;
    let endpointTemplate = mapping.url;

    const eventTypeConfig = eventTypeMappings[params.eventType] || eventTypeMappings.pageViewed;
    const secondEventTypeConfig = eventTypeMappings[params.secondEventType] || eventTypeMappings.pageViewed;

    // Prepare the event configuration
    const eventConfig = {
        event_type: eventTypeConfig.eventType,
        group_by: params.groupBy || [],
        filters: params.filters || []
    };

    // Prepare the second event configuration
    const secondEventConfig = {
        event_type: secondEventTypeConfig.eventType,
        group_by: params.secondGroupBy || [],
        filters: params.secondFilters || []
    };

    // Apply default values for group_by and filters if not specified
    if (!params.groupBy && eventTypeConfig.groupByDefaults) {
        eventConfig.group_by = eventTypeConfig.groupByDefaults;
    }

    if (!params.secondGroupBy && secondEventTypeConfig.groupByDefaults) {
        secondEventConfig.group_by = secondEventTypeConfig.groupByDefaults;
    }

    if (!params.filters && eventTypeConfig.filtersDefaults) {
        eventConfig.filters = eventTypeConfig.filtersDefaults;
    }

    if (!params.secondFilters && secondEventTypeConfig.filtersDefaults) {
        secondEventConfig.filters = secondEventTypeConfig.filtersDefaults;
    }

    // Encode the event configurations as JSON strings and insert into the URL
    const eventParam = encodeURIComponent(JSON.stringify(eventConfig));
    const secondEventParam = encodeURIComponent(JSON.stringify(secondEventConfig));

    endpointTemplate = endpointTemplate.replace('{eventType}', eventParam);
    endpointTemplate = endpointTemplate.replace('{secondEventType}', secondEventParam);
    endpointTemplate = endpointTemplate.replace('{startDate}', encodeURIComponent(params.startDate));
    endpointTemplate = endpointTemplate.replace('{endDate}', encodeURIComponent(params.endDate));

    console.log("constructed URL : ", endpointTemplate)
    return endpointTemplate;
}
