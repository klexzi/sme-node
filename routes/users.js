const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
require('joi-objectid');

const {
    User,
    validate
} = require('../models/users');

// To get all users
router.get('/', async (req, res) => {
    const users = await User.find().sort('name').select('-password');
    res.send(users);
    res.end();
});

//to get a particular user 
router.get('/:id', async (req, res) => {

    let user = await User.findOne({
        _id: req.params.id
    });
    if (!user) return res.status(404).send('User not found');

    res.status(200).send(_.pick(user, ['_id', 'name', 'email']));
})

// to register a user
router.post('/', async (req, res) => {
    let {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const findUser = await User.findOne({
        email: req.body.email
    });
    if (findUser) return res.status(400).send('User with email already exist');

    let user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    const token = generateAuthToken(_.pick(user, ['_id', 'name', 'email']));
    req.user = token;
    res.status(200).send(token);
});

// Update a particular user
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    let {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) return res.status(400).send(`could not find user with the specified id: ${id}`);

    res.status(200).send(_.pick(user, ['_id', 'name', 'email']));
})


module.exports = router;