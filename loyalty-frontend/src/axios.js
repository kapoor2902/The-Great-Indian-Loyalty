import axios from "axios";

const instance = axios.create({
  baseURL: "https://loyalty-backend29.herokuapp.com/",
});

export default instance;
