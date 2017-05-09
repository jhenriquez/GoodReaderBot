function InlineKeyboardMarkup() { this.inline_keyboard = []; }

InlineKeyboardMarkup.prototype.addCallback = function (params) {

  if (!params.text) { throw new Error('"text" attribute is required.'); }

  if (!params.data) { throw new Error('"data" attribute is required.'); }

  const row = params.row || 0;

  this.inline_keyboard[row] = this.inline_keyboard[row] || [];

  this.inline_keyboard[row].push({
    text: params.text,
    callback_data: params.data
  });

  return this;

};

module.exports = InlineKeyboardMarkup;