"use client";
import { motion } from "framer-motion";
import { HeartPulse, MapPin, ShieldCheck, UserPlus, Brain, ArrowRight, ChevronRight, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Live Location",
    description: "Instantly share your precise GPS coordinates with responders in real-time",
    icon: MapPin,
    accent: "text-blue-400",
    accentBg: "bg-blue-500/10",
  },
  {
    number: "02",
    title: "Verified Responders",
    description: "Trained professionals nearby ready to assist when seconds count",
    icon: ShieldCheck,
    accent: "text-green-400",
    accentBg: "bg-green-500/10",
  },
  {
    number: "03",
    title: "Emergency Contacts",
    description: "Automatically notify your trusted network with one tap",
    icon: UserPlus,
    accent: "text-amber-400",
    accentBg: "bg-amber-500/10",
  },
  {
    number: "04",
    title: "AI Triage",
    description: "Intelligent severity assessment and immediate life-saving guidance",
    icon: Brain,
    accent: "text-purple-400",
    accentBg: "bg-purple-500/10",
  },
];

const flowSteps = [
  { label: "SOS", icon: Zap, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
  { label: "Location", icon: MapPin, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { label: "AI Triage", icon: Brain, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { label: "Contacts", icon: UserPlus, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { label: "Responders", icon: ShieldCheck, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  { label: "Help", icon: HeartPulse, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
              <HeartPulse className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold text-white tracking-tight">ResQ</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/responder"
              className="text-xs font-medium text-zinc-500 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition-all duration-200"
            >
              Responders
            </Link>
            <Link
              href="/contacts"
              className="text-xs font-medium text-zinc-500 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition-all duration-200"
            >
              Contacts
            </Link>
            <Link
              href="/settings"
              className="text-xs font-medium text-zinc-500 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/[0.04] transition-all duration-200"
            >
              Settings
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative">
        {/* Subtle gradient backgrounds */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/15 via-background to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.06),transparent_60%)] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-20 sm:pb-32">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-xs font-medium tracking-wider uppercase text-zinc-400">Live Emergency Response</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
              Help, when every<br />
              <span className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">second matters.</span>
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              ResQ shares your live location, alerts emergency contacts and verified
              responders, identifies nearby help, and provides AI-assisted triage —
              all with one tap.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20"
          >
            <button
              onClick={() => router.push("/sos/type")}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-red-600 text-white font-semibold text-base hover:bg-red-700 transition-all duration-200 shadow-lg shadow-red-900/30 animate-glow-pulse"
              aria-label="Activate SOS"
            >
              <HeartPulse className="h-5 w-5" />
              Activate SOS
              <ArrowRight className="h-4 w-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
            </button>
            <button
              onClick={() => {
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-zinc-300 font-medium text-sm hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-200"
            >
              How ResQ Works
              <ChevronRight className="h-4 w-4" />
            </button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-24"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.08 }}
                className="group p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className={`w-10 h-10 rounded-xl ${feature.accentBg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}>
                  <feature.icon className={`h-5 w-5 ${feature.accent}`} />
                </div>
                <span className="text-[10px] font-mono text-zinc-600 tracking-wider">{feature.number}</span>
                <h3 className="text-sm font-semibold text-white mt-1 mb-1.5">{feature.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Flow Diagram */}
          <motion.div
            id="how-it-works"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-xl font-semibold text-white mb-2">How ResQ Works</h2>
              <p className="text-sm text-zinc-500">From SOS to help in seconds</p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {/* Desktop: horizontal flow */}
              <div className="hidden sm:flex items-center justify-between relative">
                {/* Connecting line */}
                <div className="absolute top-8 left-[10%] right-[10%] h-px">
                  <div className="w-full h-full bg-gradient-to-r from-white/[0.04] via-white/[0.12] to-white/[0.04]" />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-white/[0.08] to-green-500/20 animate-shimmer" />
                </div>

                {flowSteps.map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                    className="relative flex flex-col items-center gap-3 z-10"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-105 transition-transform duration-300`}>
                      <step.icon className={`h-6 w-6 ${step.color}`} />
                    </div>
                    <span className="text-xs font-medium text-zinc-400 text-center whitespace-nowrap">
                      {step.label}
                    </span>
                    {i < flowSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 -right-4 w-3 h-px bg-white/[0.12]" />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Mobile: vertical flow */}
              <div className="sm:hidden space-y-1">
                {flowSteps.map((step, i) => (
                  <motion.div
                    key={step.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.06 }}
                    className="flex items-center gap-4"
                  >
                    <div className={`w-12 h-12 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center flex-shrink-0`}>
                      <step.icon className={`h-5 w-5 ${step.color}`} />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-white">{step.label}</span>
                    </div>
                    {i < flowSteps.length - 1 && (
                      <div className="w-px h-6 bg-white/[0.08] ml-6" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center">
                <HeartPulse className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-sm font-bold text-white">ResQ</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/contacts" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Contacts</Link>
              <Link href="/responder" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Responders</Link>
              <Link href="/settings" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Settings</Link>
            </div>
            <p className="text-xs text-zinc-600">Emergency response technology</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
