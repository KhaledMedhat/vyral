"use client";

import type React from "react";
import { useState } from "react";
import { Mail, MessageSquare, MapPin, Clock, Phone, HelpCircle, FileText, Bug } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const supportOptions = [
    {
      icon: HelpCircle,
      title: "Help Center",
      description: "Browse our FAQ and guides",
      action: "Visit Help Center",
    },
    {
      icon: FileText,
      title: "Documentation",
      description: "Technical docs and API reference",
      action: "View Docs",
    },
    {
      icon: Bug,
      title: "Report a Bug",
      description: "Help us improve PAO",
      action: "Submit Report",
    },
  ];

  return (
    <main className="flex-1 pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Get in Touch</h1>
          <p className="mt-4 text-lg text-muted-foreground">Have questions? We'd love to hear from you. Our team is always here to help.</p>
        </div>

        {/* Contact Info Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center rounded-2xl border border-border bg-card/50 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Mail className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mt-4 font-semibold">Email</h3>
            <p className="mt-1 text-sm text-muted-foreground">support@pao.chat</p>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-border bg-card/50 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <MessageSquare className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mt-4 font-semibold">Live Chat</h3>
            <p className="mt-1 text-sm text-muted-foreground">Available 24/7 in-app</p>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-border bg-card/50 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mt-4 font-semibold">Response Time</h3>
            <p className="mt-1 text-sm text-muted-foreground">Within 24 hours</p>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-border bg-card/50 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mt-4 font-semibold">Location</h3>
            <p className="mt-1 text-sm text-muted-foreground">San Francisco, CA</p>
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Support Options */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Quick Support</h2>
            <p className="text-muted-foreground">Find answers quickly with our self-service options or reach out directly.</p>

            <div className="space-y-4">
              {supportOptions.map((option) => (
                <div
                  key={option.title}
                  className="flex items-center gap-4 rounded-xl border border-border bg-card/50 p-4 transition-all hover:bg-secondary/50 hover:border-accent/30 cursor-pointer"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <option.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0">
                    {option.action}
                  </Button>
                </div>
              ))}
            </div>

            {/* Office Hours */}
            <div className="rounded-xl border border-border bg-card/50 p-6 mt-8">
              <h3 className="font-semibold flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                Business Hours
              </h3>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p>Monday - Friday: 9:00 AM - 6:00 PM (PST)</p>
                <p>Saturday: 10:00 AM - 4:00 PM (PST)</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-border bg-card/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <p className="mt-2 text-muted-foreground">Fill out the form below and we'll get back to you as soon as possible.</p>

            {submitted ? (
              <div className="mt-8 flex flex-col items-center justify-center text-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                  <Mail className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Message Sent!</h3>
                <p className="mt-2 text-muted-foreground">We'll get back to you within 24 hours.</p>
                <Button variant="outline" className="mt-6 rounded-full bg-transparent" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us more about your question or issue..." rows={5} required />
                </div>
                <Button type="submit" className="w-full rounded-full">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
