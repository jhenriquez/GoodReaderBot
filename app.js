require('dotenv').config();

const _                        = require('lodash');
const BookSearch               = require('./lib/goodreads/bookSearch');
const BookShow                 = require('./lib/goodreads/bookShow');
const InlineQueryResultArticle = require('./model/inlineQueryResultArticle');
const Telegraf                 = require('telegraf');
const bot                      = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const URL                      = process.env.URL || 'https://goodreaderbot.herokuapp.com';

bot.on('inline_query', (ctx) => {

    const processAnswers = _.flowRight(
        _.partial(ctx.answerInlineQuery.bind(ctx), _),
        (books) => books.map((b) => new InlineQueryResultArticle(b))
    );

    new BookSearch(process.env.GOODREADS_API_KEY).execute(ctx.update.inline_query.query)
                                                 .then(processAnswers)
                                                 .catch(console.log.bind(console));
});

bot.on('callback_query', (ctx) => {
    const createMessageUpdate = (b) => `<a href="${b.thumb_url}" target="_black">&#8203;</a><b>${b.title} (${b.rating})</b>\nBy <a href="https://www.goodreads.com/author/show/${b.author.id}">${b.author.name}</a>\n\n<i>${ b.description }</i>\n\nRead more about this book on <a href="https://www.goodreads.com/book/show/${b.id}">Goodreads</a>.`;

    new BookShow(process.env.GOODREADS_API_KEY).execute(ctx.update.callback_query.data)
                                               .then((book) => { ctx.editMessageText(createMessageUpdate(book), { parse_mode: 'HTML' }); })
                                               .catch(console.log.bind(console));
});

bot.telegram.setWebhook(`${URL}/${process.env.TELEGRAM_BOT_TOKEN}`);

bot.startWebhook(`/${process.env.TELEGRAM_BOT_TOKEN}`,null, process.env.PORT);

bot.catch(console.log.bind(console));

console.log('Goodreader bot has Started!');