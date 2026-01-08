"use client";
import { AppSidebar } from "~/components/app-sidebar";
import DashboardHeader from "~/components/dashboard-header";
import { SocketProvider } from "~/hooks/use-socket";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import { Spinner } from "~/components/ui/spinner";
import { useGetUserInfoQuery } from "~/redux/apis/auth.api";

export default function ChannelsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useGetUserInfoQuery();

  if (isLoading) return <Spinner />;
  return (
    <SocketProvider>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 90)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <DashboardHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </SocketProvider>
  );
}
