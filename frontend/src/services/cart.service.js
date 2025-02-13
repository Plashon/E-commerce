import api from "./api";
const API_URL = "/cart";

const createCart = async (cartItem) => {
  return await api.post(`${API_URL}`, cartItem);
};

const getAllCartItems = async () => {
  return await api.get(`${API_URL}`);
};
const getCartItemByEmail = async (email) => {
  return await api.get(`${API_URL}/${email}`);
};

const updateCartItem = async (id,cartItem) => {
  return await api.put(`${API_URL}/${id}`,cartItem);
};

const removeItemById = async (id) => {
  return await api.delete(`${API_URL}/${id}`);
};

const removeAllItems = async (email) => {
  return await api.delete(`${API_URL}/clear/${email}`);
};

const CartService = {
  createCart,
  getAllCartItems,
  getCartItemByEmail,
  updateCartItem,
  removeItemById,
  removeAllItems,
};

export default CartService;
