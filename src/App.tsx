import { useState } from 'react';
import Navigation, { type PageKey } from './components/Navigation';
import AnalyseRC from './pages/AnalyseRC';
import AuditAO from './pages/AuditAO';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>('analyseRC');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      {currentPage === 'analyseRC' ? <AnalyseRC /> : <AuditAO />}
    </div>
  );
}
