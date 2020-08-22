
const Joi = require("joi");

export const validateGenere = genere => {
    const schema = {
      name: Joi.string()
        .min(3)
        .required()
    };
  
    return Joi.validate(genere, schema);
  };
  