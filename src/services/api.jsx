import axios from "axios";

const api = axios.create({
  baseURL: "https://buscador-cep-blush.vercel.app/",
});

export default api;
