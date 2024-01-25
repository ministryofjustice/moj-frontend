new MOJFrontend.ButtonMenu({
  container: document.querySelectorAll(".moj-button-menu")[1],
  mq: "(min-width: 1000em)",
  buttonText: "More actions",
  buttonClasses:
    "govuk-button--secondary moj-button-menu__toggle-button--secondary",
  menuClasses: "moj-button-menu__wrapper--right",
});
