const OrderModel = require("../models/Order")

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    if (!orders) {
      return res.status(404).json({ message: "No Orders" });
    }
    res.json(orders);
  } catch (error) {
    res.status(500).send({
      message: error.massage || "Something error occurred while getting Orders",
    });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const orderDetail = await OrderModel.findById(id);
    if (!orderDetail) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(orderDetail);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Something error occurred while getting order detail",
    });
  }
};
