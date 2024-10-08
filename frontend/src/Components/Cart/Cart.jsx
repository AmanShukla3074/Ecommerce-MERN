import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  updateCartItem,
  removeCartItem,
} from "../../features/cart/cartSlice";
import "./Cart.css";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalPrice, totalItems, discount, totalDiscountedPrice } =
    useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateItem = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(updateCartItem({ id, quantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeCartItem(id));
  };

  return (
    <div className="cart-container">
      <div className="cart-item-container">
        {items?.map((item) => (
          <div key={item._id} className="cart-item">
            {item.product?.imgUrls && (
              <div className="cart-item-img-container">
                <img
                  src={item.product.imgUrls[0]}
                  alt={item.product.title}
                  className="cart-item-img"
                />
              </div>
            )}
            <div className="cart-item-details">
              {item.product?.title && (
                <p className="cart-item-details-title">{item.product.title}</p>
              )}
              <p className="cart-item-details-size">Size: {item.size}</p>
              <span className="cart-product-discountedPrice">
                {"\u20B9"}
                {item.product.discountedPrice}
              </span>
              <span className="cart-product-price">
                {"\u20B9"}
                {item.product.price}
              </span>
              <span className="cart-product-discountPercent">{`(${item.product.discountPercent}% off)`}</span>
              <div className="cart-item-actions">
                <CiCircleMinus
                  onClick={() => handleUpdateItem(item._id, item.quantity - 1)}
                  className="cart-item-icons"
                  style={{
                    cursor: item.quantity > 1 ? "pointer" : "not-allowed",
                  }}
                  disabled={item.quantity <= 1}
                />
                <p className="cart-item-icons">{item.quantity}</p>
                <CiCirclePlus
                  onClick={() => handleUpdateItem(item._id, item.quantity + 1)}
                  className="cart-item-icons"
                />
                <MdDelete
                  onClick={() => handleRemoveItem(item._id)}
                  className="cart-item-icons"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-summery-price-info">
          <p>Total Items:</p>
          <p> {totalItems}</p>
        </div>
        <div className="cart-summery-price-info">
          <p>Total Price:</p>
          <p> ₹{totalPrice}</p>
        </div>
        <div className="cart-summery-price-info">
          <p>Discount:</p>
          <p> ₹{discount}</p>
        </div>
        <div className="cart-summery-price-info">
          <p>Total Payable:</p>
          <p> ₹{totalDiscountedPrice}</p>
        </div>
        <div
          className="create-order-payment-btn"
          onClick={() => {
            {
              if (items.length > 0) {
                navigate("/order");
              }
            }
          }}
        >
          Checkout
        </div>
      </div>
    </div>
  );
};

export default Cart;
