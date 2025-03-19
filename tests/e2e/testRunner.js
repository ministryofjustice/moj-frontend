const puppeteer = require('puppeteer');
const path = require('path');

// ✅ List test files in execution order
const testFiles = [
  "1_start.test.js",
  "2_componentDetails.test.js",
  "3_componentImage.test.js",
  "4a_accessibilityFindings.test.js",
  "4b_accessibility-external-audit.test.js",
  "4c_accessibility-internal-audit.test",
  "4d_accessibility-assistive-tech.test",
  "5a_prototypeDesigns.test.js",
  "5b_prototypeDesigns-link.test.js",
  "6a_figmaDesigns.test.js",
  "6b_figmaDesigns-link.test.js",
  "7a_componentCode.test.js",
  "7b_componentCode-link.test.js",
  "8_yourDetails.test.js",
  "9_checkAnswers.test.js"
];

(async () => {
  console.log("Launching Community e2e Testing via Puppeteer...");
  const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();

  for (const testFile of testFiles) {
    console.log(`🟢 Running test: ${testFile}`);
    const testPath = path.join(__dirname, testFile);
    const testModule = require(testPath);

    await testModule.runTest(page); 
  }

  console.log("🟢 Closing Puppeteer... testing complete");
  await browser.close();
})();
