const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const merchantSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 1024,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1000
    },
    about: {
        type: String,
        minlength: 5,
        maxlength: 255,
    },
    phone_number_1: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 25
    },
    phone_number_2: {
        type: String,
        minlength: 7,
        maxlength: 25
    },
    logo_url: {
        type: String,
        minlength: 15,
        maxlength: 255
    },
    banner_url: {
        type: String,
        minlength: 15,
        maxlength: 255
    },
    type: {
        type: String,
        default: 'merchant'
    }
});

merchantSchema.methods.generateAuthToken = function () {
    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        type: this.type
    }, config.get('jwtSecret'));
}
const Merchant = mongoose.model('Merchant', merchantSchema);

const validateMerchant = function (merchant) {
    const schema = {
        name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required(),
        address: Joi.string().min(5).max(1000).required(),
        about: Joi.string().min(5).max(255),
        phone_number_1: Joi.string().min(7).max(25).required(),
        phone_number_2: Joi.string().min(7).max(25),
        logo_url: Joi.string().min(15).max(255),
        banner_url: Joi.string().min(15).max(255)
    }
    return Joi.validate(merchant, schema);
}

const validateId = function (merchantId) {
    const isvalid = mongoose.Types.ObjectId.isValid(merchantId);
    return isvalid;
}

module.exports.Merchant = Merchant;
module.exports.validate = validateMerchant;
module.exports.validateId = validateId;