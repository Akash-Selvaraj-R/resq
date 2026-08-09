"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, HeartPulse, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

// Helper to render Lucide icons by name
function getIconByName(name: string, className: string) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    AlertCircle: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
  };

  const Icon = icons[name as keyof typeof icons];
  return Icon ? <Icon className={className} /> : null;
}

function ConfirmSOSContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "medical";
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const typeInfo: Record<
    string,
    { title: string; description: string; icon: string }
  > = {
    medical: {
      title: "Medical Emergency",
      description: "Illness, injury, or medical condition requiring immediate attention",
      icon: "AlertCircle",
    },
    safety: {
      title: "Personal Safety Emergency",
      description: "Threat, harassment, or unsafe situation",
      icon: "AlertCircle",
    },
    accident: {
      title: "Accident",
      description: "Vehicle collision, fall, or other accidental injury",
      icon: "AlertCircle",
    },
    fire: {
      title: "Fire Emergency",
      description: "Fire, smoke, or explosion requiring emergency response",
      icon: "AlertCircle",
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

  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        router.push(`/sos/live?type=${type}`);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isConfirmed, router, type]);

  if (isConfirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <div className="min-h-screen bg-background flex flex-col">
          <section className="flex-1 flex items-center justify-center px-6 py-12 text-center">
            <div className="space-y-8">
              <div className="flex items-center justify-center space-x-6">
                <motion.div
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <div className="absolute inset-0 bg-primary/20" />
                    <HeartPulse className="h-8 w-8 text-primary" />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="text-left">
                    <h2 className="text-3xl font-bold text-white">
                      SOS Activated
                    </h2>
                    <p className="text-zinc-300 mt-4 max-w-xl">
                      Your emergency has been sent to nearby responders and contacts.
                      Help is on the way.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-surface/50 backdrop-blur-sm border-b border-zinc-800/20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Button variant="outline" size="icon" onClick={() => router.push("/sos/type")}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <h1 className="text-xl font-semibold text-white">Confirm Emergency</h1>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <div className="space-y-8">
                <div className="flex items-center justify-center space-x-6">
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="relative w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="absolute inset-0 bg-primary/20" />
                      <div className="flex h-12 w-12 items-center justify-center bg-primary rounded-full text-white font-bold text-2xl">
                        {countdown}
                      </div>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="text-left">
                      <h2 className="text-3xl font-bold text-white">
                        Confirm {info.title}
                      </h2>
                      <p className="text-zinc-300 mt-4 max-w-xl">
                        {info.description}
                      </p>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Button
                    variant="destructive"
                    className="w-full py-3 text-lg font-medium"
                    onClick={() => setIsConfirmed(true)}
                  >
                    Confirm and Send SOS
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Button
                    variant="outline"
                    className="w-full py-3 text-lg font-medium"
                    onClick={() => router.push("/sos/type")}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Change Type
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}

export default function ConfirmSOS() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-zinc-400">Loading...</div>
      </div>
    }>
      <ConfirmSOSContent />
    </Suspense>
  );
}
