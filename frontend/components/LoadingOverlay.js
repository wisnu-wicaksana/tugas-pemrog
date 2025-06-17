'use client';
export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="text-xl font-bold">Loading...</div>
    </div>
  );
}


