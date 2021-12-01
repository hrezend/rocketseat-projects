import {Joi,celebrate} from 'celebrate';

const ValidatorCreatePoint = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().error(new Error('Name is a required field!')),
        email: Joi.string().email().required().error(new Error('Email is a required field!')),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
    }),
});

export default ValidatorCreatePoint;