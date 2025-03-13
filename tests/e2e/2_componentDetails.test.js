const fs = require('fs');
const path = require('path');

module.exports.runTest = async (page) => {
  console.log("Verifying Component Details Page...");

  // Ensure we're on the Component Details page
  await page.waitForSelector("h1", { visible: true });

  // Verify heading
  const heading = await page.$eval("h1", (el) => el.textContent.trim());

  if (heading === "Component details") {
    console.log("Passed: Correct Page Loaded");
  } else {
    console.error(`Failed: Expected "Component Details" but got "${heading}"`);
    return;
  }

  // Fill out the input fields
  console.log("Filling out input fields...");
  await page.type("#component-name", "Test Component", { delay: 0 });
  await page.type("#component-overview", "This is a test description for the component.", { delay: 0 });
  await page.type("#how-is-the-component-used", "This is a test description for how the component is used.", { delay: 0 });

  // Ensure the screenshots folder exists
  const screenshotsDir = "tests/e2e/screenshots";
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // Save screenshot after filling inputs (before clicking Continue)
  const screenshotPath = `${screenshotsDir}/2_component-details.png`;
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
