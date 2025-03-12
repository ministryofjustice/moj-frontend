const extractBody = require('./extract-body')

describe('extractBody', () => {
  it('should format date fields correctly', () => {
    const url = '/test-path'
    const body = {
      'date-day': '1',
      'date-month': '2',
      'date-year': '2023',
      field1: 'value1'
    }
    const result = extractBody(url, body)
    expect(result).toEqual({
      date: '2023-02-01',
      'date-day': '1',
      'date-month': '2',
      'date-year': '2023',
      field1: 'value1'
    })
  })

  it('should handle multiple date fields correctly', () => {
    const url = '/test-path'
    const body = {
      'start-day': '1',
      'start-month': '2',
      'start-year': '2023',
      'end-day': '3',
      'end-month': '4',
      'end-year': '2024'
    }
    const expected = { ...body, ...{ start: '2023-02-01', end: '2024-04-03' } }
    const result = extractBody(url, body)
    expect(result).toEqual(expected)
  })

  it('should return the original body if no date fields are present', () => {
    const url = '/test-path'
    const body = { field1: 'value1', field2: 'value2' }
    const result = extractBody(url, body)
    expect(result).toEqual(body)
  })

  it('should handle empty body correctly', () => {
    const url = '/test-path'
    const body = {}
    const result = extractBody(url, body)
    expect(result).toEqual({})
  })

  it('should handle missing date parts correctly', () => {
    const url = '/test-path'
    const body = { 'date-day': '1', 'date-month': '2' }
    const result = extractBody(url, body)
    const expected = { ...body, ...{ date: 'undefined-02-01' } }
    expect(result).toEqual(expected)
  })
})
