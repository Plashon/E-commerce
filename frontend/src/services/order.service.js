import api from "./api";
const API_URL = "/order";

const getAllOrders = async () => {
  return await api.get(`${API_URL}`);
}

const getOrderById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
}

const updateOrderDetail = async (id, order) => {
  return await api.put(`${API_URL}/${id}`, order);
}

const deleteOrder = async (id) => {
    return await api.delete(`${API_URL}/${id}`);
}

const OrderService = {
    getAllOrders,
    getOrderById,
    updateOrderDetail,
    deleteOrder,
}

export default OrderService;