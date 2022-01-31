import axios from "axios";
import {APIURL} from './config';

const axiosApi = axios.create({
    baseURL: APIURL,
});



export default axiosApi;