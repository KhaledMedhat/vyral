import Link from "next/link";
import { Target, Heart, Rocket, Shield, ArrowRight } from "lucide-react";
import { AnimatedBackground } from "~/components/ui/animated-background";
import { Navbar } from "~/components/navbar";
import { Button } from "~/components/ui/button";
import { Footer } from "~/components/footer";

export default function AboutPage() {
  const team = [
    { name: "Alex Chen", role: "CEO & Founder", initials: "AC" },
    { name: "Sarah Williams", role: "CTO", initials: "SW" },
    { name: "James Miller", role: "Head of Design", initials: "JM" },
    { name: "Emily Davis", role: "Head of Engineering", initials: "ED" },
  ];

  const milestones = [
    { year: "2021", title: "Founded", description: "PAO was born from a vision to revolutionize messaging" },
    { year: "2022", title: "1M Users", description: "Reached our first million users worldwide" },
    { year: "2023", title: "Enterprise Launch", description: "Launched PAO for Business with advanced features" },
    { year: "2024", title: "100M Messages", description: "Over 100 million messages sent daily" },
  ];

  return (
    <main className="flex-1 pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About PAO</h1>
          <p className="mt-6 text-lg text-muted-foreground">Building the future of communication, one message at a time.</p>
        </div>

        {/* Mission Section */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              PAO was created with a simple goal: to make communication effortless and enjoyable. We believe that staying connected should be
              seamless, secure, and accessible to everyone, regardless of where they are in the world.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We're not just building another messaging app - we're creating a platform that respects your privacy, values your time, and brings
              people closer together through technology.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border bg-card/50 p-6 text-center">
              <div className="text-3xl font-bold text-accent">100K+</div>
              <div className="mt-1 text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6 text-center">
              <div className="text-3xl font-bold text-accent">150+</div>
              <div className="mt-1 text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6 text-center">
              <div className="text-3xl font-bold text-accent">99.9%</div>
              <div className="mt-1 text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6 text-center">
              <div className="text-3xl font-bold text-accent">50M+</div>
              <div className="mt-1 text-sm text-muted-foreground">Messages/Day</div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center">Our Values</h2>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">These core principles guide everything we do at PAO.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                <Shield className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mt-4 font-semibold">Privacy First</h3>
              <p className="mt-2 text-sm text-muted-foreground">Your data belongs to you. We never sell or share your information.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                <Target className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mt-4 font-semibold">Simplicity</h3>
              <p className="mt-2 text-sm text-muted-foreground">Powerful features, intuitive design. No learning curve required.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                <Heart className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mt-4 font-semibold">Reliability</h3>
              <p className="mt-2 text-sm text-muted-foreground">99.9% uptime guarantee. Your messages are delivered, always.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/50 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                <Rocket className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mt-4 font-semibold">Innovation</h3>
              <p className="mt-2 text-sm text-muted-foreground">Constantly evolving to bring you the best chat experience.</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center">Our Journey</h2>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">From a small idea to a global messaging platform.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="relative">
                <div className="rounded-2xl border border-border bg-card/50 p-6">
                  <div className="text-2xl font-bold text-accent">{milestone.year}</div>
                  <h3 className="mt-2 font-semibold">{milestone.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center">Meet the Team</h2>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl mx-auto">The passionate people behind PAO.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="rounded-2xl border border-border bg-card/50 p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <span className="text-lg font-semibold">{member.initials}</span>
                </div>
                <h3 className="mt-4 font-semibold">{member.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Join us on our mission</h2>
          <p className="mt-4 text-muted-foreground">Start using PAO today and be part of the future of communication.</p>
          <div className="mt-8">
            <Link href="/login">
              <Button size="lg" className="rounded-full px-8 gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
