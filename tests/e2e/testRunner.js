const puppeteer = require('puppeteer');
const path = require('path');

// ✅ List test files in execution order
const testFiles = [
  "1_start.test.js",
  "2_componentDetails.test.js",
  "3_componentImage.test.js",
  "4_accessibilityFindings.test.js",
  "5_prototypeDesigns.test.js",
  "6_figmaDesigns.test.js",
  "7_componentCode.test.js",
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
