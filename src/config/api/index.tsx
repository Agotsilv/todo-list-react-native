import axios from "axios";

const dev = 'http://192.168.1.161:3001';
const home = 'http://192.168.1.16:3001';

const api = axios.create({
 baseURL: home,
});

export default api;