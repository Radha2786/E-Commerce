const Joi = require('joi');

module.exports.productSchema = Joi.object({
     name: Joi.string().required(),
    img: Joi.string().required(),
    price: Joi.string().required(),
    desc: Joi.string().required().min(0),
});

module.exports.ReviewSchema = Joi.object({
    rating:Joi.number().min(0).max(0),
    comment:Joi.string().required(),
});
