const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartItem.controller");

//http://localhost:5000/api/v1/cart
router.get("/", cartController.getAllCartItems)
router.get("/:email", cartController.getCartItemByEmail);
router.post("/", cartController.createCart);
router.put("/:id", cartController.updateCartItem);
router.delete("/clear/:email", cartController.removeAllItems);
router.delete("/:id", cartController.removeItemById);

module.exports = router;