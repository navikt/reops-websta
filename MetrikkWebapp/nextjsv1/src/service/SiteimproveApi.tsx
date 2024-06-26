const BASE_URL = 'https://reops-proxy.intern.nav.no/siteimprove';

export const fetchSiteimproveData = async (endpoint: string) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error during fetch: ', error);
    throw error;
  }
};
