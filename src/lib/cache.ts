import { createClient } from 'redis';
import config from '../config'


export const client = (() => {
    if (config.server.withCache) {
        const { username, password, uri, port } = config.cache
        const client = createClient({
            url: `redis://${username}:${password}@${uri}:${port}`
        });

        client
            .connect()
            .then(() => console.log('Redis connected'))
            .catch(() => { throw new Error('Error to connect to redis') })

        return client;
    }
})()