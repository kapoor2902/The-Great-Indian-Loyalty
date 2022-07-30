import axios from "axios";

const instance = axios.create({
  baseURL: "https://hackon-backend1.herokuapp.com/",
});

export default instance;
