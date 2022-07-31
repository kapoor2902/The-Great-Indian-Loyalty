import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";
import axios from "../axios";

import Navbar from "./Navbar";
import { UserData } from "./Data";
import Progress from "./Progress";
import { UserData1 } from "./Data2";
import "../css/Profile.css";


const Profile = () => {
  //states defined
  const [userData, setuserData] = useState({
    labels: UserData.map((dat) => dat.year),
    datasets: [
      {
        label: "User Gained",
        data: UserData.map((dat) => dat.userGain),
        backgroundColor: ["#2d3d53", "#fcaf17"],
      },
    ],
  });
  const [userData2, setuserData2] = useState({
    labels: UserData1.map((dat) => dat.year),
    datasets: [
      {
        label: "User Gained",
        data: UserData1.map((dat) => dat.userGain),
        backgroundColor: ["#2d3d53", "#fcaf17"],
      },
    ],
  });
  const [orders, setOrders] = useState([]);
  const [username, setusername] = useState("");
  const [userval, setUserval] = useState();

  //UseEffect
  useEffect(() => {
    axios
      .post("/orders/get", { email: userval?.email })
      .then((res) => setOrders(res.data));
  }, [userval]);

  //Other Functions
  const email = (id) => {
    setUserval(id);
    setusername(id.fullName);
  };

  //Calculating to total sum of orders
  const arr = orders;
  const price = arr.map((a) => a.price);
  var total = 0;
  for (var i = 0; i < price.length; i++) {
    total += price[i];
    console.log(price[i]);
  }

  //Calculating the percentage of progress
  const percent = total / 1000;
  const req = 100000 - total;
  //Return Function for profile page
  return (
    <React.Fragment>
      <Navbar email={email} />
      <div className="profileuse">
        <div className="profile details">
          <h3 className="user">Name: {username}</h3>
          <h3 className="total">Total: ₹{total}/-</h3>
          <Progress value={percent} className="progress" />
          <p>Shop for ₹{req} more and get a prime membership free. </p>
        </div>
        <React.Fragment>
          <BarChart chartData={userData} chartData2={userData2} />
        </React.Fragment>
      </div>
    </React.Fragment>
  );
};

export default Profile;
