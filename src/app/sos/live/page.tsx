"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, UserPlus, Phone, ShieldCheck, Loader2, Circle, Radio, Battery, Wifi, Brain, Navigation } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function LiveSOSContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "medical";
  const [status, setStatus] = useState<"alerting" | "responders-notified" | "help-on-the-way">("alerting");
  const [responders, setResponders] = useState<Array<{ id: number; name: string; distance: number; status: "accepting" | "on-the-way" }>>([]);
  const [hospitals, setHospitals] = useState<Array<{ name: string; distance: number; phone: string }>>([]);
  const [police, setPolice] = useState<Array<{ name: string; distance: number; phone: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [elapsed, setElapsed] = useState(0);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const simulateData = () => {
      setTimeout(() => {
        setResponders([
          { id: 1, name: "Alex Rivera", distance: 0.2, status: "accepting" },
          { id: 2, name: "Sam Chen", distance: 0.4, status: "accepting" },
          { id: 3, name: "Jordan Lee", distance: 0.6, status: "accepting" },
        ]);
        setHospitals([
          { name: "City General Hospital", distance: 1.2, phone: "555-0101" },
          { name: "Mercy Medical Center", distance: 2.1, phone: "555-0102" },
        ]);
        setPolice([
          { name: "Central Police Station", distance: 0.8, phone: "555-0201" },
          { name: "North District Police", distance: 1.5, phone: "555-0202" },
        ]);
        setTimeout(() => {
          setStatus("responders-notified");
          setTimeout(() => {
            setResponders((prev) => {
              const updated = [...prev];
              if (updated.length > 0) updated[0] = { ...updated[0], status: "on-the-way" };
              return updated;
            });
            setTimeout(() => setStatus("help-on-the-way"), 3000);
          }, 4000);
        }, 3000);
        setIsLoading(false);
      }, 1500);
    };
    simulateData();
  }, [type]);

  const statusSteps = [
    { key: "alerting", label: "SOS Activated", done: true },
    { key: "responders-notified", label: "Location Shared", done: status !== "alerting" },
    { key: "help-on-the-way", label: "Help In Progress", done: status === "help-on-the-way" },
  ];

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => router.push(`/sos/confirm?type=${type}`)}
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <h1 className="text-sm font-semibold text-red-400">SOS ACTIVE</h1>
          </div>
          <div className="text-xs font-mono text-zinc-500 bg-white/[0.04] px-2.5 py-1 rounded-lg">{formatTime(elapsed)}</div>
        </div>
      </header>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-6">
        {/* Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-5 rounded-2xl border border-red-500/20 bg-red-500/5 mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <Radio className="h-5 w-5 text-red-400 animate-pulse-subtle" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-white">Emergency Active</h2>
              <p className="text-xs text-zinc-400 mt-0.5">
                {status === "alerting" && "Alerting nearby responders..."}
                {status === "responders-notified" && "Responders are on the way"}
                {status === "help-on-the-way" && "Help is arriving at your location"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Live Status Cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6"
        >
          {[
            { icon: MapPin, label: "Location", value: "Shared", color: "text-blue-400", bg: "bg-blue-500/10" },
            { icon: UserPlus, label: "Responders", value: `${responders.length} found`, color: "text-green-400", bg: "bg-green-500/10" },
            { icon: ShieldCheck, label: "Contacts", value: "2 notified", color: "text-amber-400", bg: "bg-amber-500/10" },
            { icon: Brain, label: "AI Triage", value: "HIGH", color: "text-purple-400", bg: "bg-purple-500/10" },
          ].map((card) => (
            <div key={card.label} className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className={`w-8 h-8 rounded-lg ${card.bg} flex items-center justify-center mb-2`}>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{card.label}</p>
              <p className={`text-sm font-semibold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Response Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-6"
        >
          <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Response Timeline</h3>
          <div className="space-y-0">
            {statusSteps.map((step, i) => (
              <div key={step.key} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full mt-0.5 ${step.done ? "bg-green-500 shadow-lg shadow-green-500/30" : "bg-zinc-700 border-2 border-zinc-600"}`} />
                  {i < statusSteps.length - 1 && (
                    <div className={`w-px h-8 ${step.done ? "bg-green-500/30" : "bg-zinc-800"}`} />
                  )}
                </div>
                <div className="pb-5">
                  <p className={`text-sm font-medium ${step.done ? "text-white" : "text-zinc-600"}`}>{step.label}</p>
                  {step.done && i < statusSteps.length - 1 && (
                    <p className="text-[11px] text-zinc-600 mt-0.5">Completed</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Nearby Responders */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Nearby Responders</h3>
            {!isLoading && <span className="text-xs text-zinc-600">{responders.length} found</span>}
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-zinc-600" />
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {responders.map((r) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                      <UserPlus className="h-4 w-4 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{r.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Navigation className="h-3 w-3 text-zinc-600" />
                        <p className="text-xs text-zinc-500">{r.distance} km away</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                      r.status === "on-the-way"
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>
                      {r.status === "on-the-way" ? "En Route" : "Accepting"}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.section>

        {/* Nearby Help */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-6"
        >
          <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">Nearby Help</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Hospitals */}
            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-red-500/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-red-400">H</span>
                </div>
                <h4 className="text-xs font-medium text-zinc-400">Hospitals</h4>
              </div>
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-12 bg-zinc-800/30 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {hospitals.map((h) => (
                    <div key={h.name} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div className="min-w-0">
                        <p className="text-sm text-white truncate">{h.name}</p>
                        <p className="text-xs text-zinc-500">{h.distance} km</p>
                      </div>
                      <Button variant="outline" size="sm" className="h-7 text-xs border-white/[0.08]">
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Police */}
            <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-blue-500/10 flex items-center justify-center">
                  <ShieldCheck className="h-3 w-3 text-blue-400" />
                </div>
                <h4 className="text-xs font-medium text-zinc-400">Police Stations</h4>
              </div>
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-12 bg-zinc-800/30 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {police.map((p) => (
                    <div key={p.name} className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <div className="min-w-0">
                        <p className="text-sm text-white truncate">{p.name}</p>
                        <p className="text-xs text-zinc-500">{p.distance} km</p>
                      </div>
                      <Button variant="outline" size="sm" className="h-7 text-xs border-white/[0.08]">
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="space-y-3 pb-6"
        >
          <Button
            variant="outline"
            className="w-full h-11 border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] text-zinc-400 hover:text-white"
            onClick={() => router.push("/sos/triage")}
          >
            <Brain className="h-4 w-4 mr-2" />
            AI Triage
          </Button>
          <Button
            variant="destructive"
            className="w-full h-11 bg-red-600/10 text-red-400 hover:bg-red-600/20 border border-red-500/20"
            onClick={() => {/* End SOS */}}
          >
            End Emergency
          </Button>
        </motion.div>
      </div>

      {/* Status Bar */}
      <footer className="border-t border-white/[0.06] py-3">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-6 text-xs text-zinc-600">
          <div className="flex items-center gap-1.5">
            <Circle className="h-2.5 w-2.5 fill-green-500 text-green-500" />
            <span>GPS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wifi className="h-3 w-3" />
            <span>LTE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Battery className="h-3 w-3" />
            <span>87%</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function LiveSOS() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-zinc-500 text-sm">Loading...</div>
      </div>
    }>
      <LiveSOSContent />
    </Suspense>
  );
}
