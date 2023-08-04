import axios from 'axios';
import { getUserDataFromLocalStorage } from './user';

// Create an axios instance so the base URL is define here
// When fetching, we only need to specify the route

// eslint-disable-next-line import/prefer-default-export
export const axiosInstance = axios.create({
  // baseURL: 'https://mhsb-api.up.railway.app',
  baseURL: 'http://localhost:3000',
});
// Add an action BEFORE a request
axiosInstance.interceptors.request.use((config) => {
  const userData = getUserDataFromLocalStorage();

  // If the user is connected, add an authorization to the request header
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = userData ? `Bearer ${userData.token}` : null;

  return config;
});
