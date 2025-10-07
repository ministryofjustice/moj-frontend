import { test, expect } from '@playwright/test'

const components = [
 'add-another',
 'alert',
 'button-menu',
 'date-picker',
 'multi-file-upload',
 'multi-select',
 'sortable-table'
]

test.describe('components', () => {

    for(const component of components) {
      test(`${component} iframes initialise`, async ({page}) => {
        await page.goto(`/components/${component}`)

        const examples = page.locator('[data-module="moj-iframe-resizer"]')

        for (const example of await examples.all()) {
          await expect(example).toHaveAttribute('data-moj-iframe-resizer-init')
        }
      })

      test(`${component} initializes`, async ({page}) => {
        await page.goto(`/components/${component}`)

        const example = page
          .frameLocator('[data-module="moj-iframe-resizer"]')
          .nth(1)
        const instances = example.locator(`[data-module="${component}"]`)

        for (const instance of await instances.all()) {
          await expect(instance).toHaveAttribute(`data-moj-${component}-init`)
        }
      })
    }
})
