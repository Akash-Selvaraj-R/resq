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
    <div className="min-h-screen bg-background">
      <header className="bg-surface/50 backdrop-blur-sm border-b border-zinc-800/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-white">Emergency Contacts</h1>
          <Button variant="outline" size="icon" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Add Contact Button */}
          <div className="flex justify-end">
            <Button variant="default" onClick={() => setOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Contact
            </Button>
          </div>

          {/* Contacts List */}
          <div className="space-y-4">
            {contacts.map((contact) => (
              <Card key={contact.id} className="border-border">
                <CardHeader className="pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-white">{contact.name}</CardTitle>
                      <p className="text-zinc-400 text-sm">{contact.relation}</p>
                    </div>
                    <div className="flex sm:mt-0 mt-4 space-x-3">
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
                <CardContent className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-primary" />
                    <p className="text-zinc-300">{contact.phone}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-primary" />
                    <p className="text-zinc-300">emergency@example.com</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Add Contact Dialog */}
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
    </div>
  );
}

// Reusable Settings icon (same as in LiveSOS)
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