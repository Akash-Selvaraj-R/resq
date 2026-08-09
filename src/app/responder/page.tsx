"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, ShieldCheck, Phone, Loader2, Clock, Navigation, AlertTriangle, HeartPulse, Flame } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const statusColors: Record<string, { bg: string; text: string; border: string; label: string }> = {
  alerting: { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/20", label: "Alerting" },
  "responders-notified": { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", label: "Responding" },
  "help-on-the-way": { bg: "bg-green-500/10", text: "text-green-400", border: "border-green-500/20", label: "En Route" },
};

const typeConfig: Record<string, { title: string; icon: typeof MapPin; color: string; bg: string }> = {
  medical: { title: "Medical", icon: HeartPulse, color: "text-red-400", bg: "bg-red-500/10" },
  safety: { title: "Safety", icon: ShieldCheck, color: "text-amber-400", bg: "bg-amber-500/10" },
  accident: { title: "Accident", icon: AlertTriangle, color: "text-blue-400", bg: "bg-blue-500/10" },
  fire: { title: "Fire", icon: Flame, color: "text-orange-400", bg: "bg-orange-500/10" },
};

export default function ResponderDashboard() {
  const [activeSOS, setActiveSOS] = useState<Array<{
    id: number;
    type: string;
    name: string;
    distance: number;
    status: "alerting" | "responders-notified" | "help-on-the-way";
    location: { lat: number; lng: number };
    time: string;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActiveSOS = () => {
      setTimeout(() => {
        setActiveSOS([
          { id: 1, type: "medical", name: "Alex Rivera", distance: 0.2, status: "alerting", location: { lat: 40.7128, lng: -74.006 }, time: "Just now" },
          { id: 2, type: "safety", name: "Sam Chen", distance: 0.5, status: "responders-notified", location: { lat: 40.713, lng: -74.007 }, time: "2m ago" },
          { id: 3, type: "accident", name: "Jordan Lee", distance: 0.8, status: "help-on-the-way", location: { lat: 40.714, lng: -74.008 }, time: "5m ago" },
        ]);
        setIsLoading(false);
      }, 1500);
    };
    fetchActiveSOS();
  }, []);

  const handleAccept = (id: number) => {
    setActiveSOS((prev) => prev.map((sos) => sos.id === id ? { ...sos, status: "responders-notified" } : sos));
  };

  const handleOnTheWay = (id: number) => {
    setActiveSOS((prev) => prev.map((sos) => sos.id === id ? { ...sos, status: "help-on-the-way" } : sos));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-sm font-medium text-white">Responder Dashboard</h1>
          <div className="w-12" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-4 gap-2 mb-6"
        >
          {[
            { label: "Active", value: activeSOS.length, color: "text-white", bg: "bg-white/[0.04]", border: "border-white/[0.08]" },
            { label: "Alerting", value: activeSOS.filter((s) => s.status === "alerting").length, color: "text-red-400", bg: "bg-red-500/5", border: "border-red-500/10" },
            { label: "Responding", value: activeSOS.filter((s) => s.status === "responders-notified").length, color: "text-amber-400", bg: "bg-amber-500/5", border: "border-amber-500/10" },
            { label: "En Route", value: activeSOS.filter((s) => s.status === "help-on-the-way").length, color: "text-green-400", bg: "bg-green-500/5", border: "border-green-500/10" },
          ].map((stat) => (
            <div key={stat.label} className={`p-3 rounded-xl border ${stat.border} ${stat.bg} text-center`}>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* SOS List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-5 w-5 animate-spin text-zinc-600" />
          </div>
        ) : activeSOS.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-7 w-7 text-zinc-600" />
            </div>
            <p className="text-sm font-medium text-zinc-500">No active SOS requests</p>
            <p className="text-xs text-zinc-600 mt-1">You&apos;ll be notified when someone needs help</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeSOS.map((sos, i) => {
              const tConfig = typeConfig[sos.type] || typeConfig.medical;
              const statusInfo = statusColors[sos.status];
              const TypeIcon = tConfig.icon;
              return (
                <motion.div
                  key={sos.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.06 }}
                  className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl ${tConfig.bg} flex items-center justify-center`}>
                        <TypeIcon className={`h-5 w-5 ${tConfig.color}`} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{sos.name}</h3>
                        <p className="text-xs text-zinc-500">{tConfig.title} Emergency</p>
                      </div>
                    </div>
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-lg ${statusInfo.bg} ${statusInfo.text} border ${statusInfo.border}`}>
                      {statusInfo.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mb-3 text-xs text-zinc-500">
                    <div className="flex items-center gap-1">
                      <Navigation className="h-3 w-3" />
                      <span>{sos.distance} km away</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{sos.time}</span>
                    </div>
                  </div>

                  {/* Map placeholder */}
                  <div className="h-20 rounded-xl bg-zinc-800/30 border border-white/[0.04] mb-3 flex items-center justify-center">
                    <div className="flex items-center gap-2 text-zinc-600">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="text-[11px]">Live Location</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05]"
                      onClick={() => handleAccept(sos.id)}
                      disabled={sos.status !== "alerting"}
                    >
                      {sos.status === "alerting" ? "Accept" : "Accepted"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 h-8 text-xs border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05]"
                      onClick={() => handleOnTheWay(sos.id)}
                      disabled={sos.status === "alerting"}
                    >
                      {sos.status === "responders-notified" ? "On the Way" : "En Route"}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05]"
                    >
                      <Phone className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
