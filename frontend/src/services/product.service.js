import api from "./api";
const API_URL = "/product";

const getAllProducts = async () => {
  //http://localhost:5173/product.json
  return await api.get(`${API_URL}`);
};

// const createProduct = async (product) => {
//   try {
//     const formData = new FormData();
//     // Add product data
//     formData.append("name", product.name);
//     formData.append("description", product.description);
//     formData.append("price", product.price);
//     formData.append("category", product.category);
//     // Add image file
//     if (product.image) {
//       formData.append("file", product.image); // Note: key must be 'file' to match backend
//     }
//     const response = await api.post(API_URL, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

const createProduct = async (product) => {
  return await api.post(API_URL, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getProductById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
};

const updateProduct = async (id, product) => {
  return await api.put(`${API_URL}/${id}`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteProductById = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const ProductService = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProductById,
};

export default ProductService;
