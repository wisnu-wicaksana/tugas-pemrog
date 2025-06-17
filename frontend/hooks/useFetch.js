import { useEffect, useState } from 'react';

export default function useFetch(endpoint, method = 'GET', body = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      const headers = {
        'Content-Type': 'application/json',
      };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const options = {
        method,
        headers,
      };
      if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, options);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || 'Terjadi kesalahan');
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, method, body]);

  return { data, loading, error };
}


