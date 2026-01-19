import Joi from "joi";

const usernameField = Joi.string().alphanum().min(3).max(10).required();

const fullnameField = Joi.string()
  .min(6)
  .max(50)
  .pattern(/^[a-zA-Z]+\s+[a-zA-Z]+/)
  .required()
  .messages({
    "string.pattern.base":
      "Full name must contain at least two words",
  });

const emailField = Joi.string().email().required();

const passwordField = Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
  .required()
  .messages({
    "string.pattern.base": "Password must be 8-30 alphanumeric cheracters.",
  });

export const registerSchema = Joi.object({
  username: usernameField,
  fullname: fullnameField,
  email: emailField,
  password: passwordField,
});

export const loginSchema = Joi.object({
  email: emailField,
  password: passwordField,
});
