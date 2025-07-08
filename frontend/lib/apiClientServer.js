// file: frontend/lib/apiClientServer.js
import axios from 'axios';
import { cookies } from 'next/headers';

export const apiClientServer = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
  }

  return instance;
};