const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const OrderSchema = new Schema(
  {
    email: { type: String, require: true },
    customerId: { type: String, require: true },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
        quantity: { type: Number, require: true, default: 1 },
      },
    ],
    supTotal: { type: Number, require: true },
    total: { type: Number, require: true ,default: 1 },
    shipping:{type: Object, require: true},
    deliver_status:{type: String, require: true ,default: "pending"},
    payment_status:{type: String, require: true ,default: "unpaid"},
  },
  {
    timestamps: true,
  }
);
const OrderModel = model("Order", OrderSchema);
module.exports = OrderModel;
