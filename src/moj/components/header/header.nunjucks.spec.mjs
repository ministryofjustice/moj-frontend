import { getByRole, queryByRole } from '@testing-library/dom'

import { render, getExamples } from '../../lib/components.js'

describe('header', () => {
  let examples

  /**
   * @param {string} name - Fixture name
   * @returns {HTMLElement} The rendered header
   */
  function renderExample(name) {
    document.body.insertAdjacentHTML(
      'afterbegin',
      render('header', examples[name])
    )

    return /** @type {HTMLElement} */ (
      document.querySelector('[data-module="moj-header"]')
    )
  }

  beforeAll(async () => {
    examples = await getExamples('header')
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe('by default', () => {
    test('renders the header landmark and linked organisation and service names', () => {
      const $component = renderExample('default')

      expect(getByRole(document.body, 'banner')).toBe($component)
      expect($component).toHaveClass('moj-header')
      expect(
        getByRole($component, 'link', { name: 'Ministry of Justice' })
      ).toHaveAttribute('href', '/organisation')
      expect(
        getByRole($component, 'link', { name: 'Service name' })
      ).toHaveAttribute('href', '/service')
    })

    test('renders the crest as a decorative logo', () => {
      const $component = renderExample('default')
      const $logo = $component.querySelector('svg.moj-header__logo')

      expect($logo).toHaveClass('moj-logo--crest')
      expect($logo).toHaveAttribute('aria-hidden', 'true')
      expect($logo).toHaveAttribute('focusable', 'false')
    })

    test('does not render optional content or layout modifiers', () => {
      const $component = renderExample('default')

      expect(queryByRole($component, 'navigation')).not.toBeInTheDocument()
      expect($component.querySelector('.govuk-tag')).not.toBeInTheDocument()
      expect($component).not.toHaveClass('moj-header--with-account')
      expect($component).not.toHaveClass('moj-header--with-navigation')
    })
  })

  describe('labels', () => {
    test('supports a header without either label', () => {
      const $component = renderExample('without labels')

      expect(
        $component.querySelector('.moj-header__organisation-name')
      ).not.toBeInTheDocument()
      expect(
        $component.querySelector('.moj-header__service-name')
      ).not.toBeInTheDocument()
      expect($component.querySelector('.moj-header__logo')).toBeInTheDocument()
    })

    test.each([
      ['organisation only', 'organisation', 'service', 'Ministry of Justice'],
      ['service only', 'service', 'organisation', 'Service name']
    ])('supports %s without a link', (fixture, label, omittedLabel, text) => {
      const $component = renderExample(fixture)

      expect(
        $component.querySelector(`span.moj-header__${label}-name`)
      ).toHaveTextContent(text)
      expect(
        $component.querySelector(`.moj-header__${omittedLabel}-name`)
      ).not.toBeInTheDocument()
      expect(queryByRole($component, 'link')).not.toBeInTheDocument()
    })

    test.each(['labels with html', 'unlinked labels with html'])(
      'renders %s instead of text',
      (fixture) => {
        const $component = renderExample(fixture)

        expect(
          $component.querySelector('.moj-header__organisation-name strong')
        ).toHaveTextContent('Ministry of Justice')
        expect(
          $component.querySelector('.moj-header__service-name strong')
        ).toHaveTextContent('Service name')
        expect($component).not.toHaveTextContent('Ignored')
      }
    )

    test('escapes text in linked and unlinked labels', () => {
      const $component = renderExample('labels with escaped text')

      expect(
        $component.querySelector('.moj-header__organisation-name')
      ).toHaveTextContent('<strong>Ministry of Justice</strong>')
      expect(
        $component.querySelector('.moj-header__service-name')
      ).toHaveTextContent('<strong>Service name</strong>')
      expect($component.querySelector('strong')).not.toBeInTheDocument()
    })
  })

  describe('custom header options', () => {
    test.each(['crown', 'crest'])('renders the %s logo', (type) => {
      const $component = renderExample(`${type} logo`)

      expect($component.querySelector('svg.moj-header__logo')).toHaveClass(
        `moj-logo--${type}`
      )
    })

    test('adds classes and attributes to the correct containers', () => {
      const $component = renderExample('with classes and attributes')
      const $container = $component.querySelector('.moj-header__container')

      expect($component).toHaveClass('moj-header', 'custom-header')
      expect($component).toHaveAttribute('id', 'service-header')
      expect($component).toHaveAttribute('data-custom', 'header-value')
      expect($container).toHaveClass('custom-container')
      expect($container).not.toHaveClass('custom-header')
      expect($component).not.toHaveClass('custom-container')
    })
  })

  describe('tag', () => {
    test('passes text, classes and attributes to the GOV.UK tag', () => {
      const $component = renderExample('with tag')
      const $tag = $component.querySelector('.moj-header__identity .govuk-tag')

      expect($tag).toHaveTextContent('Official sensitive')
      expect($tag).toHaveClass('govuk-tag--red')
      expect($tag).toHaveAttribute('data-custom', 'tag-value')
    })

    test('passes HTML to the GOV.UK tag instead of text', () => {
      const $component = renderExample('tag with html')

      expect($component.querySelector('.govuk-tag span')).toHaveTextContent(
        'Official sensitive'
      )
      expect($component).not.toHaveTextContent('Ignored tag')
    })
  })

  describe('account', () => {
    test('renders the username and links with default link text', () => {
      const $component = renderExample('with account')
      const $account = getByRole($component, 'navigation')

      expect($component).toHaveClass('moj-header--with-account')
      expect($account).toHaveClass('moj-header__account')
      expect($account.querySelector('.moj-header__user')).toHaveTextContent(
        'A.Name'
      )
      expect(
        getByRole($account, 'link', { name: 'Manage your details' })
      ).toHaveAttribute('href', '/account')
      expect(getByRole($account, 'link', { name: 'Sign out' })).toHaveAttribute(
        'href',
        '/sign-out'
      )
    })

    test('supports custom navigation options and link text', () => {
      const $component = renderExample('account with custom options')
      const $account = getByRole($component, 'navigation', {
        name: 'Your account'
      })

      expect($account).toHaveClass('moj-header__account', 'custom-account')
      expect($account).toHaveAttribute('data-custom', 'account-value')
      expect(
        getByRole($account, 'link', { name: 'Update your account' })
      ).toHaveAttribute('href', '/account')
      expect(getByRole($account, 'link', { name: 'Log out' })).toHaveAttribute(
        'href',
        '/sign-out'
      )
    })

    test('renders link HTML in preference to text and escapes the username', () => {
      const $component = renderExample('account with html')
      const $account = getByRole($component, 'navigation')
      const $username = $account.querySelector('.moj-header__user')

      expect($username).toHaveTextContent('<strong>A.Name</strong>')
      expect($username.querySelector('strong')).not.toBeInTheDocument()
      expect(
        getByRole($account, 'link', {
          name: 'Update your account'
        }).querySelector('strong')
      ).toBeInTheDocument()
      expect(
        getByRole($account, 'link', { name: 'Log out' }).querySelector('strong')
      ).toBeInTheDocument()
      expect($account).not.toHaveTextContent('Ignored')
    })

    test('supports a username without account links', () => {
      const $component = renderExample('account with username only')
      const $account = getByRole($component, 'navigation')

      expect($account.querySelector('.moj-header__user')).toHaveTextContent(
        'A.Name'
      )
      expect(queryByRole($account, 'link')).not.toBeInTheDocument()
      expect($component).toHaveClass('moj-header--with-account')
    })

    test('renders a sign-out link without a username but omits the manage link', () => {
      const $component = renderExample('account with sign-out only')
      const $account = getByRole($component, 'navigation')

      expect(getByRole($account, 'link', { name: 'Sign out' })).toHaveAttribute(
        'href',
        '/sign-out'
      )
      expect(
        queryByRole($account, 'link', { name: 'Manage your details' })
      ).not.toBeInTheDocument()
    })

    test('omits account links without URLs', () => {
      const $component = renderExample('account links without href')

      expect(queryByRole($component, 'link')).not.toBeInTheDocument()
      expect($component).not.toHaveTextContent('Update your account')
      expect($component).not.toHaveTextContent('Log out')
    })
  })

  describe('navigation', () => {
    test('supports a label, classes, attributes and multiple items', () => {
      const $component = renderExample('with navigation')
      const $navigation = getByRole($component, 'navigation', {
        name: 'Service navigation'
      })

      expect($component).toHaveClass('moj-header--with-navigation')
      expect($component).not.toHaveClass('moj-header--with-account')
      expect($navigation).toHaveClass(
        'moj-header__navigation',
        'custom-navigation'
      )
      expect($navigation).toHaveAttribute('data-custom', 'navigation-value')
      expect(
        $navigation.querySelectorAll('.moj-header__list-item')
      ).toHaveLength(3)
    })

    test('marks only the active link as the current page and passes link attributes', () => {
      const $component = renderExample('with navigation')
      const $cases = getByRole($component, 'link', { name: 'Cases' })
      const $help = getByRole($component, 'link', { name: 'Help' })

      expect($cases).toHaveAttribute('href', '/cases')
      expect($cases).toHaveAttribute('aria-current', 'page')
      expect($cases).toHaveAttribute('data-custom', 'link-value')
      expect($help).toHaveAttribute('href', '/help')
      expect($help).not.toHaveAttribute('aria-current')
    })

    test('renders items without URLs as text', () => {
      const $component = renderExample('with navigation')

      expect(
        $component.querySelector('.moj-header__list-item span')
      ).toHaveTextContent('Signed in as A.Name')
      expect(
        queryByRole($component, 'link', { name: 'Signed in as A.Name' })
      ).not.toBeInTheDocument()
    })

    test('supports navigation without a label or an active item', () => {
      const $component = renderExample('navigation without label')

      expect(getByRole($component, 'navigation')).toBeInTheDocument()
      expect(
        getByRole($component, 'link', { name: 'Cases' })
      ).not.toHaveAttribute('aria-current')
    })

    test('renders linked and unlinked HTML in preference to text', () => {
      const $component = renderExample('navigation with html')

      expect(
        getByRole($component, 'link', { name: 'Cases' }).querySelector('strong')
      ).toBeInTheDocument()
      expect(
        $component.querySelector('.moj-header__list-item span strong')
      ).toHaveTextContent('Signed in as A.Name')
      expect($component).not.toHaveTextContent('Ignored')
    })

    test('escapes text in linked and unlinked navigation items', () => {
      const $component = renderExample('navigation with escaped text')

      expect(
        getByRole($component, 'link', { name: '<strong>Cases</strong>' })
      ).toHaveAttribute('href', '/cases')
      expect(
        $component.querySelector('.moj-header__list-item span')
      ).toHaveTextContent('<strong>Signed in as A.Name</strong>')
      expect($component.querySelector('strong')).not.toBeInTheDocument()
    })

    test('omits empty navigation and its layout modifier', () => {
      const $component = renderExample('empty navigation')

      expect(queryByRole($component, 'navigation')).not.toBeInTheDocument()
      expect($component).not.toHaveClass('moj-header--with-navigation')
    })
  })

  describe('content precedence', () => {
    test('renders account content instead of navigation when both are provided', () => {
      const $component = renderExample('account before navigation')

      expect(getByRole($component, 'navigation')).toHaveClass(
        'moj-header__account'
      )
      expect(
        $component.querySelector('.moj-header__navigation')
      ).not.toBeInTheDocument()
      expect($component).toHaveClass('moj-header--with-account')
      expect($component).not.toHaveClass('moj-header--with-navigation')
    })

    test('renders navigation when account options have neither a username nor a sign-out link', () => {
      const $component = renderExample('navigation with incomplete account')

      expect(getByRole($component, 'navigation')).toHaveClass(
        'moj-header__navigation'
      )
      expect(
        $component.querySelector('.moj-header__account')
      ).not.toBeInTheDocument()
      expect($component).toHaveClass('moj-header--with-navigation')
      expect($component).not.toHaveClass('moj-header--with-account')
    })

    test('renders end slot HTML instead of account and navigation without replacing the identity', () => {
      const $component = renderExample('with end slot')
      const $link = getByRole($component, 'link', { name: 'Cymraeg' })

      expect($link).toHaveClass('custom-content')
      expect($link).toHaveAttribute('href', '/language')
      expect($link).toHaveAttribute('lang', 'cy')
      expect($link.parentElement).toHaveClass('moj-header__container')
      expect(
        $component.querySelector('.moj-header__organisation-name')
      ).toHaveTextContent('Ministry of Justice')
      expect(queryByRole($component, 'navigation')).not.toBeInTheDocument()
    })

    test('falls back to account content when the end slot is empty', () => {
      const $component = renderExample('empty end slot')

      expect(getByRole($component, 'navigation')).toHaveClass(
        'moj-header__account'
      )
      expect($component.querySelector('.moj-header__user')).toHaveTextContent(
        'A.Name'
      )
    })
  })
})
