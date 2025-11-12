---
title: Accessible autocomplete
tabs: true
status: Experimental
statusDate: November 2025
excerpt: ""
lede: ""
githuburl: https://github.com/ministryofjustice/moj-frontend/discussions/categories/experimental-components-pages-and-patterns


---

{% tabs "paginate" %}
{% tab "Overview" %}

<div class="img-container">
  <img src="/assets/images/submission-1762947168818/137123399-80bfcbd5-a090-4005-b24d-7b71931ec904.png" alt="accessible autocomplete" />
</div>

## Overview
The user types a search term, and the results are returned with the search term(s) highlighted.

### How the component is currently used

Hovering over an item highlights the row. The user can then select a proceeding type using the radio buttons, and click the 'Save and continue' button. This component is used in conjunction with the add another pattern. The user is taken to the next page which asks them if they would like to add another proceeding. If they select 'Yes' they are taken back to the search page to add a further proceeding type.

Search results return once a user has entered more than 2 characters, and update automatically following further typing or removal of characters.

There is a visually hidden element which informs users that results will return automatically. There is also an aria-live region which is updated when the search results are returned with a message notifying the user that results have returned, along with the number of results. The results section behaves the same as a normal radio button group. Tabbing takes you into the group, and the up/down arrows are used to navigate between results and select an item. Tabbing again then takes you out of the group and moves focus to the 'Save and continue' button.

