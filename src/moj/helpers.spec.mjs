import { outdent } from 'outdent'

import {
  findNearestMatchingElement,
  getPreviousSibling,
  getNextSibling
} from './helpers.mjs'

describe('helpers', () => {
  describe('getNextSibling', () => {
    beforeEach(() => {
      const html = outdent`
        <div id="container">
          <h1 id="title">Heading 1</h1>
          <p>this is some text</p>
          <ul id="list">
            <li id="item-1" class="item">item 1</li>
            <li id="item-2" class="item">item 2</li>
            <li id="item-3" class="selected">item 3</li>
            <li id="item-4" class="item">item 4</li>
          </ul>
        </div>
      `

      document.body.insertAdjacentHTML('afterbegin', html)
    })

    afterEach(() => {
      document.body.innerHTML = ''
    })

    test('returns undefined with no element', () => {
      const result = getNextSibling()

      expect(result).toBeUndefined()
    })

    test('returns null with no selector if no sibling', () => {
      const element = document.querySelector('#item-4')
      const result = getNextSibling(element)

      expect(result).toBeNull()
    })

    test('returns first sibling with no selector', () => {
      const element = document.querySelector('#item-2')
      const expected = document.querySelector('#item-3')
      const result = getNextSibling(element)

      expect(result).toBe(expected)
    })

    test('returns undefined if no sibling matches selector', () => {
      const element = document.querySelector('#item-1')
      const result = getNextSibling(element, '#not-present')

      expect(result).toBeUndefined()
    })

    test('returns matching sibling', () => {
      const element = document.querySelector('#item-1')
      const expected = document.querySelector('#item-3')
      const result = getNextSibling(element, '.selected')

      expect(result).toBe(expected)
    })

    test('returns first matching sibling', () => {
      const element = document.querySelector('#item-1')
      const expected = document.querySelector('#item-2')
      const result = getNextSibling(element, '.item')

      expect(result).toBe(expected)
    })
  })

  describe('getPreviousSibling', () => {
    beforeEach(() => {
      const html = outdent`
        <div id="container">
          <h1 id="title">Heading 1</h1>
          <p>this is some text</p>
          <ul id="list">
            <li id="item-1" class="item">item 1</li>
            <li id="item-2" class="item">item 2</li>
            <li id="item-3" class="selected">item 3</li>
            <li id="item-4" class="item">item 4</li>
          </ul>
        </div>
      `

      document.body.insertAdjacentHTML('afterbegin', html)
    })

    afterEach(() => {
      document.body.innerHTML = ''
    })

    test('returns undefined with no element', () => {
      const result = getPreviousSibling()

      expect(result).toBeUndefined()
    })

    test('returns undefined with no selector if no sibling', () => {
      const element = document.querySelector('#item-1')
      const result = getPreviousSibling(element)

      expect(result).toBeNull()
    })

    test('returns first sibling with no selector', () => {
      const element = document.querySelector('#item-3')
      const expected = document.querySelector('#item-2')
      const result = getPreviousSibling(element)

      expect(result).toBe(expected)
    })

    test('returns undefined if no sibling matches selector', () => {
      const element = document.querySelector('#item-4')
      const result = getPreviousSibling(element, '#not-present')

      expect(result).toBeUndefined()
    })

    test('returns matching sibling', () => {
      const element = document.querySelector('#item-4')
      const expected = document.querySelector('#item-3')
      const result = getPreviousSibling(element, '.selected')

      expect(result).toBe(expected)
    })

    test('returns first matching sibling', () => {
      const element = document.querySelector('#item-4')
      const expected = document.querySelector('#item-2')
      const result = getPreviousSibling(element, '.item')

      expect(result).toBe(expected)
    })
  })

  describe('findNearestMatchingElement', () => {
    beforeEach(() => {
      const html = outdent`
        <div id="container">
          <h1 id="title">Heading 1</h1>
          <p>this is some text</p>
          <ul id="list">
            <li id="item-1" class="item">item 1</li>
            <li id="item-2" class="item">item 2</li>
            <li id="item-3" class="selected">item 3</li>
            <li id="item-4" class="item">item 4</li>
          </ul>
        </div>
      `

      document.body.insertAdjacentHTML('afterbegin', html)
    })

    afterEach(() => {
      document.body.innerHTML = ''
    })

    test('returns undefined with no element', () => {
      const result = findNearestMatchingElement()

      expect(result).toBeUndefined()
    })

    test('returns undefined with no selector', () => {
      const element = document.querySelector('#item-1')
      const result = findNearestMatchingElement(element)

      expect(result).toBeUndefined()
    })

    test('returns undefined if element not found', () => {
      const element = document.querySelector('#item-1')
      const result = findNearestMatchingElement(element, '#not-present')

      expect(result).toBeUndefined()
    })

    test("doesn't find next siblings", () => {
      const element = document.querySelector('#item-2')
      const result = findNearestMatchingElement(element, '#item-3')

      expect(result).toBeUndefined()
    })

    test('finds previous sibling', () => {
      const element = document.querySelector('#item-2')
      const expected = document.querySelector('#item-1')
      const result = findNearestMatchingElement(element, '#item-1')

      expect(result).toBe(expected)
    })

    test('finds first matching sibling', () => {
      const element = document.querySelector('#item-3')
      const expected = document.querySelector('#item-2')
      const result = findNearestMatchingElement(element, '.item')

      expect(result).toBe(expected)
    })

    test('returns element if matching', () => {
      const element = document.querySelector('#item-3')
      const expected = document.querySelector('#item-3')
      const result = findNearestMatchingElement(element, 'li')

      expect(result).toBe(expected)
    })

    test('if no sibling, finds matching ancestor', () => {
      const element = document.querySelector('#item-3')
      const expected = document.querySelector('#list')
      const result = findNearestMatchingElement(element, 'ul')

      expect(result).toBe(expected)
    })

    test('return an ancestor sibling if matched', () => {
      const element = document.querySelector('#item-3')
      const expected = document.querySelector('#title')
      const result = findNearestMatchingElement(element, 'h1')

      expect(result).toBe(expected)
    })

    test('continues traversing until match is found', () => {
      const element = document.querySelector('#item-3')
      const expected = document.querySelector('#container')
      const result = findNearestMatchingElement(element, 'div')

      expect(result).toBe(expected)
    })
  })
})
