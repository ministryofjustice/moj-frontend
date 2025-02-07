const { queryByRole, screen } = require('@testing-library/dom')
const { userEvent } = require('@testing-library/user-event')
const { configureAxe } = require('jest-axe')

const { ButtonMenu } = require('./button-menu.js')

const user = userEvent.setup()
const axe = configureAxe({
  rules: {
    // disable landmark rules when testing isolated components.
    region: { enabled: false }
  }
})

const kebabize = (str) => {
  return str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofset) => (ofset ? '-' : '') + $.toLowerCase()
  )
}

const configToDataAttributes = (config) => {
  let attributes = ''
  for (const [key, value] of Object.entries(config)) {
    attributes += `data-${kebabize(key)}="${value}" `
  }
  return attributes
}

const createComponent = (config = {}, html) => {
  const dataAttributes = configToDataAttributes(config)
  if (typeof html === 'undefined') {
    html = `
      <div class="moj-button-menu" data-module="moj-button-menu" ${dataAttributes}>
          <a href="#one" role="button">First action</a>
          <a href="#two" role="button" class="govuk-button--warning">Second action</a>
          <a href="#three" role="button" class="custom-class">Third action</a>
      </div>`
  }
  document.body.insertAdjacentHTML('afterbegin', html)
  const component = document.querySelector('[data-module="moj-button-menu"]')
  return component
}

