/* eslint-disable no-new */
const { getByRole, queryByRole, screen } = require('@testing-library/dom')
const { userEvent } = require('@testing-library/user-event')

const { pageTemplate } = require('./alert.spec.helper.js')
require('../../helpers.js')
require('./alert.js')

const user = userEvent.setup()

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

const createComponent = (options = {}, role = 'region') => {
  const dataAttributes = configToDataAttributes(options)
  const html = `<div role="${role}" class="moj-alert moj-alert--information moj-alert--with-heading" aria-label="information: The finance section has moved" data-module="moj-alert" ${dataAttributes}>
  <div>
    <svg class="moj-alert__icon" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" height="30" width="30">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2165 3.45151C11.733 2.82332 13.3585 2.5 15 2.5C16.6415 2.5 18.267 2.82332 19.7835 3.45151C21.3001 4.07969 22.6781 5.00043 23.8388 6.16117C24.9996 7.3219 25.9203 8.69989 26.5485 10.2165C27.1767 11.733 27.5 13.3585 27.5 15C27.5 18.3152 26.183 21.4946 23.8388 23.8388C21.4946 26.183 18.3152 27.5 15 27.5C13.3585 27.5 11.733 27.1767 10.2165 26.5485C8.69989 25.9203 7.3219 24.9996 6.16117 23.8388C3.81696 21.4946 2.5 18.3152 2.5 15C2.5 11.6848 3.81696 8.50537 6.16117 6.16117C7.3219 5.00043 8.69989 4.07969 10.2165 3.45151ZM16.3574 22.4121H13.6621V12.95H16.3574V22.4121ZM13.3789 9.20898C13.3789 8.98763 13.4212 8.7793 13.5059 8.58398C13.5905 8.38216 13.7044 8.20964 13.8477 8.06641C13.9974 7.91667 14.1699 7.79948 14.3652 7.71484C14.5605 7.63021 14.7721 7.58789 15 7.58789C15.2214 7.58789 15.4297 7.63021 15.625 7.71484C15.8268 7.79948 15.9993 7.91667 16.1426 8.06641C16.2923 8.20964 16.4095 8.38216 16.4941 8.58398C16.5788 8.7793 16.6211 8.98763 16.6211 9.20898C16.6211 9.43685 16.5788 9.64844 16.4941 9.84375C16.4095 10.0391 16.2923 10.2116 16.1426 10.3613C15.9993 10.5046 15.8268 10.6185 15.625 10.7031C15.4297 10.7878 15.2214 10.8301 15 10.8301C14.7721 10.8301 14.5605 10.7878 14.3652 10.7031C14.1699 10.6185 13.9974 10.5046 13.8477 10.3613C13.7044 10.2116 13.5905 10.0391 13.5059 9.84375C13.4212 9.64844 13.3789 9.43685 13.3789 9.20898Z" fill="currentColor" />
    </svg>
  </div>
  <div class="moj-alert__content">
    <h2 class="govuk-heading-m">The finance section has moved
    </h2>You can now find it in the <a href="#">dashboard</a>.
  </div>
  <div class="moj-alert__action">
    <button class="moj-alert__dismiss" hidden>Dismiss</button>
  </div>
</div>
`

  document.body.insertAdjacentHTML('afterbegin', html)
  const component = document.querySelector('[data-module="moj-alert"]')
  return component
}

