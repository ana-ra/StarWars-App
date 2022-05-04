import axios from "axios";

const apiPeople = axios.create({
  baseURL: "https://swapi.dev/api/people/"
});

export default apiPeople;
