"use client";

import { useState } from "react";
import { Search, ChevronDown, MessageCircle, Mail, FileText } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "Creating an account is easy! Click the 'Get Started' button on our homepage, enter your email and password, then verify your email address. You can also sign up with Google for faster access.",
  },
  {
    question: "Is PAO free to use?",
    answer:
      "Yes! PAO offers a free tier with unlimited 1-on-1 messaging, up to 5 group chats, and 7-day message history. For advanced features like unlimited groups and file sharing, check out our Pro plan.",
  },
  {
    question: "How secure are my messages?",
    answer:
      "All messages on PAO are encrypted end-to-end, meaning only you and the recipient can read them. We never store or have access to your message content.",
  },
  {
    question: "Can I use PAO on multiple devices?",
    answer:
      "PAO syncs seamlessly across all your devices. Download our apps for iOS, Android, Windows, and Mac, or use the web app from any browser.",
  },
  {
    question: "How do I delete my account?",
    answer:
      "You can delete your account from Settings > Account > Delete Account. Please note this action is permanent and will delete all your messages and data.",
  },
  {
    question: "How do I report a bug or issue?",
    answer:
      "You can report bugs through our in-app feedback form or by emailing support@pao.chat. Include as much detail as possible to help us resolve the issue quickly.",
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(
    (faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Help Center</h1>
          <p className="text-xl text-muted-foreground">Find answers to common questions or get in touch</p>
        </div>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-full bg-card/50 border-border"
          />
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-lg bg-accent/10">
                <MessageCircle className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-medium">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Talk to our team</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-lg bg-accent/10">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-medium">Email Support</h3>
                <p className="text-sm text-muted-foreground">support@pao.chat</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border bg-card/50 backdrop-blur-sm hover:bg-card/70 transition-colors cursor-pointer">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="p-3 rounded-lg bg-accent/10">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-medium">Documentation</h3>
                <p className="text-sm text-muted-foreground">Read our guides</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="border-b border-border last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="font-medium">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && <div className="pb-4 text-muted-foreground">{faq.answer}</div>}
              </div>
            ))}
            {filteredFaqs.length === 0 && <p className="text-center text-muted-foreground py-8">No results found. Try a different search term.</p>}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
