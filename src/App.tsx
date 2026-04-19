import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import AppLayout from './layouts/AppLayout';
import AnalyseRC from './pages/AnalyseRC';
import AuditAO from './pages/AuditAO';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Navigate to="analyse-rc" replace />} />
        <Route path="analyse-rc" element={<AnalyseRC />} />
        <Route path="audit-ao" element={<AuditAO />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
