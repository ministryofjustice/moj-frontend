const data = [
  'Oliver Bennett',
  'Amelia Smith',
  'Harry Thompson',
  'Isla Robertson',
  'George Whitmore',
  'Poppy Henderson',
  'Alfie Sutton',
  'Freya Blackwood',
  'Charlie Pemberton',
  'Harriet Forsyth'
]

if (typeof accessibleAutocomplete === 'function') {
  const searchInput = document.querySelector('#search')

  if (searchInput) {
    // create a container div to hold the autocomplete input and use it to
    // replace the original search input
    const autocompleteContainer = document.createElement('div')
    autocompleteContainer.className = 'moj-search__autocomplete-container'
    searchInput.replaceWith(autocompleteContainer)

    accessibleAutocomplete({
      element: autocompleteContainer,
      id: 'search', // To match it to the existing <label>.
      source: data,
      displayMenu: 'overlay'
    })
  }
}
