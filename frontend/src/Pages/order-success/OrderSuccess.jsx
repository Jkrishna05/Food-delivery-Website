import { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { datacontext } from "../../Components/context/Storecontext";

const OrderSuccess = () => {
  const { contextValue } = useContext(datacontext);
  const { url, token } = contextValue;
  const params = new URLSearchParams(useLocation().search);
  const orderId = params.get("orderId");
  const session_id = params.get("session_id");

  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    const verify = async () => {
      const res = await fetch(`${url}/api/order/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId, session_id }),
      });

      const data = await res.json();
      if (data.paid) {
        setMessage("🎉 Payment successful! Order placed.");
      } else {
        setMessage("⏳ Payment pending...");
      }
    };
    if (token) {
      verify();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-green-600">Order Status</h1>
      <p className="mt-4 text-lg">{message}</p>
      <a href="/" className="mt-6 bg-green-600 text-white px-6 py-2 rounded">
        Go Home
      </a>
    </div>
  );
};

export default OrderSuccess;
