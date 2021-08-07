import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { cartActions } from "../Redux/Actions";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
import db from "../firebase";
import "./Home.scss";

const Home = () => {
  const [clients] = useCollectionData(
    db.collection("clients").orderBy("time", "desc").limit(3)
  );

  const currentUser = useSelector((state) => state.dataReducer.currentUser);
  const [cart] = useCollectionData(db.collection(`${currentUser?.email}-Cart`));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const products = [
    {
      name: "MacBook",
      price: 2000,
      link: "https://images.pexels.com/photos/7057/desk-office-computer-imac.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },

    {
      name: "MacBook Air",
      price: 3000,
      link: "https://images.pexels.com/photos/326502/pexels-photo-326502.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },

    {
      name: "MacBook Pro",
      price: 3500,
      link: "https://images.pexels.com/photos/265144/pexels-photo-265144.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },

    {
      name: "MackBook Air Pro",
      price: 4500,
      link: "https://images.pexels.com/photos/92904/pexels-photo-92904.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },

    {
      name: "MacBook X",
      price: 4500,
      link: "https://images.pexels.com/photos/912388/pexels-photo-912388.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },

    {
      name: "MackBook XS",
      price: 7000,
      link: "https://images.pexels.com/photos/2349209/pexels-photo-2349209.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  ];

  const person = [
    "https://images.pexels.com/photos/3772510/pexels-photo-3772510.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.pexels.com/photos/1382734/pexels-photo-1382734.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  ];
  const peopleName = ["Sarah Taylor", "Emiliano Melo", "Marry Less"];
  const lorem =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores modi est error culpa, obcaecati veniam sequi provident in. Voluptatem";

  const dispatch = useDispatch();

  const { addToCart } = bindActionCreators(cartActions, dispatch);
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
  const addProductToCart = (product, user, cart) => {
    addToCart(product, user, cart);
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
                  <Link to="/" className="link">
                    Products
                  </Link>
                </li>
                <li className="item">
                  <Link to="/" className="link">
                    About Us
                  </Link>
                </li>
                <li className="item">
                  <Link to="/" className="link">
                    Contact
                  </Link>
                </li>
                <li className="item">
                  <Link to={currentUser ? "/cart" : "/signin"} className="link">
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
                    <figcaption>
                      {product.name} &nbsp; - &nbsp; {product.price} $
                    </figcaption>
                  </figure>
                  <button
                    onClick={() => addProductToCart(product, currentUser, cart)}
                  >
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
                <img src={people} alt={peopleName[i]} height="500" />
                <div className="article">
                  <figure>
                    <figcaption>{peopleName[i]}</figcaption>
                    <figcaption className="rank">Ceo</figcaption>
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
    </>
  );
};

export default Home;
