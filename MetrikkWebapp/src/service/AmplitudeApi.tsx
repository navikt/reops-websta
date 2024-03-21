const BASE_URL = 'http://localhost:8085/amplitude/100004455/api';

export const fetchAmplitudeData = async (endpoint: string) => {
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
