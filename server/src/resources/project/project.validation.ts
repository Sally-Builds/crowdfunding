import Joi from 'joi'


const create = Joi.object({
    name: Joi.string().required(),
    expectedAmount: Joi.number().required()
})

const update = Joi.object({
    name: Joi.string(),
    expectedAmount: Joi.number(),
    consensusStatus: Joi.string(),
})


export default {create, update}