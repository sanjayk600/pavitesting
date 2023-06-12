import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/",
  withCredentials: false,
});

export default instance;
