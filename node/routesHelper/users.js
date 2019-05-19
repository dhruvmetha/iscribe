const Joi = require('joi');

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema);
      if (result.error) {
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {}; }
      req.value['body'] = result.value;
      next();
    }
  },

  schemas: {
    signUpSchema : Joi.object().keys({
      as: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      address: Joi.string().required(),
      occupation: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      aadharno: Joi.string().required(),
      gender: Joi.string().required(),
      number1: Joi.string().required(),
      number2: Joi.string(),
      pincode: Joi.number().required(),
      age: Joi.number().required(),
      aadharCard: Joi.string().required(),
      sslc: Joi.string(),
      puc: Joi.string(),
      ug: Joi.string(),
      pg: Joi.string(),
      disabilityProof : Joi.string(),
      qualification: Joi.array(),
      dob: Joi.date().required(),
      opportunity : Joi.array(),
    }), 
    signInSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    detailsSchema : Joi.object().keys({

    })
    
  }
}