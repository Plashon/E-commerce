const OrderModel = require("../models/Order");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().populate("products.productId");
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
    console.log("Fetching order with ID:", id);

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Invalid Order ID" });
    }

    const orderDoc = await OrderModel.findById(id).populate(
      "products.productId"
    );

    if (!orderDoc) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(orderDoc);
  } catch (error) {
    console.error("Error fetching order:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching order details",
      error: error.message,
    });
  }
};

exports.updateOrderDetail = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "id is require" });
  }
  try {
    const orderDetail = await OrderModel.findById(id);
    if (!orderDetail) {
      return res.status(404).json({ message: "Order not found" });
    }
    const { deliver_status } = req.body;
    if (!deliver_status) {
      return res.status(400).json({ message: "deliver_status is require" });
    }
    orderDetail.deliver_status = deliver_status;
    await orderDetail.save();
    res.json(orderDetail);

  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Something error occurred while Updating order detail",
    });
  }
};

exports.deleteOrder = async (req, res) => {
  const {id} = req.params;
  if (!id) {
    return res.status(404).json({ message: "id is require" });
  }
  try {
    const order = await OrderModel.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: "Something error occurred while deleting order",
    });
  }
}  