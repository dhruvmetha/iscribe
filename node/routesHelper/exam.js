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
    examSchema : Joi.object().keys({
        
        details: Joi.string().required(),
        location: Joi.string().required(),
        pincode: Joi.number().required(),
        hallpass: Joi.string().required(),
        date: Joi.date().required(),
        
    }),

    listExams : Joi.object().keys({

    }),

    updateExamSchemaId : Joi.object().keys({
        _id: Joi.string().required(),   
    }),

    updateExamSchema : Joi.object().keys({
        _id: Joi.string().required(),
        details: Joi.string().required(),
        location: Joi.string().required(),
        pincode: Joi.number().required(),
        hallpass: Joi.string().required(),
        date: Joi.date().required()
    }),
  }
}