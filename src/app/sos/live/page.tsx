"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, UserPlus, Phone, ShieldCheck, Loader2, Radio, Battery, Wifi, Brain, Navigation, ChevronDown, ChevronUp, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const typeLabels: Record<string, string> = {
  medical: "Medical Emergency",
  safety: "Personal Safety",
  accident: "Accident",
  fire: "Fire Emergency",
};

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
  const [expandedResponder, setExpandedResponder] = useState<number | null>(null);

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
    { key: "location-shared", label: "Location Shared", done: status !== "alerting" },
    { key: "responders-notified", label: "Contacts & Responders", done: status === "responders-notified" || status === "help-on-the-way" },
    { key: "help-on-the-way", label: "Help En Route", done: status === "help-on-the-way" },
  ];

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const toggleResponderExpand = useCallback((id: number) => {
    setExpandedResponder(prev => prev === id ? null : id);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <a href="#sos-content" className="skip-link">
        Skip to SOS status
      </a>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <h1 className="text-sm font-semibold text-red-400" aria-live="polite">SOS ACTIVE</h1>
          </div>
          <div className="text-xs font-mono text-zinc-500 bg-white/[0.04] px-2.5 py-1 rounded-lg" aria-label={`Elapsed time: ${formatTime(elapsed)}`}>
            {formatTime(elapsed)}
          </div>
        </div>
      </header>

      <div id="sos-content" className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-4">
        {/* Compact status header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-between mb-4"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
              <Radio className="h-4 w-4 text-red-400 animate-pulse-subtle" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">{typeLabels[type] || "Emergency"}</h2>
              <p className="text-xs text-zinc-500">
                {status === "alerting" && "Alerting nearby responders..."}
                {status === "responders-notified" && "Responders are on the way"}
                {status === "help-on-the-way" && "Help is arriving at your location"}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-1 rounded bg-red-500/20 text-red-400 uppercase tracking-wider">High Priority</span>
        </motion.div>

        {/* Status modules - compact row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="grid grid-cols-4 gap-2 mb-4"
          role="region"
          aria-label="Emergency status overview"
        >
          <div className="p-2.5 rounded-xl border border-blue-500/20 bg-blue-500/5 text-center">
            <MapPin className="h-3.5 w-3.5 text-blue-400 mx-auto mb-1" />
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Location</p>
            <p className="text-xs font-semibold text-blue-400">Shared</p>
          </div>
          <div className="p-2.5 rounded-xl border border-green-500/20 bg-green-500/5 text-center">
            <UserPlus className="h-3.5 w-3.5 text-green-400 mx-auto mb-1" />
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Responders</p>
            <p className="text-xs font-semibold text-green-400">{responders.length} Found</p>
          </div>
          <div className="p-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 text-center">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400 mx-auto mb-1" />
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Contacts</p>
            <p className="text-xs font-semibold text-amber-400">Notified</p>
          </div>
          <div className="p-2.5 rounded-xl border border-purple-500/20 bg-purple-500/5 text-center">
            <Brain className="h-3.5 w-3.5 text-purple-400 mx-auto mb-1" />
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">AI Triage</p>
            <p className="text-xs font-semibold text-purple-400">High</p>
          </div>
        </motion.div>

        {/* Response timeline */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="mb-4"
          role="region"
          aria-label="Response timeline"
        >
          <h3 className="section-heading mb-2.5">Response Timeline</h3>
          <div className="space-y-0">
            {statusSteps.map((step, i) => {
              const isCurrent = (step.key === "alerting") || (step.key === "location-shared" && status === "alerting") || (step.key === "responders-notified" && status === "responders-notified") || (step.key === "help-on-the-way" && status === "help-on-the-way");
              return (
                <div key={step.key} className="flex items-start gap-3" role="listitem">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1 transition-colors duration-300 ${
                      step.done && !isCurrent
                        ? "bg-green-500"
                        : isCurrent
                          ? "bg-red-500 animate-pulse-subtle"
                          : "bg-zinc-700 border border-zinc-600"
                    }`} />
                    {i < statusSteps.length - 1 && (
                      <div className={`w-px h-6 transition-colors duration-300 ${
                        step.done && !isCurrent ? "bg-green-500/30" : "bg-zinc-800"
                      }`} />
                    )}
                  </div>
                  <div className="pb-4">
                    <p className={`text-sm transition-colors duration-300 ${
                      step.done && !isCurrent ? "text-white font-medium" : isCurrent ? "text-zinc-300 font-medium" : "text-zinc-600"
                    }`}>{step.label}</p>
                    {step.done && !isCurrent && (
                      <p className="text-[11px] text-green-500/60 mt-0.5 flex items-center gap-1">
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Done
                      </p>
                    )}
                    {isCurrent && (
                      <p className="text-[11px] text-red-400/80 mt-0.5 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse-subtle" />
                        In progress
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Nearby Responders */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.15 }}
          className="mb-4"
          role="region"
          aria-label="Nearby responders"
        >
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="section-heading">Nearby Responders</h3>
            {!isLoading && <span className="text-[11px] text-zinc-600 font-mono">{responders.length}</span>}
          </div>
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-4 w-4 animate-spin text-zinc-600" aria-label="Loading responders" />
            </div>
          ) : (
            <div className="space-y-1.5">
              <AnimatePresence>
                {responders.map((r) => {
                  const isExpanded = expandedResponder === r.id;
                  return (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                    >
                      <div
                        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/[0.02] transition-colors duration-150"
                        onClick={() => toggleResponderExpand(r.id)}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleResponderExpand(r.id); }}}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isExpanded}
                        aria-label={`${r.name}, ${r.distance} km away, ${r.status === "on-the-way" ? "en route" : "accepting"}`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                          <UserPlus className="h-3.5 w-3.5 text-zinc-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{r.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Navigation className="h-2.5 w-2.5 text-zinc-600" />
                            <p className="text-[11px] text-zinc-500 font-mono">{r.distance} km</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                          r.status === "on-the-way"
                            ? "bg-green-500/10 text-green-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}>
                          {r.status === "on-the-way" ? "En Route" : "Accepting"}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="h-3.5 w-3.5 text-zinc-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5 text-zinc-600 flex-shrink-0" />
                        )}
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-white/[0.04]"
                          >
                            <div className="px-3 py-2.5 space-y-1.5">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500">Distance</span>
                                <span className="text-zinc-300 font-mono">{r.distance} km</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500">Status</span>
                                <span className={r.status === "on-the-way" ? "text-green-400" : "text-amber-400"}>
                                  {r.status === "on-the-way" ? "En route to you" : "Reviewing emergency"}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-zinc-500">ETA</span>
                                <span className="text-zinc-300 font-mono">{r.status === "on-the-way" ? "~3 min" : "Calculating"}</span>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full h-8 text-xs border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] mt-1"
                              >
                                <Phone className="h-3 w-3 mr-1.5" />
                                Call
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.section>

        {/* Nearby Help */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.2 }}
          className="mb-4"
          role="region"
          aria-label="Nearby help facilities"
        >
          <h3 className="section-heading mb-2.5">Nearby Help</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-5 h-5 rounded bg-red-500/10 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-red-400">H</span>
                </div>
                <h4 className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Hospitals</h4>
              </div>
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-10 bg-zinc-800/30 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-1.5">
                  {hospitals.map((h) => (
                    <div key={h.name} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                      <div className="min-w-0">
                        <p className="text-xs text-white truncate">{h.name}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">{h.distance} km</p>
                      </div>
                      <Button variant="outline" size="sm" className="h-7 text-[10px] border-white/[0.08]" aria-label={`Call ${h.name}`}>
                        <Phone className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-5 h-5 rounded bg-blue-500/10 flex items-center justify-center">
                  <ShieldCheck className="h-2.5 w-2.5 text-blue-400" />
                </div>
                <h4 className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Police</h4>
              </div>
              {isLoading ? (
                <div className="space-y-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-10 bg-zinc-800/30 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="space-y-1.5">
                  {police.map((p) => (
                    <div key={p.name} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]">
                      <div className="min-w-0">
                        <p className="text-xs text-white truncate">{p.name}</p>
                        <p className="text-[10px] text-zinc-500 font-mono">{p.distance} km</p>
                      </div>
                      <Button variant="outline" size="sm" className="h-7 text-[10px] border-white/[0.08]" aria-label={`Call ${p.name}`}>
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
          transition={{ duration: 0.25, delay: 0.25 }}
          className="space-y-2 pb-6"
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
            aria-label="End emergency"
          >
            End Emergency
          </Button>
        </motion.div>
      </div>

      {/* Status Bar */}
      <footer className="border-t border-white/[0.06] py-2.5" role="contentinfo">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex items-center justify-center gap-5 text-[11px] text-zinc-600">
          <div className="flex items-center gap-1.5">
            <Circle className="h-2 w-2 fill-green-500 text-green-500" aria-hidden="true" />
            <span>GPS</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wifi className="h-3 w-3" aria-hidden="true" />
            <span>LTE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Battery className="h-3 w-3" aria-hidden="true" />
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
