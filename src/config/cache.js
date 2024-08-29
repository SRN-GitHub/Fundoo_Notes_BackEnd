
import Redis from 'ioredis';

const redis = new Redis({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
    // password: process.env.REDIS_PASSWORD || ''
});

export const setCache = async (key, data, ttl) => {
    try {
        await redis.set(key, JSON.stringify(data), 'EX', ttl);
    } catch (error) {
        console.error('Error setting cache:', error.message);
    }
};

export const getCache = async (key) => {
    try {
        const data = await redis.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting cache:', error.message);
        return null;
    }
};

export default redis;
