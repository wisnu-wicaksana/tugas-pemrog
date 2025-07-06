// file: frontend/components/Sidebar.js
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, FireIcon, HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import LogoutButton from './LogoutButton';

const navLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Top Anime', href: '/allAnimeTop', icon: FireIcon },
  { name: 'Favorit', href: '/favorite', icon: HeartIcon },
];

const NavLink = ({ link }) => {
  const pathname = usePathname();
  const isActive = pathname === link.href;
  const Icon = link.icon;

  return (
    <Link
      href={link.href}
      className={`flex items-center p-3 my-1 rounded-lg transition-colors duration-200
                  ${isActive 
                    ? 'bg-blue-500/10 text-blue-300 font-bold' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
    >
      <Icon className="w-6 h-6" />
      <span className="ml-4">{link.name}</span>
    </Link>
  );
};

const Sidebar = ({ user }) => {
  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-gray-900 text-white p-4 border-r border-gray-800 fixed">
      <div className="text-2xl font-bold mb-8 px-3">
        <Link href="/dashboard">Anime<span className="text-blue-400">List</span></Link>
      </div>
      
      <nav className="flex-grow">
        {navLinks.map((link) => (
          <NavLink key={link.name} link={link} />
        ))}
      </nav>

      {/* User Profile Section at the bottom */}
      <div className="border-t border-gray-800 pt-4">
        <div className="flex items-center p-3 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold">
            {user?.name?.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="ml-4 flex-grow">
            <p className="font-bold text-sm text-white">{user?.name || 'Guest'}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;