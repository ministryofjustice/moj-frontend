const IORedis = require('ioredis')

const { REDIS_URL, REDIS_AUTH_TOKEN, REDIS_PORT } = require('../config')

// Create Redis client
const redis = new IORedis({
  host: REDIS_URL || '127.0.0.1',
  port: REDIS_PORT || 6379,
  ...(REDIS_AUTH_TOKEN
    ? { password: REDIS_AUTH_TOKEN, tls: {} }
    : { tls: false })
})

redis.on('connect', () => console.log('[Redis] Connected'))
redis.on('error', (err) => console.error('[Redis] Error:', err))

module.exports = redis
