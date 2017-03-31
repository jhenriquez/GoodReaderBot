const GoodreadsBookValidator = require('./goodreadsBookValidator');

/*
 * A constructor to model a Telegram InlineQueryResultArticle built from a Goodreads complaint book.
 */
function InlineQueryResultArticle (book) {
  let validated = GoodreadsBookValidator.validate(book);

  if (validated.error) {
    throw validated.error;
  }

  this.type = 'article';
  this.id = validated.value.id;
  this.title = validated.value.title;
  this.description = validated.value.author.name;
  this.thumb_url = validated.value.image_url;

  this.input_message_content = {
    message_text: `<a href="${this.thumb_url}" target="_black">&#8203;</a><b>${this.title}</b>\nBy <a href="https://www.goodreads.com/author/show/${validated.value.author.id}">${this.description}</a>\n\nRead more about this book on <a href="https://www.goodreads.com/book/show/${this.id}">Goodreads</a>.`,
    parse_mode: 'HTML'
  };
}

module.exports = InlineQueryResultArticle;