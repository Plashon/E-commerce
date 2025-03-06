const express = require("express");
const router = express.Router();
const orderController  = require("../controllers/order.controller");

//http://localhost:5000/api/v1/order
router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrderById);
router.put("/:id", orderController.updateOrderDetail);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
