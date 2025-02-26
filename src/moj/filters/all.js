const moment = require('moment')

module.exports = function () {
  /**
   * Date filter for use in Nunjucks
   * Outputs: 01/01/1970
   *
   * @example
   * ```njk
   * {{ params.date | date("DD/MM/YYYY") }}
   * ```
   * @param {MomentInput} timestamp
   * @param {string} format
   */
  function date(timestamp, format) {
    return moment(timestamp).format(format)
  }

  /* ------------------------------------------------------------------
    utility functions for use in mojDate function/filter
  ------------------------------------------------------------------ */

  /**
   * @param {MomentInput} timestamp
   */
  function govDate(timestamp) {
    return moment(timestamp).format('D MMMM YYYY')
  }

  /**
   * @param {MomentInput} timestamp
   */
  function govShortDate(timestamp) {
    return moment(timestamp).format('D MMM YYYY')
  }

  /**
   * @param {MomentInput} timestamp
   */
  function govTime(timestamp) {
    const t = moment(timestamp)
    if (t.minutes() > 0) {
      return t.format('h:mma')
    }
    return t.format('ha')
  }

  /**
   * Standard dates for use in Nunjucks
   * Outputs: 1 Jan 1970 at 1:32pm
   *
   * @example
   * ```njk
   * {{ params.date | mojDate("datetime") }}
   * ```
   * @param {MomentInput} timestamp
   * @param {'datetime' | 'shortdatetime' | 'date' | 'shortdate' | 'time'} [type]
   */
  function mojDate(timestamp, type) {
    switch (type) {
      case 'datetime':
        return `${govDate(timestamp)} at ${govTime(timestamp)}`
      case 'shortdatetime':
        return `${govShortDate(timestamp)} at ${govTime(timestamp)}`
      case 'date':
        return govDate(timestamp)
      case 'shortdate':
        return govShortDate(timestamp)
      case 'time':
        return govTime(timestamp)
      default:
        return timestamp
    }
  }

  /**
   * Returns an object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   */
  return {
    date,
    mojDate
  }
}

/**
 * @import { MomentInput } from 'moment'
 */
