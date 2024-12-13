import axios from 'axios';
import cookies from 'js-cookie';
import { API } from '../config';

export const customAxios = axios.create({
  baseURL: `${API.DATA}`,
  headers: {
    access_token: cookies.get('access_token'),
  },
});
