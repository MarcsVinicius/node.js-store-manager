const joi = require('joi');

const nameJoi = joi.object({
  name: joi.string()
  .min(5)
  .required(),
});

const quantityJoi = joi.object({
  quantity: joi.number()
  .integer()
  .min(1)
  .required(),
});

const nameValidate = (req, res, next) => {
  const { name } = req.body;
  const nameValidation = nameJoi.validate({ name });
  if (nameValidation.error && nameValidation.error.message.includes('length')) {
    const err = { message: nameValidation.error.message };
    return res.status(422).json(err);
  } if (nameValidation.error 
    && nameValidation.error.message.includes('required')) {
      const err = { message: nameValidation.error.message };
      return res.status(400).json(err);
    }

    next();
};

const quantityValidate = (req, res, next) => {
  const { quantity } = req.body;
  const quantityValidation = quantityJoi.validate({ quantity });
  if (quantityValidation.error && quantityValidation.error.message.includes('greater')) {
    const err = { message: quantityValidation.error.message };
    return res.status(422).json(err);
  } if (quantityValidation.error 
    && quantityValidation.error.message.includes('required')) {
      const err = { message: quantityValidation.error.message };
      return res.status(400).json(err);
    }

    next();
};

module.exports = {
  nameValidate,
  quantityValidate,
};