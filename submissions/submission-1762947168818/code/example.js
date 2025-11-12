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