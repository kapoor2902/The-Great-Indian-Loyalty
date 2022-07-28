
import React, { useState } from 'react';
import {QrReader} from 'react-qr-reader';
import '../css/DeliveryGuy.css'





const DeliveryGuy = (props) => {
  const [data, setData] = useState('No result');


  






  return (
   
      <div className='scan'>
 <div className='qrcode'>
  <h1>Please scan the QR code now!</h1>
  <div className='scanme'>
  <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }if (!!error) {
            console.info(error);
          }
      
        }}
       
      />
  </div>
  <p>{data}</p>
   
    
      
  </div>
      </div>
 
  );
      }


export default DeliveryGuy;