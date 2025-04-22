const express = require('express');
const router = express.Router();
const { getAllOrdersseller } = require('../controller/sellerOderController');

router.get('/getsellerorder/:id', getAllOrdersseller);

module.exports = router;