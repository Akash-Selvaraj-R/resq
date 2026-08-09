import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, HeartPulse, MapPulse } from "lucide-react";
import { Motion } from "framer-motion";

export default function ConfirmSOS() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "medical";
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // Map type to display name and icon
  const typeInfo: Record<
    string,
    { title: string; description: string; icon: React.ComponentType<{ className?: string }> }
  > = {
    medical: {
      title: "Medical Emergency",
      description: "Illness, injury, or medical condition requiring immediate attention",
      icon: AlertCircle,
    },
    safety: {
      title: "Personal Safety Emergency",
      description: "Threat, harassment, or unsafe situation",
      icon: AlertCircle,
    },
    accident: {
      title: "Accident",
      description: "Vehicle collision, fall, or other accidental injury",
      icon: AlertCircle,
    },
    fire: {
      title: "Fire Emergency",
      description: "Fire, smoke, or explosion requiring emergency response",
      icon: AlertCircle,
    },
  };

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

  if (isConfirmed) {
    // Simulate sending SOS and redirect to live page after a short delay
    useEffect(() => {
      const timer = setTimeout(() => {
        router.push(`/sos/live?type=${type}`);
      }, 1500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Motion
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <section className="flex-1 flex items-center justify-center px-6 py-12 text-center">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-4">
                <info.icon className="h-10 w-10 text-primary" />
                <Motion
                  whileInitiate={{ scale: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <button className="relative w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-primary/30" />
                    <HeartPulse className="h-6 w-6 text-primary" />
                  </button>
                </Motion>
              </div>
              <h2 className="text-3xl font-bold text-white">
                SOS Activated
              </h2>
              <p className="text-zinc-300 max-w-xl">
                Your emergency has been sent to nearby responders and contacts.
                Help is on the way.
              </p>
            </div>
          </section>
        </Motion>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Motion
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <section className="flex-1 flex items-center justify-center px-6 py-12 text-center">
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <info.icon className="h-10 w-10 text-primary" />
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 rounded-full" />
                <div className="relative z-10 flex h-12 w-12 items-center justify-center bg-primary rounded-full text-white font-bold">
                  {countdown}
                </div>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Confirm {info.title}
            </h2>
            <p className="text-zinc-300 max-w-xl">
              {info.description}
            </p>
            <Button
              className="w-full mt-6"
              variant="destructive"
              onClick={() => setIsConfirmed(true)}
            >
              Confirm and Send SOS
            </Button>
            <Button
              className="w-full mt-4"
              variant="outline"
              asChild
            >
              <a href="/sos/type" className="flex items-center justify-center w-full">
                <ArrowLeft className="mr-2 h-4 w-4" /> Change Type
              </a>
            </Button>
          </div>
        </section>
      </Motion>
    </div>
  );
}

// Reuse icon components from previous file
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
