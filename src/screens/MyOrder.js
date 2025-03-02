import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  const email = localStorage.getItem('userEmail'); // Replace this with the actual user email from auth context or props

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/myOrderData/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrderData(data.order_data);
      } catch (error) {
        alert(error);
      }
    };

    fetchOrders();
  }, [email]);

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h2 className="text-center mb-4">My Orders</h2>
        {orderData.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Order ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.name}</td>
                    <td>{order.qty}</td>
                    <td>{order.price}</td>
                    <td>{order.size}</td>
                    <td>{order.Order_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center">No orders found.</p>
        )}
      </div>
      <Footer />
    </>
  );
}


