
const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventoryController');


router.put('/:id',inventoryController.updateInventory);
router.get('/', inventoryController.getInventoryById);

module.exports = router;
