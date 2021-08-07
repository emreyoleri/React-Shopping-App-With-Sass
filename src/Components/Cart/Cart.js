import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import db from "../../firebase";
import { cartActions, dataActions } from "../../Redux/Actions";
import "./Cart.scss";

const Cart = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { addToCart, removeFromCart, removeOneItemFromCart } =
    bindActionCreators(cartActions, dispatch);
  const currentUser = useSelector((state) => state.dataReducer.currentUser);
  const { signOut } = bindActionCreators(dataActions, dispatch);

  const [cart] = useCollectionData(
    db.collection(`${currentUser?.email}-Cart`).orderBy("addedAt", "asc")
  );

  if (currentUser) {
    return (
      <>
        <div className="cart-container">
          <div className="navbar">
            <div className="logo">
              <h2>Carure</h2>
            </div>
            <ul className="items">
              <li className="item">
                <Link to="/" className="link">
                  Home
                </Link>
              </li>

              <li className="item">
                <div className="link">
                  <i className="bi bi-person-circle"></i> &nbsp;
                  {currentUser.email}
                </div>
              </li>

              <li className="item">
                <button className="link" onClick={() => signOut(currentUser)}>
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
          {cart?.length ? (
            <div className="cart">
              <div className="title">
                <h3>Shopping Cart</h3>
                <p>items in your cart</p>
              </div>

              <table>
                <tbody>
                  <tr>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <td></td>
                  </tr>

                  {cart?.map((product, i) => (
                    <tr className="line" key={i}>
                      <td className="about">
                        <img src={product.link} alt="" height="60" />
                        <p>{product.name}</p>
                      </td>
                      <td className="btns">
                        <button
                          onClick={() =>
                            removeOneItemFromCart(product, currentUser, cart)
                          }
                        >
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          onClick={() => addToCart(product, currentUser, cart)}
                        >
                          +
                        </button>
                      </td>
                      <td className="price">
                        <p>{product.quantity * product.price} $</p>
                      </td>
                      <td className="right-btns">
                        <button>
                          <i className="bi bi-suit-heart-fill"></i>
                        </button>
                        <button
                          onClick={() =>
                            removeFromCart(product.id, currentUser, cart)
                          }
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot></tfoot>
              </table>
              {/*  <div className="total">
                  <p>Total Price : </p>
                </div> */}
            </div>
          ) : (
            <h3 className="empty-cart">Empty Cart</h3>
          )}
        </div>
      </>
    );
  } else {
    history.push("/");
    return <></>;
  }
};

export default Cart;
