const express = require("express");
const router = express.Router();
const productController = require("../controller/productContoller");
const varifyauth = require('../middlewares/verifyAuth')


router.get("/allproduct", productController.allproduct);
router.post("/", productController.createProduct); 
router.get("/getuserproduct/:userid", productController.getAllProducts); 
router.get("/:id", productController.getoneProduct); 
router.put("/:id", productController.updateProduct); 
router.delete("/:id", productController.deleteProduct);
router.delete("/soft/:id", productController.softDeleteProduct); 
router.put("/restore/:id", productController.restoreProduct); 
router.get("/inactiveproduct/:id",productController.getAllProductsInactive)


module.exports = router;
