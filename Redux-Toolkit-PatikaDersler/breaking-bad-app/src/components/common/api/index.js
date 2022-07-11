import axios from "axios";

export const api= () => {
  return axios.create({
    baseURL: "https://www.breakingbadapi.com/api",
  });
};


