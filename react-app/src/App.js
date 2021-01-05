import React from "react";
import MyNavbar from "./components/Navbar";
import BitcoinPrice from "./components/views/BitcoinPrice";
import { Container } from "react-bootstrap";
import "./index.css"

const App = () => {
  return (
    <div>
        <MyNavbar />
        <Container>
          <BitcoinPrice />
        </Container>
    </div>
  );
};

export default App;
