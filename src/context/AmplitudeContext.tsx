"use client";
import { useEffect, createContext } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { init, track } from "@amplitude/analytics-browser";
import { BaseEvent } from "@amplitude/analytics-types";
import { userAgentEnrichmentPlugin } from "@amplitude/plugin-user-agent-enrichment-browser";

export const AmplitudeContext = createContext({});

// @ts-ignore
const AmplitudeContextProvider = ({ children }) => {
  useEffect(() => {
    if (window.location.hostname !== "localhost") {
      amplitude.add(uaPlugin);
      init("1fe4740f82b4a986e81df1ead9b84ed5", undefined, {
        serverUrl: "https://amplitude.nav.no/collect",
        serverZone: "EU",
        defaultTracking: {
          pageViews: true,
          sessions: true,
        },
      });
    }
  }, []);

  const trackAmplitudeEvent = (
    eventName: string | BaseEvent,
    eventProperties: Record<string, any> | undefined,
  ) => {
    track(eventName, eventProperties);
  };

  const value = { trackAmplitudeEvent };

  const uaPlugin = userAgentEnrichmentPlugin({
    osName: true,
    osVersion: true,
    deviceManufacturer: true,
    deviceModel: true,
  });

  return (
    <AmplitudeContext.Provider value={value}>
      {children}
    </AmplitudeContext.Provider>
  );
};

export default AmplitudeContextProvider;
