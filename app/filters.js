const dateFilter = require('nunjucks-date');

module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  let filters = {}

  filters.date = dateFilter;

  filters.mojDate = function(timestamp, type) {

    // default to the timestamp
    let str = timestamp;

    switch(type) {
      case "datetime":
        str = dateFilter(timestamp, 'D MMMM gggg') + " at " + dateFilter(timestamp, 'h:mm A');
        break;
      case "shortdatetime":
        str = dateFilter(timestamp, 'D MMM gggg') + " at " + dateFilter(timestamp, 'h:mm A');
        break;
      case "date":
        str = dateFilter(timestamp, 'D MMMM gggg');
        break;
      case "shortdate":
        str = dateFilter(timestamp, 'D MMM gggg');
        break;
      case "time":
        str = dateFilter(timestamp, 'h:mm A');
        break;
      case "shorttime":
        str = dateFilter(timestamp, 'h A');
        break;
    }

    return str;
  }

  // filters.mojDate = mojDateFilter;

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters;
}
