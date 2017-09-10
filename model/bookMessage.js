const htmlParser = require('html-to-text');
const GoodreadsBookValidator = require('./goodreadsBookValidator');

class BookMessage {
  constructor (book) {
    const validated = GoodreadsBookValidator.validate(book);

    if (validated.error) {
      throw new Error('The provided book object is invalid. Must provide a goodreads API response compliant object.');
    }

    this.id = book.id;
    this.title = book.title;
    this.author = book.authors.author;
    this.average_rating = book.average_rating;
    this.thumbUrl = book.image_url;
    this.publisher = book.publisher;
    this.publicationYear = book.publication_year;
    this.originalPublicationYear = book.work.original_publication_year;
    this.description = htmlParser.fromString(book.description)
  }
}

module.exports = BookMessage;