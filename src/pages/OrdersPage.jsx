import { useEffect, useState } from "react";
import {
  changeOrderStatus,
  deletOrder,
  getAllOrders,
} from "../firebase";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const columns = [
    "Order ID",
    "Full Name",
    "Email",
    "Phone Number",
    "Product ID",
    "Status",
    "Order Placed Date",
    "Actions",
  ];

  const handleChangeStatus = async (orderId, status) => {
    const newStatus = status === "pending" ? "On Delivery" : "pending";
    try {
      await changeOrderStatus(orderId, newStatus);
      setOrders(
        orders.map((order) => {
          if (order.id === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        })
      );
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
    console.log(res);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deletOrder(orderId);
      alert("Order Deleted");
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      alert("something went wrong");
    }
  };

  useEffect(() => {
    // if (authFB.currentUser?.uid !== "HKrsqsn37xPiB3o3N4svC3ahXR13") return;
    const fetchOrders = async () => {
      const res = await getAllOrders();
      setOrders(res);
      console.log(res)
      console.log(res)
      console.log(res)
      console.log(res)
      console.log(res)
    };
    fetchOrders();
  }, []);

  return (
    <div className="order-table"> 
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.fullName}</td>
              <td>{order.email}</td>
              <td>{order.phoneNumber}</td>
              <td>{order.productId}</td>
              <td>{order.status}</td>
              <td>
                {new Date(order.createdAt.toDate()).toLocaleString("en-US")}
              </td>
              <td
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => handleChangeStatus(order.id, order.status)}
                  className="btn"
                >
                  Change Status
                </button>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="btn btn-delete"
                  style={{ backgroundColor: "green" }}
                >
                  Complete Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
