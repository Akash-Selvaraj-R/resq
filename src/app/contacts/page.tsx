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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Edit, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Motion } from "framer-motion";

// Helper to render Lucide icons by name
function getIconByName(name: string, className: string) {
  const icons: Record<string, React.ComponentType<{ className?: string }>> = {
    Plus: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>,
    Trash2: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v9m0 0L6 6m0 0l6 6" />
    </svg>,
    Edit: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    </svg>,
    Phone: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 3h2a4 4 0 004 4v10a4 4 0 00-4 4H2a4 4 0 00-4-4V7a4 4 0 004-4zm0 0h2a2 2 0 002 2v6a2 2 0 00-2 2H2a2 2 0 002-2v-6a2 2 0 002-2zm10-1a9 9 0 11-9 9 9 9 0 019-9z" />
    </svg>,
    Mail: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h18a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2v-10zm0 10a4 4 0 00-8 0 4 4 0 008 0z" />
    </svg>,
    Settings: () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 0121 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h3.375m-3.375 0a59.578 59.578 0 000-6.75v-3.375a60.404 60.404 0 000 6.75H5.25a2.25 2.25 0 01-2.25 2.25z" />
    </svg>,
  };

  const Icon = icons[name as keyof typeof icons];
  return Icon ? <Icon className={className} /> : null;
}

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
    <Motion
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
            <Motion
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-end">
                <Button variant="default" onClick={() => setOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Contact
                </Button>
              </div>
            </Motion>

            {/* Contacts List */}
            <Motion
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <Motion
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
                              onClick={() => {/* Edit contact */}
                            >
                              <Edit className="mr-2 h-3 w-3" /> Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {/* Delete contact */}
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
                  </Motion>
                ))}
              </div>
            </Motion>
          </div>
        </main>

        {/* Add Contact Dialog */}
        <Motion
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="default">Add Contact</Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-md sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Emergency Contact</DialogTitle>
                <DialogDescription>
                  Add a new contact to be notified in case of an emergency.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Form onSubmit={handleSubmit}>
                  <FormControl>
                    <FormField
                      control={{ name: "", onChange: (e: any) => setName(e.target.value), value: name }}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <Input
                              {...field}
                              placeholder="Enter full name"
                              className="w-full"
                            />
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                    <FormField
                      control={{
                        name: "",
                        onChange: (e: any) => setPhone(e.target.value),
                        value: phone,
                      }}
                      render={({ field }) => (
                        <>
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <Input
                              {...field}
                              placeholder="Enter phone number"
                              className="w-full"
                            />
                            <FormMessage />
                          </FormItem>
                        </>
                      )}
                    />
                    <Button type="submit" className="w-full mt-4">
                      Save Contact
                    </Button>
                  </FormControl>
                </Form>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Motion>
      </div>
    </Motion>
  );
}