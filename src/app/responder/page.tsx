"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPlus, UserPlus, ShieldCheck, Phone, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Helper to render Lucide icons by name
function getIconByName(name: string, className: string) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    MapPlus,
    UserPlus,
    ShieldCheck,
    Phone,
    Loader2,
  };

  const Icon = icons[name as keyof typeof icons];
  return Icon ? <Icon className={className} /> : null;
}

export default function ResponderDashboard() {
  const [activeSOS, setActiveSOS] = useState<Array<{
    id: number;
    type: string;
    name: string;
    distance: number;
    status: "alerting" | "responders-notified" | "help-on-the-way";
    location: { lat: number; lng: number };
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock active SOS requests
  useEffect(() => {
    setIsLoading(true);
    // Simulate fetching active SOS requests
    const fetchActiveSOS = () => {
      setTimeout(() => {
        const mockSOS = [
          {
            id: 1,
            type: "medical",
            name: "Alex Rivera",
            distance: 0.2,
            status: "alerting" as const,
            location: { lat: 40.7128, lng: -74.006 },
          },
          {
            id: 2,
            type: "safety",
            name: "Sam Chen",
            distance: 0.5,
            status: "responders-notified" as const,
            location: { lat: 40.713, lng: -74.007 },
          },
          {
            id: 3,
            type: "accident",
            name: "Jordan Lee",
            distance: 0.8,
            status: "help-on-the-way" as const,
            location: { lat: 40.714, lng: -74.008 },
          },
        ];
        setActiveSOS(mockSOS);
        setIsLoading(false);
      }, 1500);
    };

    fetchActiveSOS();
  }, []);

  const handleAccept = (id: number) => {
    // Mock accepting the SOS request
    setActiveSOS((prev) =>
      prev.map((sos) =>
        sos.id === id ? { ...sos, status: "responders-notified" } : sos
      )
    );
  };

  const handleOnTheWay = (id: number) => {
    // Mock marking as on the way
    setActiveSOS((prev) =>
      prev.map((sos) =>
        sos.id === id ? { ...sos, status: "help-on-the-way" } : sos
      )
    );
  };

  const getTypeInfo = (type: string) => {
    const types: Record<string, { title: string; icon: string; color: string }> = {
      medical: { title: "Medical Emergency", icon: "UserPlus", color: "primary" },
      safety: { title: "Personal Safety", icon: "ShieldCheck", color: "primary" },
      accident: { title: "Accident", icon: "MapPlus", color: "primary" },
      fire: { title: "Fire Emergency", icon: "MapPlus", color: "primary" },
      other: { title: "Other Emergency", icon: "UserPlus", color: "primary" },
    };
    return types[type] || types.other;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="bg-surface/50 backdrop-blur-sm border-b border-zinc-800/20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between py-4">
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="icon" onClick={() => {/* Go back to home */}}>
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <h1 className="text-xl font-semibold text-white">Responder Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button variant="outline" size="icon" onClick={() => {/* Toggle settings */}}>
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
                </div>
              </motion.div>
            ) : activeSOS.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-zinc-400 text-center py-10">No active SOS requests at the moment.</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-6">
                  {activeSOS.map((sos) => (
                    <motion.div
                      key={sos.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card className="border-border">
                        <CardHeader className="pb-3">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-white">{sos.name}</CardTitle>
                              <p className="text-zinc-400 text-sm">{getTypeInfo(sos.type).title}</p>
                            </div>
                            <div className="flex sm:mt-0 mt-4 space-x-4">
                              <Button
                                variant={sos.status === "alerting" ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleAccept(sos.id)}
                                disabled={sos.status !== "alerting"}
                              >
                                {sos.status === "alerting" ? "Accept" : "Accepted"}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOnTheWay(sos.id)}
                                disabled={sos.status === "alerting"}
                              >
                                {sos.status === "responders-notified" ? "On the Way" : "En Route"}
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-5">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-4">
                              <MapPlus className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-zinc-300">Distance: {sos.distance.toFixed(1)} km</p>
                                <p className="text-zinc-400 text-sm">
                                  Last updated: just now
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Phone className="h-4 w-4 text-primary" />
                              <p className="text-zinc-300">Call for details</p>
                            </div>
                          </div>
                          {/* In a real app, we would show a map here */}
                          <div className="h-[200px] bg-zinc-800/30 rounded-xl">
                            {/* Map placeholder */}
                            <div className="flex h-full items-center justify-center text-zinc-500">
                              Map View (Live Location)
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
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

// Reusable Settings icon
function Settings({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 0121 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h3.375m-3.375 0a59.578 59.578 0 000-6.75v-3.375a60.404 60.404 0 000 6.75H5.25a2.25 2.25 0 01-2.25 2.25z" />
    </svg>
  );
}