"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// Helper to render Lucide icons by name
function getIcon(name: string, className: string) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Zap: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 3-9 6V5z" />
    </svg>,
    ShieldAlert: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-2.21 0-4 1.79-4 4 0 2 2.229 4.624 4 5.771 1.771-1.147 4-3.771 4-5.771 0-2.21-1.79-4-4-4zm0 10c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z" />
    </svg>,
    MessageSquare: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>,
    MapPlus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.899 9.45c-.293-.04-.597-.065-.895-.065h-.042C17.418 8.321 15 9.694 15 11.75c0 .511.087 1.009.236 1.486l.366 1.156A11.954 11.954 0 0012.088 21c-1.523 0-2.973-.356-4.28-.91l-.367-1.155a11.943 11.943 0 01-2.364-1.486c0-2.056.418-4.029 1.065-5.756l.154-.485a2.002 2.002 0 011.816-.614zm-6.899-4l.366 1.156c-.102.337-.19.66-.254.955l-.32.29a7.93 7.93 0 00-1.02-.61l-.054-.170a7.93 7.93 0 011.02-.61l.32-.29c.064-.295.152-.578.254-.955l.366-1.156a11.952 11.952 0 012.364-1.486 11.952 11.952 0 002.364-1.486zm0 0l.154-.485a2 2 0 00-1.816-.614l-.367-1.155c-.418-1.726-.772-3.489-.91-5.282-.138-1.793-.138-3.585 0-5.378l.154-.485a2.002 2.002 0 011.816-.614z" />
    </svg>,
  };

  const Icon = icons[name as keyof typeof icons];
  return Icon ? <Icon className={className} /> : null;
}

export default function EmergencyTypeSelect() {
  const router = useRouter();

  const types = [
    {
      id: "medical",
      title: "Medical Emergency",
      description: "Illness, injury, or medical condition requiring immediate attention",
      icon: "Zap",
    },
    {
      id: "safety",
      title: "Personal Safety",
      description: "Threat, harassment, or unsafe situation",
      icon: "ShieldAlert",
    },
    {
      id: "accident",
      title: "Accident",
      description: "Vehicle collision, fall, or other accidental injury",
      icon: "MessageSquare",
    },
    {
      id: "fire",
      title: "Fire",
      description: "Fire, smoke, or explosion requiring emergency response",
      icon: "MapPlus",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-surface/50 backdrop-blur-sm border-b border-zinc-800/20 px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Button variant="outline" size="icon" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <h1 className="text-xl font-semibold text-white">Select Emergency Type</h1>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <p className="text-zinc-300 text-center mb-6">
              Choose the type of emergency to ensure the right responders are notified
            </p>

            <div className="space-y-5">
              {types.map((type) => (
                <motion.div
                  key={type.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: types.indexOf(type) * 0.1 }}
                >
                  <Button
                    variant="outline"
                    className="w-full flex items-center space-x-4 px-6 py-8 text-left border border-zinc-800/50 hover:border-zinc-600/70 hover:bg-zinc-800/30 transition-all duration-200"
                    onClick={() => router.push(`/sos/confirm?type=${type.id}`)}
                  >
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-primary/10 rounded-xl">
                      {getIcon(type.icon, "h-5 w-5 text-primary")}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{type.title}</h3>
                      <p className="text-zinc-400 text-sm">{type.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-zinc-500 transition-transform duration-200"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </motion.div>
  );
}
