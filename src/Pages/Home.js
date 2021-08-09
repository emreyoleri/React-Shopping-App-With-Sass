import React, { useState, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { cartActions } from "../Redux/Actions";
import phoneImg from "../Images/phone.jpg";
import alertify from "alertifyjs";
import db from "../firebase";
import Api from "../Api";
import "./Home.scss";

const Home = () => {
  let cart = [];
  const [clients] = useCollectionData(
    db.collection("clients").orderBy("time", "desc").limit(3)
  );
  const history = useHistory();

  const currentUser = useSelector((state) => state.dataReducer.currentUser);
  if (!currentUser) history.push("/signin");

  const dispatch = useDispatch();
  const { getCart } = bindActionCreators(cartActions, dispatch);

  useEffect(() => {
    let newCart = [];
    db.collection(`${currentUser?.email}-Cart`).onSnapshot((snap) => {
      if (snap?.docs?.length) {
        newCart = [];
        snap.docs.map((doc, i) => {
          newCart.push({
            ...doc.data(),
            id: doc.id,
          });
          if (i === snap.docs.length - 1) {
            cart = [...newCart];
            getCart([...newCart]);
          }
          return;
        });
      } else {
        getCart([]);
      }
    });
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const products = Api.products.filter((item, i) => i < 6);
  const person = Api.person;
  const lorem =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi est error culpa, obcaecati veniam sequi provident in. Voluptatem";

  const goTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const sendClient = async (e) => {
    e.preventDefault();
    if (
      name !== " " &&
      name.length &&
      email !== " " &&
      email.length &&
      message !== " " &&
      message.length
    ) {
      const date = new Date();
      var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      let newClient = {
        sender: name,
        message,
        sendedAt: `${date.getDate()} ${
          months[Number(date.getMonth())]
        } ${date.getFullYear()}`,
        time: date.getTime(),
      };

      await db.collection("clients").add(newClient);
      alertify.success(`${name}Thank you from you comment`, 1);

      setName("");
      setEmail("");
      setMessage("");
    } else {
      alertify.warning("Please fill in all the blanks", 1);
    }
  };
  const addToCart = async (product, user) => {
    let findItem = cart.filter((item) => item.name === product.name);
    if (findItem.length) {
      await db
        .collection(`${user.email}-Cart`)
        .doc(findItem[findItem.length - 1].id)
        .set({
          ...product,
          quantity: findItem[findItem.length - 1].quantity + 1,
        });
    } else {
      await db.collection(`${user.email}-Cart`).add({
        ...product,
        quantity: 1,
      });
    }
    alertify.success(`${product.name} added to cart.`, 1);
  };

  return (
    <>
      <div className="container">
        <div className="top-btn" onClick={goTop}>
          <i className="bi bi-arrow-up"></i>
        </div>

        <div className="Header">
          <div className="filter">
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
            <div className="Container-1">
              <div className="little-Container-1">
                <h1>We Take Care of the Fature</h1>
                <p>
                  We know how large objects will act. but things on a small
                  scale just do not act that way
                </p>
                <div className="btns">
                  <button className="btn-1">Get Quote Now</button>
                  <button className="btn-2">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="Fetures-3" id="Fetures-3">
          <div className="article">
            <h1>Why Choose Us</h1>
            <p>
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics
            </p>
          </div>
          <div className="boxes">
            <div className="box">
              <div className="header">
                <i className="bi bi-briefcase"></i> Business
              </div>
              <div className="text">{lorem}</div>
            </div>

            <div className="box">
              <div className="header">
                <i className="bi bi-shop"></i>
                Dijital Marketing
              </div>
              <div className="text">{lorem}</div>
            </div>

            <div className="box">
              <div className="header">
                <i className="bi bi-book-half"></i> Business Growing
              </div>
              <div className="text">{lorem}</div>
            </div>

            <div className="box">
              <div className="header">
                <i className="bi bi-people"></i> National top 50 firms
              </div>
              <div className="text">{lorem}</div>
            </div>

            <div className="box">
              <div className="header">
                <i className="bi bi-bar-chart-fill"></i> National top 50 firms
              </div>
              <div className="text">{lorem}</div>
            </div>

            <div className="box">
              <div className="header">
                <i className="bi bi-award"></i> Web Development
              </div>
              <div className="text">{lorem}</div>
            </div>
          </div>
        </div>
        <hr />

        <div className="Features-11" id="Features-11">
          <div className="first">
            <div className="text">
              <h1>Recently preferred products</h1>
              <p>
                The following products are just a few of the products that users
                buy the most. You can go to our products page to see them all.
              </p>
            </div>
          </div>

          <div className="second">
            <div className="products">
              {products.map((product, i) => (
                <div className="product" key={i}>
                  <figure>
                    <img src={product.link} alt={product.name} />
                    <figcaption>{product.name} &nbsp;</figcaption>
                    <figcaption>- &nbsp; {product.price} $ </figcaption>
                  </figure>
                  <button onClick={() => addToCart(product, currentUser)}>
                    Add to <i className="bi bi-cart4"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr />
        <div className="Testimonials-1">
          <div className="text">
            <h1>What Clients Say</h1>
            <p>
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics
            </p>
          </div>
          <div className="clients">
            {clients?.length ? (
              clients.map((client, i) => (
                <div className="client" key={i}>
                  <p>{client.message}</p>
                  <i className="bi bi-person-circle"></i>
                  <p className="sender">{client.sender}</p>
                  <span>{client.sendedAt}</span>
                </div>
              ))
            ) : (
              <h2 className="no-clients">No comments have been made before.</h2>
            )}
          </div>
        </div>
        <hr />

        <div className="Team-1">
          <div className="text">
            <h1>Meet Our Team</h1>
            <p>
              Problems trying to resolve the conflict between the two major
              realms of Classical physics: Newtonian mechanics
            </p>
          </div>
          <div className="people">
            {person.map((people, i) => (
              <div className="person" key={i}>
                <img src={people.photo} alt={people.name} height="500" />
                <div className="article">
                  <figure>
                    <figcaption>{people.name}</figcaption>
                    <figcaption className="rank">{people.rank}</figcaption>
                  </figure>
                  <div className="icons">
                    <i className="bi bi-facebook"></i>
                    <i className="bi bi-twitter"></i>
                    <i className="bi bi-instagram"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <hr />
        <div className="Contact-1" id="Contact-1">
          <div className="Contact-Filter">
            <div className="text">
              <h4>Contact Us </h4>
              <h1>Make an Appointment</h1>
            </div>
            <form action="" className="form" onSubmit={(e) => sendClient(e)}>
              <div className="inputs">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button type="submit">Send to Client</button>
            </form>
          </div>
        </div>
        <div className="Contact-Bottom">
          <div className="text">
            <h2>Consulting Agency For Your Business</h2>
            <p>the quick fox jumps over the lazy dog</p>
          </div>

          <button>Contact Us</button>
        </div>
        <hr />
        <div className="Footer-6">
          <div className="footbar">
            <h4>Carure</h4>
            <div className="icons">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-twitter"></i>
              <i className="bi bi-youtube"></i>
            </div>
          </div>

          <div className="links">
            <ul className="link">
              <li>
                <h4>Company</h4>
              </li>
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>

            <ul className="link">
              <li>
                <h4>Legal</h4>
              </li>
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>

            <ul className="link">
              <li>
                <h4>Features</h4>
              </li>
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>

            <ul className="link">
              <li>
                <h4>Resources</h4>
              </li>
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>
          </div>
        </div>
        <div className="Footer-Bottom">
          <p>Made With Love By Figmaland All Right Reserved </p>
        </div>
      </div>
      <p className="very-small">
        Our site does not support this screen size
        <h4>Turn your phone</h4>
        <img src={phoneImg} alt="" />
      </p>
    </>
  );
};

export default Home;
