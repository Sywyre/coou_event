import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.dojah.io/",
  headers: {
    Authorization: import.meta.env.VITE_DOJAH_NIN_AUTH_KEY,
    AppId: import.meta.env.VITE_DOJAH_NIN_App_id,
  },
});

export default apiClient;

export const univastClient = axios.create({
  baseURL: "https://univast.faraday.africa",
  headers: {
    Authorization: `Api-Key ${import.meta.env.VITE_UNIVAST_API_KEY}`,
  },
});
