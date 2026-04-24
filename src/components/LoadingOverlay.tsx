import { useState, useEffect } from "react";

const steps = [
  "Lecture des documents...",
  "Extraction des critères...",
  "Analyse de conformité...",
  "Évaluation des points...",
  "Calcul des scores...",
  "Génération du rapport...",
];

export default function LoadingOverlay({
  onComplete,
  label = "Analyse en cours",
}: {
  onComplete: () => void;
  label?: string;
}) {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const duration = 5000;
    const interval = 50;
    const increment = 100 / (duration / interval);
    const stepDuration = duration / steps.length;

    const progressTimer = setInterval(() => {
      setProgress((p) => {
        const next = p + increment;
        if (next >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 200);
          return 100;
        }
        return next;
      });
    }, interval);

    const stepTimer = setInterval(() => {
      setStepIndex((s) => (s < steps.length - 1 ? s + 1 : s));
    }, stepDuration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, [onComplete]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 mt-8">
      <div className="max-w-md mx-auto text-center">
        {/* Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-5">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div
            className="absolute inset-0 rounded-full border-4 border-brand-500 border-t-transparent animate-spin"
          />
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-1">{label}</h3>
        <p className="text-sm text-brand-600 mb-4 h-5 transition-opacity">
          {steps[stepIndex]}
        </p>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
          <div
            className="bg-brand-500 h-2.5 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
