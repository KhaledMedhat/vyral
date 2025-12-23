import { IconAlertCircle, IconCircleCheck, IconClock } from "@tabler/icons-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";

const services = [
  { name: "Messaging", status: "operational", uptime: "99.99%" },
  { name: "File Sharing", status: "operational", uptime: "99.97%" },
  { name: "Voice Calls", status: "operational", uptime: "99.95%" },
  { name: "Video Calls", status: "operational", uptime: "99.93%" },
  { name: "Push Notifications", status: "operational", uptime: "99.98%" },
  { name: "API", status: "operational", uptime: "99.99%" },
  { name: "Web App", status: "operational", uptime: "99.99%" },
  { name: "Mobile Apps", status: "operational", uptime: "99.97%" },
];

const incidents = [
  {
    date: "Nov 28, 2025",
    title: "Scheduled Maintenance Complete",
    description: "Planned maintenance for database optimization completed successfully.",
    status: "resolved",
  },
  {
    date: "Nov 15, 2025",
    title: "Intermittent Push Notification Delays",
    description: "Some users experienced delayed push notifications. Issue identified and resolved.",
    status: "resolved",
  },
];

export default function StatusPage() {
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <main className="pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">System Status</h1>
          <p className="text-xl text-muted-foreground">Current status of Vyral services</p>
        </div>

        {/* Overall Status */}
        <Card className="border-border bg-card/50 backdrop-blur-sm mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              {allOperational ? (
                <>
                  <div className="p-3 rounded-full bg-green-500/10">
                    <IconCircleCheck className="h-8 w-8 text-green-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-green-500">All Systems Operational</h2>
                    <p className="text-muted-foreground">All Vyral services are running smoothly</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 rounded-full bg-yellow-500/10">
                    <IconAlertCircle className="h-8 w-8 text-yellow-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-yellow-500">Partial Outage</h2>
                    <p className="text-muted-foreground">Some services may be affected</p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card className="border-border bg-card/50 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle>Services</CardTitle>
            <CardDescription>Current status of individual services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <IconCircleCheck className="h-5 w-5 text-green-500" />
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{service.uptime} uptime</span>
                  <span className="text-sm text-green-500 font-medium">Operational</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Incidents */}
        <Card className="border-border bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
            <CardDescription>Past incidents and their resolutions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {incidents.map((incident, index) => (
              <div key={index} className="border-l-2 border-green-500 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <IconClock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{incident.date}</span>
                  <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full">Resolved</span>
                </div>
                <h3 className="font-medium mb-1">{incident.title}</h3>
                <p className="text-sm text-muted-foreground">{incident.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
