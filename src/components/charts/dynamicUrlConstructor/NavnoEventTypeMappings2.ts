export const eventTypeMappings2 = {
    //areachart *
    pageViewed: {
        eventType: `Besøk`,
        groupBy: [],
        filters: []
    },
    //areachart *
    pageViewedGroupByCountry: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "country" }],
        filters: []
    },
    //table *
    pageViewedGroupByPagePath: {
        eventType: `Besøk`,
        groupBy: [{ type: "event", value: "[Amplitude] Page Path" }],
        filters: []
    },
    //table *
    pageViewedGroupByReferringDomain: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "gp:referring_domain" }],
        filters: []
    },
    //table *
    pageViewedGroupByReferrer: {
        eventType: `Besøk`,
        groupBy: [{ type: "event", value: "referrer" }],
        filters: []
    },
    //vertical
    pageViewedGroupByDayOfWeek: {
        eventType: `Besøk`,
        groupBy: [{ type: "day_time_prop", value: "amplitude_day_of_week", group_type: "User" }],
        filters: []
    },
    //vertical
    pageViewedGroupByHourOfDay: {
        eventType: `Besøk`,
        groupBy: [{ type: "day_time_prop", value: "amplitude_hour_of_day", group_type: "User" }],
        filters: []
    },
    //area
    pageViewedGroupByCity: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "city" }],
        filters: []
    },
    //area
    pageViewedGroupByLanguage: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "language" }],
        filters: []
    },
    //might need to be removed
    pageViewedFilterByDomainsAndPagePath: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "gp:referrer" }],
        filters: [
            { subprop_type: "gp:referrer", subprop_op: "contains", subprop_value: ["github.com%2Fnavikt", "navikt.github.io"] },
            { subprop_type: "[Amplitude] Page Path", subprop_op: "is", subprop_value: ["/jobbsoknad/"] }
        ]
    },
    //vertical
    pageViewedGroupByOS: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "os" }],
        filters: []
    },
    //vertical
    pageViewedGroupByDeviceFamily: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "device" }],
        filters: []
    },
    //vertical
    pageViewedGroupByDeviceType: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "device_type" }],
        filters: []
    },

    // Add more predefined event types as needed
};
