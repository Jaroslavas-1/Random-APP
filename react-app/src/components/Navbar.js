import React from "react";
import { Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";

const MyNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" className="padding-20-desk-10-mob">
      <Navbar.Brand>
        <img src={logo} className="logo" />
      </Navbar.Brand>
    </Navbar>
  );
};

export default MyNavbar;
