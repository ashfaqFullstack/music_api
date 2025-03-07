const Joi = require('joi');
const { objectId } = require('./custom.validation');

const postJob = {
  body: Joi.object().keys({
    position: Joi.string().required(),
    projectTitle: Joi.string().required(),
    category: Joi.array().items(Joi.string()).min(1).max(5).required(),
    isHaveLyric: Joi.boolean().required(),
    lyricLanguage: Joi.string(),
    musicUse: Joi.array().items(Joi.string()),
    cultureArea: Joi.array().items(Joi.string()),
    budget: Joi.string().required(),
    timeFrame: Joi.string().required(),
    preferredLocation: Joi.string(),
    description: Joi.string().required(),
    applicantName: Joi.string(),
    applicantAvatar: Joi.string().uri().optional(),
    applicantBackgroundImage: Joi.string().uri().optional(),
    applicantSelectedSongs: Joi.array().items(Joi.string().custom(objectId)).min(0).max(2),
    savedBy: Joi.array().items(Joi.string().custom(objectId)) || Joi.array(),
    createdBy: Joi.string(),
  }),
};

const getJobs = {
  query: Joi.object().keys({
    projectTitle: Joi.string(),
    preferredLocation: Joi.string(),
    category: Joi.string() || Joi.array().items(Joi.string()),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getJobById = {
  params: Joi.object().keys({
    jobId: Joi.string().custom(objectId).required(),
  }),
};



const changeJobStatus = {
  params: Joi.object().keys({
    jobId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    status: Joi.string().valid('active', 'inactive').required(),
  })
};

const applyJob = {
  params: Joi.object().keys({
    jobId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    applyJob: {
      musicIds: Joi.array().min(4).max(4).items(Joi.string().custom(objectId)).required(),
      message: Joi.string().required(),
      jobId: Joi.string().custom(objectId).required(),
    }
  }),
};

module.exports = {
  postJob,
  getJobs,
  getJobById,
  applyJob,
  changeJobStatus
};
