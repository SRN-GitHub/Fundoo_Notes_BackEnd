
import { getCache, setCache } from '../config/cache';

export const cacheMiddleware = (ttl) => {
    return async (req, res, next) => {
        const cacheKey = req.originalUrl;

        const cachedData = await getCache(cacheKey);
        if (cachedData) {
            return res.status(200).json({
                code: 200,
                data: cachedData,
                message: 'Data fetched from cache successfully',
                source: 'redis'  // Indicate the data source
            });
        }

        // Capture the original send method to cache the response data
        const originalSend = res.send;
        res.send = async (body) => {
            if (res.statusCode === 200) {
                await setCache(cacheKey, JSON.parse(body), ttl);
            }
            originalSend.call(res, body);
        };

        next();
    };
};