describe('Button menu with defaults', () => {
  let component
  let toggleButton
  let menu
  let items

  beforeEach(() => {
    component = createComponent()
    new ButtonMenu(component).init()

    toggleButton = queryByRole(component, 'button', { hidden: false })
    menu = screen.queryByRole('list', { hidden: true })
    items = menu?.querySelectorAll('a, button')
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('initialises component elements', () => {
    expect(toggleButton).not.toBeNull()
    expect(menu).not.toBeNull()
    expect(items).not.toBeNull()
  })

  test('intialises toggle button', () => {
    expect(component).toContainElement(toggleButton)
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false')
    expect(toggleButton).toHaveAttribute('aria-haspopup', 'true')
  })

  test('intialises menu', () => {
    expect(component).toContainElement(menu)
    expect(menu).not.toBeVisible()
  })

  test('creates menuitems', () => {
    expect(items).toHaveLength(3)
  })

  test('removes other govuk-button classes from menuitems', () => {
    expect(items[1]).not.toHaveClass('govuk-button--warning')
  })

  test('keeps custom classes on items', () => {
    expect(items[2]).toHaveClass('custom-class')
  })

  test('clicking toggle button shows menu', async () => {
    await user.click(toggleButton)

    expect(menu).toBeVisible()
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
  })

  test('clicking a link in the menu', async () => {
    await user.click(toggleButton)

    expect(menu).toBeVisible()
    await user.click(items[0])
    expect(global.window.location.hash).toContain('#one')
    await user.click(items[2])
    expect(global.window.location.hash).toContain('#three')
  })

  test('clicking outside closes menu', async () => {
    await user.click(toggleButton)
    expect(menu).toBeVisible()

    await user.click(document.body)
    expect(menu).not.toBeVisible()
  })

  describe('keyboard interactions', () => {
    test('enter on toggle button opens menu', async () => {
      toggleButton.focus()
      await user.keyboard('[Enter]')

      expect(menu).toBeVisible()
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
      expect(items[0]).toHaveFocus()
    })

    test('space on toggle button opens menu', async () => {
      toggleButton.focus()
      await user.keyboard('[Space]')

      expect(menu).toBeVisible()
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
      expect(items[0]).toHaveFocus()
    })

    test('esc closes menu', async () => {
      toggleButton.focus()
      await user.keyboard('[Space]')
      expect(menu).toBeVisible()
      await user.keyboard('[Escape]')

      expect(menu).not.toBeVisible()
      expect(toggleButton).toHaveFocus()
    })

    test('down arrow on toggle button opens menu with focus on first item', async () => {
      toggleButton.focus()
      await user.keyboard('[ArrowDown]')

      expect(menu).toBeVisible()
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
      expect(items[0]).toHaveFocus()
    })

    test('up arrow on toggle button opens menu with focus on last item', async () => {
      toggleButton.focus()
      await user.keyboard('[ArrowUp]')

      expect(menu).toBeVisible()
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
      expect(items[items.length - 1]).toHaveFocus()
    })

    test('down arrow on menu item navigates to next item with looping', async () => {
      toggleButton.focus()
      await user.keyboard('[Enter]')
      expect(items[0]).toHaveFocus()

      await user.keyboard('[ArrowDown]')
      expect(items[1]).toHaveFocus()

      await user.keyboard('[ArrowDown]')
      expect(items[2]).toHaveFocus()

      await user.keyboard('[ArrowDown]')
      expect(items[0]).toHaveFocus()
    })

    test('up arrow on menu item navigates to previous item with looping', async () => {
      toggleButton.focus()
      await user.keyboard('[ArrowUp]')
      expect(items[items.length - 1]).toHaveFocus()

      await user.keyboard('[ArrowUp]')
      expect(items[1]).toHaveFocus()

      await user.keyboard('[ArrowUp]')
      expect(items[0]).toHaveFocus()

      await user.keyboard('[ArrowUp]')
      expect(items[items.length - 1]).toHaveFocus()
    })

    test('home navigates to first item', async () => {
      toggleButton.focus()
      await user.keyboard('[ArrowUp]')
      expect(items[items.length - 1]).toHaveFocus()

      await user.keyboard('[Home]')
      expect(items[0]).toHaveFocus()
    })

    test('end navigates to last item', async () => {
      toggleButton.focus()
      await user.keyboard('[Enter]')
      expect(items[0]).toHaveFocus()

      await user.keyboard('[End]')
      expect(items[items.length - 1]).toHaveFocus()
    })

    test('tab moves focus out of the menu', async () => {
      toggleButton.focus()
      await user.keyboard('[Enter]')
      expect(menu).toBeVisible()
      expect(items[0]).toHaveFocus()
      await user.tab()

      expect(document.body).toHaveFocus()
      expect(menu).not.toBeVisible()
    })
  })

  describe('accessibility', () => {
    test('component has no wcag violations', async () => {
      expect(await axe(document.body)).toHaveNoViolations()
      await user.click(toggleButton)
      expect(await axe(document.body)).toHaveNoViolations()
    })
  })
})

describe('Button menu javascript API', () => {
  let component

  beforeEach(() => {
    component = createComponent()
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('setting toggle button text', () => {
    const label = 'click me'
    new ButtonMenu(component, { buttonText: label }).init()
    const toggleButton = queryByRole(component, 'button', { name: label })

    expect(toggleButton).toBeInTheDocument()
  })

  test('setting menu alignment', () => {
    new ButtonMenu(component, { alignMenu: 'right' }).init()
    const menu = screen.queryByRole('list', { hidden: true })

    expect(menu).toHaveClass('moj-button-menu__wrapper--right')
  })

  test('setting button classes', () => {
    const defaultClassNames = 'govuk-button moj-button-menu__toggle-button'
    const classNames = 'classOne classTwo'

    new ButtonMenu(component, { buttonClasses: classNames }).init()
    const toggleButton = queryByRole(component, 'button', { hidden: false })

    expect(toggleButton).toHaveClass(defaultClassNames)
    expect(toggleButton).toHaveClass(classNames)
  })
})

describe('Button menu data-attributes API', () => {
  let component

  beforeEach(() => {})

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('setting toggle button text', () => {
    const label = 'click me'

    component = createComponent({ buttonText: label })
    new ButtonMenu(component).init()
    const toggleButton = queryByRole(component, 'button', { name: label })

    expect(toggleButton).toBeInTheDocument()
  })

  test('setting menu alignment', () => {
    component = createComponent({ alignMenu: 'right' })
    new ButtonMenu(component).init()
    const menu = screen.queryByRole('list', { hidden: true })

    expect(menu).toHaveClass('moj-button-menu__wrapper--right')
  })

  test('setting button classes', () => {
    const defaultClassNames = 'govuk-button moj-button-menu__toggle-button'
    const classNames = 'classOne classTwo'

    component = createComponent({ buttonClasses: classNames })
    new ButtonMenu(component).init()
    const toggleButton = queryByRole(component, 'button', { hidden: false })

    expect(toggleButton).toHaveClass(defaultClassNames)
    expect(toggleButton).toHaveClass(classNames)
  })
})

describe('menu button with a single item', () => {
  let component
  let toggleButton
  let menu
  let items

  beforeEach(() => {
    const html = `
      <div class="moj-button-menu" data-module="moj-button-menu" data-button-classes="govuk-button--warning custom-class">
          <a href="#one" role="button" class="govuk-button--inverse">First action</a>
      </div>`

    component = createComponent({}, html)
    new ButtonMenu(component).init()

    toggleButton = queryByRole(component, 'button', { name: 'Actions' })
    menu = screen.queryByRole('list', { hidden: true })
    items = menu?.queryByRole('button', { hidden: true })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('menu is not created', () => {
    expect(menu).toBeNull()
  })

  test('there are no items', () => {
    expect(items).toBeUndefined()
  })

  test('there is no toggle button', () => {
    expect(toggleButton).toBeNull()
  })

  test('first item has become button', () => {
    const button = screen.queryByRole('button', { name: 'First action' })

    expect(button).toBeInTheDocument()
  })

  test('first item has buttonClasses config applied', () => {
    const button = screen.queryByRole('button', { name: 'First action' })

    expect(button).toHaveClass('govuk-button--warning', 'custom-class')
    expect(button).not.toHaveClass('govuk-button--inverse')
  })
})
