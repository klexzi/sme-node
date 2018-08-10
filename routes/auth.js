const express = require('express');
const router = express.Router();
const {
    User
} = require('../models/users');
const {
    generateAuthToken
} = require('./users');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');

// to authenticate a user login
router.post('/', async (req, res) => {
    let {
        error
    } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send('Wrong email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send('Wrong email or password');

    const token = user.generateAuthToken();
    req.user = token;
    res.header('x-auth-token', token).status(200).send(token);

});

function validateUser(user) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    }
    return Joi.validate(user, schema);
}

module.exports = router;