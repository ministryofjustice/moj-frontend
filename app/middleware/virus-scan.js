const stream = require('stream')

const Sentry = require('@sentry/node')
const NodeClam = require('clamscan')

const {
  VIRUS_SCAN_ENABLED,
  VIRUS_SCAN_HOST,
  VIRUS_SCAN_PORT,
  VIRUS_SCAN_SOCKET,
  VIRUS_SCAN_TIMEOUT_MS
} = require('../config')

// Cache the initialized scanner instance so the underlying socket/config
// checks (`NodeClam#init`) only run once per process, not once per request.
let scannerPromise = null

const buildClamdOptions = () => {
  if (VIRUS_SCAN_SOCKET) {
    return {
      socket: VIRUS_SCAN_SOCKET,
      timeout: VIRUS_SCAN_TIMEOUT_MS,
      localFallback: false,
      active: true
    }
  }

  if (VIRUS_SCAN_HOST) {
    return {
      host: VIRUS_SCAN_HOST,
      port: VIRUS_SCAN_PORT,
      timeout: VIRUS_SCAN_TIMEOUT_MS,
      localFallback: false,
      active: true
    }
  }

  return null
}

const getScanner = (clamdscan) => {
  if (!scannerPromise) {
    scannerPromise = new NodeClam().init({
      clamdscan,
      clamscan: { active: false },
      preference: 'clamdscan'
    })
  }

  return scannerPromise
}

const createFileScanError = (code, message, field) => {
  const error = new Error(message)
  error.code = code
  error.field = field
  return error
}

const scanUploadedFileForViruses = async (req, res, next) => {
  if (!req.file || !VIRUS_SCAN_ENABLED) {
    console.error('[Virus scan] Scanner is not enabled or no file uploaded')
    return next()
  }

  const clamdscan = buildClamdOptions()
  const fieldName = req.file.fieldname || 'componentImage'

  if (!clamdscan) {
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
    const clamscan = await getScanner(clamdscan)
    const bufferStream = stream.Readable.from(req.file.buffer)
    const { isInfected, viruses } = await clamscan.scanStream(bufferStream)

    if (!isInfected) {
      console.warn('[Virus scan] File is clean')
      return next()
    }

    console.warn('[Virus scan] Malicious upload blocked', viruses)
    return next(
      createFileScanError(
        'LIMIT_FILE_VIRUS_FOUND',
        'Virus scan failed',
        fieldName
      )
    )
  } catch (error) {
    // Reset the cached scanner so a transient connection/init failure
    // doesn't keep failing every subsequent upload in this process.
    scannerPromise = null

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
