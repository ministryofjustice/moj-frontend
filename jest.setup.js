require("@testing-library/jest-dom");
require("./src/moj/vendor/jquery");
require("mock-match-media/jest-setup");
const { setMedia } = require("mock-match-media");
const { toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

MOJFrontend = {};
