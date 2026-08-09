"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, CheckCircle2, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Helper to render Lucide icons by name
function getIconByName(name: string, className: string) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    AlertTriangle: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    CheckCircle2: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-5.618 4.016M12 20a8 8 0 100-16 8 8 0 000 16z" />
    </svg>,
    Activity: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M20 12a7.93 7.93 0 00-4.64-3.23A5.92 5.92 0 0010 9H8a5.92 5.92 0 000 11.59c0 .308.01.613.03.916a5.09 5.09 0 013.29 2.91c.995-.068 1.981-.031 2.953-.08a5.06 5.06 0 015.05 3.82" />
    </svg>,
  };

  const Icon = icons[name as keyof typeof icons];
  return Icon ? <Icon className={className} /> : null;
}

export default function Triage() {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<{ severity: string; steps: string[] } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeDescription = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock AI response based on keywords
    const lowerDesc = description.toLowerCase();
    let severity: string;
    let steps: string[];

    if (lowerDesc.includes("chest pain") || lowerDesc.includes("heart") || lowerDesc.includes("cannot breathe")) {
      severity = "Critical";
      steps = [
        "Call emergency services immediately if not already done",
        "Have the person sit down, rest, and try to stay calm",
        "Loosen any tight clothing",
        "If the person has prescribed chest medication (like nitroglycerin), help them take it",
        "If the person becomes unconscious, be prepared to perform CPR"
      ];
    } else if (lowerDesc.includes("bleeding") || lowerDesc.includes("cut") || lowerDesc.includes("wound")) {
      severity = "High";
      steps = [
        "Apply direct pressure to the wound with a clean cloth",
        "Elevate the injured area above the heart if possible",
        "If bleeding doesn't stop with direct pressure, apply a tourniquet above the wound (if trained)",
        "Seek medical attention immediately",
        "Keep the person warm and still"
      ];
    } else if (lowerDesc.includes("fire") || lowerDesc.includes("smoke")) {
      severity = "Critical";
      steps = [
        "Evacuate the area immediately",
        "Call emergency services from a safe location",
        "Do not re-enter the building until declared safe by firefighters",
        "If clothing catches fire, stop, drop, and roll",
        "Cover nose and mouth with a cloth to reduce smoke inhalation"
      ];
    } else if (lowerDesc.includes("unconscious") || lowerDesc.includes("unresponsive")) {
      severity = "Critical";
      steps = [
        "Check for responsiveness and breathing",
        "If not breathing, begin CPR if trained",
        "Call emergency services immediately",
        "If breathing normally, place in recovery position and monitor",
        "Do not give anything to eat or drink"
      ];
    } else if (lowerDesc.includes("fall") || lowerDesc.includes("injury") || lowerDesc.includes("pain")) {
      severity = "Medium";
      steps = [
        "Do not move the person if you suspect spinal injury",
        "Check for consciousness and breathing",
        "Apply ice to swollen areas (if no open wound)",
        "Immobilize the injured area",
        "Seek medical attention to rule out fractures or internal injury"
      ];
    } else {
      severity = "Low";
      steps = [
        "Monitor the situation closely",
        "Provide basic first aid if needed and you are trained",
        "Encourage the person to rest and stay hydrated",
        "If symptoms worsen, seek medical attention",
        "Keep emergency services updated on any changes"
      ];
    }

    setResult({ severity, steps });
    setIsAnalyzing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-surface/50 backdrop-blur-sm border-b border-zinc-800/20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <h1 className="text-xl font-semibold text-white">AI Triage Assistant</h1>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <form className="space-y-7" onSubmit={(e) => {
                e.preventDefault();
                if (description.trim()) {
                  analyzeDescription();
                }
              }}>
                <div className="space-y-5">
                  <div className="flex items-center space-x-4">
                    <Activity className="h-6 w-6 text-primary" />
                    <div>
                      <h2 className="text-2xl font-semibold text-white">
                        Describe the Situation
                      </h2>
                      <p className="text-zinc-300 mt-2">
                        Briefly describe what happened or what symptoms are present.
                        Our AI will provide an initial assessment and immediate steps.
                      </p>
                    </div>
                  </div>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the emergency situation (e.g., chest pain, bleeding, fall, etc.)..."
                    className="w-full"
                    rows={5}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full py-4 text-lg font-medium"
                  disabled={isAnalyzing || !description.trim()}
                >
                  {isAnalyzing ? "Analyzing..." : "Get Triage Assessment"}
                </Button>
              </form>

              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="border-border">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4">
                        {result.severity === "Critical" ? (
                          <AlertTriangle className="h-6 w-6 text-red-400" />
                        ) : result.severity === "High" ? (
                          <AlertTriangle className="h-6 w-6 text-orange-400" />
                        ) : result.severity === "Medium" ? (
                          <Activity className="h-6 w-6 text-yellow-400" />
                        ) : (
                          <CheckCircle2 className="h-6 w-6 text-green-400" />
                        )}
                        <div>
                          <h2 className="text-2xl font-bold text-white">
                            Assessment: {result.severity}
                          </h2>
                          <p className="text-zinc-300 mt-2">
                            This is an automated assessment. Always follow emergency services instructions.
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h3 className="font-semibold text-zinc-200 mb-4">Immediate Steps:</h3>
                      <div className="space-y-3">
                        {result.steps.map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                          >
                            <div className="flex items-start space-x-4">
                              <CheckCircle2 className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                              <p className="text-zinc-300">{step}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}

// Reusable ArrowLeft icon
function ArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  );
}