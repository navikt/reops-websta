export const eventTypeMappings2 = {
    //areachart *
    pageViewed: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [],
        filters: []
    },
    //areachart *
    pageViewedGroupByCountry: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "user", value: "country" }],
        filters: []
    },
    //table *
    pageViewedGroupByPagePath: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "event", value: "[Amplitude] Page Path" }],
        filters: []
    },
    //table *
    pageViewedGroupByReferringDomain: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "user", value: "gp:referring_domain" }],
        filters: []
    },
    //table *
    pageViewedGroupByReferrer: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "event", value: "referrer" }],
        filters: []
    },
    //vertical
    pageViewedGroupByDayOfWeek: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "day_time_prop", value: "amplitude_day_of_week", group_type: "User" }],
        filters: []
    },
    //vertical
    pageViewedGroupByHourOfDay: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "day_time_prop", value: "amplitude_hour_of_day", group_type: "User" }],
        filters: []
    },
    //area
    pageViewedGroupByCity: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "user", value: "city" }],
        filters: []
    },
    //area
    pageViewedGroupByLanguage: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "user", value: "language" }],
        filters: []
    },
    //might need to be removed
    pageViewedFilterByDomainsAndPagePath: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "user", value: "gp:referrer" }],
        filters: [
            { subprop_type: "gp:referrer", subprop_op: "contains", subprop_value: ["github.com%2Fnavikt", "navikt.github.io"] },
            { subprop_type: "[Amplitude] Page Path", subprop_op: "is", subprop_value: ["/jobbsoknad/"] }
        ]
    },
    //vertical
    pageViewedGroupByOS: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "user", value: "os" }],
        filters: []
    },
    //vertical
    pageViewedGroupByDeviceFamily: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "user", value: "device" }],
        filters: []
    },
    //vertical
    pageViewedGroupByDeviceType: {
        eventType: `[Amplitude] Page Viewed`,
        groupBy: [{ type: "user", value: "device_type" }],
        filters: []
    },

    //areachart *
    besøk: {
        eventType: `besøk`,
        groupBy: [],
        filters: []
    },
    //areachart *
    besøkGroupByCountry: {
        eventType: `besøk`,
        groupBy: [{ type: "user", value: "country" }],
        filters: []
    },
    //table *
    besøkGroupByPagePath: {
        eventType: `besøk`,
        groupBy: [{ type: "event", value: "pagePath" }],
        filters: []
    },
    //table *
    besøkGroupByReferringDomain: {
        eventType: `besøk`,
        groupBy: [{ type: "user", value: "gp:referring_domain" }],
        filters: []
    },
    //table *
    besøkGroupByReferrer: {
        eventType: `besøk`,
        groupBy: [{ type: "event", value: "referrer" }],
        filters: []
    },
    //vertical
    besøkGroupByDayOfWeek: {
        eventType: `besøk`,
        groupBy: [{ type: "day_time_prop", value: "amplitude_day_of_week", group_type: "User" }],
        filters: []
    },
    //vertical
    besøkGroupByHourOfDay: {
        eventType: `besøk`,
        groupBy: [{ type: "day_time_prop", value: "amplitude_hour_of_day", group_type: "User" }],
        filters: []
    },
    //area
    besøkGroupByCity: {
        eventType: `besøk`,
        groupBy: [{ type: "user", value: "city" }],
        filters: []
    },
    //area
    besøkGroupByLanguage: {
        eventType: `besøk`,
        groupBy: [{ type: "user", value: "language" }],
        filters: []
    },
    //might need to be removed
    besøkFilterByDomainsAndPagePath: {
        eventType: `besøk`,
        groupBy: [{ type: "user", value: "gp:referrer" }],
        filters: [
            { subprop_type: "gp:referrer", subprop_op: "contains", subprop_value: ["github.com%2Fnavikt", "navikt.github.io"] },
            { subprop_type: "pagePath", subprop_op: "is", subprop_value: ["/jobbsoknad/"] }
        ]
    },
    //vertical
    besøkGroupByOS: {
        eventType: `besøk`,
        groupBy: [{ type: "user", value: "os" }],
        filters: []
    },
    //vertical
    besøkGroupByDeviceFamily: {
        eventType: `besøk`,
        groupBy: [{ type: "user", value: "device" }],
        filters: []
    },
    //vertical
    besøkGroupByDeviceType: {
        eventType: `besøk`,
        groupBy: [{ type: "user", value: "device_type" }],
        filters: []
    },


    // Add more predefined event types as needed
};
