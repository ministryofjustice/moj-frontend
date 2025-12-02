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

  test.describe('default no items', () => {
    let $component
    let $pagination

    test.beforeEach(async ({ page }) => {
      const html = render('pagination', examples['default no items'])
      await page.setContent(html)
      $component = page.locator('.moj-pagination')
      $pagination = page.locator('.govuk-pagination')
    })

    test.afterEach(async ({ page }) => {
      await page.setContent('')
    })

    test('does not display prev/next only pagination', async () => {
      await expect($component).toBeAttached()
      await expect($pagination).not.toBeVisible()
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
      await expect($results).not.toContainText(' out of ')
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
      await expect($results).toContainText('Showing 11 to 20 out of 28 results')
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

  test.describe('with no items and results count', () => {
    let $results

    test.beforeEach(async ({ page }) => {
      const html = render(
        'pagination',
        examples['with no items and results count']
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
      await expect($results).not.toContainText('total')
      await expect($results).toContainText('8 results')
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
})
