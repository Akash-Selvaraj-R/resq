"use client";
import { motion } from "framer-motion";
import { ArrowLeft, HeartPulse, ShieldAlert, Car, Flame } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

const types = [
  {
    id: "medical",
    title: "Medical",
    description: "Illness, injury, or medical condition",
    icon: HeartPulse,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    selectedBorder: "border-red-500",
    selectedBg: "bg-red-500/15",
  },
  {
    id: "safety",
    title: "Personal Safety",
    description: "Threat, harassment, or unsafe situation",
    icon: ShieldAlert,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    selectedBorder: "border-amber-500",
    selectedBg: "bg-amber-500/15",
  },
  {
    id: "accident",
    title: "Accident",
    description: "Vehicle collision, fall, or injury",
    icon: Car,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    selectedBorder: "border-blue-500",
    selectedBg: "bg-blue-500/15",
  },
  {
    id: "fire",
    title: "Fire",
    description: "Fire, smoke, or explosion",
    icon: Flame,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    selectedBorder: "border-orange-500",
    selectedBg: "bg-orange-500/15",
  },
];

export default function EmergencyTypeSelect() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = useCallback((typeId: string) => {
    setSelected(typeId);
    setTimeout(() => {
      router.push(`/sos/confirm?type=${typeId}`);
    }, 200);
  }, [router]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, typeId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelect(typeId);
    }
  }, [handleSelect]);

  return (
    <div className="min-h-screen bg-background">
      <a href="#emergency-types" className="skip-link">
        Skip to emergency types
      </a>

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-sm font-medium text-white">New SOS</h1>
          <div className="w-12" />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6">
        {/* Step progress */}
        <div className="flex items-center gap-0 mb-5" role="progressbar" aria-valuenow={1} aria-valuemin={1} aria-valuemax={3} aria-label="SOS flow progress">
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-[10px] font-bold flex-shrink-0">1</div>
            <div className="h-1 flex-1 bg-red-500 rounded-full mx-1.5" />
          </div>
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/[0.06] text-zinc-500 text-[10px] font-bold flex-shrink-0">2</div>
            <div className="h-1 flex-1 bg-white/[0.06] rounded-full mx-1.5" />
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/[0.06] text-zinc-500 text-[10px] font-bold flex-shrink-0">3</div>
          </div>
        </div>

        <div className="mb-1">
          <span className="section-heading text-red-400">Step 1 of 3 · Emergency Type</span>
        </div>
        <h2 className="text-xl font-semibold text-white mb-1">What&apos;s happening?</h2>
        <p className="text-sm text-zinc-500">Select the type to notify the right responders.</p>
      </div>

      <main id="emergency-types" className="max-w-2xl mx-auto px-4 sm:px-6 py-6" role="radiogroup" aria-label="Emergency type selection">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {types.map((type, i) => {
            const isSelected = selected === type.id;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
              >
                <button
                  onClick={() => handleSelect(type.id)}
                  onKeyDown={(e) => handleKeyDown(e, type.id)}
                  role="radio"
                  aria-checked={isSelected}
                  aria-label={`${type.title} emergency type`}
                  tabIndex={0}
                  className={`relative w-full p-5 rounded-2xl border text-left transition-all duration-150 cursor-pointer -webkit-tap-highlight-color:transparent ${
                    isSelected
                      ? `${type.selectedBorder} ${type.selectedBg}`
                      : `${type.border} bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.15]`
                  } focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring`}
                >
                  <div className={`w-11 h-11 rounded-xl ${type.bg} flex items-center justify-center mb-3 transition-transform duration-150 ${
                    isSelected ? "scale-105" : ""
                  }`}>
                    <type.icon className={`h-5 w-5 ${type.color}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-0.5">{type.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{type.description}</p>
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <div className={`w-5 h-5 rounded-full ${type.bg} border ${type.selectedBorder} flex items-center justify-center`}>
                        <svg className={`w-3 h-3 ${type.color}`} viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
