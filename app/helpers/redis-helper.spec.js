const redis = require('../redis-client')

const { getFileFromRedis } = require('./redis-helper')

jest.mock('../redis-client', () => ({
  get: jest.fn()
}))

const consoleErrorSpy = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {})

describe('getFileFromRedis', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    consoleErrorSpy.mockRestore()
  })

  describe('successful file retrieval', () => {
    it('should retrieve and parse file data correctly', async () => {
      const mockBuffer = Buffer.from('test file content')
      const mockFileData = {
        buffer: mockBuffer.toString('base64'),
        originalname: 'test-file.txt',
        mimetype: 'text/plain'
      }

      redis.get.mockResolvedValue(JSON.stringify(mockFileData))

      const result = await getFileFromRedis('test-key')

      expect(redis.get).toHaveBeenCalledWith('test-key')
      expect(result).toEqual({
        buffer: mockBuffer,
        originalname: 'test-file.txt',
        mimetype: 'text/plain'
      })
    })

    it('should handle different file types correctly', async () => {
      const mockBuffer = Buffer.from('{"test": "json"}')
      const mockFileData = {
        buffer: mockBuffer.toString('base64'),
        originalname: 'data.json',
        mimetype: 'application/json'
      }

      redis.get.mockResolvedValue(JSON.stringify(mockFileData))

      const result = await getFileFromRedis('json-file-key')

      expect(result.buffer).toEqual(mockBuffer)
      expect(result.originalname).toBe('data.json')
      expect(result.mimetype).toBe('application/json')
    })

    it('should handle binary files correctly', async () => {
      // Simulate binary data (e.g., an image)
      const binaryData = new Uint8Array([0xff, 0xd8, 0xff, 0xe0]) // JPEG header bytes
      const mockBuffer = Buffer.from(binaryData)
      const mockFileData = {
        buffer: mockBuffer.toString('base64'),
        originalname: 'image.jpg',
        mimetype: 'image/jpeg'
      }

      redis.get.mockResolvedValue(JSON.stringify(mockFileData))

      const result = await getFileFromRedis('image-key')

      expect(result.buffer).toEqual(mockBuffer)
      expect(result.originalname).toBe('image.jpg')
      expect(result.mimetype).toBe('image/jpeg')
    })

    it('should handle large files', async () => {
      const largeContent = 'x'.repeat(10000)
      const mockBuffer = Buffer.from(largeContent)
      const mockFileData = {
        buffer: mockBuffer.toString('base64'),
        originalname: 'large-file.txt',
        mimetype: 'text/plain'
      }

      redis.get.mockResolvedValue(JSON.stringify(mockFileData))

      const result = await getFileFromRedis('large-file-key')

      expect(result.buffer).toEqual(mockBuffer)
      expect(result.originalname).toBe('large-file.txt')
      expect(result.mimetype).toBe('text/plain')
    })
  })

  describe('error handling - file not found', () => {
    it('should throw error when Redis returns null', async () => {
      redis.get.mockResolvedValue(null)

      await expect(getFileFromRedis('non-existent-key')).rejects.toThrow(
        'File not found for Redis key: non-existent-key'
      )
      expect(console.error).toHaveBeenCalledWith(
        '[Redis] Error retrieving file: Error: File not found for Redis key: non-existent-key'
      )
    })

    it('should throw error when Redis returns undefined', async () => {
      redis.get.mockResolvedValue(undefined)

      await expect(getFileFromRedis('undefined-key')).rejects.toThrow(
        'File not found for Redis key: undefined-key'
      )
      expect(console.error).toHaveBeenCalledWith(
        '[Redis] Error retrieving file: Error: File not found for Redis key: undefined-key'
      )
    })

    it('should throw error when Redis returns empty string', async () => {
      redis.get.mockResolvedValue('')

      await expect(getFileFromRedis('empty-key')).rejects.toThrow(
        'File not found for Redis key: empty-key'
      )
      expect(console.error).toHaveBeenCalledWith(
        '[Redis] Error retrieving file: Error: File not found for Redis key: empty-key'
      )
    })
  })
})
