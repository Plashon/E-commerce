const ProductModel = require("../models/Product");
require("dotenv").config();

exports.createProduct = async (req, res) => {
  /**
    #swagger.tags = ['Product']
    #swagger.summary = "Create a new product"
    #swagger.description = 'Endpoint to create a new product'
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['file'] = {
       in:'formData',
       type:'file',
       required:true,
       description:'Image to upload to Firebase Storage and get its url'
    }
    #swagger.requestBody = {
       required:true,
       content:{
         "multipart/form-data":{
           schema:{
             $ref:"#components/schemas/NewProduct"
           }
         }
       }
    }
    #swagger.response[200] = {
       schema:{ "$ref": "#components/schemas/ProductResponse"},
       description: "Product created successfully"
    }
   */
  const { name, description, price, category } = req.body;
  try {
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields is require" });
    }
    const productDoc = await ProductModel.create({
      name,
      description,
      price,
      image: req.file.firebaseUrl,
      category,
    });
    res.json(productDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while creating a new product",
    });
  }
};

exports.getAllProducts = async (req, res) => {
  /**
    #swagger.tags = ['Product']
    #swagger.summary = "get all  product"
    #swagger.description = 'Endpoint to get All Products'
 */
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).send({
      message:
        error.massage || "Something error occurred while getting all products",
    });
  }
};

exports.getProductById = async (req, res) => {
  /**
    #swagger.tags = ['Product']
    #swagger.summary = "Get a  product"
    #swagger.description = 'get Product By Id'
 */
  const { id } = req.params;
  try {
    const productDetail = await ProductModel.findById(id);
    if (!productDetail) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(productDetail);
  } catch (error) {
    console.log(error.message);

    res.status(500).send({
      message: "Something error occurred while getting product detail",
    });
  }
};

exports.deleteProductById = async (req, res) => {
  /**
    #swagger.tags = ['Product']
    #swagger.summary = "delete a  product"
    #swagger.description = 'delete Product By Product Id'
 */
  const { id } = req.params;
  //   const authorId = req.userId;
  try {
    const productDoc = await ProductModel.findById(id);
    if (!productDoc) {
      return res.status(404).json({ message: "Product not found" });
    }
    // if (authorId !== productDoc.author._id.toString()) {
    //   return res
    //     .status(403)
    //     .json({ message: "You cannot delete this product" });
    // }
    await ProductModel.deleteOne();
    res.json(productDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.massage || "Something error occurred while deleting a product",
    });
  }
};

exports.updateProductById = async (req, res) => {
  /**
    #swagger.tags = ['Product']
    #swagger.summary = "update product"
    #swagger.description = 'update Product By Id'
 */
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "Product id is not provided" });
  }
  //   const authorId = req.userId;
  try {
    const productDoc = await ProductModel.findById(id);
    if (!productDoc) {
      return res.status(404).json({ message: "Product not found" });
    }
    // if (authorId !== productDoc.author._id.toString()) {
    //   return res
    //     .status(403)
    //     .json({ message: "You cannot update this product" });
    // }
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }
    productDoc.name = name;
    productDoc.description = description;
    productDoc.price = price;
    if (req.file) {
      productDoc.image = req.file.firebaseUrl;
    }
    productDoc.category = category;
    await productDoc.save();
    res.json(productDoc);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Something error occurred while updating a product",
    });
  }
};

exports.getProductByUserId = async (req, res) => {
  /**
    #swagger.tags = ['Product']
    #swagger.summary = "Get a new product"
    #swagger.description = 'get Product By User Id'
 */
  const { id } = req.params;
  try {
    const products = await ProductModel.find({ author: id })
      .populate("author", ["username"])
      .sort({
        createdAt: -1,
      })
      .limit(10);
    res.json(products);
  } catch (error) {
    res.status(500).send({
      message:
        error.massage ||
        "Something error occurred while getting all products by author",
    });
  }
};
