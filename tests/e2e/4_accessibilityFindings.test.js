const fs = require('fs');
const path = require('path');

module.exports.runTest = async (page) => {
  console.log("Verifying Accessibility Findings Page...");

  // Ensure we're on the Accessibility Findings page
  await page.waitForSelector("h1", { visible: true });

  // Verify heading
  const heading = await page.$eval("h1", (el) => el.textContent.trim());

  if (heading === "Accessibility findings") {
    console.log("Passed: Correct Page Loaded");
  } else {
    console.error(`Failed: Expected "Accessibility Findings" but got "${heading}"`);
    return;
  }

  // Select "No" for all radio button groups
  console.log("Selecting 'No' for all radio button groups...");

  const radioNames = [
    "hasComponentBeenTestedExternalAccessibility",
    "hasComponentBeenTestedInternalAudit",
    "hasComponentBeenTestedUsingAssistiveTechnology"
  ];

  for (const name of radioNames) {
    await page.evaluate((name) => {
      const noRadio = document.querySelector(`input[name="${name}"][value="no"]`);
      if (noRadio) {
        noRadio.click();
      }
    }, name);
    console.log(`Selected 'no' for: ${name}`);
  }

  // Ensure the screenshots folder exists
  const screenshotsDir = "tests/e2e/screenshots";
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Save screenshot before clicking Continue
  const screenshotPath = `${screenshotsDir}/4_accessibility-findings.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });

  console.log(`Screenshot saved: ${screenshotPath}`);

  // Click "Continue" button to move forward
  console.log("Clicking 'Continue'...");

  const button = await page.evaluateHandle(() => {
    return [...document.querySelectorAll("button")].find(btn => btn.innerText.trim() === "Continue");
  });

  if (!button) {
    console.error("Continue button not found!");
    return;
  }

  // Click the button and wait for navigation
  await Promise.all([
    page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 10000 }), 
    button.click()
  ]);

  console.log("Successfully moved to the next step!");
};
