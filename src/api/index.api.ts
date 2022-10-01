import axios, { AxiosInstance, AxiosResponse } from 'axios';
import config from '../config';

const headers = {
    'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
};

export class API {
    api: AxiosInstance;
    constructor() {
        this.api = axios.create({
            baseURL: `${config.server.host}/instastories`,
            headers,
        });
    }

    async apiCall(request: () => Promise<AxiosResponse<any, any>>): Promise<any> {
        try {
            return (await request()).data;
        } catch (e: any) {
            throw e;
        }
    }
}
