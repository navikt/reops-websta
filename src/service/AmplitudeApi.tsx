const BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:8081/amplitude' : 'https://reops-proxy.ansatt.nav.no/amplitude';

class RateLimiter {
    private maxRequestsPerSecond: number;
    private queue: Array<{ fn: Function, resolve: Function, reject: Function }>;
    private isProcessing: boolean;

    constructor(maxRequestsPerSecond: number) {
        this.maxRequestsPerSecond = maxRequestsPerSecond;
        this.queue = [];
        this.isProcessing = false;
    }

    async addToQueue(fn: Function) {
        return new Promise((resolve, reject) => {
            this.queue.push({ fn, resolve, reject });
            this.processQueue();
        });
    }

    private async processQueue() {
        if (this.queue.length === 0 || this.isProcessing) {
            return;
        }

        this.isProcessing = true;
        const { fn, resolve, reject } = this.queue.shift() as { fn: Function, resolve: Function, reject: Function };

        try {
            const result = await fn();
            resolve(result);
        } catch (error) {
            reject(error);
        }

        setTimeout(() => {
            this.isProcessing = false;
            this.processQueue();
        }, 0 / this.maxRequestsPerSecond);
    }
}

const rateLimiter = new RateLimiter(10); // 1 request per second

export const fetchAmplitudeData = async (endpoint: string, teamDomain: string) => {
    const teamUrl = `/${teamDomain}/api`;

    const fetchFunction = async () => {
        const response = await fetch(`${BASE_URL}${teamUrl}${endpoint}`, {
            credentials: window.location.hostname === 'localhost' ? 'omit' : 'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    };

    try {
        return await rateLimiter.addToQueue(fetchFunction);
    } catch (error) {
        console.error("Error during fetch: ", error);
        throw error;
    }
};