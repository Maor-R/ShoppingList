import axios from 'axios';
import {BASE_URL_SERVER, PRODUCTION_BASE_URL_SERVER} from "../constants"

const api = axios.create({
  baseURL:process.env.NODE_ENV === "development"
  ? `${"http://localhost:5000"}/api/v1`:`${PRODUCTION_BASE_URL_SERVER}/api/v1`,
});

export { api};
