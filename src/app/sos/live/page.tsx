import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPulse, UserPlus, Phone, ShieldCheck, MessageSquare, Loader2 } from "lucide-react";
import { Motion, AnimatePresence } from "framer-motion";

// Helper to render Lucide icons by name
function getIconByName(name: string, className: string) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    MapPulse: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.899 9.45c-.293-.04-.597-.065-.895-.065h-.042C17.418 8.321 15 9.694 15 11.75c0 .511.087 1.009.236 1.486l.366 1.156A11.954 11.954 0 0012.088 21c-1.523 0-2.973-.356-4.28-.91l-.367-1.155a11.943 11.943 0 01-2.364-1.486c0-2.056.418-4.029 1.065-5.756l.154-.485a2.002 2.002 0 011.816-.614zm-6.899-4l.366 1.156c-.102.337-.19.66-.254.955l-.32.29a7.93 7.93 0 00-1.02-.61l-.054-.170a7.93 7.93 0 011.02-.61l.32-.29c.064-.295.152-.578.254-.955l.366-1.156a11.952 11.952 0 012.364-1.486 11.952 11.952 0 002.364-1.486zm0 0l.154-.485a2 2 0 00-1.816-.614l-.367-1.155c-.418-1.726-.772-3.489-.91-5.282-.138-1.793-.138-3.585 0-5.378l.154-.485a2.002 2.002 0 001.816-.614z" />
    </svg>,
    UserPlus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11v2a4 4 0 01-8 0v-2m-1.5 8h3m0-3v3a9 9 0 1018 0v-3m-1.5 8H9a9 9 0 01-9-9v-5a9 9 0 0118 0v5z" />
    </svg>,
    Phone: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 3h2a4 4 0 004 4v10a4 4 0 00-4 4H2a4 4 0 00-4-4V7a4 4 0 004-4zm0 0h2a2 2 0 002 2v6a2 2 0 00-2 2H2a2 2 0 002-2v-6a2 2 0 002-2zm10-1a9 9 0 11-9 9 9 9 0 019-9z" />
    </svg>,
    ShieldCheck: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.207 8.207a3 3 0 014.242 0m-3.207 5A5.002 5.002 0 0112 5a5.002 5.002 0 016.793 4.293m-1.293-2.293A6.972 6.972 0 0010.505 15.494a6.972 6.972 0 00-4.293 1.707" />
    </svg>,
  };

  const Icon = icons[name as keyof typeof icons];
  return Icon ? <Icon className={className} /> : null;
}

