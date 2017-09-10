const Joi = require('joi');

const authorSchema = Joi.object().keys({ name: Joi.string().required(), id: Joi.string() });

/*
 * Exports a Joi schema that can validate a Goodreads API compliant book object.
 */
module.exports = Joi.object().keys({
    id: Joi.string().required(),
    title: Joi.string().required(),
    author: authorSchema,
    authors: Joi.object().keys({ author: authorSchema.unknown() }),
    image_url: Joi.string().uri().required(),
    small_image_url: Joi.string().uri().required(),
    publisher: Joi.string().empty(''),
    work: Joi.object().keys({ original_publication_year: Joi.string().empty('') }).unknown(),
    publication_year: Joi.string().empty('')
}).unknown().required().label('book')