import { Link, Outlet } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-900">
            <Logo className="h-6 w-auto" />
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Retour au site
          </Link>
        </div>
      </header>
      <Navigation />
      <Outlet />
    </div>
  );
}
