const BASE_URL = 'https://reops-proxy.ansatt.nav.no/amplitude';

export const fetchAmplitudeData = async (endpoint:string, teamDomain:string) => {
    const teamUrl = `/${teamDomain}/api`

    try {
        const response = await fetch(`${BASE_URL}${teamUrl}${endpoint}`, {
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        // Handle or throw the error
        console.error("Error during fetch: ", error);
        throw error;
    }
};