const people = [
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
    const wrapper = document.createElement('div')
    wrapper.className = 'search-autocomplete-wrapper'
    searchInput.parentNode.insertBefore(wrapper, searchInput)
    searchInput.remove()
  }

  const autocompleteElement = document.querySelector(
    '#search-autocomplete .search-autocomplete-wrapper'
  )

  if (autocompleteElement) {
    accessibleAutocomplete({
      element: autocompleteElement,
      id: 'search', // To match it to the existing <label>.
      source: people,
      displayMenu: 'overlay'
    })
  }
}
