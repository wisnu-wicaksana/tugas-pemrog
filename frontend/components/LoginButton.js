// file: frontend/components/LoginButton.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Komponen untuk Ikon Google (ini adalah SVG, jadi tidak perlu file gambar)
const GoogleIcon = (props) => (
  <svg viewBox="0 0 48 48" {...props}>
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.485 11.52C34.643 7.964 29.643 6 24 6C12.955 6 4 14.955 4 26s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691c-1.336 2.675-2.076 5.618-2.076 8.761c0 3.143.74 6.086 2.076 8.761L11.03 36.88C8.316 33.12 6.53 28.526 6.53 23.454c0-5.072 1.786-9.666 4.5-13.414L6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-4.707-4.707c-2.386 1.625-5.223 2.625-8.702 2.625c-6.206 0-11.482-3.926-13.447-9.352l-4.94 4.94C8.955 38.955 15.604 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l4.707 4.707C39.932 34.936 43.156 29.8 43.156 24c0-1.682-.246-3.32-.69-4.875L43.611 20.083z"></path>
  </svg>
);

const LoginButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setIsLoading(true);
    // Arahkan ke rute otentikasi Google di backend Anda
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`);
  };

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className=" cursor-pointer flex items-center justify-center w-full max-w-xs px-4 py-3 font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:bg-gray-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Mengarahkan...</span>
        </>
      ) : (
        <>
          <GoogleIcon className="w-6 h-6 mr-3" />
          <span>Login dengan Google</span>
        </>
      )}
    </button>
  );
};

export default LoginButton;