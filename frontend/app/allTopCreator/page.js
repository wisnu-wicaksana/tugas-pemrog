'use client';

import { useEffect, useState } from 'react';
import CreatorList from '@/components/creator/CreatorList';
import { getApi } from '@/lib/jikan';
import Link from 'next/link';

export default function AllTopCreatorPage() {
  const [creators, setCreators] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getApi('top/people', `page=${page}&limit=20`)
      .then((res) => {
        setCreators(res.data);
        setHasNextPage(res.pagination?.has_next_page ?? true);
        setLastPage(res.pagination?.last_visible_page ?? 1);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  const handleNext = () => {
    if (hasNextPage) setPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <main className="p-4">
      <div className="mb-4 text-right">
        <Link href="/dashboard" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Kembali ke Beranda
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Top Creators - Page {page}</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <CreatorList creators={creators} />
      )}

      <div className="mt-6 flex justify-center items-center space-x-4">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {page} of {lastPage}
        </span>

        <button
          onClick={handleNext}
          disabled={!hasNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </main>
  );
}
