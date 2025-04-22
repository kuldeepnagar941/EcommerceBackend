const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

router.get('/getalluser', adminController.getAllUsers);
router.get('/getallseller',adminController.getAllSeller)


module.exports = router;