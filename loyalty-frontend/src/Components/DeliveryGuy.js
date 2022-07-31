import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import "../css/DeliveryGuy.css";
import axios from "axios";

const DeliveryGuy = (props) => {
  const [_id, setId] = useState("No result");
  const [form, setForm] = useState(0);
  const [dat, setdata] = useState([]);
  const [oid, setoid] = useState([]);
  const [button, setbutton] = useState(false);
  useEffect(() => {
    if (_id !== "No result") {
      const api = async () => {
        const { data } = await axios.get(
          `https://hackon-backend1.herokuapp.com/scanme/${_id}`
        );
        console.log(data);
        setdata(data);
        setForm(1);
      };
      api();
      console.log(form);
    } else {
      console.log("waiting for id");
    }
    if (button !== false) {
      const api3 = async () => {
        await window.navigator.geolocation.getCurrentPosition((position) => {
          const api2 = async () => {
            console.log(_id);
            const { data } = await axios.post(
              "https://hackon-backend1.herokuapp.com/deliveryguy/",
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                order_id: _id,
              }
            );
            console.log(data);
            setoid(data);
          };
          api2();
        });
      };
      api3();
    }
    console.log(oid);
  }, [_id, button]);

  if (button === true) {
    setInterval(() => {
      if (oid.length !== 0) {
        const update = async () => {
          await window.navigator.geolocation.getCurrentPosition((position) => {
            const update2 = async () => {
              const { data } = await axios.put(
                `https://hackon-backend1.herokuapp.com/deliveryguy/${oid._id}`,
                {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                }
              );
              console.log(data, "updated");
            };
            update2();
          });
        };
        update();
      }
    }, 10000);
  }

  if (form === 0) {
    return (
      <div className="scan">
        <div className="qrcode">
          <h1>Please scan the QR code now!</h1>
          <div className="scanme">
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  setId(result?.text);
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div>
        <h1>Order Details</h1>
        <p>Name:{dat.address.fullName}</p>
        <p>Phone Number:{dat.address.phone}</p>
        <p>Address:</p>

        <p>{dat.address.flat} <br/> {dat.address.area} <br/>{dat.address.city} <br/>{dat.address.state} <br/></p>
        <button className="Buon" onClick={(e)=>{setbutton(true)}}>Click Me!</button>

        <p>{oid._id}</p>
        </div>
      </React.Fragment>
    );
  }
};

export default DeliveryGuy;
