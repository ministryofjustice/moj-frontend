const Sentry = require('@sentry/node')
const { scanBuffer, Verdict } = require('pompelmi')

const {
  VIRUS_SCAN_ENABLED,
  VIRUS_SCAN_HOST,
  VIRUS_SCAN_PORT,
  VIRUS_SCAN_SOCKET,
  VIRUS_SCAN_TIMEOUT_MS,
  VIRUS_SCAN_RETRIES,
  VIRUS_SCAN_RETRY_DELAY_MS
} = require('../config')

const buildScanOptions = () => {
  if (VIRUS_SCAN_SOCKET) {
    return {
      socket: VIRUS_SCAN_SOCKET,
      timeout: VIRUS_SCAN_TIMEOUT_MS,
      retries: VIRUS_SCAN_RETRIES,
      retryDelay: VIRUS_SCAN_RETRY_DELAY_MS
    }
  }

  if (VIRUS_SCAN_HOST) {
    return {
      host: VIRUS_SCAN_HOST,
      port: VIRUS_SCAN_PORT,
      timeout: VIRUS_SCAN_TIMEOUT_MS,
      retries: VIRUS_SCAN_RETRIES,
      retryDelay: VIRUS_SCAN_RETRY_DELAY_MS
    }
  }

  return null
}

const createFileScanError = (code, message, field) => {
  const error = new Error(message)
  error.code = code
  error.field = field
  return error
}

const scanUploadedFileForViruses = async (req, res, next) => {
  if (!req.file || !VIRUS_SCAN_ENABLED) {
    return next()
  }

  const scanOptions = buildScanOptions()
  const fieldName = req.file.fieldname || 'componentImage'

  if (!scanOptions) {
    const error = createFileScanError(
      'LIMIT_FILE_VIRUS_SCAN_FAILED',
      'Virus scanner is not configured',
      fieldName
    )
    console.error('[Virus scan] Scanner is enabled but not configured')
    Sentry.captureException(error)
    return next(error)
  }

  try {
    const verdict = await scanBuffer(req.file.buffer, scanOptions)

    if (verdict === Verdict.Clean) {
      return next()
    }

    if (verdict === Verdict.Malicious) {
      console.warn('[Virus scan] Malicious upload blocked')
      return next(
        createFileScanError(
          'LIMIT_FILE_VIRUS_FOUND',
          'Virus scan failed',
          fieldName
        )
      )
    }

    const error = createFileScanError(
      'LIMIT_FILE_VIRUS_SCAN_FAILED',
      'Virus scanner returned a scan error',
      fieldName
    )
    console.error('[Virus scan] Scanner returned ScanError')
    Sentry.captureException(error)
    return next(error)
  } catch (error) {
    const scanError = createFileScanError(
      'LIMIT_FILE_VIRUS_SCAN_FAILED',
      'Virus scanner failed',
      fieldName
    )
    scanError.cause = error
    console.error(`[Virus scan] Error scanning upload: ${error.message}`)
    Sentry.captureException(error)
    return next(scanError)
  }
}

module.exports = {
  scanUploadedFileForViruses
}
