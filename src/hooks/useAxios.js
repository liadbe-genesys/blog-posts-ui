// useAxios.js
import axios from 'axios';

// Singleton instance
let instance = null;

// Headers configuration
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
};

const createAxiosInstance = () => {
  if (!instance) {
    instance = axios.create({
      headers
    });
  }
  return instance;
};

export const useAxios = () => {
  return createAxiosInstance();
};

export default useAxios;