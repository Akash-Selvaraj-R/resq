import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, CheckCircle2, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Motion } from "framer-motion";

export default function Triage() {
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
    <div className="min-h-screen bg-background">
      <header className="bg-surface/50 backdrop-blur-sm border-b border-zinc-800/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">AI Triage Assistant</h1>
          <Button variant="outline" size="icon" aria-label="Back to Emergency">
            <ArrowLeft className="h-4 w-4" onClick={() => {/* Go back to live SOS */}} />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            if (description.trim()) {
              analyzeDescription();
            }
          }}>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Activity className="h-5 w-5 text-primary" />
                <div>
                  <h2 className="font-semibold text-white">Describe the Situation</h2>
                  <p className="text-zinc-300 text-sm">
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
                minRows={4}
                maxRows={6}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={isAnalyzing || !description.trim()}
            >
              {isAnalyzing ? "Analyzing..." : "Get Triage Assessment"}
            </Button>
          </form>

          {result && (
            <Motion
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="border-border">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {result.severity === "Critical" ? (
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    ) : result.severity === "High" ? (
                      <AlertTriangle className="h-5 w-5 text-orange-400" />
                    ) : result.severity === "Medium" ? (
                      <Activity className="h-5 w-5 text-yellow-400" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    )}
                    <div>
                      <h2 className="text-white font-semibold">Assessment: {result.severity}</h2>
                      <p className="text-zinc-300 text-sm">
                        This is an automated assessment. Always follow emergency services instructions.
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="font-semibold text-zinc-200">Immediate Steps:</h3>
                  <div className="space-y-3">
                    {result.steps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle2 className="h-3 w-3 mt-1 text-primary flex-shrink-0" />
                        <p className="text-zinc-300">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Motion>
          )}
        </div>
      </main>

      {/* Reusable ArrowLeft icon - positioned at bottom left for mobile */}
      <ArrowLeft className="fixed bottom-4 left-4 h-5 w-5 text-zinc-400" onClick={() => {/* Go back to live SOS */}} />
    </div>
  );
}

// Reusable ArrowLeft icon
function ArrowLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  );
}