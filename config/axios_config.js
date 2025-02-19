import axios from 'axios';
import https from 'https';
import {config} from './config.js';

export const axiosInstance = axios.create({
  baseURL: config.nasaBaseUrl,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