describe('alert', () => {
  let component
  let dismissButton

  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('non-dismissible', () => {
    component = createComponent()
    new MOJFrontend.Alert(component).init()
    dismissButton = queryByRole(component, 'button', { hidden: true })

    expect(dismissButton).toHaveAttribute('hidden')
  })

  test('dismissible', () => {
    component = createComponent({ dismissible: 'true' })
    new MOJFrontend.Alert(component).init()
    dismissButton = queryByRole(component, 'button', { hidden: true })

    expect(dismissButton).not.toHaveAttribute('hidden')
  })

  test('non-dismissible "false" string', () => {
    component = createComponent({ dismissible: 'false' })
    new MOJFrontend.Alert(component).init()
    dismissButton = queryByRole(component, 'button', { hidden: true })

    expect(dismissButton).toHaveAttribute('hidden')
  })

  test('applies custom dismiss text', () => {
    component = createComponent({
      dismissible: true,
      dismissText: 'Close'
    })
    new MOJFrontend.Alert(component).init()
    dismissButton = queryByRole(component, 'button', { name: 'Close' })

    expect(dismissButton).toBeInTheDocument()
  })

  test('region role does not receive focus', () => {
    component = createComponent({}, 'region')
    new MOJFrontend.Alert(component).init()

    expect(component).not.toHaveFocus()
  })

  test('alert role autofocuses', () => {
    component = createComponent({}, 'alert')
    new MOJFrontend.Alert(component).init()

    expect(component).toHaveFocus()
  })

  test('disableAutoFocus prevents autofocus', () => {
    component = createComponent(
      {
        disableAutoFocus: true
      },
      'alert'
    )
    new MOJFrontend.Alert(component).init()

    expect(component).not.toHaveFocus()
  })

  test('dismiss button removes component', async () => {
    component = createComponent({
      dismissible: true
    })
    new MOJFrontend.Alert(component).init()
    dismissButton = queryByRole(component, 'button')

    await user.click(dismissButton)

    expect(component).not.toBeInTheDocument()
  })

  describe('focus on dismiss', () => {
    let firstAlert
    let secondAlert
    let thirdAlert
    let fourthAlert
    let fifthAlert
    let heading1
    let heading2

    beforeEach(() => {
      document.body.insertAdjacentHTML('afterbegin', pageTemplate)
      const alerts = document.querySelectorAll('[data-module="moj-alert"]')
      alerts.forEach((alert) => {
        new MOJFrontend.Alert(alert).init()
      })

      firstAlert = document.querySelector('#alert-1')
      secondAlert = document.querySelector('#alert-2')
      thirdAlert = document.querySelector('#alert-3')
      fourthAlert = document.querySelector('#alert-4')
      fifthAlert = document.querySelector('#alert-5')

      heading1 = document.querySelector('#h1')
      heading2 = document.querySelector('#h2')
    })

    afterEach(() => {
      document.body.innerHTML = ''
    })

    test('it moves focus to the element provide by focusOnDismiss', async () => {
      const alert = fifthAlert
      const focusedElement = document.querySelector('#focusOnMe')
      const dismissButton = getByRole(alert, 'button')

      await user.click(dismissButton)

      expect(focusedElement).toHaveFocus()
    })

    test('it moves focus to the next sibling alert if present', async () => {
      const alert = thirdAlert
      const dismissButton = getByRole(alert, 'button')

      await user.click(dismissButton)

      expect(fourthAlert).toHaveFocus()
    })

    test('it moves focus to the previous sibling alert if present', async () => {
      fourthAlert.remove()
      fifthAlert.remove()
      const alert = thirdAlert
      const dismissButton = getByRole(alert, 'button')

      await user.click(dismissButton)

      expect(secondAlert).toHaveFocus()
    })

    test('it moves focus to the previous heading if present', async () => {
      thirdAlert.remove()
      fourthAlert.remove()
      fifthAlert.remove()
      const alert = secondAlert
      const dismissButton = getByRole(alert, 'button')

      await user.click(dismissButton)

      expect(heading2).toHaveFocus()
    })

    test('it moves focus to the parent heading if present', async () => {
      heading2.remove()
      thirdAlert.remove()
      fourthAlert.remove()
      fifthAlert.remove()
      const alert = secondAlert
      const dismissButton = getByRole(alert, 'button')

      await user.click(dismissButton)

      expect(heading1).toHaveFocus()
    })

    test('it moves focus to main if no other element matches', async () => {
      heading1.remove()
      heading2.remove()
      thirdAlert.remove()
      fourthAlert.remove()
      fifthAlert.remove()
      const alert = secondAlert
      const main = screen.getByRole('main')
      const dismissButton = getByRole(alert, 'button')

      await user.click(dismissButton)

      expect(main).toHaveFocus()
    })
  })
  //
  //
  //
  //
  // focus on dismiss
  //
  //  passed selector
  //
  //  next alert
  //
  //  previous alert
  //
  //  previous heading
  //
  //  main
  //
  //
})
