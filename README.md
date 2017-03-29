[![Build Status](https://travis-ci.org/jhenriquez/GoodReaderBot.svg?branch=master)](https://travis-ci.org/jhenriquez/GoodReaderBot)
[![Coverage Status](https://coveralls.io/repos/github/jhenriquez/GoodReaderBot/badge.svg?branch=master)](https://coveralls.io/github/jhenriquez/GoodReaderBot?branch=master)

# GoodReader

A telegram bot to search and share books from [GoodReads](https://www.goodreads.com). GoodReader is an [inline mode](https://core.telegram.org/bots/inline) bot.

### Current Status

At the present the bot resolves book searchs using the [Goodreads Search Books API](https://www.goodreads.com/api/index#search.books) and renders
it results using [InlineQueryResultArticle](https://core.telegram.org/bots/api#inlinequeryresultarticle) objects.

When an item is selected the message sent to the room is Goodreads book show URL. This might suffice for the moment since telegram crawls it for
richer content.

## Contributions

This project is a personal experiment mainly intented for learning purposes. That said... what better way to learn than with others so comments, suggestions and
contributions are much welcome.