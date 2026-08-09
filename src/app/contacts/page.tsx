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
import { Plus, Trash2, Edit, Phone, Mail, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Contacts() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // Mock contacts
  const contacts = [
    { id: 1, name: "Alex Rivera", phone: "555-0101", relation: "Partner" },
    { id: 2, name: "Sam Chen", phone: "555-0102", relation: "Sibling" },
    { id: 3, name: "Jordan Lee", phone: "555-0103", relation: "Friend" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock adding a contact
    alert(`Adding contact: ${name}, ${phone}`);
    setOpen(false);
    setName("");
    setPhone("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      <div className="min-h-screen bg-background flex flex-col">
        <header className="bg-surface/50 backdrop-blur-sm border-b border-zinc-800/20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center md:justify-between py-4">
            <h1 className="text-xl font-semibold text-white">Emergency Contacts</h1>
            <Button variant="outline" size="icon" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Add Contact Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-end">
                <Button variant="default" onClick={() => setOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Contact
                </Button>
              </div>
            </motion.div>

            {/* Contacts List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card key={contact.id} className="border-border">
                      <CardHeader className="pb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-white">{contact.name}</CardTitle>
                            <p className="text-zinc-400 text-sm">{contact.relation}</p>
                          </div>
                          <div className="flex sm:mt-0 mt-4 space-x-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {/* Edit contact */}}
                            >
                              <Edit className="mr-2 h-3 w-3" /> Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {/* Delete contact */}}
                            >
                              <Trash2 className="mr-2 h-3 w-3" /> Delete
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center space-x-4">
                          <Phone className="h-4 w-4 text-primary" />
                          <p className="text-zinc-300">{contact.phone}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Mail className="h-4 w-4 text-primary" />
                          <p className="text-zinc-300">emergency@example.com</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>

        {/* Add Contact Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger render={<Button variant="default" />}>
            Add Contact
          </DialogTrigger>
          <DialogContent className="w-full max-w-md sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
              <DialogDescription>
                Add a new contact to be notified in case of an emergency.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Full Name</Label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Phone Number</Label>
                <Input
                  id="contact-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                  className="w-full"
                />
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">
                  Save Contact
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </motion.div>
  );
}
