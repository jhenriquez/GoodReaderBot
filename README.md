[![Build Status](https://travis-ci.org/jhenriquez/GoodReaderBot.svg?branch=master)](https://travis-ci.org/jhenriquez/GoodReaderBot)
[![Coverage Status](https://coveralls.io/repos/github/jhenriquez/GoodReaderBot/badge.svg?branch=master)](https://coveralls.io/github/jhenriquez/GoodReaderBot?branch=master)

# GoodReader

A telegram bot to search and share books from [GoodReads](https://www.goodreads.com). GoodReader is an [inline mode](https://core.telegram.org/bots/inline) bot.

### Usage

To search and share books one only needs to reference the bot from any conversation (individual or group) on telegram by typing `@goodreaderbot <query>`.

### Current Status

At the present the bot resolves book searchs using the [Goodreads Search Books API](https://www.goodreads.com/api/index#search.books) and renders
it results using [InlineQueryResultArticle](https://core.telegram.org/bots/api#inlinequeryresultarticle) objects.

When an item is selected a HTML based [text message](https://core.telegram.org/bots/api#html-style) is rendered in the room. This message contains
the title of the book, the author, links to both the author and book profiles on Goodreads and the book's cover if available.

## Contributions

This project is a personal experiment mainly intented for learning purposes. That said... what better way to learn than with others so comments, suggestions and
contributions are much welcome.
