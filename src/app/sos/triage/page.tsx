"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, AlertTriangle, CheckCircle2, Activity, Loader2, Brain, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const severityConfig: Record<string, { color: string; bg: string; border: string; icon: typeof AlertTriangle }> = {
  Critical: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", icon: AlertTriangle },
  High: { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", icon: AlertTriangle },
  Medium: { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", icon: Activity },
  Low: { color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", icon: CheckCircle2 },
};

export default function Triage() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<{ severity: string; steps: string[] } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeDescription = async () => {
    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lowerDesc = description.toLowerCase();
    let severity: string;
    let steps: string[];

    if (lowerDesc.includes("chest pain") || lowerDesc.includes("heart") || lowerDesc.includes("cannot breathe")) {
      severity = "Critical";
      steps = [
        "Call emergency services immediately if not already done",
        "Have the person sit down, rest, and try to stay calm",
        "Loosen any tight clothing",
        "If prescribed chest medication is available, help them take it",
        "If the person becomes unconscious, be prepared to perform CPR",
      ];
    } else if (lowerDesc.includes("bleeding") || lowerDesc.includes("cut") || lowerDesc.includes("wound")) {
      severity = "High";
      steps = [
        "Apply direct pressure to the wound with a clean cloth",
        "Elevate the injured area above the heart if possible",
        "If bleeding doesn't stop, apply a tourniquet above the wound (if trained)",
        "Seek medical attention immediately",
        "Keep the person warm and still",
      ];
    } else if (lowerDesc.includes("fire") || lowerDesc.includes("smoke")) {
      severity = "Critical";
      steps = [
        "Evacuate the area immediately",
        "Call emergency services from a safe location",
        "Do not re-enter until declared safe by firefighters",
        "If clothing catches fire: stop, drop, and roll",
        "Cover nose and mouth to reduce smoke inhalation",
      ];
    } else if (lowerDesc.includes("unconscious") || lowerDesc.includes("unresponsive")) {
      severity = "Critical";
      steps = [
        "Check for responsiveness and breathing",
        "If not breathing, begin CPR if trained",
        "Call emergency services immediately",
        "If breathing normally, place in recovery position",
        "Do not give anything to eat or drink",
      ];
    } else if (lowerDesc.includes("fall") || lowerDesc.includes("injury") || lowerDesc.includes("pain")) {
      severity = "Medium";
      steps = [
        "Do not move the person if spinal injury is suspected",
        "Check for consciousness and breathing",
        "Apply ice to swollen areas (if no open wound)",
        "Immobilize the injured area",
        "Seek medical attention to rule out fractures",
      ];
    } else {
      severity = "Low";
      steps = [
        "Monitor the situation closely",
        "Provide basic first aid if trained",
        "Encourage the person to rest and stay hydrated",
        "If symptoms worsen, seek medical attention",
        "Keep emergency services updated on changes",
      ];
    }

    setResult({ severity, steps });
    setIsAnalyzing(false);
  };

  const config = result ? severityConfig[result.severity] || severityConfig.Low : null;

  return (
    <div className="min-h-screen bg-background">
      <a href="#triage-content" className="skip-link">
        Skip to AI triage
      </a>

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <h1 className="text-sm font-medium text-white">AI Triage</h1>
          <div className="w-12" />
        </div>
      </header>

      <main id="triage-content" className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Brain className="h-5 w-5 text-purple-400" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">Describe the Situation</h2>
              <p className="text-xs text-zinc-500">Get an initial assessment and immediate steps.</p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (description.trim()) analyzeDescription();
            }}
            className="space-y-3"
          >
            <div className="relative">
              <label htmlFor="triage-description" className="sr-only">Describe the emergency situation</label>
              <Textarea
                id="triage-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what happened or symptoms present..."
                className="w-full min-h-[120px] rounded-2xl border-white/[0.08] bg-white/[0.02] text-white placeholder:text-zinc-600 focus:border-purple-500/30 focus:ring-0 resize-none text-sm leading-relaxed"
                rows={4}
                aria-describedby="char-count"
              />
              {description.length > 0 && (
                <div id="char-count" className="absolute bottom-3 right-3 text-[10px] text-zinc-600 font-mono" aria-live="polite">
                  {description.length}
                </div>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-11 bg-white text-zinc-950 hover:bg-white/90 font-medium transition-all duration-150 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              disabled={isAnalyzing || !description.trim()}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" aria-hidden="true" />
                  Analyze Situation
                </>
              )}
            </Button>
          </form>
        </motion.div>

        <AnimatePresence>
          {result && config && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
              role="region"
              aria-label="AI assessment results"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded bg-purple-500/10 flex items-center justify-center">
                  <Brain className="h-3 w-3 text-purple-400" aria-hidden="true" />
                </div>
                <span className="section-heading text-purple-400">AI Assessment Complete</span>
              </div>

              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${config.bg} border ${config.border} mb-4`}>
                <config.icon className={`h-4 w-4 ${config.color}`} aria-hidden="true" />
                <span className={`text-sm font-semibold ${config.color}`}>Severity: {result.severity}</span>
              </div>

              <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] mb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Shield className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                  <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">Recommended Response</span>
                </div>
                <p className="text-sm text-white font-medium">
                  {result.severity === "Critical" && "Immediate medical attention required"}
                  {result.severity === "High" && "Urgent medical attention recommended"}
                  {result.severity === "Medium" && "Medical evaluation suggested"}
                  {result.severity === "Low" && "Monitor and provide basic care"}
                </p>
              </div>

              <h3 className="section-heading mb-2">Assessment Steps</h3>
              <p className="text-[11px] text-zinc-600 mb-3">Automated assessment. Always follow emergency services instructions.</p>

              <div className="space-y-1.5" role="list" aria-label="Recommended steps">
                {result.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                    role="listitem"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded bg-white/[0.06] flex items-center justify-center text-[10px] font-mono text-zinc-500" aria-hidden="true">
                      {i + 1}
                    </span>
                    <p className="text-sm text-zinc-300 leading-relaxed">{step}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
