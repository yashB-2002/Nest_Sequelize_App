import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
    private client: Redis;

    constructor() {
        const redisHost = process.env.REDIS_URL || 'localhost';
        const redisPort = parseInt(process.env.REDIS_PORT, 10) || 6379;
        const redisPassword = process.env.REDIS_PASSWORD || '';

        this.client = new Redis({
            host: redisHost,
            port: redisPort,
            password: redisPassword,
        });
    }

    async get(key: string): Promise<any> {
        const data = await this.client.get(key);
        return data ? JSON.parse(data) : null;
    }

    async set(key: string, value: any, ttl: number = 3600): Promise<void> {
        await this.client.set(key, JSON.stringify(value), 'EX', ttl);
    }
}
