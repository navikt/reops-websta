// Import testing utilities
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import {AreaChart, DataVizPalette } from '@fluentui/react-charting';
import '@testing-library/jest-dom';

// Import the component and any dependencies
import AreaChartCustomAccessibilityExample from '../../src/components/charts/AreaChartCustomAccessibility/AreaChartCustomAccessibility.tsx';
import * as AmplitudeApi from '../../src/service/AmplitudeApi.tsx';

// Mock the @fluentui/react-charting library's AreaChart component
vi.mock('@fluentui/react-charting', async (importOriginal) => {
    const originalModule = await importOriginal();
    return {
        ...originalModule, // This spreads the original module's exports, including DataVizPalette
        AreaChart: vi.fn(() => <div>Mocked AreaChart</div>), // Except for AreaChart, which we mock
    };
});

// Sample response to be returned by the mock
const mockApiResponse = {
    data: {
        series: [
            [1, 4, 0, 1, 4, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 4, 1, 3, 0, 1, 1, 1, 1, 1]
        ],
        seriesCollapsed: [
            [
                {
                    setId: "",
                    value: 20
                }
            ]
        ],
        seriesLabels: [0],
        xValues: ["2024-01-01", "2024-01-02", "2024-01-03", "2024-01-04", "2024-01-05", "2024-01-06", "2024-01-07", "2024-01-08", "2024-01-09", "2024-01-10", "2024-01-11", "2024-01-12", "2024-01-13", "2024-01-14", "2024-01-15", "2024-01-16", "2024-01-17", "2024-01-18", "2024-01-19", "2024-01-20", "2024-01-21", "2024-01-22", "2024-01-23", "2024-01-24", "2024-01-25", "2024-01-26", "2024-01-27", "2024-01-28", "2024-01-29", "2024-01-30"]
    },
    timeComputed: 1707729289236,
    wasCached: true,
    // Additional properties as needed
};

// Mock the fetchAmplitudeData function before the tests
vi.mock('../../src/service/AmplitudeApi.tsx', () => ({
    fetchAmplitudeData: vi.fn(() => Promise.resolve(mockApiResponse))
}));
// Ensure the mock is typed correctly if using TypeScript
// If using JavaScript, you can remove the 'vi.mocked' type assertion
const mockedFetchAmplitudeData = vi.mocked(AmplitudeApi.fetchAmplitudeData, true);

describe('AreaChartCustomAccessibilityExample', () => {
    // Reset all mocks after each test
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('passes correct data to AreaChart', async () => {

        render(<AreaChartCustomAccessibilityExample />);

        await waitFor(() => {
            console.log(vi.mocked(AreaChart).mock.calls);
            // Check if the AreaChart component was rendered.
            // This example simply checks for the presence of the mocked component's text.
            expect(screen.getByText('Mocked AreaChart')).toBeInTheDocument();

            // Verify that AreaChart was called with the expected props, focusing on the data prop
            // This assertion might need to be adjusted based on the actual data structure your component constructs
            const areaChartCall = vi.mocked(AreaChart).mock.calls[0][0];
            expect(areaChartCall.data).toBeDefined();
            expect(areaChartCall.xAxisTitle).toBe('Dato');
            expect(areaChartCall.yAxisTitle).toBe('Antall besøk');
            // Further assertions can be made based on the structure of the data prop
        });
    });

    //TODO: Refactoring of charts so we decouple data from charts.
    //TODO: implementing mocking of api call from decoupled data
    /*
    it('passes correctly structured data to AreaChart, matching the first data point with mock data', async () => {
        render(<AreaChartCustomAccessibilityExample />);

        await waitFor(() => {
            const propsPassedToAreaChart = vi.mocked(AreaChart).mock.calls[0][0];
            const { data } = propsPassedToAreaChart;
            console.log(data.lineChartData);


            // Verify that the data prop is defined and structured correctly
            expect(data).toBeDefined();
            expect(data.chartTitle).toBe('Area chart Custom Accessibility example');
            expect(data.lineChartData).toBeDefined();
            expect(Array.isArray(data.lineChartData)).toBe(true);
            expect(data.lineChartData.length).toBeGreaterThan(0);

            // Optionally, verify the structure and values of the first data point in the first dataset
            const firstDataset = data.lineChartData[0];
            expect(firstDataset).toBeDefined();
            expect(firstDataset.data).toBeDefined();
            expect(firstDataset.data.length).toBeGreaterThan(0); // Ensure there's at least one data point

            // Verify the first data point's x and y values if needed
            const firstDataPoint = firstDataset.data[0];
            expect(firstDataPoint).toBeDefined();
            expect(firstDataPoint.x).toBeDefined(); // Verify the x value matches your expectation
            expect(firstDataPoint.y).toBeDefined(); // Verify the y value matches your expectation
        });
    });

     */
});