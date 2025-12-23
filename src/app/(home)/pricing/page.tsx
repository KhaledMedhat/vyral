import { IconCheck } from "@tabler/icons-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for personal use",
    features: ["Unlimited 1-on-1 messages", "Up to 5 group chats", "7-day message history", "Basic file sharing (10MB)", "Mobile and web apps"],
  },
  {
    name: "Pro",
    price: "$9",
    description: "Best for teams and professionals",
    popular: true,
    features: [
      "Everything in Free",
      "Unlimited group chats",
      "Unlimited message history",
      "File sharing up to 100MB",
      "Screen sharing",
      "Custom themes",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "SSO authentication",
      "Admin dashboard",
      "Advanced analytics",
      "API access",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
    ],
  },
];

export default function PricingPage() {
  return (
    <main className="pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Simple, transparent pricing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your needs. All plans include our core messaging features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative border-border bg-card/50 backdrop-blur-sm ${plan.popular ? "border-accent shadow-lg shadow-accent/10" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">Most Popular</span>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground">/month</span>}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <IconCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-full ${
                    plan.popular
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
