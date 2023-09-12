import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:10002/",
});

export default instance;
