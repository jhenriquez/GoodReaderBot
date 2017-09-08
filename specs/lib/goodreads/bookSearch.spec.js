const chai                   = require('chai');
const nock                   = require('nock');
const BookSearch             = require('../../../lib/goodreads/bookSearch');
const GoodreadsBookValidator = require('../../../model/goodreadsBookValidator');
const SpecHelpers            = require('../../helpers');


function mockNerudaSearch () {
  nock('https://www.goodreads.com:443', {"encodedQueryParams":true})
        .get('/search/index.xml')
        .query({"key": process.env.GOODREADS_API_KEY,"q":"neruda"})
        .reply(200, SpecHelpers.readFixtureFile('bookSearch_neruda.xml'));
}

describe('Goodreads/BookSearch', () => {
  describe('#()', () => {
    it('Expects a Goodreads API key string. Throws Error when not provided.', () => {
      chai.expect(() => { return new BookSearch(); }).to.throw(Error, /key/i);
    });
  });

  describe('execute', () => {
    it('Resolves to an empty array of books when no query string is provided.', () => {
      nock('https://www.goodreads.com:443', {"encodedQueryParams":true})
        .get('/search/index.xml')
        .query({"key": process.env.GOODREADS_API_KEY })
        .reply(200, `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<GoodreadsResponse>\n  <Request>\n    <authentication>true</authentication>\n      <key><![CDATA[${process.env.GOODREADS_API_KEY}]]></key>\n    <method><![CDATA[search_index]]></method>\n  </Request>\n  <search>\n  <query><![CDATA[]]></query>\n    <results-start>1</results-start>\n    <results-end>0</results-end>\n    <total-results>0</total-results>\n    <source>Goodreads</source>\n    <query-time-seconds></query-time-seconds>\n    <results>\n    </results>\n</search>\n\n</GoodreadsResponse>`);

      return new BookSearch(process.env.GOODREADS_API_KEY).execute().then((books) => books.should.have.length(0));
    });

    it('Resolves to at least 20 items for a popular author like neruda', () => {
      mockNerudaSearch();
      return new BookSearch(process.env.GOODREADS_API_KEY).execute('neruda').then(books => books.should.have.length(20));
    });

    it('Book objects conform to the following structure: { id, title, author: { name }, image_url, small_image_url }', () => {
      mockNerudaSearch();
      return new BookSearch(process.env.GOODREADS_API_KEY).execute('neruda').then(books => {
        books.forEach((b) => chai.expect(GoodreadsBookValidator.validate(b).error).to.be.null);
      });
    });
  });
});