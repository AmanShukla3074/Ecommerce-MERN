import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './YourOrder.css';
import axios from 'axios'

const YourOrder = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        
        const response =await axios.get(`${process.env.REACT_APP_BACKEND_API}/api/orders/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        const sortedOrders = response.data.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        setOrders(sortedOrders);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="orders-container">
      <p className='orders-header'>Your Orders</p>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div 
            key={order._id} 
            className="order-card" 
            onClick={() => navigate(`/order/${order._id}`)}
          >
            <div className="order-header">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.orderStatus}</p>
            </div>
            <div className="order-details">
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
              <p><strong>Total Items:</strong> {order.totalItem}</p>
              <p><strong>Total Price:</strong> ₹{order.totalPrice - order.discount}</p>
              <p><strong>Payment Status:</strong> {order.paymentDetails.paymentStatus}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default YourOrder;