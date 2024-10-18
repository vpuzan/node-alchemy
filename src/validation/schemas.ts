import Joi from 'joi';

export const meteorSchema : Joi.ObjectSchema = Joi.object({
  startDate: Joi.date().required().allow(null),
  endDate: Joi.date().required().allow(null),
  count: Joi.boolean(),
  wereDangerousMeteors: Joi.boolean(),
});


export const roverPhotoSchema = Joi.object({
  userId: Joi.number().required(),
  userName: Joi.string().required(),
  userApiKey: Joi.string().required(),
});