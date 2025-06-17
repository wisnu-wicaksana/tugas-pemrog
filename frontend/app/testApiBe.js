'use client';
import { useEffect } from 'react';
import { apiClient } from '@/lib/apiClient';



export default function CheckAPI() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiClient('GET', '/api'); 
        console.log(res); 
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, []);

  return <div>Check Console</div>;
}

