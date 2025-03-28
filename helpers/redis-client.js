const IORedis = require('ioredis')

const { REDIS_URL, REDIS_AUTH_TOKEN, REDIS_PORT, ENV } = require('../config')

let redis

if (ENV === 'development') {
  // Mock Redis client for development
  const Redis = require('ioredis-mock')
  redis = new Redis()
} else {
  // Create Redis client
  redis = new IORedis({
    host: REDIS_URL || '127.0.0.1',
    port: REDIS_PORT || 6379,
    ...(REDIS_AUTH_TOKEN
      ? { password: REDIS_AUTH_TOKEN, tls: {} }
      : { tls: false })
  })

  redis.on('connect', () => console.log('[Redis] Connected'))
  redis.on('error', (err) => console.error('[Redis] Error:', err))
}

module.exports = redis
