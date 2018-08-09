const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {
    User
} = require('../models/users');

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
    res.end();
});


module.exports = router;