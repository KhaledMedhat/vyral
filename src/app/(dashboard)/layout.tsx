"use client";
import { useEffect } from "react";
import { AppSidebar } from "~/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { Spinner } from "~/components/ui/spinner";
import { useGetUserInfoQuery } from "~/redux/apis/auth.api";

export default function ChannelsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoading } = useGetUserInfoQuery();

  // useEffect(() => {
  //     if (!isLoading) {
  //         socketService.initialize();
  //     }
  // }, [isLoading]);

  if (isLoading) return <Spinner />;
  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 104)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