### Contribute to this component
You can help develop this component by adding information to the [‘accessible autocomplete’ Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Designs" %}

## Designs

A Figma link was not included when this component was added.

There may be more information in the [‘accessible autocomplete’ Github discussion]({{ githuburl }}). You can also view the component image in the overview.

## Contribute a Figma link

If you have a Figma link for this component (or a component like it) you can add it to [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Accessibility" %}

## Accessibility

No accessibility findings were included when this component was added. There may be more information in the [‘accessible autocomplete’ Github discussion]({{ githuburl }}).
## Contribute accessibility findings

    If you have accessibility findings that are relevant to this component you can add them to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% tab "Code" %}

## Code

Code has been added for this component. There may be other code blocks in the [‘accessible autocomplete’ Github discussion]({{ githuburl }}).


### Code block 1: JavaScript

<div class="app-example__code" data-module="app-copy">

```JavaScript
{% raw %}
import axios from 'axios'
import { hide, show, pluralize } from '../helpers'
import sanitizeHtml from 'sanitize-html'

const doneTypingInterval = 500 // time in ms, 500ms to make search work fairly quickly but avoid too many DB requests
const screenReaderMessageDelay = 1000 // wait before updating the screenreader message, to avoid interrupting queue
let typingTimer
let ariaText
let proceedingMatches = []
let noMatchCount = 0
let previousSearchTerm = null
let containSimilarWords = false

async function searchResults (host, searchTerm, excludeCodes) {
  const url = `${host}/proceeding_types/searches`
  const response = await axios({
    accept: 'application/json',
    responseType: 'json',
    method: 'post',
    url,
    data: {
      search_term: searchTerm,
      excluded_codes: excludeCodes
    }
  })
  const data = response.data.data
  return updateMatchCounters(data, searchTerm)
}

function setMatchAndCount (data = [], searchTerm = null) {
  noMatchCount = 0
  proceedingMatches = data
  previousSearchTerm = searchTerm
}

function substrInArrayOfWords (wordArray1, wordArray2) {
  const matches1 = wordArray1.map(substr => !!wordArray2.find(w => w.includes(substr)))
  const matches2 = wordArray2.map(substr => !!wordArray1.find(w => w.includes(substr)))
  return matches1.includes(true) || matches2.includes(true)
}

function checkSimilarWords (searchTerm) {
  if (searchTerm && previousSearchTerm) {
    const inputLower = searchTerm.toLowerCase().split(/\s+/)
    const previousLower = previousSearchTerm.toLowerCase().split(/\s+/)
    containSimilarWords = substrInArrayOfWords(inputLower, previousLower)
  }
}

function updateMatchCounters (data, searchTerm) {
  checkSimilarWords(searchTerm)

  if (data && data.length) {
    setMatchAndCount(data, searchTerm)
  } else if (!data || !containSimilarWords) {
    setMatchAndCount()
  } else if (proceedingMatches.length) {
    noMatchCount++
    if (noMatchCount > 3) setMatchAndCount()
  }

  return proceedingMatches
}

// Calls search only when the typing timer expires
async function doneTyping () {
  const host = document.querySelector('#exclude_codes').getAttribute('data-uri').trim()
  const inputText = document.querySelector('#proceeding-search-input').value.trim()
  const excludeCodes = document.querySelector('#exclude_codes').value.trim()

  if (inputText.length > 2) {
    hideProceeedingsItems()
    const results = await searchResults(host, inputText, excludeCodes)
    showResults(results, inputText)
  } else {
    ariaText = 'No text entered.'
    updateMatchCounters()
    hideProceeedingsItems()
  }
  setTimeout(() => { document.querySelector('#screen-reader-messages').innerHTML = sanitizeHtml(ariaText) }, screenReaderMessageDelay)
}

// Add event listeners for the user typing in the search box and clearing the search
function searchOnUserInput (searchInputBox) {
  searchInputBox.addEventListener('keyup', (event) => {
    clearTimeout(typingTimer)
    typingTimer = setTimeout(doneTyping, doneTypingInterval)
  })

  searchInputBox.addEventListener('keydown', () => clearTimeout(typingTimer))

  document
    .querySelector('#clear-proceeding-search')
    .addEventListener('click', () => {
      searchInputBox.value = ''
      deselectPreviousProceedingItem()
      hideProceeedingsItems()
      setTimeout(() => { document.querySelector('#screen-reader-messages').innerHTML = 'Search box has been cleared.' }, screenReaderMessageDelay)
    })
}

function deselectPreviousProceedingItem () {
  const selected = document.querySelector('input:checked')
  if (selected !== null) { selected.checked = false }
}

// Find the existing hidden proceeding type items
// If they are one of the search matches returned from the V1 api, remove the hidden class
// and highlight the search terms in the item text
function showResults (results, inputText) {
  if (results.length > 0) {
    deselectPreviousProceedingItem()
    const codes = results.map(obj => obj.ccms_code)
    let shown = 0
    let proceedingsContainer = document.querySelector('.govuk-radios') // with MP flag on
    if (proceedingsContainer == null) { proceedingsContainer = document.querySelector('#proceeding-list') } // with MP flag off
    codes.forEach((code, idx) => {
      // const element = $('#' + code)
      const element = document.getElementById(code)

      // if LFA returns a valid proceeding (e,g, SCA) but the feature flag for those
      // proceedings is turned off, then codes will only contain those proceeding types
      // that are not filtered out by the LegalFramework::ProceedingTypes::All service,
      // so we just ignore them here if they aren't in the list
      if (element == null) { return }

      shown++ // increment the count if this code is actually shown to the user
      // We want to highlight anything in the label or hint text that
      // matches the user's search criteria
      const label = element.querySelector('label')
      const hint = element.querySelector('.govuk-hint')

      // Remove any existing highlighting
      label.innerHTML = label.innerHTML.replace(/<mark class="highlight">/gi, '')
      label.innerHTML = label.innerHTML.replace(/<\/mark>/gi, '')
      hint.innerHTML = hint.innerHTML.replace(/<mark class="highlight">/gi, '')
      hint.innerHTML = hint.innerHTML.replace(/<\/mark>/gi, '')

      // Highlight any text that matches the user's input
      const terms = inputText.split(' ')
      terms.forEach((term, index) => {
        if (index === 0) {
          const regExp = RegExp(term.trim(), 'gi')
          label.innerHTML = label.innerHTML.replace(regExp, '<mark class="highlight">$&</mark>')
          hint.innerHTML = hint.innerHTML.replace(regExp, '<mark class="highlight">$&</mark>')
        } else {
          const regExp = RegExp(`(?<=(</mark>))( ?${term.trim()})`, 'gi')
          label.innerHTML = label.innerHTML.replace(regExp, '<mark class="highlight">$&</mark>')
          hint.innerHTML = hint.innerHTML.replace(regExp, '<mark class="highlight">$&</mark>')
        }
      })
      // move to top of list, but after previously added elements
      proceedingsContainer.insertBefore(element, proceedingsContainer.children[idx])
      // show hidden proceedings item
      show(element)
    })
    // once we have looped over all returned codes, check if any were shown to the user
    // and set the appropriate ariaText and show/hide the no-proceedings found element
    if (shown > 0) {
      // the below alerts screen reader users that results appeared on the page
      const pluralizedMatches = pluralize(codes.length, 'match', 'matches')
      ariaText = `${codes.length} ${pluralizedMatches} found for ${inputText}, use tab to move to options`
      show(document.querySelector('#proceeding-list'))
      hide(document.querySelector('.no-proceeding-items'))
    } else {
      showNoResults(inputText)
    }
  } else {
    showNoResults(inputText)
  }
}

function showNoResults (inputText) {
  hide(document.querySelector('#proceeding-list'))
  show(document.querySelector('.no-proceeding-items'))
  ariaText = `No results found matching ${inputText}`
}

// Hide any search results and the 'no results found' text
function hideProceeedingsItems () {
  document
    .querySelectorAll('.proceeding-item')
    .forEach(item => hide(item))

  hide(document.querySelector('.no-proceeding-items'))
  show(document.querySelector('#proceeding-list'))
}

function disableBackButton () {
  window.history.pushState(null, document.title, window.location.href)
  window.addEventListener('popstate', function (event) {
    window.history.pushState(null, document.title, window.location.href)
  })
}

if (window.location.href.includes('proceedings_types')) {
  disableBackButton()
}

// If the proceedings type search box appears on the page, call the searchOnUserInput function
document.addEventListener('DOMContentLoaded', event => {
  hide(document.querySelector('#proceeding-list'))
  const searchInputBox = document.querySelector('#proceeding-search-input')
  if (searchInputBox) searchOnUserInput(searchInputBox)
})

export { searchResults, searchOnUserInput, showResults }
{% endraw %}
```

</div>



### Code block 2: HTML

<div class="app-example__code" data-module="app-copy">

```HTML
{% raw %}
<div id="search-field" class="govuk-form-group govuk-!-margin-top-0 govuk-!-margin-bottom-0 ">
  <h2 class="govuk-heading-m govuk-!-margin-bottom-0">
    <label class="govuk-heading-m govuk-!-margin-bottom-0" for="proceeding-search-input">
      Search for legal proceedings
      <span class="govuk-hint govuk-!-margin-top-0 govuk-!-width-two-thirds">
        Select one domestic abuse or Section 8 proceeding at a time. You must select at least one domestic abuse proceeding.
        <span class="govuk-visually-hidden">Enter search term, results will automatically return</span>
      </span>
    </label>
  </h2>

  <div class="govuk-grid-row search-field govuk-!-margin-top-0">
    <div class="govuk-grid-column-two-thirds govuk-!-margin-top-0">
      <input class="govuk-input " id="proceeding-search-input" name="proceeding-search-input" type="text" autocomplete="off">
    </div>

    <div class="govuk-grid-column-one-third govuk-!-margin-top-2 clear-search">
      <p><a class="govuk-link govuk-!-font-size-19" id="clear-proceeding-search" aria-label="Clear search" href="#">Clear search</a></p>
    </div>
  </div>
</div>
<form action="#" method="post">
    <div id="proceeding-list" class="govuk-grid-column-two-thirds govuk-list govuk-!-margin-bottom-0">
        <div class="govuk-form-group">
          <fieldset class="govuk-fieldset">
             <legend class="govuk-fieldset__legend govuk-fieldset__legend--m govuk-visually-hidden">Id</legend><div class="govuk radios" data-module="govuk-radios">
              <div id="PR0200" class="govuk-grid-row proceeding-item" style-"display: block;">
                <div class="govuk-radios__item">
                  <input id="id-a" class="govuk-radios__input" aria-describedby="id-a-hint" type="radio" value="a" name="id">
                  <label for="id-a-field" class="govuk-label govuk-radios__label">
                    <mark class="highlight">Child</mark> arrangements order 
                  </label>
                  <span class="govuk-hint govuk-radios__hint" id="id-a-hint">Family (Section 8 orders)</span>
                </div>
              </div>
              <div id="PR0203" class="govuk-grid-row proceeding-item">
                <div class="govuk-radios__item">
                  <input id="id-b-field" class="govuk-radios__input" aria-describedby="id-b-hint" type="radio" value="b" name="id">
                  <label for="id-b-field" class="govuk-label govuk-radios__label">Forced marriage protection order</label>
                  <span class="govuk-hint govuk-radios__hint" id="id-b-hint">Family (Domestic Abuse)</span>
                </div>
            </div>
          </legend>
        </fieldset>
      </div>
    </div>
  </form>
<div id="screen-reader-messages" class="govuk-visually-hidden" aria-live="polite" aria-atomic="true" role="alert"></div>
{% endraw %}
```

</div>




## Contribute code for this component

If you have code that is relevant to this component you can add it to the [Github discussion]({{ githuburl }}). This helps other people to use it in their service.

{% endtab %}

{% endtabs %}
