const Joi = require('joi');

/*
 * Exports a Joi schema that can validate a Goodreads API compliant book object.
 */

module.exports = Joi.object().keys({
    id: Joi.string().required(),
    title: Joi.string().required(),
    author: Joi.object().keys({ name: Joi.string().required(), id: Joi.string()  }).required(),
    image_url: Joi.string().uri().required(),
    small_image_url: Joi.string().uri().required()
}).required().label('book');