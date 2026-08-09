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
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-sm font-medium text-white">Contacts</h1>
          <div className="w-12" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="h-4 w-4 text-green-400" />
              <h2 className="text-base font-semibold text-white">Emergency Network</h2>
            </div>
            <p className="text-xs text-zinc-500">People who can be notified when you activate SOS</p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="h-9 px-3 bg-white text-zinc-950 hover:bg-white/90 text-sm font-medium"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Add
          </Button>
        </motion.div>

        {/* Network Summary */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="flex items-center gap-3 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] mb-6"
        >
          <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <Users className="h-5 w-5 text-green-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{contacts.length} contacts in your network</p>
            <p className="text-xs text-zinc-500">All will be notified instantly when SOS is activated</p>
          </div>
        </motion.div>

        {/* Contact Cards */}
        <div className="space-y-2">
          {contacts.map((contact, i) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
              className="group p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                  <span className="text-sm font-bold">{contact.initials}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white">{contact.name}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-zinc-500">{contact.relation}</span>
                    <span className="text-zinc-700">·</span>
                    <span className="text-xs text-zinc-600">{contact.phone}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5">
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
                    className="h-8 w-8 border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Remove ${contact.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-zinc-500" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state hint */}
        <div className="mt-8 text-center">
          <p className="text-xs text-zinc-600">These contacts will be notified when you activate SOS</p>
        </div>
      </main>

      {/* Add Contact Dialog */}
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name" className="text-xs text-zinc-400">Full Name</Label>
              <Input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="h-9 rounded-lg border-white/[0.08] bg-white/[0.02] text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone" className="text-xs text-zinc-400">Phone Number</Label>
              <Input
                id="contact-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="h-9 rounded-lg border-white/[0.08] bg-white/[0.02] text-sm"
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full h-10 bg-white text-zinc-950 hover:bg-white/90 font-medium">
                Save Contact
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
