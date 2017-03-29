require('dotenv').config();

const BookSearch  = require('./lib/goodreads/bookSearch');
const Telegraf    = require('telegraf');
const bot         = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

function buildQueryResult (books) {
    return books.map((b) => {
        return {
            id: b.id._,
            title: b.title,
            type: 'article',
            thumb_url: b.small_image_url,
            input_message_content: {
                message_text: `${b.title}`,
                parse_mode: 'Markdown'
            }
        };
    });
};

bot.on('inline_query', (ctx) => {
     new BookSearch(process.env.GOODREADS_API_KEY).execute(ctx.update.inline_query.query).then((books) => ctx.answerInlineQuery(buildQueryResult(books))).catch((err) => {
         console.log(err);
     });
});

bot.catch((err) => {
    console.log(err);
});

bot.startPolling();