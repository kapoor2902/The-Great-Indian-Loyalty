import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import "../css/DeliveryGuy.css";
import axios from "axios";

const DeliveryGuy = (props) => {
  const [_id, setId] = useState("No result");
  const [form, setForm] = useState(0);
  const [dat,setdata]=useState([]);
  useEffect(() => {
    if (_id !== "No result") {
      const api = async () => {
        const {data} = await axios.get(
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


  }, [_id]);
  console.log(_id);
  
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
                if (!!error) {
                  console.info(error);
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
  else{
    return(
      <React.Fragment>
        <h1>Order Details</h1>
        <p>Name:{dat.address.fullName}</p>
        <p>Phone Number:{dat.address.phone}</p>
        <p>Address:</p>
        <p>{dat.address.flat} <br/> {dat.address.area} <br/>{dat.address.city} <br/>{dat.address.state} <br/></p>
        <button>Click Me!</button>
      </React.Fragment>
      
    );
  }

};

export default DeliveryGuy;
