import axios, { AxiosInstance, AxiosResponse } from 'axios';
import config from '../config';
import { client } from '../lib/cache';

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

    async apiCall(request: () => Promise<AxiosResponse<any, any>>, options?: { cache: { username: string } }): Promise<any> {
        try {
            const username = options?.cache.username;
            if (!username || !client) {
                return (await request()).data
            }

            const cacheData = await client.get(username)
            if (!cacheData) {
                const { data } = await request();
                await client.setEx(username, config.cache.expiresIn, JSON.stringify(data))
                return data;
            }

            return JSON.parse(cacheData)
        } catch (e: any) {
            throw e;
        }
    }
}
