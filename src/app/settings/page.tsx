"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Shield, Bell, MapPin, Info, ExternalLink, ChevronRight, LogOut } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);

  type SettingsItem =
    | { icon: typeof User; label: string; sublabel: string; action: string; toggle?: never; checked?: never; onChange?: never }
    | { icon: typeof User; label: string; sublabel: string; toggle: true; checked: boolean; onChange: (v: boolean) => void; action?: never };

  const sections: Array<{ title: string; items: SettingsItem[] }> = [
    {
      title: "Emergency Preferences",
      items: [
        { icon: MapPin, label: "Location Sharing", sublabel: "Share location with contacts & responders", toggle: true, checked: locationSharing, onChange: setLocationSharing },
        { icon: Shield, label: "Emergency Alerts", sublabel: "Receive alerts for emergencies in your area", toggle: true, checked: emergencyAlerts, onChange: setEmergencyAlerts },
        { icon: Bell, label: "Notifications", sublabel: "SOS requests and responder updates", toggle: true, checked: notifications, onChange: setNotifications },
      ],
    },
    {
      title: "Application",
      items: [
        { icon: Info, label: "Version", sublabel: "1.0.0", action: "none" },
        { icon: ExternalLink, label: "Terms of Service", sublabel: "Last updated Jan 1, 2026", action: "link" },
        { icon: ExternalLink, label: "Privacy Policy", sublabel: "Last updated Jan 1, 2026", action: "link" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <a href="#settings-content" className="skip-link">
        Skip to settings
      </a>

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-sm font-medium text-white">Settings</h1>
          <div className="w-12" />
        </div>
      </header>

      <main id="settings-content" className="max-w-2xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        {/* Profile */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
              <User className="h-5 w-5 text-zinc-400" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-medium text-white">Alex Rivera</h2>
              <p className="text-[11px] text-zinc-500">alex@example.com</p>
            </div>
            <Button variant="outline" size="sm" className="h-8 text-xs border-white/[0.08] bg-white/[0.02]">
              Edit
            </Button>
          </div>
        </motion.div>

        {sections.map((section, si) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: (si + 1) * 0.06 }}
          >
            <h3 className="section-heading mb-2 px-1">{section.title}</h3>
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] divide-y divide-white/[0.04]">
              {section.items.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-3.5"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{item.label}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{item.sublabel}</p>
                  </div>
                  {"toggle" in item && item.toggle && (
                    <Switch
                      checked={item.checked}
                      onCheckedChange={item.onChange}
                      aria-label={`Toggle ${item.label}`}
                    />
                  )}
                  {"action" in item && item.action === "link" && (
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-600" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.25 }}
        >
          <button className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-sm text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.04] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign Out
          </button>
        </motion.div>
      </main>
    </div>
  );
}
