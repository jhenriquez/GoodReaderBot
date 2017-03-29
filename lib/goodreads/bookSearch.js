const Q             = require('q');
const {parseString} = require('xml2js');
const request       = require('request');

/*
 * Constructor for a service object to search for books on the goodreads API.
 */
function BookSearch (key) {
  if (!key) {
    throw new Error('A valid goodreads API key is required.');
  }

  this.execute = (searchQuery) => {

      return Q.nfcall(request, 'https://www.goodreads.com/search/index.xml', { qs: { key: key, q: searchQuery } })
              .spread((response, xmlData) => Q.nfcall(parseString, xmlData, { explicitArray: false, ignoreAttrs: true }))
              .then(({GoodreadsResponse}) => {
                return Array.isArray(GoodreadsResponse.search.results.work) ?
                       GoodreadsResponse.search.results.work.map((w) => w.best_book) : [];
              });
  };

}

module.exports = BookSearch;