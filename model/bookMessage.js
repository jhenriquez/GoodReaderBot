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
    this.rating = book.average_rating;
    this.thumbUrl = book.image_url;
    this.publisher = book.publisher;
    this.publicationYear = book.publication_year;
    this.originalPublicationYear = book.work.original_publication_year;
    this.description = htmlParser.fromString(book.description)
  }

  renderPublicationYear () {
    return this.publicationYear && this.originalPublicationYear ? `(${this.publicationYear} &#8212; ${this.originalPublicationYear})`
      : this.publicationYear ? `(${this.publicationYear})`
      : this.originalPublicationYear ? `(${this.originalPublicationYear})`
      : '';
  }

  renderHTMLMessage () {
    return `<a href="${this.thumbUrl}" target="_black">&#8203;</a><b>${this.title} ${this.renderPublicationYear()}</b>\n\u{1F31F} <b>${this.rating}</b> <a href="https://www.goodreads.com/book/show/${this.id}">Goodreads</a>\n\nBy <a href="https://www.goodreads.com/author/show/${this.author.id}">${this.author.name}</a>\n\n<i>${ this.description }</i>`
  }
}

module.exports = BookMessage;