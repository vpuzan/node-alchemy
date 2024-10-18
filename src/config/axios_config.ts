import axios, { AxiosInstance } from 'axios';
import https from 'https';
import { configApp } from './config';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: configApp.nasaBaseUrl,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});