import Link from "next/link";
import { MessageCircle, Zap, Shield, Users, Globe, Smartphone, ArrowRight, Check, Star } from "lucide-react";
import { Button } from "~/components/ui/button";
import WorldMap from "~/components/ui/world-map";

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm">
              <Star className="h-4 w-4 text-accent" />
              <span>Trusted by 100,000+ users worldwide</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl text-balance">
              The Modern Way to
              <span className="block text-accent"> Connect & Chat</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl text-pretty">
              PAO brings people together with seamless, real-time messaging. Experience communication reimagined for the modern world with end-to-end
              encryption and blazing fast delivery.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/login">
                <Button size="lg" className="rounded-full px-8 gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                <span>Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                <span>Instant setup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold md:text-4xl">100K+</div>
              <div className="mt-1 text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold md:text-4xl">50M+</div>
              <div className="mt-1 text-sm text-muted-foreground">Messages Sent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold md:text-4xl">99.9%</div>
              <div className="mt-1 text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold md:text-4xl">150+</div>
              <div className="mt-1 text-sm text-muted-foreground">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What makes PAO special?</h2>
            <p className="mt-4 text-muted-foreground">Everything you need to build meaningful connections.</p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card/50 p-8 transition-all hover:bg-secondary/50 hover:border-accent/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Lightning Fast</h3>
              <p className="mt-2 text-muted-foreground">Real-time messaging with zero lag. Your messages arrive instantly, every time.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card/50 p-8 transition-all hover:bg-secondary/50 hover:border-accent/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Secure & Private</h3>
              <p className="mt-2 text-muted-foreground">End-to-end encryption ensures your conversations stay between you and your contacts.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card/50 p-8 transition-all hover:bg-secondary/50 hover:border-accent/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Group Chats</h3>
              <p className="mt-2 text-muted-foreground">Create groups for teams, friends, or communities. Stay connected with everyone.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card/50 p-8 transition-all hover:bg-secondary/50 hover:border-accent/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Globe className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Cross-Platform</h3>
              <p className="mt-2 text-muted-foreground">Access PAO from any device - web, mobile, or desktop. Seamlessly sync everywhere.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card/50 p-8 transition-all hover:bg-secondary/50 hover:border-accent/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Smartphone className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Mobile First</h3>
              <p className="mt-2 text-muted-foreground">Optimized for mobile with native features and push notifications.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card/50 p-8 transition-all hover:bg-secondary/50 hover:border-accent/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <MessageCircle className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">Rich Media</h3>
              <p className="mt-2 text-muted-foreground">Share images, videos, files, and voice messages with ease.</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/features">
              <Button variant="outline" className="rounded-full gap-2 bg-transparent">
                View All Features
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 border-t border-border ">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Connected by thousands</h2>
            <p className="mt-4 text-muted-foreground">From all over the world to connect with each other.</p>
          </div>
          <WorldMap
            dots={[
              {
                start: {
                  lat: 64.2008,
                  lng: -149.4937,
                }, // Alaska (Fairbanks)
                end: {
                  lat: 34.0522,
                  lng: -118.2437,
                }, // Los Angeles
              },
              {
                start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
              },
              {
                start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
              },
              {
                start: { lat: 51.5074, lng: -0.1278 }, // London
                end: { lat: 28.6139, lng: 77.209 }, // New Delhi
              },
              {
                start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
              },
              {
                start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
              },
            ]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="rounded-3xl border border-border bg-gradient-to-br from-card to-secondary/30 p-8 md:p-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
              <MessageCircle className="h-8 w-8 text-accent-foreground" />
            </div>
            <h2 className="mt-8 text-3xl font-bold tracking-tight md:text-4xl">Ready to start chatting?</h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              Join thousands of users already connecting on PAO. Free forever, no credit card required.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/login">
                <Button size="lg" className="rounded-full px-8 gap-2">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="rounded-full px-8 bg-transparent">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
