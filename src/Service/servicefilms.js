import axios from "axios";

const apiFilms = axios.create({
  baseURL: "https://swapi.dev/api/films/"
});

export default apiFilms;
