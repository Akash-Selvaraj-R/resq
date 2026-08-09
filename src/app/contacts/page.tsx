"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Phone, ArrowLeft, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const contacts = [
  { id: 1, name: "Alex Rivera", phone: "555-0101", relation: "Partner", initials: "AR" },
  { id: 2, name: "Sam Chen", phone: "555-0102", relation: "Sibling", initials: "SC" },
  { id: 3, name: "Jordan Lee", phone: "555-0103", relation: "Friend", initials: "JL" },
];

const avatarColors = [
  "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "bg-green-500/10 text-green-400 border-green-500/20",
  "bg-amber-500/10 text-amber-400 border-amber-500/20",
];

export default function Contacts() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Adding contact: ${name}, ${phone}`);
    setOpen(false);
    setName("");
    setPhone("");
  };

  return (
    <div className="min-h-screen bg-background">
      <a href="#contacts-content" className="skip-link">
        Skip to contacts
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
          <h1 className="text-sm font-medium text-white">Contacts</h1>
          <div className="w-12" />
        </div>
      </header>

      <main id="contacts-content" className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-between mb-5"
        >
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <ShieldCheck className="h-4 w-4 text-green-400" aria-hidden="true" />
              <h2 className="text-base font-semibold text-white">Emergency Network</h2>
            </div>
            <p className="text-xs text-zinc-500">Notified when you activate SOS</p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="h-9 px-3 bg-white text-zinc-950 hover:bg-white/90 text-sm font-medium focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Plus className="h-4 w-4 mr-1.5" aria-hidden="true" />
            Add
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] mb-5"
        >
          <div className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <Users className="h-4 w-4 text-green-400" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{contacts.length} contacts in your network</p>
            <p className="text-[11px] text-zinc-500">All will be notified instantly when SOS is activated</p>
          </div>
        </motion.div>

        <div className="space-y-1.5" role="list" aria-label="Emergency contacts">
          {contacts.map((contact, i) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 + i * 0.05 }}
              className="group p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-150"
              role="listitem"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                  <span className="text-xs font-bold">{contact.initials}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-white">{contact.name}</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[11px] text-zinc-500">{contact.relation}</span>
                    <span className="text-zinc-700" aria-hidden="true">·</span>
                    <span className="text-[11px] text-zinc-600 font-mono">{contact.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05]"
                    aria-label={`Call ${contact.name}`}
                  >
                    <Phone className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
                    aria-label={`Remove ${contact.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-zinc-500" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-[11px] text-zinc-600">Contacts will be notified when you activate SOS</p>
        </div>
      </main>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button className="hidden" />}>
          Add Contact
        </DialogTrigger>
        <DialogContent className="w-full max-w-sm rounded-2xl border-white/[0.08] bg-card">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">Add Emergency Contact</DialogTitle>
            <DialogDescription className="text-xs text-zinc-500">
              This person will be notified when you activate SOS.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="contact-name" className="text-xs text-zinc-400">Full Name</Label>
              <Input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="h-10 rounded-lg border-white/[0.08] bg-white/[0.02] text-sm"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-phone" className="text-xs text-zinc-400">Phone Number</Label>
              <Input
                id="contact-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                type="tel"
                className="h-10 rounded-lg border-white/[0.08] bg-white/[0.02] text-sm"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full h-10 bg-white text-zinc-950 hover:bg-white/90 font-medium focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                Save Contact
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
