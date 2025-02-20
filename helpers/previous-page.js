const {COMPONENT_FORM_PAGES} = require("../config");
const previousPage = (url, session) => {
  if(session.checkYourAnswers) {
    return 'check-your-answers'
  }
  const path = url.split('/')[1]
  const index = COMPONENT_FORM_PAGES.findIndex((page) => path.endsWith(page))

  if (index > 0) {
    return COMPONENT_FORM_PAGES[index - 1]
    //todo multipage logic

    //todo need to implment the same logic as next page for complicated hidden fields... or use real history in session
  } else {
    return false
  }

}

module.exports = previousPage
