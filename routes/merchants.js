const {
    Merchant,
    validate,
    validateId
} = require('../models/merchants')
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');

// get all merchants
router.get('/', async (req, res) => {
    const merchant = await Merchant.find().sort('name').select('-password');
    res.status(200).send(merchant);
});

// get a particular merchant
router.get('/:id', async (req, res) => {
    const isValid = validateId(req.params.id);
    if (!isValid) return res.status(400).send(" Invalid Merchant ID ");

    const merchant = await Merchant.findById(req.params.id).select('-password');
    if (!merchant) return res.status(404).send(" Merchant not found with the given id ");

    res.status(200).send(merchant);
})

// add a merchant
router.post('/', async (req, res) => {
    const {
        error
    } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const findMerchant = await Merchant.findOne({
        email: req.body.email
    });
    if (findMerchant) return res.status(400).send(" Merchant with the Email already exist ");

    let merchant = new Merchant(_.pick(req.body, [
        'name',
        'email',
        'password',
        'address',
        'about',
        'phone_number_1',
        'phone_number_2',
        'logo_url',
        'banner_url'
    ]));

    const salt = await bcrypt.genSalt(10);
    merchant.password = await bcrypt.hash(merchant.password, salt);
    await merchant.save();
    const token = merchant.generateAuthToken(_.pick(merchant, ['_id', 'name', 'email', 'type']));
    res.status(200).send(token);

});

// Update a particular Merchant details
router.put('/:id', async (req, res) => {
    const isValid = validateId(req.params.id);
    if (!isValid) return res.status(400).send('Invalid Merchant ID');

    let user = await Merchant.findByIdAndUpdate(req.params.id, req.body).select('-password -type');
    if (!user) return res.status(404).send('Merchant with the given ID not found');

    res.status(200).send(user);
});

module.exports = router;