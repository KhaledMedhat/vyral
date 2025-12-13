"use client";
import { Inbox, Calendar, Search, Settings, Home, ImagePlus } from "lucide-react";
import {
  IconBrandSafari,
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconPlus,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import UserNavigator from "./user-navigator";
import { selectCurrentUserInfo } from "~/redux/slices/user/user-selector";
import { useAppSelector } from "~/redux/hooks";
import Link from "next/link";
import { selectChannels } from "~/redux/slices/channels/channels-seletor";
import Image from "next/image";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createServerSchema, CreateServerValues, invitationServerJoinSchema, InvitationServerJoinValues } from "~/lib/validation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import useUpload from "~/hooks/use-upload";
import { ConfigPrefix } from "~/interfaces/app.interface";
import { useCreateChannelMutation } from "~/redux/apis/channel.api";
import { ChannelType } from "~/interfaces/channels.interface";
import router from "next/router";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { NestErrorResponse } from "~/interfaces/error.interface";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentUserInfo = useAppSelector(selectCurrentUserInfo);
  const currentChannels = useAppSelector(selectChannels);
  const router = useRouter();
  const [isUploadingLoading, setIsUploadingLoading] = useState(false);
  const [step, setStep] = useState<number>(2);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [createChannel, { isLoading: isCreatingChannel }] = useCreateChannelMutation();
  const { startUpload } = useUpload(setIsUploadingLoading, ConfigPrefix.SINGLE_IMAGE_UPLOADER);

  const invitationServerJoin = useForm<InvitationServerJoinValues>({
    resolver: zodResolver(invitationServerJoinSchema),
    defaultValues: {
      invitationLink: "",
    },
  });

  const createServer = useForm<CreateServerValues>({
    resolver: zodResolver(createServerSchema),
    defaultValues: {
      serverName: "",
      serverImage: undefined,
    },
  });
  const onInvitationServerJoinSubmit = async (data: InvitationServerJoinValues) => {
    console.log(data);
  };
  const onCreateServerSubmit = async (data: CreateServerValues) => {
    try {
      if (data.serverImage) {
        startUpload([data.serverImage]).then(async (res) => {
          if (res && res[0]) {
            await createChannel({
              members: [{ id: currentUserInfo._id }],
              createdBy: currentUserInfo._id,
              groupOrServerLogo: res[0].ufsUrl,
              groupOrServerName: data.serverName,
              type: ChannelType.Server,
            })
              .unwrap()
              .then((res) => {
                router.push(`/servers/${res.data.route}`);
                // setOpenDialog(false)
              });
          }
        });
      } else {
        await createChannel({
          members: [{ id: currentUserInfo._id }],
          createdBy: currentUserInfo._id,
          groupOrServerLogo: undefined,
          groupOrServerName: data.serverName,
          type: ChannelType.Server,
        })
          .unwrap()
          .then((res) => {
            router.push(`/servers/${res.data.route}`);
            // setOpenDialog(false)
          });
      }
    } catch (error) {
      const errData = (error as FetchBaseQueryError).data as NestErrorResponse;
      toast.error("Oops, something went wrong!", {
        description: errData?.message || "An unexpected error occurred",
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      createServer.setValue("serverImage", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImageUrl(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Sidebar collapsible="offcanvas" className="overflow-hidden relative *:data-[sidebar=sidebar]:flex-row" {...props}>
      {/* first sidebar for servers and some buttons  */}
      <Sidebar
        collapsible="none"
        className="max-h-[92vh]"
        {...props}
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 16)",
          } as React.CSSProperties
        }
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
                <Link href={`/channels/${currentUserInfo.channelSlug}`}>
                  <IconInnerShadowTop className="size-5!" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator className="mx-auto" />
        <SidebarContent className="mt-4 gap-1">
          {currentChannels.map((channel) => (
            <SidebarMenuItem key={channel._id} className="m-1">
              <SidebarMenuButton
                size="lg"
                tooltip={{
                  children: channel.groupOrServerName,
                  hidden: false,
                }}
                className="data-[slot=sidebar-menu-button]:p-1.5!"
              >
                <Link href={`/server/${channel._id}`}>
                  <Image src={channel.groupOrServerLogo || ""} alt={channel.groupOrServerName || ""} fill className="object-cover rounded-sm" />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarContent>
        <SidebarSeparator className="mx-auto" />
        <SidebarFooter>
          <Dialog>
            <DialogTrigger asChild>
              <SidebarMenuButton
                isActive={true}
                tooltip={{
                  children: "Add Server",
                  hidden: false,
                }}
                asChild
                className="data-[slot=sidebar-menu-button]:p-1.5!"
              >
                <IconPlus stroke={2} />
              </SidebarMenuButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] gap-10">
              <DialogHeader className="relative overflow-hidden">
                <div
                  className="transition-all duration-500 ease-in-out flex items-center flex-col gap-4"
                  style={{
                    transform: step === 1 ? "translateX(0)" : "translateX(100%)",
                    opacity: step === 1 ? 1 : 0,
                    position: step === 1 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <DialogTitle className="text-center">Join a Server</DialogTitle>
                  <DialogDescription className="text-center">Enter an invitation below to join an existing server.</DialogDescription>
                </div>
                <div
                  className="transition-all duration-500 ease-in-out flex items-center flex-col gap-4"
                  style={{
                    transform: step === 2 ? "translateX(0)" : "translateX(100%)",
                    opacity: step === 2 ? 1 : 0,
                    position: step === 2 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <DialogTitle className="text-center">Create your Server</DialogTitle>
                  <DialogDescription className="text-center">
                    Your server is where you and your friends hang out. Make yours and start hanging.
                  </DialogDescription>
                </div>
                <div
                  className="transition-all duration-500 ease-in-out flex items-center flex-col gap-4"
                  style={{
                    transform: step === 3 ? "translateX(0)" : "translateX(100%)",
                    opacity: step === 3 ? 1 : 0,
                    position: step === 3 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <DialogTitle className="text-center">Customize Your Server </DialogTitle>
                  <DialogDescription className="text-center">
                    Give your server a personality with a name and an image.You can always change it later.
                  </DialogDescription>
                </div>
              </DialogHeader>
              <div className="relative overflow-hidden">
                <div
                  className="transition-all duration-500 ease-in-out"
                  style={{
                    transform: step === 1 ? "translateX(0)" : "translateX(100%)",
                    opacity: step === 1 ? 1 : 0,
                    position: step === 1 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <Form {...invitationServerJoin}>
                    <form
                      id="invitation-server-join-form"
                      onSubmit={invitationServerJoin.handleSubmit(onInvitationServerJoinSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={invitationServerJoin.control}
                        name="invitationLink"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase font-semibold text-xs">Invitation Link</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="https://PÀO.gg/AbCdEf" {...field} />
                            </FormControl>
                            <FormDescription>Invitations should look like https://PÀO.gg/AbCdEf</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
                <div
                  className="transition-all duration-500 ease-in-out flex items-center flex-col gap-8"
                  style={{
                    transform: step === 2 ? "translateX(0)" : "translateX(100%)",
                    opacity: step === 2 ? 1 : 0,
                    position: step === 2 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <Button onClick={() => setStep(3)}>Create My Own</Button>
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs font-semibold">
                      <span className="bg-card px-2 text-muted-foreground">Have an invitation already?</span>
                    </div>
                  </div>
                </div>
                <div
                  className="transition-all duration-500 ease-in-out"
                  style={{
                    transform: step === 3 ? "translateX(0)" : "translateX(100%)",
                    opacity: step === 3 ? 1 : 0,
                    position: step === 3 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <Form {...createServer}>
                    <form id="create-server-form" onSubmit={createServer.handleSubmit(onCreateServerSubmit)} className="space-y-6">
                      <div className="flex flex-col items-center gap-4">
                        <div className="relative group mt-4">
                          {profileImageUrl && (
                            <Button
                              variant="destructive"
                              size="icon-sm"
                              className="absolute top-0 right-0 rounded-full z-10"
                              onClick={(e) => {
                                setProfileImageUrl(null);
                                createServer.setValue("serverImage", undefined);
                              }}
                            >
                              <IconX className="size-4" />
                            </Button>
                          )}
                          <div
                            className={`w-28 h-28 rounded-full border-2 border-dashed border-border flex items-center justify-center overflow-hidden transition-all group-hover:border-accent ${
                              profileImageUrl ? "border-solid border-accent" : ""
                            }`}
                          >
                            {profileImageUrl ? (
                              <img src={profileImageUrl || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                              <ImagePlus className="h-8 w-8 text-muted-foreground group-hover:text-accent transition-colors" />
                            )}
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">Click to upload a profile picture (optional)</p>
                      </div>

                      <FormField
                        control={createServer.control}
                        name="serverName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="uppercase font-semibold text-xs">Server Name</FormLabel>
                            <FormControl>
                              <Input placeholder={`${currentUserInfo.displayName}'s Server`} type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            <FormDescription className="text-xs">
                              By creating a server, you agree to PÀO's{" "}
                              <Link href="/terms" className="text-accent hover:underline font-semibold">
                                Community Guidelines
                              </Link>
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </div>
              </div>
              <DialogFooter className="justify-center! relative overflow-hidden">
                <div
                  className="flex items-center justify-between w-full transition-all duration-500 ease-in-out"
                  style={{
                    transform: step === 1 ? "translateX(0)" : "translateX(100%)",
                    opacity: step === 1 ? 1 : 0,
                    position: step === 1 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <Button onClick={() => setStep(2)} variant="ghost">
                    Back
                  </Button>
                  <Button form="invitation-server-join-form">Join Server</Button>
                </div>
                <div
                  className="transition-all duration-500 ease-in-out"
                  style={{
                    transform: step === 2 ? "translateX(0)" : "translateX(100%)",
                    opacity: step === 2 ? 1 : 0,
                    position: step === 2 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <Button onClick={() => setStep(1)}>Join a Server</Button>
                </div>
                <div
                  className="flex items-center justify-between w-full transition-all duration-500 ease-in-out"
                  style={{
                    transform: step === 3 ? "translateX(0)" : "translateX(100%)",
                    opacity: step === 3 ? 1 : 0,
                    position: step === 3 ? "relative" : "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                  }}
                >
                  <Button onClick={() => setStep(2)} variant="ghost">
                    Back
                  </Button>
                  <Button form="create-server-form" disabled={isCreatingChannel || isUploadingLoading}>
                    {isCreatingChannel || isUploadingLoading ? (
                      <>
                        <Spinner />
                        Creating Server...
                      </>
                    ) : (
                      "Create"
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <SidebarMenuButton
            isActive={true}
            tooltip={{
              children: "Discover",
              hidden: false,
            }}
            asChild
            className="data-[slot=sidebar-menu-button]:p-1.5! "
          >
            <IconBrandSafari stroke={2} />
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <SidebarSeparator orientation="vertical" />
      {/* second sidebar for channels and some buttons  */}
      <Sidebar collapsible="none" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5!">
                <a href="#">
                  <IconInnerShadowTop className="size-5!" />
                  <span className="text-base font-semibold">Acme Inc.</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          {/* <NavMain items={data.navMain} />
          <NavDocuments items={data.documents} />
          <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
        </SidebarContent>
        <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      </Sidebar>

      {/* user navigator */}
      <UserNavigator />
    </Sidebar>
  );
}
