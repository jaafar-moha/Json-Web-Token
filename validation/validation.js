const Joi = require('joi')


exports.registerValidations = (data) => {
    const schema = Joi.object({
      name: Joi.string().required().min(3).max(48).trim(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string(),
    })
  
    return schema.validate(data)
  }