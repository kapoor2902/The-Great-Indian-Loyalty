import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";
import Navbar from "./Navbar";
function Address() {
  const [{}, dispatch] = useStateValue();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [flat, setFlat] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const navigate = useNavigate();

  const deliver = (e) => {
    e.preventDefault();
    const finaladdress = area + " " + city + " " + state;
    const fa = encodeURIComponent(finaladdress);
    console.log(finaladdress);
    const axios = require("axios");
    const params = {
      access_key: "5c80365848117ff16fd1729fa6f60484",
      query: finaladdress,
    };

    // axios
    //   .get("http://api.positionstack.com/v1/forward", { params })
    //   .then((response) => {
    //     dispatch({
    //       type: "SET_ADDRESS",
    //       item: {
    //         fullName,
    //         phone,
    //         flat,
    //         area,
    //         city,
    //         state,
    //         latitude: response.data.data[0].latitude,
    //         longitude: response.data.data[0].longitude,
    //       },
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

      axios
      .get(`https://api.tomtom.com/search/2/geocode/${fa}.json?key=OEztYg601CLK7aTnBRnf33Je4f9USz89`)
      .then((response) => {
        console.log("HELLO");
        console.log(response.data.results[0].position.lat);
        console.log(response.data.results[0].position.lon);
        dispatch({
          type: "SET_ADDRESS",
          item: {
            fullName,
            phone,
            flat,
            area,
            city,
            state,
            latitude: response.data.results[0].position.lat,
            longitude: response.data.results[0].position.lon,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });


    navigate("/payment");
  };

  return (
    <Container>
      <Navbar />
      <Main>
        <FormContainer>
          <InputContainer>
            <p>Full Name</p>
            <input
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="John Smith"
              value={fullName}
            />
          </InputContainer>
          <InputContainer>
            <p>Phone Number</p>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </InputContainer>
          <InputContainer>
            <p>Flat, House no. Building, Company</p>
            <input
              type="text"
              onChange={(e) => setFlat(e.target.value)}
              value={flat}
            />
          </InputContainer>
          <InputContainer>
            <p>Area, Colony, Street</p>
            <input
              type="text"
              onChange={(e) => setArea(e.target.value)}
              value={area}
            />
          </InputContainer>
          <InputContainer>
            <p>Landmark</p>
            <input
              type="text"
              onChange={(e) => setLandmark(e.target.value)}
              value={landmark}
              x
            />
          </InputContainer>
          <InputContainer>
            <p>Town/City</p>
            <input
              type="text"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
          </InputContainer>
          <InputContainer>
            <p>State/Province</p>
            <input
              type="text"
              onChange={(e) => setState(e.target.value)}
              value={state}
            />
          </InputContainer>

          <button onClick={deliver}>Deliver to this Address</button>
        </FormContainer>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: fit-content;
  max-width: 1400px;

  margin: auto;
  background-color: rgb(234, 237, 237);

  position: relative;
`;

const Main = styled.div`
  padding: 15px;
`;

const FormContainer = styled.form`
  border: 1px solid lightgray;
  width: 55%;
  min-width: 400px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background-color: #fff;
  margin: auto;

  button {
    align-self: flex-start;
    height: 33px;
    width: 250px;
    margin-top: 20px;
    background-color: #ffa32a;
    border: none;
    outline: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const InputContainer = styled.div`
  width: 100%;
  padding: 10px;

  p {
    font-size: 14px;
    font-weight: 600;
  }

  input {
    width: 95%;
    height: 33px;
    padding-left: 5px;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5px;

    &:hover {
      border: 1px solid orange;
    }
  }
`;
export default Address;