export default function LiveSOS() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "medical";
  const [status, setStatus] = useState<"alerting" | "responders-notified" | "help-on-the-way">("alerting");
  const [responders, setResponders] = useState<Array<{ id: number; name: string; distance: number; status: "accepting" | "on-the-way" }>>([]);
  const [hospitals, setHospitals] = useState<Array<{ name: string; distance: number; phone: string }>>([]);
  const [police, setPolice] = useState<Array<{ name: string; distance: number; phone: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    // Simulate loading state
    setIsLoading(true);

    // Simulate fetching nearby responders, hospitals, police
    const simulateData = () => {
      setTimeout(() => {
        // Mock responders
        const mockResponders = [
          { id: 1, name: "Alex Rivera", distance: 0.2, status: "accepting" },
          { id: 2, name: "Sam Chen", distance: 0.4, status: "accepting" },
          { id: 3, name: "Jordan Lee", distance: 0.6, status: "accepting" },
        ];
        setResponders(mockResponders);

        // Mock hospitals
        const mockHospitals = [
          { name: "City General Hospital", distance: 1.2, phone: "555-0101" },
          { name: "Mercy Medical Center", distance: 2.1, phone: "555-0102" },
        ];
        setHospitals(mockHospitals);

        // Mock police stations
        const mockPolice = [
          { name: "Central Police Station", distance: 0.8, phone: "555-0201" },
          { name: "North District Police", distance: 1.5, phone: "555-0202" },
        ];
        setPolice(mockPolice);

        // Simulate status progression
        setTimeout(() => {
          setStatus("responders-notified");

          // Simulate one responder accepting
          setTimeout(() => {
            const updatedResponders = [...responders];
            updatedResponders[0] = { ...updatedResponders[0], status: "on-the-way" };
            setResponders(updatedResponders);

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

  // Map status to display info
  const statusInfo: Record<
    string,
    { title: string; description: string; icon: keyof typeof icons; color: string }
  > = {
    alerting: {
      title: "Alerting Nearby Responders",
      description: "Your location has been shared with verified responders within 1km",
      icon: "MapPulse",
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
    <Motion
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="bg-surface/50 backdrop-blur-sm border-b border-zinc-800/20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between py-4">
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="icon" onClick={() => router.push(`/sos/confirm?type=${type}`)}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <h1 className="text-xl font-semibold text-white">Emergency Active</h1>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button variant="outline" size="icon" onClick={() => {/* Toggle settings */}}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col">
            {/* Status Banner */}
            <Motion
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <div className={`bg-${info.color}/10 rounded-2xl p-6 mb-8 border border-${info.color}/20`}>
                <div className="flex items-center space-x-5">
                  <Motion
                    whileInitiate={{ scale: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-primary/20 rounded-xl">
                      {getIconByName(info.icon, "h-6 w-6 text-primary")}
                    </div>
                  </Motion>
                  <div className="flex-1">
                    <h2 className={`text-2xl font-bold text-${info.color}`}>
                      {info.title}
                    </h2>
                    <p className="text-zinc-300 mt-2 max-w-xl">
                      {info.description}
                    </p>
                  </div>
                </div>
              </div>
            </Motion>

            {/* Responders List */}
            <section className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-white">Nearby Responders</h2>
              <div className="space-y-5">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
                  </div>
                ) : responders.length === 0 ? (
                  <p className="text-zinc-400 text-center py-8">No responders nearby at the moment</p>
                ) : (
                  <>
                    {responders.map((responder) => (
                      <Motion
                        key={responder.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className={`p-5 rounded-2xl border border-zinc-800/30 bg-surface/50 hover:bg-surface/70 transition-colors duration-200`}>
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 h-9 w-9 flex items-center justify-center bg-primary/10 rounded-xl">
                              {responder.status === "accepting" ? (
                                <UserPlus className="h-5 w-5 text-primary" />
                              ) : (
                                <MapPulse className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-white">{responder.name}</h3>
                              <p className="text-zinc-400 text-sm">
                                {responder.distance.toFixed(1)} km away •
                                <span className={`${responder.status === "accepting" ? "text-zinc-400" : "text-green-400"`}>
                                  {responder.status === "accepting" ? "Accepting" : "On the way"}
                                </span>
                              </p>
                            </div>
                            <Button
                              variant={responder.status === "accepting" ? "outline" : "secondary"}
                              size="sm"
                              className="h-9 flex items-center justify-center px-4"
                              onClick={() => {/* Handle action */}}
                            >
                              {responder.status === "accepting" ? (
                                <>
                                  <UserPlus className="h-4 w-4 mr-2" /> Accept
                                </>
                              ) : (
                                <>
                                  <MapPulse className="h-4 w-4 mr-2" /> ETA 2min
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </Motion>
                    ))}
                  </>
                )}
              </div>
            </section>

            {/* Nearby Help */}
            <section className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-white">Nearby Help</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Hospitals */}
                <Motion
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="space-y-5">
                    <h3 className="font-semibold text-zinc-200">Hospitals</h3>
                    {isLoading ? (
                      <div className="h-8 w-full bg-zinc-800/30 rounded-lg animate-pulse" />
                    ) : hospitals.length === 0 ? (
                      <p className="text-zinc-400 text-center py-4">No hospitals nearby</p>
                    ) : (
                      <>
                        {hospitals.map((hospital) => (
                          <Motion
                            key={hospital.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-800/20 bg-surface/50 hover:bg-surface/70 transition-colors duration-200">
                              <div className="flex items-center space-x-3">
                                <MapPulse className="h-4 w-4 text-primary" />
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
                          </Motion>
                        )}
                      </>
                    )}
                  </div>
                </Motion>

                {/* Police */}
                <Motion
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="space-y-5">
                    <h3 className="font-semibold text-zinc-200">Police Stations</h3>
                    {isLoading ? (
                      <div className="h-8 w-full bg-zinc-800/30 rounded-lg animate-pulse" />
                    ) : police.length === 0 ? (
                      <p className="text-zinc-400 text-center py-4">No police stations nearby</p>
                    ) : (
                      <>
                        {police.map((station) => (
                          <Motion
                            key={station.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-800/20 bg-surface/50 hover:bg-surface/70 transition-colors duration-200">
                              <div className="flex items-center space-x-3">
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
                          </Motion>
                        )}
                      </>
                    )}
                  </div>
                </Motion>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="mt-8 space-y-5">
              <Button
                variant="destructive"
                className="w-full py-4 text-lg font-medium"
                onClick={() => {/* End SOS */}}
              >
                End Emergency
              </Button>
              <Button
                variant="outline"
                className="w-full py-4 text-lg font-medium"
                onClick={() => router.push(`/sos/triage`)}
              >
                AI Triage
              </Button>
            </div>
          </div>
        </div>

        {/* Footer - SIM card style indicator */}
        <footer className="bg-surface/50 backdrop-blur-sm border-t border-zinc-800/20">
          <div className="max-w-7xl mx-auto px-6 py-4 text-center text-zinc-500 text-sm">
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <Circle className="h-3 w-3 bg-green-400" />
                <span>GPS: Strong</span>
              </div>
              <div className="flex items-center space-x-2">
                <Signal className="h-3 w-3" />
                <span>Network: LTE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Battery className="h-3 w-3" />
                <span>Battery: 87%</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Motion>
  );
}

// Reusable icon components
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

function Settings() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 015.25 21h13.5A2.25 2.25 0 0121 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h3.375m-3.375 0a59.578 59.578 0 0111.727 0H13.125a3.375 3.375 0 000-6.75v-3.375a60.404 60.404 0 0111.773 0v3.375a3.375 3.375 0 000 6.75H5.25a2.25 2.25 0 01-2.25 2.25z" />
    </svg>
  );
}

function Circle() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}

function Signal() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m15 0h-4.5m4.5 0v-3.375a6.18 6.18 0 00-3-5.25M16.5 12.375v3.375m0 0h3m-3 0v3.375m3.375-3.75h-3.375v3.75" />
    </svg>
  );
}

function Battery() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-6-3v6m6-3V7m0 0l3-3m-3 3l3 3" />
    </svg>
  );
}