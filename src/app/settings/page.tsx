"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, User, ShieldCheck, Phone, MapPlus, Bell } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);

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
              <Button variant="outline" size="icon" onClick={() => router.push("/")}>
                <ArrowLeftIcon className="h-4 w-4" /> Back
              </Button>
              <h1 className="text-xl font-semibold text-white">Settings</h1>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button variant="outline" size="icon" onClick={() => {/* Toggle settings */}}>
                <SettingsIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            <section className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Alex Rivera</h2>
                    <p className="text-zinc-300">alex@example.com</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => {/* Edit profile */}}
                >
                  <User className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              </motion.div>
            </section>

            <section>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h2 className="text-lg font-semibold text-white mb-4">Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 rounded-xl border border-zinc-800/20 bg-surface/50">
                    <div className="flex items-center space-x-4">
                      <Bell className="h-4 w-4 text-primary" />
                      <div className="space-y-1">
                        <h3 className="font-medium text-white">Notifications</h3>
                        <p className="text-zinc-400 text-sm">
                          Receive alerts for new SOS requests and updates
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={notifications}
                        onCheckedChange={setNotifications}
                        aria-label="Enable notifications"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-xl border border-zinc-800/20 bg-surface/50 mt-4">
                    <div className="flex items-center space-x-4">
                      <MapPlus className="h-4 w-4 text-primary" />
                      <div className="space-y-1">
                        <h3 className="font-medium text-white">Location Sharing</h3>
                        <p className="text-zinc-400 text-sm">
                          Share your location with emergency contacts and responders
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={locationSharing}
                        onCheckedChange={setLocationSharing}
                        aria-label="Enable location sharing"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-5 rounded-xl border border-zinc-800/20 bg-surface/50 mt-4">
                    <div className="flex items-center space-x-4">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <div className="space-y-1">
                        <h3 className="font-medium text-white">Emergency Alerts</h3>
                        <p className="text-zinc-400 text-sm">
                          Receive alerts for emergencies in your area
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Switch
                        checked={emergencyAlerts}
                        onCheckedChange={setEmergencyAlerts}
                        aria-label="Enable emergency alerts"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            <section className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-lg font-semibold text-white mb-4">About</h2>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <InfoIcon className="h-4 w-4 text-primary" />
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
              </motion.div>
            </section>
          </div>
        </main>
      </div>
    </motion.div>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
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
