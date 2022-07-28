import React,{useState} from "react";
import QRCode from "react-qr-code";
const Button=({objid})=>{

const [qr,setqr]=useState('no')


    const qrgen=()=>{
        setqr('yes')
    }

if(qr==='no'){
    return(
        <React.Fragment>
            <button onClick={qrgen}>Click Me</button>
            
        </React.Fragment>
    );
}
if(qr==='yes'){
    return(
        <React.Fragment>
            <button onClick={qrgen}>Click Me</button>
            
            
        </React.Fragment>
    );
}
   
}

export default Button;