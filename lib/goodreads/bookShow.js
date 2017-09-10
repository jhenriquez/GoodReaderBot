const Q             = require('q');
const {parseString} = require('xml2js');
const request       = require('request');
const BookMessage   = require('../../model/bookMessage');

function BookShow(key) {

  if (!key) {
    throw new Error('A valid goodreads API key is required.');
  }

  this.execute = (id) => {
    if (!id) {
      return Q.reject('The id of the book to show is required.');
    }

    return Q.nfcall(request, `https://www.goodreads.com/book/show/${id}.xml`, { qs: { key: key } })
            .spread((response, xmlData) => Q.nfcall(parseString, xmlData, { explicitArray: false, ignoreAttrs: true }))
            .then(({ GoodreadsResponse }) => new BookMessage(GoodreadsResponse.book));
  };

}


module.exports = BookShow;