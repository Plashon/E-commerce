const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { upload, uploadToFirebase } = require("../middleware/file.middleware");

router.post("", upload, uploadToFirebase, productController.createProduct);
router.get("", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/author/:id", productController.getProductByUserId);
router.delete("/:id",  productController.deleteProductById);
router.put("/:id", upload, uploadToFirebase, productController.updateProductById);
module.exports = router;
