import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import phoneImg from "../../Images/phone.jpg";
import "./Contact.scss";

const Contact = () => {
  const currentUser = useSelector((state) => state.dataReducer.currentUser);
  const history = useHistory();
  const receiveMail = "emreyoleri01@gmail.com";
  if (!currentUser) history.push("/");
  const [message, setMessage] = useState("");
  
  const goTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      <div className="contact-container">
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
        <div className="contact">
          <div className="contact-information">
            <div className="phone-num">
              <i className="bi bi-telephone-fill"></i>
              <div>
                <p>Call us directly at</p>
                <p className="num">+353 1 475 4492</p>
              </div>
            </div>
            <div className="email">
              <i className="bi bi-chat-dots-fill"></i>
              <p>Send us a message from this mail</p>
              <p className="email-address">{receiveMail}</p>
            </div>
          </div>
          <div className="contact-form">
            <h3>Read Description</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
              eveniet. Debitis quos assumenda accusantium aspernatur, tempora
              repudiandae quibusdam? Itaque, quas!
            </p>
            <form action="https://formspree.io/f/mwkarjlg" method="POST">
              <div value={receiveMail} name="_replyto" />
              {/* For FormSpree */}
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Send Your Message"
              ></textarea>
              <button type="submit" value="send">
                Send to Message
              </button>
            </form>
          </div>
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

export default Contact;
