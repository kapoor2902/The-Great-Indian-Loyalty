import React, { useState } from "react";
import BarChart from "./BarChart";
import Navbar from "./Navbar";
import { UserData } from "./Data";
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
  const [username, setusername] = useState("");
  //Other Functions

  const email = (id) => {
    console.log(id)
    setusername(id.fullName);
  };

  //Return Function for profile page
  return (
    <React.Fragment>
      <Navbar email={email} />
      <div className="profileuse">
        <div className="profile details">
          <h3>Name:{username}</h3>
        </div>

        <BarChart chartData={userData} />
      </div>
    </React.Fragment>
  );
};

export default Profile;
