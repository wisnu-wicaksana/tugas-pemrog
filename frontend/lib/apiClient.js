

export const apiClient = async (method, endpoint, body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, options);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Terjadi kesalahan ');
    }

    return await res.json();
  } catch (error) {
    throw error;
  }
};

