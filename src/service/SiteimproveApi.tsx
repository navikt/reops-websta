const BASE_URL = window.location.hostname === 'localhost' ? 'https://reops-proxy.intern.nav.no/siteimprove' : 'https://reops-proxy.ansatt.nav.no/siteimprove';

export const fetchSiteimproveData = async (endpoint: string) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            credentials: window.location.hostname === 'localhost' ? 'omit' : 'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error("Error during fetch: ", error);
        throw error;
    }
};