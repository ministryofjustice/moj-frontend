const { createClient } = require('redis')

const { REDIS_URL, REDIS_AUTH_TOKEN, REDIS_PORT, ENV } = require('./config')

let redis

if (ENV === 'development' || ENV === 'test') {
  // Mock Redis client for development
  const redisMock = require('redis-mock')
  redis = redisMock.createClient()
} else {
  // Create Redis client
  redis = createClient({
    socket: {
      host: REDIS_URL || '127.0.0.1',
      port: REDIS_PORT || 6379,
      ...(REDIS_AUTH_TOKEN ? { tls: true } : {})
    },
    ...(REDIS_AUTH_TOKEN ? { password: REDIS_AUTH_TOKEN } : {})
  })

  redis.connect()

  redis.on('connect', () => console.log('[Redis] Connected'))
  redis.on('error', (err) => console.error('[Redis] Error:', err))
}

module.exports = redis
