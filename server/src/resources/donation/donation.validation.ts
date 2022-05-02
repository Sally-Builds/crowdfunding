import Joi from 'joi'


const create = Joi.object({
    amount: Joi.number().required(),
    // user: Joi.string().required(),
    project: Joi.string().required()
})


export default {create}