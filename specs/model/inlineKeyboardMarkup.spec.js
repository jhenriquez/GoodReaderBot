const chai                 = require('chai');
const InlineKeyboardMarkup = require('../../model/inlineKeyboardMarkup');

describe('InlineKeyboardMarkup', () => {

  let inlineKeyboardMarkup = null;

  beforeEach(() => { inlineKeyboardMarkup = new InlineKeyboardMarkup(); });

  it('exposes an array of arrays of buttons: "inline_keyboard" ', () => {
    inlineKeyboardMarkup.should.have.a.property('inline_keyboard');
    inlineKeyboardMarkup.inline_keyboard.should.be.an.instanceOf(Array);
  });

  describe('#addCallback', () => {

    it('expects an object with the text, callback data and row number for the button.', () => {
      chai.expect((_ => inlineKeyboardMarkup.addCallback())).to.throw(Error, /(text|data)/i);
      chai.expect((_ => inlineKeyboardMarkup.addCallback({ text: 'SomeCallbackButton' }))).to.throw(Error, /(data)/i);
    });

    it('adds new button to the general list.', () => {
      inlineKeyboardMarkup.addCallback({ text: 'TestCallbackButton', data: 'some data', row: 0 });
      inlineKeyboardMarkup.inline_keyboard.length.should.eql(1);
      inlineKeyboardMarkup.inline_keyboard[0].length.should.eql(1);
    });

    it('defaults to the first row of buttons', () => {
      inlineKeyboardMarkup.addCallback({ text: 'TestCallbackButton', data: 'some data' });
      inlineKeyboardMarkup.inline_keyboard.length.should.eql(1);
      inlineKeyboardMarkup.inline_keyboard[0].length.should.eql(1);
    });

    it('returns the mutated InlineKeyboardMarkup object.', () => {
      const mutated = inlineKeyboardMarkup.addCallback({ text: 'Some Callback', data: 'some data' });
      mutated.should.be.an.instanceOf(InlineKeyboardMarkup);
      mutated.inline_keyboard.length.should.eql(1);
      inlineKeyboardMarkup.inline_keyboard[0].length.should.eql(1);
    });
  });

});