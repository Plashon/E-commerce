import { useQuery } from "@tanstack/react-query";
import CartService from "../services/cart.service";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const useCart = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      const response = await CartService.getCartItemByEmail(user?.email);
      
      return response.data;
    },
  });
  return [cart, refetch];
};

export default useCart;
