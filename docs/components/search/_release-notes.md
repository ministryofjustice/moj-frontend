---
permalink: false
eleventyComputed:
  override:eleventyNavigation: false
---
If using nunjucks, no changes needed unless wishing to use new layout options.

If using HTML the markup will need to be modified to change the root element
from a `<div>` to a `<search>` element, and move the button inside a new input-wrapper div within the form group.

#### old
```html
<div class="moj-search">
  <form action="#" method="post">
    <div class="govuk-form-group">
      <label class="govuk-label moj-search__label govuk-!-font-weight-bold" for="search">
        Find a person
      </label>
      <div id="search-hint" class="govuk-hint moj-search__hint ">
        You can search by name, date of birth or National Insurance number
      </div>
      <input class="govuk-input moj-search__input " id="search" name="search" type="search" aria-describedby="search-hint">
    </div>
    <button type="submit" class="govuk-button moj-search__button " data-module="govuk-button">
      Search
    </button>
  </form>
</div>
```

#### new
```
<search class="moj-search moj-search">
  <form action="#" method="get">
    <div class="govuk-form-group">
      <label class="govuk-label moj-search__label " for="search">
        Find a person
      </label>
      <div id="search-hint" class="govuk-hint moj-search__hint ">
        You can search by name, date of birth or National Insurance number
      </div>
      <div class="govuk-input__wrapper moj-search__input-wrapper">
        <input class="govuk-input moj-search__input " id="search" name="search" type="search" aria-describedby="search-hint">
        <button type="submit" class="govuk-button moj-search__button" data-module="govuk-button">
          Search
        </button>
      </div>
    </div>
  </form>
</search>
```

## in primary navigation
If using nunjucks, the custom `moj-search--ondark` and `moj-search--inline` classes can
be removed from the `classes` option passed to the macro.

If using html the same changes as above will need to be made, and the
`moj-search--ondark` and `moj-search--inline` classes removed from the root
element.

## in primary nav with toggle
If using nunjucks, the custom `moj-search--ondark` class can
be removed from the `classes` option passed to the macro.

If using html the same changes as above will need to be made, and the
`moj-search--ondark` class can be removed from the element with class
`.moj-search`.

