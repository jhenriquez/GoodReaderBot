require('dotenv').config();

const _                        = require('lodash');
const BookSearch               = require('./lib/goodreads/bookSearch');
const InlineQueryResultArticle = require('./model/inlineQueryResultArticle');
const Telegraf                 = require('telegraf');
const bot                      = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.on('inline_query', (ctx) => {

    const processAnswers = _.flowRight(
        _.partial(ctx.answerInlineQuery.bind(ctx), _),
        (books) => books.map((b) => new InlineQueryResultArticle(b))
    );

    new BookSearch(process.env.GOODREADS_API_KEY).execute(ctx.update.inline_query.query)
                                                 .then(processAnswers)
                                                 .catch(console.log.bind(console));
});

bot.telegram.setWebhook(`${process.env.URL}/${process.env.TELEGRAM_BOT_TOKEN}`);

bot.catch(console.log.bind(console));

bot.startWebhook(`/${process.env.TELEGRAM_BOT_TOKEN}`,null, process.env.PORT);

console.log('Goodreader bot has Started!');