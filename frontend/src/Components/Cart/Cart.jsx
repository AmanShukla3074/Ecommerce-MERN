import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
} from "../../features/cart/cartSlice";
import "./Cart.css";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, totalItems, discount, status, error } =
    useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleAddItem = (itemData) => {
    dispatch(addItemToCart(itemData));
  };

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
                <p className="cart-item-details-title">
                  {item.product.title}
                </p>
              )}
              <p className="cart-item-details-size">Size: {item.size}</p>
              <p className="cart-item-details-price">
                Price: ${item.discountedPrice}
              </p>
              <div className="cart-item-actions">
                <CiCircleMinus
                  onClick={() =>
                    handleUpdateItem(item._id, item.quantity - 1)
                  }
                  className="cart-item-icons"
                  style={{ cursor: item.quantity > 1 ? 'pointer' : 'not-allowed' }}
                  disabled={item.quantity <= 1}
                />
                <p className="cart-item-icons">{item.quantity}</p>
                <CiCirclePlus
                  onClick={() =>
                    handleUpdateItem(item._id, item.quantity + 1)
                  }
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
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ${totalPrice}</p>
        <p>Discount: ${discount}</p>
        <p>Total Payable: ${totalPrice - discount}</p>
      </div>
    </div>
  );
};

export default Cart;