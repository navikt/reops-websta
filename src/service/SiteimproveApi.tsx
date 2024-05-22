const BASE_URL = 'https://reops-proxy.ansatt.nav.no/siteimprove';

export const fetchSiteimproveData = async (endpoint: string) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            credentials: 'include'
        });
        // rest of the code
    } catch (error) {
        // error handling
    }
};
