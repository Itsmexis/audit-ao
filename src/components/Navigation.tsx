import {
  DocumentMagnifyingGlassIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';

export type PageKey = 'analyseRC' | 'auditAO';

interface NavigationProps {
  currentPage: PageKey;
  onPageChange: (page: PageKey) => void;
}

const tabs: { key: PageKey; label: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }[] = [
  { key: 'analyseRC', label: 'Analyse RC', icon: ClipboardDocumentCheckIcon },
  { key: 'auditAO', label: 'Audit AO', icon: DocumentMagnifyingGlassIcon },
];

export default function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex space-x-2">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onPageChange(key)}
              className={`flex items-center space-x-2 py-5 px-3 border-b-2 font-medium text-sm transition-colors ${
                currentPage === key
                  ? 'border-violet-500 text-violet-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
