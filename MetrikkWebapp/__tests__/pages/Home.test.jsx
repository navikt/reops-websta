import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../src/pages/Home';
import * as AmplitudeApi from '../../src/service/AmplitudeApi.tsx'; // Adjust the import path as needed
import { initializeIcons } from '@fluentui/react/lib/Icons';
import canvas from 'canvas'

initializeIcons();

window.SVGElement.prototype.getComputedTextLength = () => 150;

HTMLCanvasElement.prototype.getContext = () => ({
    measureText: () => ({
        width: 100,
        height: 100,// Return a fixed width or adjust based on your needs
    }),
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

describe('Homepage', () => {
    it('renders correctly and matches snapshot', async () => {
        // Setup spy on fetchAmplitudeData // spying on an api call seems to be better then actually trying to mock the call
        const spy = vi.spyOn(AmplitudeApi, 'fetchAmplitudeData').mockResolvedValue(mockApiResponse);

        const { container } = render(<Home />);
        await waitFor(() => {
            expect(container).toMatchSnapshot();
        });

        // Verify fetchAmplitudeData was called
        expect(spy).toHaveBeenCalled();

        // Clean up
        spy.mockRestore();
    });


    it('contains the header "This is the homepage"', async () => {
        const { getByText } = render(<Home />);
        await waitFor(() => {
            expect(getByText('This is the homepage')).toBeInTheDocument();
        });
    });

    // Add more tests as necessary
});

afterEach(() => {
    vi.restoreAllMocks();
});

