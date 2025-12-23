import {
  IconArrowRight,
  IconBell,
  IconBolt,
  IconCheck,
  IconDeviceMobile,
  IconFileText,
  IconMessageCircle,
  IconMicrophone,
  IconPalette,
  IconSearch,
  IconShield,
  IconVideo,
} from "@tabler/icons-react";
import { IconUsers } from "@tabler/icons-react";
import { IconGlobe } from "@tabler/icons-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function FeaturesPage() {
  const features = [
    {
      icon: IconBolt,
      title: "Real-Time Messaging",
      description: "Send and receive messages instantly with our lightning-fast infrastructure powered by WebSockets.",
    },
    {
      icon: IconShield,
      title: "End-to-End Encryption",
      description: "Your conversations are protected with military-grade AES-256 encryption.",
    },
    {
      icon: IconUsers,
      title: "Group Conversations",
      description: "Create groups with unlimited members, shared media, and admin controls.",
    },
    {
      icon: IconGlobe,
      title: "Cross-Platform",
      description: "Access Vyral from any device - web, iOS, Android, or desktop apps.",
    },
    {
      icon: IconDeviceMobile,
      title: "Mobile First",
      description: "Optimized experience for mobile devices with native push notifications.",
    },
    {
      icon: IconBell,
      title: "Smart Notifications",
      description: "Customizable alerts with do-not-disturb mode and priority contacts.",
    },
    {
      icon: IconMessageCircle,
      title: "Rich Media Support",
      description: "Share images, videos, GIFs, and files up to 100MB seamlessly.",
    },
    {
      icon: IconPalette,
      title: "Custom Themes",
      description: "Personalize your chat experience with custom themes and color schemes.",
    },
    {
      icon: IconVideo,
      title: "Video Calls",
      description: "Crystal-clear HD video calls with up to 50 participants.",
    },
    {
      icon: IconMicrophone,
      title: "Voice Messages",
      description: "Record and send voice messages with one tap, up to 15 minutes long.",
    },
    {
      icon: IconFileText,
      title: "File Sharing",
      description: "Share documents, presentations, and files with in-app preview.",
    },
    {
      icon: IconSearch,
      title: "Powerful Search",
      description: "Find any message, file, or media instantly with advanced search filters.",
    },
  ];

  const comparisonFeatures = [
    { feature: "End-to-end encryption", Vyral: true, others: "Partial" },
    { feature: "Unlimited messages", Vyral: true, others: true },
    { feature: "File size limit", Vyral: "100MB", others: "25MB" },
    { feature: "Group size limit", Vyral: "Unlimited", others: "256" },
    { feature: "Video call participants", Vyral: "50", others: "8" },
    { feature: "Cross-platform sync", Vyral: true, others: true },
    { feature: "Custom themes", Vyral: true, others: false },
    { feature: "Message scheduling", Vyral: true, others: false },
  ];

  return (
    <main className="flex-1 pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Powerful Features</h1>
          <p className="mt-4 text-lg text-muted-foreground">Everything you need for seamless communication, all in one place.</p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" id="messaging">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card/50 p-6 transition-all hover:bg-secondary/50 hover:border-accent/50"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-24" id="security">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How Vyral compares</h2>
            <p className="mt-4 text-muted-foreground">See why users choose Vyral over other messaging apps.</p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card/50">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-accent">Vyral</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">Others</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((item, index) => (
                  <tr key={item.feature} className={index !== comparisonFeatures.length - 1 ? "border-b border-border" : ""}>
                    <td className="px-6 py-4 text-sm">{item.feature}</td>
                    <td className="px-6 py-4 text-center">
                      {typeof item.Vyral === "boolean" ? (
                        item.Vyral ? (
                          <IconCheck className="h-5 w-5 text-accent mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )
                      ) : (
                        <span className="text-sm font-medium text-accent">{item.Vyral}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {typeof item.others === "boolean" ? (
                        item.others ? (
                          <IconCheck className="h-5 w-5 text-muted-foreground mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )
                      ) : (
                        <span className="text-sm text-muted-foreground">{item.others}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Ready to experience Vyral?</h2>
          <p className="mt-4 text-muted-foreground">Start chatting for free today.</p>
          <div className="mt-8">
            <Link href="/login">
              <Button size="lg" className="rounded-full px-8 gap-2">
                Get Started Free
                <IconArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
