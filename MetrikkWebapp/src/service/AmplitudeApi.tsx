const BASE_URL = 'http://localhost:8085/amplitude';

interface Endpoint {
    endpoint: string;
}
export const fetchAmplitudeData = async (endpoint:Endpoint, teamDomain:string) => {
    const teamUrl = `/${teamDomain}/api`

    try {
        const response = await fetch(`${BASE_URL}${teamUrl}${endpoint}`);
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