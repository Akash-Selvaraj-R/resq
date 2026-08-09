"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, MapPin, UserPlus, ShieldCheck, HeartPulse, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const typeInfo: Record<string, { title: string; description: string }> = {
  medical: {
    title: "Medical Emergency",
    description: "Illness, injury, or medical condition requiring immediate attention",
  },
  safety: {
    title: "Personal Safety",
    description: "Threat, harassment, or unsafe situation",
  },
  accident: {
    title: "Accident",
    description: "Vehicle collision, fall, or other accidental injury",
  },
  fire: {
    title: "Fire Emergency",
    description: "Fire, smoke, or explosion requiring emergency response",
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

  const handleConfirm = useCallback(() => {
    setIsConfirmed(true);
  }, []);

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <main className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center max-w-sm"
          >
            <div className="w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6 animate-glow-pulse">
              <HeartPulse className="h-10 w-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">SOS Activating</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Your emergency has been sent. Help is on the way.
            </p>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <a href="#confirm-content" className="skip-link">
        Skip to confirmation
      </a>

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => router.push("/sos/type")}
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-sm font-medium text-white">Confirm SOS</h1>
          <div className="w-12" />
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6">
        {/* Step progress */}
        <div className="flex items-center gap-0 mb-5" role="progressbar" aria-valuenow={2} aria-valuemin={1} aria-valuemax={3} aria-label="SOS flow progress">
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-[10px] font-bold flex-shrink-0">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </div>
            <div className="h-1 flex-1 bg-red-500 rounded-full mx-1.5" />
          </div>
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white text-[10px] font-bold flex-shrink-0">2</div>
            <div className="h-1 flex-1 bg-white/[0.06] rounded-full mx-1.5" />
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/[0.06] text-zinc-500 text-[10px] font-bold flex-shrink-0">3</div>
          </div>
        </div>

        <div className="mb-1">
          <span className="section-heading text-red-400">Step 2 of 3 · Confirmation</span>
        </div>
        <h2 className="text-xl font-semibold text-white mb-1">Confirm emergency</h2>
        <p className="text-sm text-zinc-500">Review before sending.</p>
      </div>

      <main id="confirm-content" className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <div className="relative w-28 h-28">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 112 112" aria-hidden="true">
              <circle cx="56" cy="56" r="50" stroke="rgba(255,255,255,0.06)" strokeWidth="3" fill="none" />
              <circle
                cx="56" cy="56" r="50"
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
              <span className="text-4xl font-bold text-white font-mono" aria-live="polite" aria-label={`${countdown} seconds remaining`}>{countdown}</span>
            </div>
          </div>
        </motion.div>

        {/* Emergency type */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 mb-3">
            <AlertTriangle className="h-4 w-4 text-red-400" aria-hidden="true" />
            <span className="text-sm font-semibold text-red-400">{info.title}</span>
          </div>
          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Once activated, ResQ will share your live location and notify your emergency network.
          </p>
        </motion.div>

        {/* What happens next */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          className="p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] mb-6"
          role="list"
          aria-label="What happens when you send SOS"
        >
          <p className="section-heading mb-4">What happens next</p>
          <div className="space-y-3">
            {[
              { icon: MapPin, label: "Live location shared", color: "text-blue-400" },
              { icon: UserPlus, label: "Emergency contacts notified", color: "text-amber-400" },
              { icon: ShieldCheck, label: "Nearby responders alerted", color: "text-green-400" },
              { icon: HeartPulse, label: "AI triage initiated", color: "text-purple-400" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.2 + i * 0.05 }}
                className="flex items-center gap-3"
                role="listitem"
              >
                <CheckCircle2 className={`h-4 w-4 ${item.color} flex-shrink-0`} aria-hidden="true" />
                <span className="text-sm text-zinc-300 font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.25 }}
          className="space-y-3"
        >
          <Button
            className="w-full h-14 text-base font-semibold bg-red-600 hover:bg-red-700 active:bg-red-800 text-white transition-all duration-150 shadow-lg shadow-red-900/25 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={handleConfirm}
            aria-label="Confirm and send SOS emergency alert"
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

        <p className="text-[11px] text-zinc-600 text-center mt-5 leading-relaxed">
          If this is a life-threatening emergency, call your local emergency number directly.
        </p>
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
