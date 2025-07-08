import { toast } from 'react-hot-toast';
import { useEffect, useState } from 'react';

// Ikon untuk setiap status notifikasi
const icons = {
  success: (
    <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  // Ikon baru untuk aksi menghapus
  delete: (
    <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m4 0h-6" />
    </svg>
  ),
};

// Palet warna untuk progress bar
const progressColors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  delete: 'bg-red-500',
};

const CustomToast = ({ t, type, title, message }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (t.visible) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev > 0 ? prev - 100 / (t.duration / 100) : 0));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [t.visible, t.duration]);

  return (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-sm w-full bg-gray-800 shadow-2xl rounded-xl pointer-events-auto ring-1 ring-gray-700 overflow-hidden`}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {icons[type] || icons.success}
          </div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-bold text-white">{title}</p>
            <p className="mt-1 text-sm text-gray-300">{message}</p>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="rounded-md inline-flex text-gray-400 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Close</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="h-1 bg-gray-700 w-full">
        <div 
          className={`h-full ${progressColors[type]}`} 
          style={{ width: `${progress}%`, transition: 'width 100ms linear' }}
        ></div>
      </div>
    </div>
  );
};

export default CustomToast;