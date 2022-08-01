import React,{useEffect,useState} from "react";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import '../css/Status.css';
import App2 from "./App2";
import axios from "axios";
const Status = ({orderid}) => {
    const[data,setdata]=useState([]);
    const [lat,setlat]=useState(null);
    const [lng,setlng]=useState(null);
    const [dlat,setdlat]=useState(null);
    const [dlng,setdlng]=useState(null);
    const [order_id,setorder_id]=useState(orderid);
    useEffect(() => {
       
          const api = async () => {
            const { data } = await axios.get(
              `https://hackon-backend1.herokuapp.com/scanme/${orderid}`
            );
            console.log(data);
            setdata(data);
            setlat(data.address.latitude);
            setlng(data.address.longitude);
          };
          api();
        // const delivery=async()=>{
        //   const {data}=await axios.get('https://hackon-backend1.herokuapp.com/status');
        //   console.log(data);
        //   setdlat(data.latitude);
        //   setdlng(data.longitude);
        // }
        // delivery();
        const delivery2=async()=>{
          const {data}=await axios.get(`http://hackon-backend1.herokuapp.com/status/${orderid}`);
                    setdlat(data.latitude);
          setdlng(data.longitude);
          console.log(data);
        }
        delivery2();
        },[]);
    return (
        <React.Fragment>
       <div className="mapdiv">
       <div>
      <Timeline className="time">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Ordered</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Shipped</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Out for Delivery</TimelineContent>
        </TimelineItem>
      </Timeline>
      </div>
     <div>
     <App2 olat={lat} olng={lng} dlat={dlat} dlng={dlng} className="map"/>
     </div>
       </div>
  
   
  </React.Fragment>
    );
    }
export default Status;