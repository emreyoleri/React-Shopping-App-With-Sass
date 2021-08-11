import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import phoneImg from "../../Images/phone.jpg";
import Api from "../../Api";
import "./About.scss";

const About = () => {
  const currentUser = useSelector((state) => state.dataReducer.currentUser);
  const person = Api.person;
  const history = useHistory();
  if (!currentUser) history.push("/");

  const goTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      <div className="about-container">
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
        <div className="our-mission">
          <h3>- Our Mission -</h3>
          <i>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique,
            quo.
          </i>
          <h3>About Us</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            modi ipsa nam aliquam! Quasi ratione aliquid at sint praesentium
            quo, et soluta, amet totam est, reiciendis eos odio nostrum illum
            delectus vel voluptatibus magni sed similique quam aspernatur
            facere. <u>Praesentium aliquam soluta rerum,</u> officiis molestias
            quidem delectus quam autem sint!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia id
            atque placeat laborum temporibus facilis reprehenderit impedit
            blanditiis, beatae numquam at omnis laboriosam consectetur repellat
            ratione
            <b>veritatis eaque dolores cumque vero mollitia! Omnis facilis</b>
            cum recusandae cupiditate, corporis quam quis eveniet veniam neque
            delectus reiciendis, iure voluptatem earum iste excepturi ad quod
            nemo aliquam velit asperiores eligendi doloremque. Ratione,
            asperiores recusandae vero corrupti, ex itaque earum maiores laborum
            dolorum, quod vel qui quae ab placeat!
            <b>
              Tempora, rerum consequuntur voluptatibus in eaque libero ex harum
              veritatis dignissimos,
            </b>
            molestiae nesciunt nam repellat. Deleniti labore itaque vitae
            veniam, dolores nesciunt architecto! Pariatur nulla libero quas
            perferendis corrupti tenetur ullam? Dolores velit ipsum aliquid sint
            dolorum quo odit ad recusandae pariatur nobis, dicta ullam,
            necessitatibus tenetur quidem? Tenetur nostrum quo similique, vitae
            dolores aliquid enim fuga itaque explicabo optio non suscipit
            corporis aut nesciunt{" "}
            <b>odit pariatur aspernatur iusto asperiores,</b>
            magnam illo obcaecati recusandae consequatur accusantium? Error vel
            suscipit atque quas? Iure et, enim neque cupiditate sunt corporis
            doloremque atque ad vitae. Eius magni quasi nam iusto! Quisquam quam
            quae eum amet deleniti animi molestias blanditiis architecto?
            Reprehenderit, eum? Dolor ratione hic corporis, quod quasi dolorum
            cupiditate sapiente cumque, saepe iste deleniti adipisci facere
            harum.
          </p>
          <div className="people">
            {person.map((people, i) => (
              <div className="person" key={i}>
                <img src={people.photo} alt={people.name} />
                <div className="article">
                  <figure>
                    <figcaption>{people.name}</figcaption>
                    <figcaption className="rank">{people.rank}</figcaption>
                  </figure>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab
                    neque, dolore quis minus nesciunt inventore vel officiis,
                    necessitatibus porro nisi incidunt illum voluptatum, placeat
                    magni consectetur vero? Ut, excepturi est?
                  </p>
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
      </div>
      <p className="very-small">
        Our site does not support this screen size
        <h4>Turn your phone</h4>
        <img src={phoneImg} alt="" />
      </p>
    </>
  );
};

export default About;
