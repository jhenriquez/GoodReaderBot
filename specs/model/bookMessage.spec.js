const Q = require('q');
const chai = require('chai');
const { parseString } = require('xml2js');
const Helpers = require('../helpers');
const BookMessage = require('../../model/bookMessage');

describe('BookMessage', () => {
  let book50;

  const bookRawXMLString = Helpers.readFixtureFile('bookShow_50.xml');

  before(() => {
    return Q.nfcall(parseString, bookRawXMLString, { explicitArray: false, ignoreAttrs: true })
            .then(({ GoodreadsResponse }) => {
              book50 = GoodreadsResponse.book;
            });
  });

  describe('#()', () => {
    it('expects a Goodreads API book compliant JSON object.', () => {
      chai.expect(_ => new BookMessage({ weird: 'property' })).to.throw(Error, /invalid/i);
    });

    it('Provided a valid object it assimilates the necessary values to render a book message.', () => {
      const bookMessage = new BookMessage(book50);
      bookMessage.id.should.eql(book50.id);
      bookMessage.title.should.eql(book50.title);
      bookMessage.author.should.eql(book50.authors.author);
      bookMessage.rating.should.eql(book50.average_rating);
      bookMessage.thumbUrl.should.eql(book50.image_url);
      bookMessage.publisher.should.eql(book50.publisher);
      bookMessage.publicationYear.should.eql(book50.publication_year);
      bookMessage.originalPublicationYear.should.eql(book50.work.original_publication_year);
      bookMessage.should.have.property('description');
    });
  });

  describe('#renderHTMLMessage()', () => {
    let book;

    before(() => {
      book = new BookMessage(book50);
    })

    it('renders an anchor link with the thumbUrl', () => {
      book.renderHTMLMessage().should.include(`<a href="${ book.thumbUrl }" target="_black">&#8203;</a>`);
    });

    it('renders the book\'s title.', () => {
      book.renderHTMLMessage().should.include(book.title);
    });

    it('renders the publication year (and/or original publication year) when available.', () => {
      book.renderHTMLMessage().should.include(book.renderPublicationYear());
    });

    it('renders the book\'s rating prefixed with Star emoji.', () => {
      book.renderHTMLMessage().should.include(`\u{1F31F} <b>${ book.rating }</b>`);
    });

    it('renders a link to the goodreads page of the book.', () => {
      book.renderHTMLMessage().should.include(`<a href="https://www.goodreads.com/book/show/${book.id}">Goodreads</a>`);
    });

    it('renders a link to the author\'s page on goodreads', () => {
      book.renderHTMLMessage().should.include(`<a href="https://www.goodreads.com/author/show/${book.author.id}">${book.author.name}</a>`);
    });

    it('renders the descriptions of the book.', () => {
      book.renderHTMLMessage().should.include(book.description);
    });
  });

});