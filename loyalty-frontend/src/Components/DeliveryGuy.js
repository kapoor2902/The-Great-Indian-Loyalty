
import React, { useEffect, useState } from 'react';
import {QrReader} from 'react-qr-reader';
import '../css/DeliveryGuy.css'
import axios from 'axios';





const DeliveryGuy = (props) => {
  const [id, setId] = useState('No result');

  useEffect(() => {

    const api=async()=>{
        const obj= await axios.post(`localhost:5000/order/details`,{id:id});
        console.log(obj);
      }
      api();

  }, [id]); 

  console.log(id);





  return (
   
      <div className='scan'>
 <div className='qrcode'>
  <h1>Please scan the QR code now!</h1>
  <div className='scanme'>
  <QrReader
        onResult={(result, error) => {

          if (!!result) {
            setId(result?.text);
          }if (!!error) {
            console.info(error);
          }
      
        }}
       
      />
  </div>

   
    
      
  </div>
      </div>
 
  );
      }


export default DeliveryGuy;