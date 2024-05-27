export const events = {
    pageViewed: {
        name: "antall besøk",
        value: "[Amplitude] Page Viewed"
    }
};

export const groupBy = {
    country: {
        name: "land",
        groupByValues: [{
            type: "user",
            value: "country"
        }]
    },
    pagePath: {
        name: "sidesti",
        groupByValues: [{
            type: "event",
            value: "[Amplitude] Page Path"
        }]
    },
    referringDomain: {
        name: "henvisende domene egendefinert",
        groupByValues: [{
            type: "user",
            value: "gp:referring_domain"
        }]
    },
    referrer: {
        name: "henvisende domene",
        groupByValues: [{
            type: "event",
            value: "referrer"
        }]
    },
    dayOfWeek: {
        name: "dag i uken",
        groupByValues: [{
            type: "day_time_prop",
            value: "amplitude_day_of_week",
            group_type: "User"
        }]
    },
    hourOfDay: {
        name: "time på dagen",
        groupByValues: [{
            type: "day_time_prop",
            value: "amplitude_hour_of_day",
            group_type: "User"
        }]
    },
    city: {
        name: "by",
        groupByValues: [{
            type: "user",
            value: "city"
        }]
    },
    language: {
        name: "språk",
        groupByValues: [{
            type: "user",
            value: "language"
        }]
    },
    os: {
        name: "operativsystem",
        groupByValues: [{
            type: "user",
            value: "os"
        }]
    },
    device: {
        name: "enhet",
        groupByValues: [{
            type: "user",
            value: "device"
        }]
    },
    deviceType: {
        name: "enhetstype",
        groupByValues: [{
            type: "user",
            value: "device_type"
        }]
    }
    // Add more groupBy mappings as needed
};

export const eventTypeMappings2 = {
    //areachart *
    pageViewed: {
        eventType: events.pageViewed.value,
        groupBy: [],
        filters: []
    },
    //areachart *
    pageViewedGroupByCountry: {
        eventType: events.pageViewed.value,
        groupBy: groupBy.country.groupByValues,
        filters: []
    },
    //table *
    pageViewedGroupByPagePath: {
        eventType: events.pageViewed.value,
        groupBy: groupBy.pagePath.groupByValues,
        filters: []
    },
    //table *
    pageViewedGroupByReferringDomain: {
        eventType: events.pageViewed.value,
        groupBy: groupBy.referringDomain.groupByValues,
        filters: []
    },
    //table *
    pageViewedGroupByReferrer: {
        eventType: events.pageViewed.value,
        groupBy: groupBy.referrer.groupByValues,
        filters: []
    },
    //vertical
    pageViewedGroupByDayOfWeek: {
        eventType: events.pageViewed.value,
        groupBy: groupBy.dayOfWeek.groupByValues,
        filters: []
    },
    //vertical
    pageViewedGroupByHourOfDay: {
        eventType: events.pageViewed.value,
        groupBy: groupBy.hourOfDay.groupByValues,
        filters: []
    },
    //area
    pageViewedGroupByCity: {
        eventType: events.pageViewed.value,
        groupBy: groupBy.city.groupByValues,
        filters: []
    },
    //area
    pageViewedGroupByLanguage: {
        eventType: events.pageViewed.value,
        groupBy: groupBy.language.groupByValues,
        filters: []
    },
    //might need to be removed
    pageViewedFilterByDomainsAndPagePath: {
        eventType: events.pageViewed.value,
        groupBy: groupBy.referrer.groupByValues,
        filters: [
            { subprop_type: "gp:referrer", subprop_op: "contains", subprop_value: ["github.com%2Fnavikt", "navikt.github.io"] },
            { subprop_type: "[Amplitude] Page Path", subprop_op: "is", subprop_value: ["/jobbsoknad/"] }
        ]
    },
    //vertical
    pageViewedGroupByOS: {
        eventType: events.pageViewed.value,
        groupBy: groupBy.os.groupByValues,
        filters: []
    },
    //vertical
    pageViewedGroupByDeviceFamily: {
        eventType: events.pageViewed.value,
        groupBy: groupBy.device.groupByValues,
        filters: []
    },
    //vertical
    pageViewedGroupByDeviceType: {
        eventType: events.pageViewed.value,
        groupBy: groupBy.deviceType.groupByValues,
        filters: []
    },

    // Add more predefined event types as needed
};
