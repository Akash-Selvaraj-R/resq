"use client";
import { motion } from "framer-motion";
import { ArrowLeft, HeartPulse, ShieldAlert, Car, Flame, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const types = [
  {
    id: "medical",
    title: "Medical",
    description: "Illness, injury, or medical condition",
    icon: HeartPulse,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    hoverBorder: "hover:border-red-500/40",
    glow: "group-hover:shadow-red-500/10",
  },
  {
    id: "safety",
    title: "Personal Safety",
    description: "Threat, harassment, or unsafe situation",
    icon: ShieldAlert,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    hoverBorder: "hover:border-amber-500/40",
    glow: "group-hover:shadow-amber-500/10",
  },
  {
    id: "accident",
    title: "Accident",
    description: "Vehicle collision, fall, or injury",
    icon: Car,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    hoverBorder: "hover:border-blue-500/40",
    glow: "group-hover:shadow-blue-500/10",
  },
  {
    id: "fire",
    title: "Fire",
    description: "Fire, smoke, or explosion",
    icon: Flame,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    hoverBorder: "hover:border-orange-500/40",
    glow: "group-hover:shadow-orange-500/10",
  },
];

export default function EmergencyTypeSelect() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-sm font-medium text-white">New SOS</h1>
          <div className="w-12" />
        </div>
      </header>

      {/* Step Indicator */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        {/* Progress bar */}
        <div className="flex items-center gap-1.5 mb-6">
          <div className="h-1 flex-1 rounded-full bg-red-500" />
          <div className="h-1 flex-1 rounded-full bg-white/[0.06]" />
          <div className="h-1 flex-1 rounded-full bg-white/[0.06]" />
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-medium text-red-400 uppercase tracking-wider">Step 1 of 3</span>
        </div>
        <h2 className="text-xl font-semibold text-white mb-1">What&apos;s happening?</h2>
        <p className="text-sm text-zinc-500">Select the type of emergency to ensure the right responders are notified.</p>
      </div>

      {/* Emergency Cards - 2x2 Grid */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {types.map((type, i) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <button
                onClick={() => router.push(`/sos/confirm?type=${type.id}`)}
                className={`group w-full p-5 sm:p-6 rounded-2xl border ${type.border} ${type.hoverBorder} bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 text-left hover:-translate-y-0.5 hover:shadow-lg ${type.glow}`}
              >
                <div className={`w-12 h-12 rounded-xl ${type.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <type.icon className={`h-6 w-6 ${type.color}`} />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">{type.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-4">{type.description}</p>
                <div className="flex items-center gap-1 text-xs font-medium text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  <span>Select</span>
                  <ChevronRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
