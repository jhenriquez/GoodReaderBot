const chai                     = require('chai');
const InlineQueryResultArticle = require('../../model/inlineQueryResultArticle');

describe('Model/InlineQueryResultArticle', () => {
  describe('#()', () => {
    let goodreadsBook = {
      id: '1234',
      title: '1234\'s Book',
      author: {
        name: '1234\'s Author'
      },
      image_url: 'https://www.image-bank.com/1234.png',
      small_image_url: 'https://www.image-bank.com/1234-small.png'
    };

    it('expects a book object compliant with the following format: { id, title, author: { name }, image_url, small_image_url }', () => {
      let validationMessage = /(book|id|title|author|image_url|small_image_url)/i;
      chai.expect(InlineQueryResultArticle).to.throw(Error, validationMessage);
      chai.expect(() => new InlineQueryResultArticle({})).to.throw(Error, validationMessage);
      chai.expect(() => new InlineQueryResultArticle({ id: '12345' })).to.throw(Error, validationMessage);
      chai.expect(() => new InlineQueryResultArticle({ id: '12345', title: 'Some Book' })).to.throw(Error, validationMessage);
      chai.expect(() => new InlineQueryResultArticle({ id: '12345', title: 'Some Book', author: {} })).to.throw(Error, validationMessage);
    });

    it('constructs a Telegram InlineQueryResultArticle compliant object.', () => {
      let inlineQueryResultArticle = new InlineQueryResultArticle(goodreadsBook);
      inlineQueryResultArticle.should.have.a.property('id', goodreadsBook.id);
      inlineQueryResultArticle.should.have.a.property('title', goodreadsBook.title);
      inlineQueryResultArticle.should.have.a.property('description', goodreadsBook.author.name);
      inlineQueryResultArticle.should.have.a.property('thumb_url', goodreadsBook.small_image_url);
      inlineQueryResultArticle.should.have.a.property('input_message_content');
      inlineQueryResultArticle.should.have.a.property('type', 'article');
      inlineQueryResultArticle.input_message_content.should.have.property('message_text', `https://www.goodreads.com/book/show/${goodreadsBook.id}`);
    });
  });
});