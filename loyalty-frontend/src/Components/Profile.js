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
  var limit = 0;
if(total<100000){
  limit=100000;
}
else if(total<200000){
  limit=200000;
}
else if(total<300000){
  limit=300000;
}
else if(total<400000){
  limit=400000;
}
else if(total<500000){
  limit=500000;
}
else if(total<600000){
  limit=600000;
}
else if(total<700000){
  limit=700000;
}
else if(total<800000){
  limit=800000;
}
else if(total<900000){
  limit=900000;
}
else if(total<1000000){
  limit=1000000;
}
else
limit = 2000000;
//Calculating the percentage of progress
const p=(total/limit)*100;
const percent=p.toFixed(2);
const req=limit-total;
  //Return Function for profile page
  return (
    <React.Fragment>
      <Navbar email={email} />
      <div className="profileuse">
        <div className="profile details">
          <h3 className="user">Name: {username}</h3>
          <h3 className="total">Total: ₹{total}/-</h3>
          <Progress value={percent} className="progress" />
          <p>Shop for ₹{req} more and get a prime membership free </p>
        </div>
        <React.Fragment>
          <BarChart chartData={userData} chartData2={userData2} />
        </React.Fragment>
      </div>
    </React.Fragment>
  );
};

export default Profile;
