import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import alertify from "alertifyjs";
import Api from "../../Api";
import db from "../../firebase";
import "./Products.scss";

const Products = () => {
  const history = useHistory();
  const products = Api.products;
  const currentUser = useSelector((state) => state.dataReducer.currentUser);
  if (!currentUser) history.push("/");
  const cart = useSelector((state) => state.cartReducer.cart);

  const goTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

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
      alertify.success(`${product.name} added to cart once again.`, 1);
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

  return (
    <>
      <div className="products-container">
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
              <Link to="/products" className="link">
                Products
              </Link>
            </li>
            <li className="item">
              <Link to="/about" className="link">
                About Us
              </Link>
            </li>
            <li className="item">
              <Link to="/contact" className="link">
                Contact
              </Link>
            </li>
            <li className="item">
              <Link to="/cart" className="link">
                <i className="bi bi-cart3"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="products">
          {products.map((item) => (
            <div className="product" key={item.name}>
              <figure>
                <img src={item.link} alt="" width="350" />
                <figcaption>{item.name}</figcaption>
                <figcaption>
                  {item.price} <i className="bi bi-currency-dollar"></i>
                </figcaption>
              </figure>

              {cart.find((cartItem) => cartItem.name === item.name) ? (
                <div className="btns">
                  <button
                    onClick={() => removeOneItemFromCart(item, currentUser)}
                  >
                    -
                  </button>
                  <div className="quantity">
                    {
                      cart.find((cartItem) => cartItem.name === item.name)
                        .quantity
                    }
                  </div>
                  <button onClick={() => addToCart(item, currentUser)}>
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="noselect"
                  onClick={() => addToCart(item, currentUser)}
                >
                  <span className="text">Add To Cart</span>
                  <span className="icon">
                    <i className="bi bi-bag-plus-fill"></i>
                  </span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
