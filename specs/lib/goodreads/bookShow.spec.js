const chai        = require('chai');
const nock        = require('nock');
const BookShow    = require('../../../lib/goodreads/bookShow');
const Helpers     = require('../../helpers');
const BookMessage = require('../../../model/bookMessage');

function mockGoodreadsResponseWith (fixture) {
  nock('https://www.goodreads.com:443', {"encodedQueryParams":true})
  .get('/book/show/50.xml')
  .query({ "key": process.env.GOODREADS_API_KEY })
  .reply(200, Helpers.readFixtureFile(fixture));
}

describe('Goodreads/BookShow', () => {
  describe('#()', () => {

    it('Expects a Goodreads API key string. Throws Error when not provided.', () => {
      chai.expect(() => { return new BookShow(); }).to.throw(Error, /key/i);
    });

  });

  describe('#execute()', () => {
    it('expects a string with a book id.', () => {
      return new BookShow(process.env.GOODREADS_API_KEY).execute()
                                                        .then(_ => { throw new Error('This should have been rejected.'); })
                                                        .catch(err => err.should.match(/ID/i));
    });

    it('resolves to a BookMessage object.', () => {
      mockGoodreadsResponseWith('bookShow_50.xml');
      return new BookShow(process.env.GOODREADS_API_KEY).execute(50)
                                                        .then(book => {
                                                            book.should.be.instanceOf(BookMessage);
                                                            book.id.should.eql('50');
                                                            book.title.should.eql('Hatchet (Brian\'s Saga, #1)');
                                                            book.publisher.should.eql('Atheneum Books for Young Readers: Richard Jackson Books')
                                                            book.publicationYear.should.eql('');
                                                            book.originalPublicationYear.should.eql('1986');
                                                            book.should.have.a.property('description');
                                                        });
    });

    it('It parses simple HTML tags to plain text from the description.', () => {
      mockGoodreadsResponseWith('bookShow_31868165.xml');
      return new BookShow(process.env.GOODREADS_API_KEY).execute(50)
                                                        .then(book => {
                                                          book.description.indexOf('<b>').should.be.lessThan(0);
                                                          book.description.indexOf('<br />').should.be.lessThan(0);
                                                          book.description.indexOf('<i>').should.be.lessThan(0);
                                                        });
    });
  });


});