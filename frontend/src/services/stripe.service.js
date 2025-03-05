import api from "./api";
const API_URL = "/stripe"

const createCheckoutSession = async (data) => {
  return await api.post(`${API_URL}/create-checkout-session`, data);
}

const StripeService = {
  createCheckoutSession,
};

export default StripeService;