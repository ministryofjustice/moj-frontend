module.exports = function() {
  return {
    isStaging: process.env.STAGING || false
  };
};
