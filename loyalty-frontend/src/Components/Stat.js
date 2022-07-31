import { Button } from "@material-ui/core";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Status from "./Status";


const Stat=({objid})=>{
    const navigate = useNavigate();
    const [form,setForm]=useState(0);


if(form===0){
return(
<React.Fragment>

    <button onClick={(e)=>{setForm(1)}}>Status</button>
</React.Fragment>
);
}
else{
 
    return(
        <React.Fragment>
           <Status orderid={objid}/>
        </React.Fragment>
    );
}
}


export default Stat;