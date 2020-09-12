
const Joi = require("joi");

const contactFromValidate = contact => {
    const schema = {
      name: Joi.string()
        .min(3)
        .required()
    };
  
    return Joi.validate(contact, schema);
  };
  

  module.exports = contactFromValidate