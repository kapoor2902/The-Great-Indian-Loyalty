import React,{useEffect,useState} from "react";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import '../css/Status.css';
import axios from "axios";
const Status = ({orderid}) => {
    const[data,setdata]=useState([]);
    const [lat,setlat]=useState(null);
    const [lng,setlng]=useState(null);
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
          const api2 = async () => {
            const {data}=await axios.post("https://localhost:10002/status",{order_id:orderid});

            
            console.log(data);
          }
          api2();

        },[]);
    return (
        <React.Fragment>
        <p>{lat}</p>
        <p>{lng}</p>
      
        <Timeline className="time">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Eat</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>Code</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot />
          </TimelineSeparator>
          <TimelineContent>Sleep</TimelineContent>
        </TimelineItem>
      </Timeline>
  </React.Fragment>
    );
    }
export default Status;