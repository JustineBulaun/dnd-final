import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { shopProducts } from "../utilities/product";
import { addOrder } from "../firebase";

// Eto po yung order page namen.
const OrderPage = () => {
  const productId = useParams().productId;
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [fullAddress, setFullAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    const orderData = {
      productId,
      phoneNumber,
      fullName,
      fullAddress,
      paymentMethod,
    };
    await addOrder(orderData);
    alert("Order Placed");
    navigate("/");
  };

  const product = shopProducts.find((p) => p.productId == productId);
  useEffect(() => {
    const product = shopProducts.find((p) => p.productId == productId);
    if (!product) navigate("/");
  }, []);

  return (
    <div className="order-form-container">
      <h2>I'm Buying</h2>
      {product.productName} - ₱{product.productPrice}
      <br />
      <br />
      <h2>Order Form Details</h2>
      <form onSubmit={handlePlaceOrder}>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Full Address:</label>
          <textarea
            value={fullAddress}
            onChange={(e) => setFullAddress(e.target.value)}
          ></textarea>
        </div>{" "}
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Payment Method: </label>
          <div className="payment-methods">
            <label>
              <input
                type="radio"
                value="cashOnDelivery"
                checked={paymentMethod === "cashOnDelivery"}
                onChange={() => handlePaymentMethodChange("cashOnDelivery")}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                value="gcash"
                checked={paymentMethod === "gcash"}
                onChange={() => handlePaymentMethodChange("gcash")}
                disabled
              />
              GCash
            </label>
            <label>
              <input
                type="radio"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => handlePaymentMethodChange("bank")}
                disabled
              />
              Bank
            </label>
          </div>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderPage;
