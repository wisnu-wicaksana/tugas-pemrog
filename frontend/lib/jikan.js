// file: frontend/lib/jikan.js

export const getApi = async (resource, query) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_JIKAN_API}/${resource}?${query}`,
    { next: { revalidate: 3600 } } // Cache data selama 1 jam
  );
  if (!response.ok) {
    // throw new Error("Failed to fetch data from Jikan API");
    console.error(`Failed to fetch: ${response.status} ${response.statusText}`);
    return null; // Return null jika gagal agar aplikasi tidak crash
  }
  const data = await response.json();
  return data;
};