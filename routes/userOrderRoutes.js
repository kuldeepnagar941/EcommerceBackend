const express = require("express");
const router = express.Router();
const userOrderController = require("../controller/userOrderController")










router.get("/getallorderuser/:id",userOrderController.getAllOrdersUser );


module.exports = router;