"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { MapPlus, UserPlus, Phone, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

// Helper to render Lucide icons by name
function getIconByName(name: string, className: string) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    MapPlus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 2.499l.848-.848a1.5 1.5 0 011.061-.441h2.39a1.5 1.5 0 011.061.441l.849.848a1.5 1.5 0 001.06.441h2.39a1.5 1.5 0 001.061-.441l.848-.848a1.5 1.5 0 011.061-.441h2.39a1.5 1.5 0 011.06.441l.849.848a1.5 1.5 0 001.06.441h.81a1.5 1.5 0 001.5-1.5v-1.174" />
    </svg>,
    UserPlus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    </svg>,
    Phone: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>,
    ShieldCheck: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>,
  };

  const Icon = icons[name as keyof typeof icons];
  return Icon ? <Icon className={className} /> : null;
}

function LiveSOSContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "medical";
  const [status, setStatus] = useState<"alerting" | "responders-notified" | "help-on-the-way">("alerting");
  const [responders, setResponders] = useState<Array<{ id: number; name: string; distance: number; status: "accepting" | "on-the-way" }>>([]);
  const [hospitals, setHospitals] = useState<Array<{ name: string; distance: number; phone: string }>>([]);
  const [police, setPolice] = useState<Array<{ name: string; distance: number; phone: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const simulateData = () => {
      setTimeout(() => {
        const mockResponders = [
          { id: 1, name: "Alex Rivera", distance: 0.2, status: "accepting" as const },
          { id: 2, name: "Sam Chen", distance: 0.4, status: "accepting" as const },
          { id: 3, name: "Jordan Lee", distance: 0.6, status: "accepting" as const },
        ];
        setResponders(mockResponders);

        const mockHospitals = [
          { name: "City General Hospital", distance: 1.2, phone: "555-0101" },
          { name: "Mercy Medical Center", distance: 2.1, phone: "555-0102" },
        ];
        setHospitals(mockHospitals);

        const mockPolice = [
          { name: "Central Police Station", distance: 0.8, phone: "555-0201" },
          { name: "North District Police", distance: 1.5, phone: "555-0202" },
        ];
        setPolice(mockPolice);

        setTimeout(() => {
          setStatus("responders-notified");

          setTimeout(() => {
            setResponders((prev) => {
              const updated = [...prev];
              if (updated.length > 0) {
                updated[0] = { ...updated[0], status: "on-the-way" };
              }
              return updated;
            });

            setTimeout(() => {
              setStatus("help-on-the-way");
            }, 3000);
          }, 4000);
        }, 3000);

        setIsLoading(false);
      }, 1500);
    };

    simulateData();
  }, [type]);

  const statusInfo: Record<
    string,
    { title: string; description: string; icon: string; color: string }
  > = {
    alerting: {
      title: "Alerting Nearby Responders",
      description: "Your location has been shared with verified responders within 1km",
      icon: "MapPlus",
      color: "primary",
    },
    "responders-notified": {
      title: "Responders Notified",
      description: "Help is on the way - responders are en route to your location",
      icon: "UserPlus",
      color: "primary",
    },
    "help-on-the-way": {
      title: "Help On The Way",
      description: "Responders are arriving at your location. Stay on the line.",
      icon: "ShieldCheck",
      color: "primary",
    },
  };

  const info = statusInfo[status] || statusInfo.alerting;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-surface/50 backdrop-blur-sm border-b border-zinc-800/20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between py-4">
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="icon" onClick={() => router.push(`/sos/confirm?type=${type}`)}>
                <ArrowLeftIcon className="h-4 w-4" /> Back
              </Button>
              <h1 className="text-xl font-semibold text-white">Emergency Active</h1>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button variant="outline" size="icon" onClick={() => {/* Toggle settings */}}>
                <SettingsIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <div className="bg-primary/10 rounded-3xl p-8 mb-10 border border-primary/20">
                <div className="flex items-center space-x-6">
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-primary/20 rounded-full">
                      {getIconByName(info.icon, "h-7 w-7 text-primary")}
                    </div>
                  </motion.div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-primary tracking-tighter">
                      {info.title}
                    </h2>
                    <p className="text-zinc-300 mt-4 max-w-xl text-lg">
                      {info.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <section className="mb-10">
              <h2 className="mb-5 text-lg font-semibold text-white">Nearby Responders</h2>
              <div className="space-y-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
                  </div>
                ) : responders.length === 0 ? (
                  <p className="text-zinc-400 text-center py-10">No responders nearby at the moment</p>
                ) : (
                  <>
                    {responders.map((responder) => (
                      <motion.div
                        key={responder.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="p-6 rounded-2xl border border-zinc-800/30 bg-surface/50 hover:bg-surface/70 transition-colors duration-300 shadow-sm hover:shadow-md">
                          <div className="flex items-center space-x-5">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-primary/10 rounded-xl">
                              {responder.status === "accepting" ? (
                                <UserPlus className="h-5 w-5 text-primary" />
                              ) : (
                                <MapPlus className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-white">{responder.name}</h3>
                              <p className="text-zinc-400 text-sm">
                                {responder.distance.toFixed(1)} km away &bull;
                                <span className={responder.status === "accepting" ? "text-zinc-400" : "text-green-400"}>
                                  {responder.status === "accepting" ? "Accepting" : "On the way"}
                                </span>
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-10 flex items-center justify-center px-4"
                              onClick={() => {/* Handle action */}}
                            >
                              {responder.status === "accepting" ? (
                                <>
                                  <UserPlus className="h-4 w-4 mr-2" /> Accept
                                </>
                              ) : (
                                <>
                                  <MapPlus className="h-4 w-4 mr-2" /> ETA 2min
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="mb-5 text-lg font-semibold text-white">Nearby Help</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="space-y-6">
                    <h3 className="font-semibold text-zinc-200">Hospitals</h3>
                    {isLoading ? (
                      <div className="h-9 w-full bg-zinc-800/30 rounded-xl animate-pulse" />
                    ) : hospitals.length === 0 ? (
                      <p className="text-zinc-400 text-center py-6">No hospitals nearby</p>
                    ) : (
                      <>
                        {hospitals.map((hospital) => (
                          <motion.div
                            key={hospital.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <div className="flex items-center justify-between p-5 rounded-xl border border-zinc-800/20 bg-surface/50 hover:bg-surface/70 transition-colors duration-300 shadow-sm hover:shadow-md">
                              <div className="flex items-center space-x-4">
                                <MapPlus className="h-4 w-4 text-primary" />
                                <div>
                                  <h4 className="font-medium text-white">{hospital.name}</h4>
                                  <p className="text-zinc-400 text-sm">{hospital.distance.toFixed(1)} km away</p>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {/* Call hospital */}}
                              >
                                <Phone className="h-4 w-4" /> Call
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="space-y-6">
                    <h3 className="font-semibold text-zinc-200">Police Stations</h3>
                    {isLoading ? (
                      <div className="h-9 w-full bg-zinc-800/30 rounded-xl animate-pulse" />
                    ) : police.length === 0 ? (
                      <p className="text-zinc-400 text-center py-6">No police stations nearby</p>
                    ) : (
                      <>
                        {police.map((station) => (
                          <motion.div
                            key={station.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <div className="flex items-center justify-between p-5 rounded-xl border border-zinc-800/20 bg-surface/50 hover:bg-surface/70 transition-colors duration-300 shadow-sm hover:shadow-md">
                              <div className="flex items-center space-x-4">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                <div>
                                  <h4 className="font-medium text-white">{station.name}</h4>
                                  <p className="text-zinc-400 text-sm">{station.distance.toFixed(1)} km away</p>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {/* Call police */}}
                              >
                                <Phone className="h-4 w-4" /> Call
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            </section>

            <div className="mt-10 space-y-6">
              <Button
                variant="destructive"
                className="w-full py-5 text-lg font-medium"
                onClick={() => {/* End SOS */}}
              >
                End Emergency
              </Button>
              <Button
                variant="outline"
                className="w-full py-5 text-lg font-medium"
                onClick={() => router.push(`/sos/triage`)}
              >
                AI Triage
              </Button>
            </div>
          </div>
        </div>

        <footer className="bg-surface/50 backdrop-blur-sm border-t border-zinc-800/20">
          <div className="max-w-7xl mx-auto px-6 py-4 text-center text-zinc-500 text-sm">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <CircleIcon className="h-3 w-3 bg-green-400" />
                <span>GPS: Strong</span>
              </div>
              <div className="flex items-center space-x-2">
                <SignalIcon className="h-3 w-3" />
                <span>Network: LTE</span>
              </div>
              <div className="flex items-center space-x-2">
                <BatteryIcon className="h-3 w-3" />
                <span>Battery: 87%</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </motion.div>
  );
}

export default function LiveSOS() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-zinc-400">Loading...</div>
      </div>
    }>
      <LiveSOSContent />
    </Suspense>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function CircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function SignalIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
    </svg>
  );
}

function BatteryIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
    </svg>
  );
}
