import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { dataActions } from "../../Redux/Actions";
import phoneImg from "../../Images/phone.jpg";
import alertify from "alertifyjs";
import db from "../../firebase";
import "./Cart.scss";

const Cart = () => {
  const [discount, setDiscount] = useState(0);
  const [inpValue, setInpValue] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const discountCode = "123";

  const currentUser = useSelector((state) => state.dataReducer.currentUser);
  const cart = useSelector((state) => state.cartReducer.cart);

  const total = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  const goTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const applyDiscount = (e) => {
    e.preventDefault();
    console.log("geldi");
    if (inpValue !== " " && inpValue.length && inpValue === discountCode) {
      setDiscount(10);
      alertify.success("Discount applied successfully.", 1);
      setInpValue("");
    } else {
      alertify.error("No discount code found.", 1);
    }
  };

  const { signOut } = bindActionCreators(dataActions, dispatch);

  const addToCart = (product, user) => {
    let findItem = cart.filter((item) => item.name === product.name);
    if (findItem.length) {
      db.collection(`${user.email}-Cart`)
        .doc(findItem[findItem.length - 1].id)
        .set({
          ...product,
          quantity: findItem[findItem.length - 1].quantity + 1,
        });
    } else {
      db.collection(`${user.email}-Cart`).add({
        ...product,
        quantity: 1,
      });
    }
  };

  const removeOneItemFromCart = (product, user) => {
    let findItem = cart.find((item) => item.name === product.name);
    if (findItem?.quantity > 1) {
      db.collection(`${user.email}-Cart`)
        .doc(findItem.id)
        .set({
          ...findItem,
          quantity: findItem.quantity - 1,
        });
    } else {
      db.collection(`${user.email}-Cart`).doc(findItem.id).delete();
      alertify.error(`${findItem.name} removed from cart.`, 1);
    }
  };

  const removeFromCart = (product, user) => {
    let findItem = cart.find((item) => item.name === product.name);
    db.collection(`${user.email}-Cart`).doc(findItem.id).delete();
    alertify.error(`${findItem.name} removed from cart`, 1);
  };

  if (currentUser) {
    return (
      <>
        <div className="cart-container">
          <div className="top-btn" onClick={goTop}>
            <i className="bi bi-arrow-up"></i>
          </div>
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
          <div className="flex">
            {cart?.length ? (
              <>
                <div className="cart">
                  <div className="title">
                    <h3>Shopping Cart</h3>
                    <p>items in your cart</p>
                  </div>

                  <table>
                    <tbody>
                      <tr className="tbody-title">
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th></th>
                      </tr>

                      {cart?.map((product, i) => (
                        <tr className="line" key={i}>
                          <td className="about">
                            <img src={product.link} alt="" />
                            <p>{product.name}</p>
                          </td>
                          <td>
                            <div className="btns">
                              <button
                                onClick={() =>
                                  removeOneItemFromCart(product, currentUser)
                                }
                              >
                                <b>-</b>
                              </button>
                              <span>{product.quantity}</span>
                              <button
                                onClick={() => addToCart(product, currentUser)}
                              >
                                <b>+</b>
                              </button>
                            </div>
                          </td>
                          <td className="price">
                            <p>
                              {product.quantity * product.price}
                              <i className="bi bi-currency-dollar"></i>
                            </p>
                          </td>
                          <td>
                            <div className="right-btns">
                              <button
                                onClick={() =>
                                  removeFromCart(product, currentUser)
                                }
                              >
                                Remove
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4">
                          <button onClick={() => history.push("/products")}>
                            <i className="bi bi-chevron-left"></i>
                            Continue Shopping
                          </button>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="coupon-total">
                  <div className="coupon">
                    <form action="" onSubmit={applyDiscount}>
                      <p>Have a Coupon ?</p>
                      <input
                        type="text"
                        value={inpValue}
                        onChange={(e) => setInpValue(e.target.value)}
                      />
                      <button type="submit">Apply</button>
                    </form>
                  </div>
                  <div className="total">
                    <p>
                      Total Price : {total}
                      <i className="bi bi-currency-dollar"></i>
                    </p>
                    <p>
                      Discount : {discount}
                      <i className="bi bi-percent"></i>{" "}
                    </p>
                    <p>
                      Total : {total - total / (discount > 0 ? discount : 1)}
                      <i className="bi bi-currency-dollar"></i>
                    </p>
                    <div className="total-select">
                      <button>
                        Make Purchase &nbsp;
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <h3 className="empty-cart">Empty Cart</h3>
            )}
          </div>
        </div>
        <p className="very-small">
          Our site does not support this screen size
          <h4>Turn your phone</h4>
          <img src={phoneImg} alt="" />
        </p>
      </>
    );
  } else {
    history.push("/");
    return <></>;
  }
};

export default Cart;
