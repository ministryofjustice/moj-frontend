import { test, expect } from '@playwright/test'

import { render, getExamples } from '../../lib/components.js'

test.describe('pagination', () => {
  let examples

  test.beforeAll(async () => {
    examples = await getExamples('pagination')
  })

  test.describe('by default', () => {
    let $component
    let $pagination

    test.beforeEach(async ({ page }) => {
      const html = render('pagination', examples.default)
      await page.setContent(html)
      $component = page.locator('.moj-pagination')
      $pagination = page.locator('.govuk-pagination')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('is on the page', async () => {
      await expect($component).toBeVisible()
      await expect($pagination).toBeVisible()
    })
  })

  test.describe('default no pages', () => {
    let $component
    let $pagination

    test.beforeEach(async ({ page }) => {
      const html = render('pagination', examples['default no pages'])
      await page.setContent(html)
      $component = page.locator('.moj-pagination')
      $pagination = page.locator('.govuk-pagination')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('does not display prev/next only pagination', async () => {
      await expect($component).toBeAttached()
      await expect($pagination).not.toBeAttached()
    })
  })

  test.describe('one page', () => {
    let $component
    let $pagination
    let $results

    test.beforeEach(async ({ page }) => {
      const html = render('pagination', examples['one page'])
      await page.setContent(html)
      $component = page.locator('.moj-pagination')
      $pagination = page.locator('.govuk-pagination')
      $results = page.locator('.moj-pagination__results')
    })

    test('does not display pagination controls or results', async () => {
      await expect($component).toBeAttached()
      await expect($pagination).not.toBeAttached()
      await expect($results).not.toBeAttached()
    })
  })

  test.describe('one page with results window and count', () => {
    let $component
    let $pagination
    let $results

    test.beforeEach(async ({ page }) => {
      const html = render(
        'pagination',
        examples['one page with results window and count']
      )
      await page.setContent(html)
      $component = page.locator('.moj-pagination')
      $pagination = page.locator('.govuk-pagination')
      $results = page.locator('.moj-pagination__results')
    })

    test('does not display pagination controls', async () => {
      await expect($component).toBeAttached()
      await expect($pagination).not.toBeAttached()
    })

    test('displays results', async () => {
      await expect($component).toBeAttached()
      await expect($results).toBeVisible()
      await expect($results).toContainText('Showing 1 to 7 of 7 total results')
    })
  })

  test.describe('one page with results count', () => {
    let $component
    let $pagination
    let $results

    test.beforeEach(async ({ page }) => {
      const html = render('pagination', examples['one page with results count'])
      await page.setContent(html)
      $component = page.locator('.moj-pagination')
      $pagination = page.locator('.govuk-pagination')
      $results = page.locator('.moj-pagination__results')
    })

    test('does not display pagination controls', async () => {
      await expect($component).toBeAttached()
      await expect($pagination).not.toBeAttached()
    })

    test('displays results count', async () => {
      await expect($component).toBeAttached()
      await expect($results).toBeVisible()
      await expect($results).toContainText('7 total results')
    })
  })

  test.describe('one page with pages count', () => {
    let $component
    let $pagination
    let $results

    test.beforeEach(async ({ page }) => {
      const html = render('pagination', examples['one page with pages count'])
      await page.setContent(html)
      $component = page.locator('.moj-pagination')
      $pagination = page.locator('.govuk-pagination')
      $results = page.locator('.moj-pagination__results')
    })

    test('does not display pagination controls', async () => {
      await expect($component).toBeAttached()
      await expect($pagination).not.toBeAttached()
    })

    test('displays results count', async () => {
      await expect($component).toBeAttached()
      await expect($results).toBeVisible()
      await expect($results).toContainText('Page 1 of 1')
    })
  })

  test.describe('with results window', () => {
    let $results

    test.beforeEach(async ({ page }) => {
      const html = render('pagination', examples['with results window'])
      await page.setContent(html)
      $results = page.locator('.moj-pagination__results')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('results should be present', async () => {
      await expect($results).toBeVisible()
      await expect($results).toContainText('Showing results 11 to 20')
      await expect($results).not.toContainText(' of ')
    })
  })

  test.describe('with results window and count', () => {
    let $results

    test.beforeEach(async ({ page }) => {
      const html = render(
        'pagination',
        examples['with results window and count']
      )
      await page.setContent(html)
      $results = page.locator('.moj-pagination__results')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('results should be present', async () => {
      await expect($results).toBeVisible()
      await expect($results).toContainText(
        'Showing 11 to 20 of 28 total results'
      )
    })
  })

  test.describe('with results count only', () => {
    let $results

    test.beforeEach(async ({ page }) => {
      const html = render('pagination', examples['with results count only'])
      await page.setContent(html)
      $results = page.locator('.moj-pagination__results')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('results should be present', async () => {
      await expect($results).toBeVisible()
      await expect($results).not.toContainText('Showing 11 to 20 ')
      await expect($results).toContainText('28 total results')
    })
  })

  test.describe('with no pages and results count', () => {
    let $results

    test.beforeEach(async ({ page }) => {
      const html = render(
        'pagination',
        examples['with no pages and results count']
      )
      await page.setContent(html)
      $results = page.locator('.moj-pagination__results')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('results should be present', async () => {
      await expect($results).toBeVisible()
      await expect($results).not.toContainText('Showing 11 to 20 ')
      await expect($results).toContainText('8 total results')
    })
  })

  test.describe('with pages count', () => {
    let $results

    test.beforeEach(async ({ page }) => {
      const html = render('pagination', examples['with pages count'])
      await page.setContent(html)
      $results = page.locator('.moj-pagination__results')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('results should be present', async () => {
      await expect($results).toBeVisible()
      await expect($results).toContainText('Page 2 of 3')
    })
  })

  test.describe('with dots', () => {
    let $component
    let $pagination
    let $items
    let $ellipsis

    test.beforeEach(async ({ page }) => {
      const html = render('pagination', examples['with dots'])
      await page.setContent(html)
      $component = page.locator('.moj-pagination')
      $pagination = page.locator('.govuk-pagination')
      $items = $pagination.locator('.govuk-pagination__item')
      $ellipsis = $pagination.locator('.govuk-pagination__item--ellipses')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('ellipsis should be present', async () => {
      await expect($component).toBeVisible()
      await expect($pagination).toBeVisible()
      await expect($items).toHaveCount(3)
      await expect($ellipsis).toHaveCount(1)
    })
  })
})
