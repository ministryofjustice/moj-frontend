const path = require('path')

const puppeteer = require('puppeteer')

const hostUrl = process.env.HOST_URL || 'http://localhost:3001'

// ✅ List test files in execution order
const testFiles = [
  '1_start.spec.js',
  '2_componentDetails.spec.js',
  '3_componentImage.spec.js',
  '4a_accessibilityFindings.spec.js',
  '4b_accessibility-external-audit.spec.js',
  '4c_accessibility-internal-audit.spec.js',
  '4d_accessibility-assistive-tech.spec.js',
  '5a_prototypeDesigns.spec.js',
  '5b_prototypeDesigns-link.spec.js',
  '6a_componentCode.spec.js',
  '6b_componentCode-link.spec.js',
  '7a_figmaDesigns.spec.js',
  '7b_figmaDesigns-link.spec.js',
  '8_yourDetails.spec.js',
  '9_checkAnswers.spec.js'
]

;(async () => {
  console.log('Launching Community e2e Testing via Puppeteer...')
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
    args: process.env.PUPPETEER_NO_SANDBOX ? ['--no-sandbox'] : []
  })
  const page = await browser.newPage()

  for (const testFile of testFiles) {
    console.log(`🟢 Running test: ${testFile}`)
    const testPath = path.join(__dirname, testFile)
    const testModule = require(testPath)

    await testModule.runTest(page, hostUrl)
  }

  console.log('🟢 Closing Puppeteer... testing complete')
  await browser.close()
})()
