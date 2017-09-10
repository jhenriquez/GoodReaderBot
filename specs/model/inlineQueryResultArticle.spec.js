const chai                     = require('chai');
const InlineKeyboardMarkup     = require('../../model/inlineKeyboardMarkup');
const InlineQueryResultArticle = require('../../model/inlineQueryResultArticle');

describe('Model/InlineQueryResultArticle', () => {

  const goodreadsBook = {
    id: '1234',
    title: '1234\'s Book',
    author: {
      name: '1234\'s Author'
    },
    image_url: 'https://www.image-bank.com/1234.png',
    small_image_url: 'https://www.image-bank.com/1234-small.png'
  };

  describe('#()', () => {

    it('expects a book object compliant with the following format: { id, title, author: { name }, image_url, small_image_url }', () => {
      const validationMessage = /(book|id|title|author|image_url|small_image_url)/i;
      chai.expect(InlineQueryResultArticle).to.throw(Error, validationMessage);
      chai.expect(() => new InlineQueryResultArticle({})).to.throw(Error, validationMessage);
      chai.expect(() => new InlineQueryResultArticle({ id: '12345' })).to.throw(Error, validationMessage);
      chai.expect(() => new InlineQueryResultArticle({ id: '12345', title: 'Some Book' })).to.throw(Error, validationMessage);
      chai.expect(() => new InlineQueryResultArticle({ id: '12345', title: 'Some Book', author: {} })).to.throw(Error, validationMessage);
    });

    it('constructs a Telegram InlineQueryResultArticle compliant object.', () => {
      const inlineQueryResultArticle = new InlineQueryResultArticle(goodreadsBook);
      inlineQueryResultArticle.should.have.a.property('id', goodreadsBook.id);
      inlineQueryResultArticle.should.have.a.property('title', goodreadsBook.title);
      inlineQueryResultArticle.should.have.a.property('description', goodreadsBook.author.name);
      inlineQueryResultArticle.should.have.a.property('thumbUrl', goodreadsBook.image_url);
      inlineQueryResultArticle.should.have.a.property('input_message_content');
      inlineQueryResultArticle.should.have.a.property('type', 'article');
      inlineQueryResultArticle.input_message_content.should.have.property('message_text');
      inlineQueryResultArticle.should.have.a.property('reply_markup');
      inlineQueryResultArticle.reply_markup.should.be.an.instanceOf(InlineKeyboardMarkup);
    });

  });

  describe('#reply_markup', () => {
    it('contains a callback button: "Read more"', () => {
      const inlineQueryResultArticle = new InlineQueryResultArticle(goodreadsBook);
      inlineQueryResultArticle.reply_markup.inline_keyboard[0][0].text.should.eql('Read more');
    });

    it('button: "Read more" holds the book id as callback data.', () => {
      const inlineQueryResultArticle = new InlineQueryResultArticle(goodreadsBook);
      inlineQueryResultArticle.reply_markup.inline_keyboard[0][0].callback_data.should.eql('1234');
    });
  });

});