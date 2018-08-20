const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const postSchema = new mongoose.Schema({
  merchantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true,
    maxlength: 100,
    minlength: 3,
    required: true
  },
  description: {
    type: String,
    minlength: 1,
    maxlength: 400,
    required: true
  },
  image: {
    type: String,
    required: true,
    maxlength: 400,
    required: true
  },
  date_posted: {
    type: String,
    default: Date.now()
  }
});

const Post = mongoose.model("Post", postSchema);

const validatePost = function(post) {
  const schema = {
    merchantId: Joi.objectId().required(),
    title: Joi.string()
      .max(100)
      .min(3)
      .required(),
    description: Joi.string()
      .min(1)
      .max(400)
      .required(),
    image: Joi.string()
      .max(400)
      .required()
  };

  return Joi.validate(post, schema);
};

module.exports.Post = Post;
module.exports.validate = validatePost;
