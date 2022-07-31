import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Address from "./Components/Address";
import Checkout from "./Components/Checkout";
import App2 from "./Components/App2";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Payment from "./Components/Payment";
import SignUp from "./Components/SignUp";
import Profile from "./Components/Profile";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AddProduct from "./Components/AddProduct";
import Orders from "./Components/Orders";
import DeliveryGuy from "./Components/DeliveryGuy";
import Status from "./Components/Status";
const promise = loadStripe(
  "pk_test_51KUDBXSE1AGsrDtwyXK8vcHYNkEOofJAP1vV1fRlpZNo93g4o80dZe4IvhAkBXo2ytDciCqqpynwQUXv7plCjezF00G9zyj4sc"
);

function App() {
  const [lat, setlat] = useState(null);
  const [long, setlong] = useState(null);

  useEffect(() => {
    const locate = async () => {
      await window.navigator.geolocation.getCurrentPosition((position) => {
        setlat(position.coords.latitude);
        setlong(position.coords.longitude);
      });
    };
    locate();
  }, []);
  console.log(lat);
  console.log(long);
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/status" element={<Status />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/address" element={<Address lat={lat} long={long} />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={promise}>
                <Payment lat={lat} long={long} />
              </Elements>
            }
          />
          <Route path="/scanner" element={<DeliveryGuy />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/app2" element={<App2 />} />
        </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
