import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowDownTrayIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import ScrollToTop from "../components/ScrollToTop";
import LoadingOverlay from "../components/LoadingOverlay";
import { mockAnalyse } from "../data/mockAnalyseRC";
import UploadSection from "../components/analyse-rc/UploadSection";
import BlocNav from "../components/analyse-rc/BlocNav";
import Bloc1CriteresOfficiels from "../components/analyse-rc/Bloc1CriteresOfficiels";
import Bloc2AnalyseAttendus from "../components/analyse-rc/Bloc2AnalyseAttendus";
import Bloc3GrillePonderation from "../components/analyse-rc/Bloc3GrillePonderation";
import Bloc4MatriceRisques from "../components/analyse-rc/Bloc4MatriceRisques";
import Bloc5ChecklistCandidat from "../components/analyse-rc/Bloc5ChecklistCandidat";


export default function AnalyseRC() {
  const [isLoading, setIsLoading] = useState(false);
  const [showAnalyse, setShowAnalyse] = useState(false);
  const [activeBloc, setActiveBloc] = useState("bloc-1");
  const analyseRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showAnalyse) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveBloc(visible[0].target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
    );

    const blocs = document.querySelectorAll("[id^='bloc-']");
    blocs.forEach((bloc) => observer.observe(bloc));

    return () => observer.disconnect();
  }, [showAnalyse]);

  const handleAnalyse = () => {
    setIsLoading(true);
    setTimeout(() => {
      loadingRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setShowAnalyse(true);
    setTimeout(() => {
      analyseRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const data = mockAnalyse;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3">
            <DocumentMagnifyingGlassIcon className="w-7 h-7 text-brand-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              Analyse de Règlement de Consultation
            </h1>
          </div>
          <p className="mt-1 text-sm text-gray-500 ml-10">
            Importez votre RC pour obtenir une analyse experte structurée en 5 blocs actionnables.
          </p>
        </div>
        {showAnalyse && (
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ArrowDownTrayIcon className="w-4 h-4" />
            Exporter
          </button>
        )}
      </div>

      {/* Upload Section */}
      <UploadSection onAnalyse={handleAnalyse} />

      {/* Loading */}
      {isLoading && (
        <div ref={loadingRef}>
          <LoadingOverlay
            onComplete={handleLoadingComplete}
            label="Analyse en cours"
          />
        </div>
      )}

      {/* Analyse Results */}
      {showAnalyse && (
        <div ref={analyseRef} className="mt-8">
          {/* Marche info banner */}
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
              {[
                { label: "Référence", value: data.marcheInfo.reference },
                { label: "Objet", value: data.marcheInfo.objet },
                { label: "Type", value: data.marcheInfo.typeContrat },
                { label: "Durée", value: data.marcheInfo.duree },
                { label: "Lieu", value: data.marcheInfo.lieu },
                { label: "Date remise", value: data.marcheInfo.dateRemise },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-medium text-brand-600">
                    {item.label}
                  </p>
                  <p className="text-gray-900 font-medium truncate" title={item.value}>
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky nav */}
          <BlocNav activeBloc={activeBloc} />

          {/* Blocs */}
          <div className="space-y-10 mt-8">
            <Bloc1CriteresOfficiels criteres={data.bloc1} />
            <Bloc2AnalyseAttendus attendus={data.bloc2} />
            <Bloc3GrillePonderation ponderation={data.bloc3} />
            <Bloc4MatriceRisques risques={data.bloc4} />
            <Bloc5ChecklistCandidat checklist={data.bloc5} />
          </div>
        </div>
      )}
      <ScrollToTop />
    </div>
  );
}
