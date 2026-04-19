import { NavLink } from 'react-router-dom';
import {
  DocumentMagnifyingGlassIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';

const tabs = [
  { to: '/app/analyse-rc', label: 'Analyse RC', icon: ClipboardDocumentCheckIcon },
  { to: '/app/audit-ao', label: 'Audit AO', icon: DocumentMagnifyingGlassIcon },
];

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-2">
          {tabs.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center space-x-2 py-5 px-3 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-blue-700 text-blue-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
