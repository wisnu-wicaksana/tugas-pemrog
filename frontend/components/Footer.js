// file: frontend/components/Footer.js

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-900 border-t border-white/10 mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-sm text-gray-400">
          {/* Bagian Kiri: Branding */}
          <p className="font-bold">
            Zukan<span className="text-blue-400">Verse</span>
          </p>
          
          {/* Bagian Kanan: Copyright */}
          <p>
            &copy; {currentYear} ZukanVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}