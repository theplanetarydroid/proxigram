import { RedisClient } from './RedisClient'
import config from '../../config'

type CacheService = RedisClient

class CacheRepository {
    constructor(private _cacheService: CacheService) {
        this._cacheService = _cacheService
    }

    get client() {
        return this._cacheService.client
    }

    connect() {
        if (config.server.withCache) {
            this._cacheService.connect()
            return new CacheRepository(this._cacheService)
        }
    }
}

const cacheService = new RedisClient()
const cache = new CacheRepository(cacheService).connect()

export const client = cache?.client 
