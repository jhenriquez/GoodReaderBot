const Q             = require('q');
const {parseString} = require('xml2js');
const request       = require('request');
const sanitizeHTML  = require('sanitize-html');

function parseSimpleHTML (content) {
  return content.replace(/\<br\s?\/\>/g, '\n')
                .replace(/\<b\>/g, '')
                .replace(/\<\/b\>/g, '');
}

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
            .then(({ GoodreadsResponse }) => {

              const b = GoodreadsResponse.book;

              return {
                id: b.id,
                title: b.title,
                author: b.authors.author,
                rating: b.average_rating,
                thumb_url: b.image_url,
                description: parseSimpleHTML(b.description)
              };

            });
  };

}


module.exports = BookShow;