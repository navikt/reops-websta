export const eventTypeMappings = {
    pageViewed: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [],
        filters: []
    },
    pageViewedGroupByCountry: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "user", value: "country" }],
        filters: []
    },
    pageViewedGroupByPagePath: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "event", value: "[Amplitude] Page Path" }],
        filters: []
    },
    pageViewedGroupByReferringDomain: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "user", value: "gp:referring_domain" }],
        filters: []
    },
    pageViewedGroupByReferrer: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "event", value: "referrer" }],
        filters: []
    },
    pageViewedGroupByDayOfWeek: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "day_time_prop", value: "amplitude_day_of_week", group_type: "User" }],
        filters: []
    },
    pageViewedGroupByHourOfDay: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "day_time_prop", value: "amplitude_hour_of_day", group_type: "User" }],
        filters: []
    },
    pageViewedGroupByCity: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "user", value: "city" }],
        filters: []
    },
    pageViewedGroupByLanguage: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "user", value: "language" }],
        filters: []
    },
    pageViewedFilterByDomainsAndPagePath: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "user", value: "gp:referrer" }],
        filters: [
            { subprop_type: "gp:referrer", subprop_op: "contains", subprop_value: ["github.com%2Fnavikt", "navikt.github.io"] },
            { subprop_type: "[Amplitude] Page Path", subprop_op: "is", subprop_value: ["/jobbsoknad/"] }
        ]
    },
    pageViewedGroupByOS: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [],
        filters: []
    },
    pageViewedGroupByDeviceFamily: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "user", value: "country" }],
        filters: []
    },
    pageViewedGroupByDeviceType: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [],
        filters: []
    },
    pageViewedGroupByCountryFilterByPath: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "user", value: "country" }],
        filters: [{ subprop_type: "event", subprop_key: "[Amplitude] Page Path", subprop_op: "contains", subprop_value: ["/kort-fortalt/1284/"] }]
    },
    // Add more predefined event types as needed
};
