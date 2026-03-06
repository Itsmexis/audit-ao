import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowDownTrayIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import ScrollToTop from "../components/ScrollToTop";
import LoadingOverlay from "../components/LoadingOverlay";
import { mockAudit } from "../data/mockAuditAO";
import SourceSelection from "../components/audit-ao/SourceSelection";
import AuditScoreHeader from "../components/audit-ao/AuditScoreHeader";
import AuditNav from "../components/audit-ao/AuditNav";
import AuditResultDetail from "../components/audit-ao/AuditResultDetail";
import RecommandationsAmelioration from "../components/audit-ao/RecommandationsAmelioration";
import TableauPointsForts from "../components/audit-ao/TableauPointsForts";

export default function AuditAO() {
  const [isLoading, setIsLoading] = useState(false);
  const [showAudit, setShowAudit] = useState(false);
  const [activeSection, setActiveSection] = useState("audit-detail");
  const auditRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showAudit) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    const sections = document.querySelectorAll(
      "#audit-detail, #recommandations, #synthese-reponse"
    );
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, [showAudit]);

  const handleLaunchAudit = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadingRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setShowAudit(true);
    setTimeout(() => {
      auditRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const data = mockAudit;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <ClipboardDocumentCheckIcon className="w-7 h-7 text-violet-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Audit du Mémoire Technique
            </h1>
          </div>
          <p className="mt-1 text-sm text-gray-500 ml-10">
            Vérifiez la conformité de votre mémoire technique point par point et
            identifiez les axes d'amélioration.
          </p>
        </div>
        {showAudit && (
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ArrowDownTrayIcon className="w-4 h-4" />
            Exporter
          </button>
        )}
      </div>

      {/* Source Selection */}
      <SourceSelection onLaunchAudit={handleLaunchAudit} />

      {/* Loading */}
      {isLoading && (
        <div ref={loadingRef}>
          <LoadingOverlay
            onComplete={handleLoadingComplete}
            label="Audit en cours"
          />
        </div>
      )}

      {/* Audit Results */}
      {showAudit && (
        <div ref={auditRef} className="mt-8">
          {/* Score header */}
          <AuditScoreHeader data={data} recap={data.recap} />

          {/* Sticky nav */}
          <div className="mt-6" />
          <AuditNav activeSection={activeSection} />

          {/* Sections */}
          <div className="space-y-10 mt-8">
            <AuditResultDetail criteres={data.criteres} recap={data.recap} />
            <RecommandationsAmelioration recommandations={data.recommandations} />
            <TableauPointsForts recap={data.recap} />
          </div>
        </div>
      )}
      <ScrollToTop />
    </div>
  );
}
