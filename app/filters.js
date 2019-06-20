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

  function mojDateFilter(timestamp, type) {

    // default datetime to timestamp
    let datetime = timestamp;

    switch(type) {
      case "longdatetime":
        datetime = dateFilter(timestamp, 'D MMMM gggg') + " at " + dateFilter(timestamp, 'h:mm A');
        break;
      case "shortdatetime":
        datetime = dateFilter(timestamp, 'D MMM gggg') + " at " + dateFilter(timestamp, 'h:mm A');
        break;
      case "longdate":
        datetime = dateFilter(timestamp, 'D MMMM gggg');
        break;
      case "shortdate":
        datetime = dateFilter(timestamp, 'D MMM gggg');
        break;
      case "time":
        datetime = dateFilter(timestamp, 'h:mm A');
        break;
    }

    return datetime;
  }

  filters.mojDate = mojDateFilter;

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters;
}
