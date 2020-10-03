[![Coverage Status](https://coveralls.io/repos/github/jhenriquez/GoodReaderBot/badge.svg?branch=master)](https://coveralls.io/github/jhenriquez/GoodReaderBot?branch=master)

# GoodReader

A telegram bot to search and share books from [GoodReads](https://www.goodreads.com). GoodReader is an [inline mode](https://core.telegram.org/bots/inline) bot.

*This bot does not interface with your personal account on goodreads. It only searches for books on their public database.*

### Usage

*This implementation is no longer in use. It has been replaced by [ReaderBot](https://github.com/jhenriquez/readerbot)*

To search and share books one only needs to reference the bot from any conversation (individual or group) on telegram by typing `@goodreaderbot <query>`.

### Current Status

At the present the bot resolves book searchs using the [Goodreads Search Books API](https://www.goodreads.com/api/index#search.books) and renders
its results using [InlineQueryResultArticle](https://core.telegram.org/bots/api#inlinequeryresultarticle) objects.

When an item is selected a HTML based [text message](https://core.telegram.org/bots/api#html-style) is rendered in the room. This message contains the title of the book, the author, links to both the author and book profiles on Goodreads and the book's cover if available. An additional "Read more" button is also added that if used updates the message with the description and average rating of the book.

## Contributions

This project is a personal experiment mainly intented for learning purposes. That said... what better way to learn than with others? Comments, suggestions and contributions are much welcome.
