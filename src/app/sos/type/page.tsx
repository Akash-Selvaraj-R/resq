import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPulse, MessageSquare, ShieldAlert, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmergencyTypeSelect() {
  const router = useRouter();

  const types = [
    {
      id: "medical",
      title: "Medical Emergency",
      description: "Illness, injury, or medical condition requiring immediate attention",
      icon: Zap,
    },
    {
      id: "safety",
      title: "Personal Safety",
      description: "Threat, harassment, or unsafe situation",
      icon: ShieldAlert,
    },
    {
      id: "accident",
      title: "Accident",
      description: "Vehicle collision, fall, or other accidental injury",
      icon: MessageSquare,
    },
    {
      id: "fire",
      title: "Fire",
      description: "Fire, smoke, or explosion requiring emergency response",
      icon: MapPulse,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl space-y-8">
          <h2 className="text-3xl font-bold text-white text-center">
            Select Emergency Type
          </h2>
          <p className="text-zinc-300 text-center">
            Choose the type of emergency to ensure the right responders are notified
          </p>
          <div className="grid gap-6">
            {types.map((type) => (
              <Button
                key={type.id}
                variant="outline"
                className="w-full flex items-center space-x-4 px-6 py-8 text-left border border-zinc-800/50 hover:border-zinc-600/70"
                onClick={() => router.push(`/sos/confirm?type=${type.id}`)}
              >
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-primary/10 rounded-lg">
                  <type.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{type.title}</h3>
                  <p className="text-zinc-400 text-sm">{type.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </Button>
            ))}
          </div>
          <Button
            className="w-full mt-6"
            asChild
          >
            <a href="/" className="flex items-center justify-center w-full">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Simple icon components for now
function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
    </svg>
  );
}

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
