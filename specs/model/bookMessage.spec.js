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
      bookMessage.average_rating.should.eql(book50.average_rating);
      bookMessage.thumbUrl.should.eql(book50.image_url);
      bookMessage.publisher.should.eql(book50.publisher);
      bookMessage.publicationYear.should.eql(book50.publication_year);
      bookMessage.originalPublicationYear.should.eql(book50.work.original_publication_year);
      bookMessage.should.have.property('description');
    });
  });

  describe('#getHTMLMessage()', () => {
    it('renders the book\'s title.');
    it('renders the publication year (and/or original publication year) when available.');
    it('renders the book\'s rating prefixed with Star emoji.');
    it('renders the author of the book.');
    it('renders the descriptions of the book.');
    it('renders the publisher of the book if available.');
  });

});