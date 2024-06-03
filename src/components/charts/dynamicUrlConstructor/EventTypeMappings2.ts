export const events = {
    pageViewed: {
        name: "Antall besøk",
        value: "[Amplitude] Page Viewed"
    },
    pageViewedNav:{
        name:"Antall besøk NAV",
        value:"besøk"
    }
};

export const groupBy = {
    country: {
        name: "Land",
        groupByValues: [{
            type: "user",
            value: "country"
        }]
    },
    pagePath: {
        name: "Sidesti",
        groupByValues: [{
            type: "event",
            value: "[Amplitude] Page Path"
        }]
    },
    referringDomain: {
        name: "Henvisende domene egendefinert",
        groupByValues: [{
            type: "user",
            value: "gp:referring_domain"
        }]
    },
    referrer: {
        name: "Henvisende domene",
        groupByValues: [{
            type: "event",
            value: "referrer"
        }]
    },
    dayOfWeek: {
        name: "Dag i uken",
        groupByValues: [{
            type: "day_time_prop",
            value: "amplitude_day_of_week",
            group_type: "User"
        }]
    },
    hourOfDay: {
        name: "Time på dagen",
        groupByValues: [{
            type: "day_time_prop",
            value: "amplitude_hour_of_day",
            group_type: "User"
        }]
    },
    city: {
        name: "By",
        groupByValues: [{
            type: "user",
            value: "city"
        }]
    },
    language: {
        name: "Språk",
        groupByValues: [{
            type: "user",
            value: "language"
        }]
    },
    os: {
        name: "Operativsystem",
        groupByValues: [{
            type: "user",
            value: "os"
        }]
    },
    device: {
        name: "Enhet",
        groupByValues: [{
            type: "user",
            value: "device"
        }]
    },
    deviceType: {
        name: "Enhetstype",
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

    //areachart *
    besøk: {
        eventType: `besøk`,
        groupBy: [],
        filters: []
    },
    //areachart *
    besøkGroupByCountry: {
        eventType: `besøk`,
        groupBy: groupBy.country.groupByValues,
        filters: []
    },
    //table *
    besøkGroupByPagePath: {
        eventType: `besøk`,
        groupBy: groupBy.pagePath.groupByValues,
        filters: []
    },
    //table *
    besøkGroupByReferringDomain: {
        eventType: `besøk`,
        groupBy: groupBy.referringDomain.groupByValues,
        filters: []
    },
    //table *
    besøkGroupByReferrer: {
        eventType: `besøk`,
        groupBy: groupBy.referrer.groupByValues,
        filters: []
    },
    //vertical
    besøkGroupByDayOfWeek: {
        eventType: `besøk`,
        groupBy: groupBy.dayOfWeek.groupByValues,
        filters: []
    },
    //vertical
    besøkGroupByHourOfDay: {
        eventType: `besøk`,
        groupBy: groupBy.hourOfDay.groupByValues,
        filters: []
    },
    //area
    besøkGroupByCity: {
        eventType: `besøk`,
        groupBy: groupBy.city.groupByValues,
        filters: []
    },
    //area
    besøkGroupByLanguage: {
        eventType: `besøk`,
        groupBy: groupBy.language.groupByValues,
        filters: []
    },
    //vertical
    besøkGroupByOS: {
        eventType: `besøk`,
        groupBy: groupBy.os.groupByValues,
        filters: []
    },
    //vertical
    besøkGroupByDeviceFamily: {
        eventType: `besøk`,
        groupBy: groupBy.device.groupByValues,
        filters: []
    },
    //vertical
    besøkGroupByDeviceType: {
        eventType: `besøk`,
        groupBy: groupBy.deviceType.groupByValues,
        filters: []
    },


    // Add more predefined event types as needed
};
