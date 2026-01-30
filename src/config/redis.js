const Redis = require('ioredis');
const { REDIS_URL } = require('./env');

const redis = new Redis(REDIS_URL);

redis.on('connect', () => {
    console.log('⚡ Connected to Redis');
});

redis.on('error', (err) => {
    console.log('❌ Redis connection error:', err);
    // process.exit(1);
});

module.exports = redis;
