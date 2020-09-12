
const Joi = require("joi");

export const contactFromValidate = contact => {
    const schema = {
      name: Joi.string()
        .min(3)
        .required()
    };
  
    return Joi.validate(contact, schema);
  };
  