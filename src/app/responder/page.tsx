import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MapPulse, UserPlus, ShieldCheck, Phone, Loader2 } from "lucide-react";
import { Motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
            status: "alerting",
            location: { lat: 40.7128, lng: -74.006 },
          },
          {
            id: 2,
            type: "safety",
            name: "Sam Chen",
            distance: 0.5,
            status: "responders-notified",
            location: { lat: 40.713, lng: -74.007 },
          },
          {
            id: 3,
            type: "accident",
            name: "Jordan Lee",
            distance: 0.8,
            status: "help-on-the-way",
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
    alert("SOS request accepted. You are now en route.");
  };

  const handleOnTheWay = (id: number) => {
    // Mock marking as on the way
    setActiveSOS((prev) =>
      prev.map((sos) =>
        sos.id === id ? { ...sos, status: "help-on-the-way" } : sos
      )
    );
    alert("Marked as on the way.");
  };

  const getTypeInfo = (type: string) => {
    const types: Record<string, { title: string; icon: React.ComponentType<{ className?: string }>; color: string }> = {
      medical: { title: "Medical Emergency", icon: UserPlus, color: "primary" },
      safety: { title: "Personal Safety", icon: ShieldCheck, color: "primary" },
      accident: { title: "Accident", icon: MapPulse, color: "primary" },
      fire: { title: "Fire Emergency", icon: MapPulse, color: "primary" },
      other: { title: "Other Emergency", icon: UserPlus, color: "primary" },
    };
    return types[type] || types.other;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface/50 backdrop-blur-sm border-b border-zinc-800/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">Responder Dashboard</h1>
          <Button variant="outline" size="icon" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-5 w-5 animate-spin text-zinc-400" />
            </div>
          ) : activeSOS.length === 0 ? (
            <p className="text-zinc-400 text-center py-8">No active SOS requests at the moment.</p>
          ) : (
            <div className="space-y-6">
              {activeSOS.map((sos) => (
                <Motion
                  key={sos.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-border">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-white">{sos.name}</CardTitle>
                          <p className="text-zinc-400 text-sm">{getTypeInfo(sos.type).title}</p>
                        </div>
                        <div className="flex sm:mt-0 mt-4 space-x-3">
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
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <MapPulse className="h-4 w-4 text-primary" />
                          <div>
                            <p className="text-zinc-300">Distance: {sos.distance.toFixed(1)} km</p>
                            <p className="text-zinc-400 text-sm">
                              Last updated: just now
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-4 w-4 text-primary" />
                          <p className="text-zinc-300">Call for details</p>
                        </div>
                      </div>
                      {/* In a real app, we would show a map here */}
                      <div className="h-48 bg-zinc-800/30 rounded-lg">
                        {/* Map placeholder */}
                        <div className="flex h-full items-center justify-center text-zinc-500">
                          Map View (Live Location)
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Motion>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Reusable Settings icon
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