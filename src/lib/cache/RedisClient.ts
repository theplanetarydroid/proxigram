import { createClient } from 'redis';
import config from '../../config';


export class RedisClient {
    client;
    constructor() {
        const { username, password, uri, port } = config.cache;
        this.client = createClient({
            url: `redis://${username}:${password}@${uri}:${port}`
        });
    }

    connect() {
        this.client
            .connect()
            .then(() => console.log('Redis connected'))
            .catch(() => new Error('Error to connect to redis'));
    }
}