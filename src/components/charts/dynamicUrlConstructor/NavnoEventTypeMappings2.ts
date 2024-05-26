export const eventTypeMappings2 = {
    //areachart *
    Besøk: {
        eventType: `Besøk`,
        groupBy: [],
        filters: []
    },
    //areachart *
    BesøkGroupByCountry: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "country" }],
        filters: []
    },
    //table *
    BesøkGroupByPagePath: {
        eventType: `Besøk`,
        groupBy: [{ type: "event", value: "[Amplitude] Page Path" }],
        filters: []
    },
    //table *
    BesøkGroupByReferringDomain: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "gp:referring_domain" }],
        filters: []
    },
    //table *
    BesøkGroupByReferrer: {
        eventType: `Besøk`,
        groupBy: [{ type: "event", value: "referrer" }],
        filters: []
    },
    //vertical
    BesøkGroupByDayOfWeek: {
        eventType: `Besøk`,
        groupBy: [{ type: "day_time_prop", value: "amplitude_day_of_week", group_type: "User" }],
        filters: []
    },
    //vertical
    BesøkGroupByHourOfDay: {
        eventType: `Besøk`,
        groupBy: [{ type: "day_time_prop", value: "amplitude_hour_of_day", group_type: "User" }],
        filters: []
    },
    //area
    BesøkGroupByCity: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "city" }],
        filters: []
    },
    //area
    BesøkGroupByLanguage: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "language" }],
        filters: []
    },
    //might need to be removed
    BesøkFilterByDomainsAndPagePath: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "gp:referrer" }],
        filters: [
            { subprop_type: "gp:referrer", subprop_op: "contains", subprop_value: ["github.com%2Fnavikt", "navikt.github.io"] },
            { subprop_type: "[Amplitude] Page Path", subprop_op: "is", subprop_value: ["/jobbsoknad/"] }
        ]
    },
    //vertical
    BesøkGroupByOS: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "os" }],
        filters: []
    },
    //vertical
    BesøkGroupByDeviceFamily: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "device" }],
        filters: []
    },
    //vertical
    BesøkGroupByDeviceType: {
        eventType: `Besøk`,
        groupBy: [{ type: "user", value: "device_type" }],
        filters: []
    },

    // Add more predefined event types as needed
};
