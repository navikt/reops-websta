const BASE_URL = 'https://reops-proxy.ansatt.nav.no/amplitude';

export const fetchAmplitudeData = async (endpoint:string, teamDomain:string) => {
    const teamUrl = `/${teamDomain}/api`

    try {
        const response = await fetch(`${BASE_URL}${teamUrl}${endpoint}`, {
            credentials: 'include'
        });
        // rest of the code
    } catch (error) {
        // error handling
    }
};