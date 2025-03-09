import { useEffect, useState, useRef } from "react";
import OrderService from "../../services/order.service";
import Swal from "sweetalert2";
import { MdDelete, MdVisibility } from "react-icons/md";
import OrderDetail from "../../components/OrderDetail";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderService.getAllOrders();
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    if (selectedOrder && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [selectedOrder]);

  const handleStatusChange = async (orderId, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the order status to "${newStatus}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await OrderService.updateOrderDetail(orderId, {
            deliver_status: newStatus,
          });
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === orderId
                ? { ...order, deliver_status: newStatus }
                : order
            )
          );
          Swal.fire(
            "Updated!",
            "The order status has been updated.",
            "success"
          );
        } catch (error) {
          console.error("Error updating order status:", error);
          Swal.fire("Error!", "Failed to update the order status.", "error");
        }
      }
    });
  };

  const handleDeleteOrder = async (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await OrderService.deleteOrder(orderId);
          setOrders((prevOrders) =>
            prevOrders.filter((order) => order._id !== orderId)
          );
          Swal.fire("Deleted!", "The order has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting order:", error);
          Swal.fire("Error!", "Failed to delete the order.", "error");
        }
      }
    });
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Orders</h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-maroon-700 text-white">
              <th className="p-3 border text-black">OrderId</th>
              <th className="p-3 border text-black">Email</th>
              <th className="p-3 border text-black">Total</th>
              <th className="p-3 border text-black">Payment Status</th>
              <th className="p-3 border text-black">Delivery Status</th>
              <th className="p-3 border text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-3">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="text-center">
                  <td className="p-3 border">
                    {order._id.slice(0, 3)} ... {order._id.slice(-3)}
                  </td>
                  <td className="p-3 border">{order.shipping.email}</td>
                  <td className="p-3 border">
                    {new Intl.NumberFormat("th-TH", {
                      style: "currency",
                      currency: "THB",
                      minimumFractionDigits: 2,
                    }).format((order.total / 100).toFixed(2))}
                  </td>
                  <td className="p-3 border">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        order.payment_status === "paid"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.payment_status === "paid" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  <td className="p-3 border">
                    <select
                      className="border p-2 rounded"
                      value={order.deliver_status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="p-3 border flex justify-center space-x-2">
                    <button
                      className="bg-green-500 text-white p-2 rounded-full"
                      title="View Details"
                      onClick={() => openOrderDetails(order)}
                    >
                      <MdVisibility size={20} />
                    </button>
                    <button
                      className="bg-red text-white p-2 rounded-full"
                      title="Delete Order"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <OrderDetail ref={modalRef} order={selectedOrder} />
    </div>
  );
};

export default ManageOrders;
