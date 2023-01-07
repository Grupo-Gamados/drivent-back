import Joi from "joi";

export const oauthSchema = Joi.object({
  code: Joi.string().required()
});
