const express = require('express');
const router = express.Router();
const addressController = require('../controller/addressController');


router.post('/', addressController.createAddress);
router.get('/:id', addressController.getAddresses);
router.get('/:id', addressController.getAddressById);
router.put('/:id',  addressController.updateAddress);
router.delete('/:id',  addressController.deleteAddress);

module.exports = router;
