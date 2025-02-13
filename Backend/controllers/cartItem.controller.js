const CartModel = require("../models/Cart");

exports.createCart = async (req, res) => {
  /**
    #swagger.tags = ['Cart']
    #swagger.summary = "Create a new Cart"
    #swagger.description = 'Endpoint to create a new Cart'
 */
  const { productId, name, email, quantity, price, image } = req.body;
  if (!productId || !name || !email || !quantity || !price || !image) {
    res.status(400).json({ message: "Product information is missing!" });
    return;
  }
  try {
    const existingItem = await CartModel.findOne({ productId, email });
    if (existingItem) {
      existingItem.quantity += quantity;
      const data = await existingItem.save();
      return res.json(data);
    }
    //add new cart item
    const cartItem = new CartModel({
      productId,
      name,
      email,
      quantity,
      price,
      image,
    });
    const data = await cartItem.save();
    res.json(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while adding a new cart item",
    });
  }
};

exports.getAllCartItems = async (req, res) => {
  /**
    #swagger.tags = ['Cart']
    #swagger.summary = "get All Cart Items"
    #swagger.description = 'Endpoint to get All Cart Items'
 */
  try {
    const cartItems = await CartModel.find();
    if (cartItems.length === 0 || !cartItems) {
      return res.status(404).json({ message: "Cart is empty" });
    }
    res.json(cartItems);
  } catch (error) {
    res.status(500).send({
      message:
        error.massage || "Something error occurred while retrieving cart Items",
    });
  }
};

exports.getCartItemByEmail = async (req, res) => {
  /**
    #swagger.tags = ['Cart']
    #swagger.summary = "get Cart Item By Email"
    #swagger.description = 'Endpoint to get Cart Item By Email'
 */
  const { email } = req.params;
  if (!email) {
    res.status(400).json({ message: "Email is missing!" });
    return;
  }
  try {
    const cartItems = await CartModel.find({ email });
    if (!cartItems) {
      return res.status(404).json({ message: "Cart is empty" });
    }
    res.json(cartItems);
  } catch (error) {
    res.status(500).send({
      message:
        error.massage || "Something error occurred while deleting this item",
    });
  }
};

exports.updateCartItem = async (req, res) => {
  /**
    #swagger.tags = ['Cart']
    #swagger.summary = "update Cart Item"
    #swagger.description = 'Endpoint to update Cart Item'
 */
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "Cart id is not found" });
  }
  try {
    const cartItem = await CartModel.findByIdAndUpdate(id, req.body, {
      new: true,
      useFindAndModify: false,
    });
    if (!cartItem) {
      return res.status(404).json({ message: "Cart Item not found" });
    }
    res.json(cartItem);
  } catch (error) {
    res.status(500).send({
      message:
        error.massage || "Something error occurred while updating a cart Item",
    });
  }
};

exports.removeAllItems = async (req, res) => {
  /**
    #swagger.tags = ['Cart']
    #swagger.summary = "remove All Items"
    #swagger.description = 'Endpoint to remove All Items'
 */
  const { email } = req.params;
  console.log(email);
  
  try {
    const cart = await CartModel.deleteMany({ email });
    console.log(cart);
  
    if (cart.deletedCount > 0) {
      return res.status(200).json({ message: "Cart is cleared" });
    }
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart is empty" });
  } catch (error) {
    res.status(500).send({
      message:
        error.massage || "Something error occurred while clearing a cart",
    });
  }
};

exports.removeItemById = async (req, res) => {
  /**
    #swagger.tags = ['Cart']
    #swagger.summary = "remove Item By Id "
    #swagger.description = 'Endpoint to remove Item By Id '
 */
  const { id } = req.params;
  try {
    const cartItem = await CartModel.findById(id);
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    await CartModel.deleteOne();
    res.json(cartItem);
  } catch (error) {
    res.status(500).send({
      message:
        error.massage || "Something error occurred while deleting a Item",
    });
  }
};
