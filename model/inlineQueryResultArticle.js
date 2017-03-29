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
  this.thumb_url = validated.value.small_image_url;
  this.input_message_content = {
    message_text: `https://www.goodreads.com/book/show/${validated.value.id}`
  };
}

module.exports = InlineQueryResultArticle;