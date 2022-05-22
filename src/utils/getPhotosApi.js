import axios from "axios";
const BASE_URL = "https://api.unsplash.com/";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`,
  },
});
