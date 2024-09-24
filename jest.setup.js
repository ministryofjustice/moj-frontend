require("@testing-library/jest-dom");
require("./src/moj/vendor/jquery");

const { toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

MOJFrontend = {};
