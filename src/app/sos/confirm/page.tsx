"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, MapPin, UserPlus, ShieldCheck, HeartPulse, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const typeInfo: Record<string, { title: string; description: string; icon: string }> = {
  medical: {
    title: "Medical Emergency",
    description: "Illness, injury, or medical condition requiring immediate attention",
    icon: "medical",
  },
  safety: {
    title: "Personal Safety",
    description: "Threat, harassment, or unsafe situation",
    icon: "safety",
  },
  accident: {
    title: "Accident",
    description: "Vehicle collision, fall, or other accidental injury",
    icon: "accident",
  },
  fire: {
    title: "Fire Emergency",
    description: "Fire, smoke, or explosion requiring emergency response",
    icon: "fire",
  },
};

function ConfirmSOSContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "medical";
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const info = typeInfo[type] || typeInfo.medical;

  useEffect(() => {
    if (!isConfirmed && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setIsConfirmed(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isConfirmed, countdown]);

  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        router.push(`/sos/live?type=${type}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed, router, type]);

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <main className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-sm"
          >
            <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
              <HeartPulse className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">SOS Activated</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Your emergency has been sent to nearby responders and contacts. Help is on the way.
            </p>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => router.push("/sos/type")}
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-sm font-medium text-white">Confirm SOS</h1>
          <div className="w-12" />
        </div>
      </header>

      {/* Step Indicator */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-8">
        {/* Progress bar */}
        <div className="flex items-center gap-1.5 mb-6">
          <div className="h-1 flex-1 rounded-full bg-red-500" />
          <div className="h-1 flex-1 rounded-full bg-red-500" />
          <div className="h-1 flex-1 rounded-full bg-white/[0.06]" />
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-medium text-red-400 uppercase tracking-wider">Step 2 of 3</span>
        </div>
        <h2 className="text-xl font-semibold text-white mb-1">Confirm emergency</h2>
        <p className="text-sm text-zinc-500">Review your emergency type before sending.</p>
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-8"
        >
          <div className="relative w-28 h-28">
            {/* Countdown ring */}
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112">
              <circle
                cx="56"
                cy="56"
                r="50"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="56"
                cy="56"
                r="50"
                stroke="#EF4444"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - countdown / 5)}`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-white font-mono">{countdown}</span>
            </div>
          </div>
        </motion.div>

        {/* Emergency Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 mb-4">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-sm font-semibold text-red-400">{info.title}</span>
          </div>
          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Once activated, ResQ will share your live location and notify your emergency network.
          </p>
        </motion.div>

        {/* Visual Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] mb-8"
        >
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">What happens next</p>
          <div className="space-y-3">
            {[
              { icon: UserPlus, label: "Emergency contacts notified", color: "text-amber-400" },
              { icon: ShieldCheck, label: "Nearby responders alerted", color: "text-green-400" },
              { icon: MapPin, label: "Live location shared", color: "text-blue-400" },
              { icon: HeartPulse, label: "AI triage initiated", color: "text-purple-400" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + i * 0.06 }}
                className="flex items-center gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className={`h-4 w-4 ${item.color}`} />
                </div>
                <span className="text-sm text-zinc-300">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="space-y-3"
        >
          <Button
            className="w-full h-13 text-base font-semibold bg-red-600 hover:bg-red-700 text-white transition-all duration-200 shadow-lg shadow-red-900/25"
            onClick={() => setIsConfirmed(true)}
          >
            <HeartPulse className="h-5 w-5 mr-2" />
            Confirm & Send SOS
          </Button>
          <Button
            variant="outline"
            className="w-full h-11 border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] text-zinc-400 hover:text-white"
            onClick={() => router.push("/sos/type")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Change Type
          </Button>
        </motion.div>
      </main>
    </div>
  );
}

export default function ConfirmSOS() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-zinc-500 text-sm">Loading...</div>
      </div>
    }>
      <ConfirmSOSContent />
    </Suspense>
  );
}
