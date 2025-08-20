const fetch = require('node-fetch')

const {
  GITHUB_API_URL,
  GITHUB_API_TOKEN,
  GITHUB_REPO_OWNER,
  GITHUB_REPO_NAME
} = require('../config')

const { pushToGitHub, createPullRequest } = require('./github-api')

jest.mock('node-fetch', () => jest.fn())

describe('GitHub API Module', () => {
  let consoleLogSpy

  beforeAll(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    consoleLogSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterAll(() => {
    consoleLogSpy.mockRestore()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('pushToGitHub', () => {
    it('should create a branch and push files to GitHub', async () => {
      const sessionData = {
        key1: 'value1',
        key2: {
          componentImage: {
            buffer: Buffer.from('image data'),
            fieldname: 'images',
            originalname: 'test.png'
          }
        }
      }

      const mockFetch = fetch

      // Mock responses for fetching main branch
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            object: { sha: 'mock-sha-main' }
          })
        })

        // Mock response for creating a branch
        .mockResolvedValueOnce({
          ok: true
        })

        // mock response for adding files
        .mockResolvedValue({
          ok: true
        })

      const branchName = await pushToGitHub(sessionData, 'submission')

      expect(branchName).toBe('submission')
      expect(mockFetch).toHaveBeenCalledTimes(4)
      expect(mockFetch).toHaveBeenCalledWith(
        `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/git/ref/heads/main`,
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${GITHUB_API_TOKEN}`
          })
        })
      )
    })

    it('should throw an error if fetching main branch fails', async () => {
      const status = 404
      const statusText = 'Not Found'
      fetch.mockResolvedValueOnce({
        ok: false,
        status,
        statusText,
        text: async () => 'Mocked error response body'
      })

      await expect(pushToGitHub({})).rejects.toThrow(
        `Failed to fetch main branch: ${statusText}`
      )
    })
  })

  describe('createPullRequest', () => {
    it('should create a pull request successfully', async () => {
      const branchName = 'test-branch'
      const title = 'Test PR'
      const description = 'This is a test pull request'

      fetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            html_url: 'https://github.com/example/pr/1',
            number: '1234'
          })
        })
        // mock response for adding label
        .mockResolvedValue({
          ok: true
        })

      const pr = await createPullRequest(branchName, title, description)

      expect(pr).toStrictEqual({
        url: 'https://github.com/example/pr/1',
        number: '1234'
      })
      expect(fetch).toHaveBeenCalledWith(
        `${GITHUB_API_URL}/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/pulls`,
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            Authorization: `Bearer ${GITHUB_API_TOKEN}`
          }),
          body: JSON.stringify({
            title,
            head: branchName,
            base: 'main',
            body: description
          })
        })
      )
    })

    it('should throw an error if creating a pull request fails', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Unauthorized',
        text: async () => 'Mocked error response body'
      })

      await expect(createPullRequest('test-branch', 'Test PR')).rejects.toThrow(
        'Failed to create pull request'
      )
    })
  })
})
