import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const OrderSuccess = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const orderId = params.get("orderId");

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Checking payment status...");

  const fetchOrderStatus = async () => {
    try {
      const token = localStorage.getItem("token"); // assuming you store JWT
      const res = await fetch("http://localhost:3000/api/order/userorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ userId: localStorage.getItem("userId") })
      });

      const data = await res.json();

      if (data.success) {
        const order = data.order.find(o => o._id === orderId);
        if (order) {
          if (order.payment) {
            setStatus("paid");
            setMessage("✅ Payment confirmed! Your order is placed.");
          } else {
            setStatus("pending");
            setMessage("⏳ Waiting for payment confirmation...");
          }
        } else {
          setStatus("notfound");
          setMessage("⚠️ Order not found.");
        }
      } else {
        setStatus("error");
        setMessage("❌ Failed to fetch order status.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("❌ Something went wrong.");
    }
  };

  useEffect(() => {
    fetchOrderStatus();

    // poll every 5s until payment is confirmed
    const interval = setInterval(() => {
      if (status !== "paid" && status !== "error" && status !== "notfound") {
        fetchOrderStatus();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [orderId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Order Status</h1>
      <p className="text-lg">{message}</p>

      {status === "paid" && (
        <a
          href="/"
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Back to Home
        </a>
      )}
    </div>
  );
};

export default OrderSuccess;
