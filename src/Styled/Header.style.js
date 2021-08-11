import styled from "styled-components";

export const Header = styled.div`
  height: 780px;
  width: 100%;
  background: url("https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-size: cover;
  color: ${(props) => props.bgColor};
  background-attachment: fixed;
`;

export const Filter = styled.div`
  width: 100%;
  height: 780px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Navbar = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 114px;
  font-family: "Poppins", sans-serif;
  box-shadow: 0px 0px 30px black;

  @media only screen and (max-width: 1300px) {
    flex-direction: column;
    height: auto;
  }
`;

export const Logo = styled.div`
  margin-left: 10%;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media only screen and (max-width: 1300px) {
    margin-left: 0;
    margin-top: 30px;
    margin-bottom: 10px;
  }
`;

export const Items = styled.ul`
  width: 40%;
  display: flex;
  justify-content: space-evenly;
  list-style-type: none;

  @media only screen and (max-width: 1300px) {
    padding: 10px 0 0 0;
    width: 100%;
  }
`;

export const Item = styled.li`
  & .link {
    display: block;
    padding: 10px;
    text-decoration: none;
    color: white;
    transition: 0.8s ease all;
    cursor: pointer;
    border-radius: 7px;
    text-align: center;
  }

  & .last-link {
    width: auto;
  }

  &:hover .link {
    background-color: white;
    color: black;
  }

  &:last-child:hover .link {
    background-color: rgba(0, 0, 0, 0);
    color: white;
  }

  @media only screen and (max-width: 1300px) {
    margin-left: 5px;
    margin-bottom: 10px;
  }
`;

export const Container__1 = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Little__Container__1 = styled.div`
  width: 600px;
  height: auto;
  padding: 20px;
  text-align: center;

  & h1 {
    font-size: ${(props) => props.H1size};
    display: block;
    margin-bottom: 30px;
    font-family: "Montserrat", sans-serif;
  }

  & p {
    font-size: ${(props) => props.PSize};
    display: block;
    margin-bottom: 20px;
  }

  @media only screen and (max-width: 1300px) {
    width: 100%;

    & h1 {
      font-size: 40px;
    }
  }

  @media only screen and(max-width:600px) {
    & h1 {
      font-size: 30px;
    }

    & p {
      font-size: 15px;
    }
  }
`;

export const Btns = styled.div`
  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Btn__1 = styled.button`
  border: none;
  width: 187px;
  height: 48px;
  background: ${(props) => props.bgColor};
  border-radius: 37px;
  color: white;
  cursor: pointer;
  transition: 0.8s ease all;

  &:hover {
    background-color: white;
    color: ${(props) => props.bgColor};
  }
`;

export const Btn__2 = styled.button`
  width: 187px;
  height: 48px;
  background: none;
  border-radius: 37px;
  color: white;
  margin-left: 10px;
  border: 1px solid white;
  cursor: pointer;
  transition: 0.8s ease all;

  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: black;
  }

  @media only screen and (max-width: 600px) {
    margin-top: 10px;
    margin-left: 0;
  }
`;
