"use client";
import { motion } from "framer-motion";
import { HeartPulse, MapPlus, ShieldCheck, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <section className="flex-1 flex items-center justify-center px-6 py-12 text-center">
          <div className="space-y-8 w-full max-w-2xl">
            <h1 className="text-4xl font-bold text-white">
              ResQ: One-Tap Emergency Response
            </h1>
            <p className="text-zinc-300 lg:text-lg">
              In any emergency, one tap shares your live location with emergency
              contacts and nearby verified responders, shows nearest help, and
              provides AI triage.
            </p>
            <motion.button
              initial={{ boxShadow: "0 0 0 0 rgba(225, 29, 72, 0.4)" }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(225, 29, 72, 0.4)",
                  "0 0 0 8px rgba(225, 29, 72, 0)",
                  "0 0 0 0 rgba(225, 29, 72, 0.4)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => router.push('/sos/type')}
              className="w-full lg:w-auto px-8 py-4 text-lg font-semibold rounded-full bg-primary/20 hover:bg-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none"
              aria-label="Activate SOS"
            >
              <span className="flex-1">Activate SOS</span>
              <HeartPulse className="ml-2 h-5 w-5" />
            </motion.button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <MapPlus className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-white">Hyperlocal</h3>
                  <p className="text-zinc-400 text-sm">
                    Help finds you instantly, wherever you are
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-white">Verified Responders</h3>
                  <p className="text-zinc-400 text-sm">
                    Trained professionals ready to assist
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <UserPlus className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-white">Emergency Contacts</h3>
                  <p className="text-zinc-400 text-sm">
                    Notify your loved ones automatically
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}