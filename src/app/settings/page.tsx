import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, LogOut, User, ShieldCheck, Phone, MapPulse, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface/50 backdrop-blur-sm border-b border-zinc-800/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">Settings</h1>
          <Button variant="outline" size="icon" aria-label="Log out">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Profile Section */}
          <section className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 h-10 w-10 bg-primary/20 rounded-lg">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">Alex Rivera</h2>
                <p className="text-zinc-300">alex@example.com</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {/* Edit profile */}}
            >
              <User className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </section>

          {/* Preferences Section */}
          <section>
            <h2 className="text-lg font-semibold text-white mb-4">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-800/20 bg-surface/50">
                <div className="flex items-center space-x-3">
                  <Bell className="h-4 w-4 text-primary" />
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">Notifications</h3>
                    <p className="text-zinc-400 text-sm">
                      Receive alerts for new SOS requests and updates
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                    aria-label="Enable notifications"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-800/20 bg-surface/50">
                <div className="flex items-center space-x-3">
                  <MapPulse className="h-4 w-4 text-primary" />
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">Location Sharing</h3>
                    <p className="text-zinc-400 text-sm">
                      Share your location with emergency contacts and responders
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={locationSharing}
                    onCheckedChange={setLocationSharing}
                    aria-label="Enable location sharing"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-800/20 bg-surface/50">
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <div className="space-y-1">
                    <h3 className="font-medium text-white">Emergency Alerts</h3>
                    <p className="text-zinc-400 text-sm">
                      Receive alerts for emergencies in your area
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={emergencyAlerts}
                    onCheckedChange={setEmergencyAlerts}
                    aria-label="Enable emergency alerts"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-white mb-4">About</h2>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Info className="h-4 w-4 text-primary" />
                <div>
                  <h3 className="font-medium text-white">Version</h3>
                  <p className="text-zinc-400 text-sm">1.0.0</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <div>
                  <h3 className="font-medium text-white">Terms of Service</h3>
                  <p className="text-zinc-400 text-sm">Last updated: Jan 1, 2026</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <div>
                  <h3 className="font-medium text-white">Privacy Policy</h3>
                  <p className="text-zinc-400 text-sm">Last updated: Jan 1, 2026</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Reusable icons
function Info() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}