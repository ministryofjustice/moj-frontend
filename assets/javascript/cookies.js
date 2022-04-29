function Cookies($module) {
  this.$module = $module;
}

Cookies.prototype.init = function () {
  let $module = this.$module;
  if (!$module) {
    return;
  }

  const $accept = this.$module.querySelector('[name="accept"]');
  $accept.addEventListener("click", this.accept.bind(this));

  const $reject = this.$module.querySelector('[name="reject"]');
  $reject.addEventListener("click", this.reject.bind(this));

  const configEncoded = localStorage.getItem("mojpl-cookies");
  if (configEncoded) {
    const config = JSON.parse(configEncoded);

    this.load(config);
  }
};

Cookies.prototype.load = function (config) {
  if (config.analytics) {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }

    gtag("js", new Date());
    gtag("config", "G-VTGX4YLSVL");
  } else {
    window["ga-disable-G-VTGX4YLSVL"] = true;
  }

  this.hideMessage();
};

Cookies.prototype.hideMessage = function () {
  if (!this.$module.hasAttribute("data-persistent")) {
    this.$module.hidden = true;
  }
};

Cookies.prototype.accept = function () {
  const config = { analytics: true };
  localStorage.setItem("mojpl-cookies", JSON.stringify(config));

  this.load(config);
};

Cookies.prototype.reject = function () {
  const config = { analytics: false };
  localStorage.setItem("mojpl-cookies", JSON.stringify(config));

  window.location.reload();
};

export default Cookies;
