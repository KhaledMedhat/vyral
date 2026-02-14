import { FriendInterface, User } from "~/interfaces/user.interface";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { selectCurrentUserChannels, selectCurrentUserInfo } from "~/redux/slices/user/user-selector";
import { extractDirectChannelFromMembers, getMutualFriends, getMutualServers, isTheUserFriend } from "~/lib/utils";
import ProfileAvailabilityIndicator from "./profile-availability-indicator";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";
import { IconAtOff, IconDots, IconDotsVertical, IconIdBadge, IconMessageCircleFilled, IconUserCheck, IconUserPlus } from "@tabler/icons-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./ui/dropdown-menu";
import { ChannelType } from "~/interfaces/channels.interface";
import { useRouter } from "next/navigation";
import { setActiveUI, setCurrentChannelId } from "~/redux/slices/app/app-slice";
import { ActiveUI } from "~/interfaces/app.interface";
import { toast } from "sonner";
import { NestErrorResponse } from "~/interfaces/error.interface";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useSendFriendRequestMutation } from "~/redux/apis/user.api";
import { useRemoveFriendMutation } from "~/redux/apis/auth.api";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const UserDetails: React.FC<{ user: FriendInterface | User; size: "sm" | "md" | "lg"; setDialogOpen: (open: boolean) => void }> = ({
  user,
  size,
  setDialogOpen,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectCurrentUserInfo);
  const currentUserChannels = useAppSelector(selectCurrentUserChannels);
  const currentUserChannelServers = currentUserChannels.filter((c) => c.type === ChannelType.Server);
  const mutualFriends = getMutualFriends(currentUser, user);
  const mutualServers = getMutualServers(currentUserChannels, user);
  const [sendFriendRequest] = useSendFriendRequestMutation();
  const [removeFriend] = useRemoveFriendMutation();
  const onSendFriendRequestSubmit = async (username: string) => {
    try {
      await sendFriendRequest({ username, sender: currentUser }).unwrap();
      toast.success("Friend Request sent successfully");
    } catch (error) {
      const errData = (error as FetchBaseQueryError).data as NestErrorResponse;
      if (errData?.error === "Conflict" || errData?.error === "Not Found") {
        toast.error("Friend Request not sent", {
          description: <span className="text-muted-foreground">{errData.message}</span>,
        });
      } else {
        toast.error("Oops, something went wrong!", {
          description: <span className="text-muted-foreground">{errData?.message || "An unexpected error occurred"}</span>,
        });
      }
    }
  };
  const mountUserDetails = () => {
    switch (size) {
      case "sm":
        return (
          <div>
            <div></div>
          </div>
        );
      case "md":
        return (
          <div>
            <div></div>
          </div>
        );
      case "lg":
        return (
          <div className="flex items-start justify-between gap-10 h-full">
            <div className="flex flex-col w-full bg-main-primary rounded-t-lg h-full">
              <div className="relative w-full">
                <div className="h-40 w-full bg-main rounded-t-lg"></div>
                <div className="absolute -bottom-10 left-6">
                  <ProfileAvailabilityIndicator status={user.status.type} imageUrl={user.profilePicture} name={user.displayName} size="lg" />
                </div>
              </div>
              <div className="mt-16 flex flex-col items-start gap-6 pl-8">
                <div className="flex flex-col items-start">
                  <p className="font-semibold text-xl">{user.displayName}</p>
                  <p className="text-muted-foreground">{user.username}</p>
                </div>
                <div className="flex items-center gap-2">
                  {isTheUserFriend(currentUser, user._id) ? (
                    <Button
                      onClick={() => {
                        const directChannel = extractDirectChannelFromMembers(currentUser._id, currentUserChannels, user._id);
                        if (directChannel) {
                          dispatch(setCurrentChannelId(directChannel._id));
                          dispatch(setActiveUI(ActiveUI.DIRECT_MESSAGES));
                          setDialogOpen(false);
                          router.push(`/dm/${directChannel._id}`);
                        }
                      }}
                      variant="default"
                      size="sm"
                    >
                      <IconMessageCircleFilled size={16} />
                      Message
                    </Button>
                  ) : (
                    <Button onClick={async () => await onSendFriendRequestSubmit(user.username)} variant="default" size="sm">
                      <IconUserPlus size={16} /> Add Friend
                    </Button>
                  )}

                  {isTheUserFriend(currentUser, user._id) ? (
                    <TooltipProvider>
                      <Tooltip>
                        <DropdownMenu>
                          <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                              <Button variant="secondary" size="icon">
                                <IconUserCheck size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                          </TooltipTrigger>
                          <DropdownMenuContent side="right">
                            <DropdownMenuItem onClick={async () => await removeFriend({ friendId: user._id })}>Remove Friend</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <TooltipContent>Friends</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    // TODO: make an api call to create a channel if there wasnt one to chat even if the user is not a friend
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="default" size="sm">
                          <IconMessageCircleFilled size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Message</TooltipContent>
                    </Tooltip>
                  )}
                  <TooltipProvider>
                    <Tooltip>
                      <DropdownMenu>
                        <TooltipTrigger asChild>
                          <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon">
                              <IconDots size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                        </TooltipTrigger>
                        <DropdownMenuContent side="right">
                          <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Invite to Server</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                {currentUserChannelServers.length > 0 ? (
                                  currentUserChannelServers.map((server) => (
                                    <DropdownMenuItem key={server._id}>{server.groupOrServerName}</DropdownMenuItem>
                                  ))
                                ) : (
                                  <Empty className="w-full flex items-center justify-center">
                                    <EmptyHeader>
                                      <EmptyMedia variant="default">
                                        <IconAtOff className="size-12 text-muted-foreground" />
                                      </EmptyMedia>
                                      <EmptyTitle>No Servers found</EmptyTitle>
                                      <EmptyDescription>You are not in any servers to invite this @{user?.displayName || ""} to.</EmptyDescription>
                                    </EmptyHeader>
                                  </Empty>
                                )}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="justify-between" onClick={() => navigator.clipboard.writeText(user?.username || "")}>
                            Copy User ID <IconIdBadge />
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <TooltipContent>More</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-muted-foreground">{user.bio}</p>
                <div className="flex items-start flex-col">
                  <p className="text-sm">Member Since</p>
                  <p className="text-sm">
                    {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <Tabs defaultValue="mutual-friends" className="h-full">
                <TabsList>
                  <TabsTrigger value="mutual-friends">
                    {mutualFriends.length > 0 ? `${mutualFriends.length} Mutual Friends` : "Mutual Friends"}
                  </TabsTrigger>
                  <TabsTrigger value="mutual-servers">
                    {mutualServers.length > 0 ? `${mutualServers.length} Mutual Servers` : "Mutual Servers"}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="mutual-friends">
                  {mutualFriends.length > 0 ? (
                    mutualFriends.map((friend) => (
                      <div className="flex items-center gap-2" key={friend._id}>
                        <ProfileAvailabilityIndicator
                          status={friend.status.type}
                          imageUrl={friend.profilePicture}
                          name={friend.displayName}
                          size="md"
                        />
                        <div className="flex items-center gap-1">
                          <p className="font-semibold text-sm">{friend.displayName}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Empty className="w-full h-full flex items-center justify-center">
                      <EmptyHeader>
                        <EmptyMedia variant="default">
                          <IconUserPlus className="size-12 text-muted-foreground" />
                        </EmptyMedia>
                        <EmptyTitle>No Mutual Friends</EmptyTitle>
                        <EmptyDescription>
                          There are no mutual friends between you and {user.displayName} yet. Start a conversation to find mutual friends.
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  )}
                </TabsContent>
                <TabsContent value="mutual-servers">
                  {mutualServers.length > 0 ? (
                    mutualServers.map((server) => (
                      <div className="flex items-center gap-2" key={server._id}>
                        <ProfileAvailabilityIndicator imageUrl={server.groupOrServerLogo || ""} name={server.groupOrServerName || ""} size="md" />
                        <div className="flex items-center gap-1">
                          <p className="font-semibold text-sm">{server.groupOrServerName}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Empty className="w-full h-full flex items-center justify-cente">
                      <EmptyHeader>
                        <EmptyMedia variant="default">
                          <IconAtOff className="size-12 text-muted-foreground" />
                        </EmptyMedia>
                        <EmptyTitle>No Mutual Servers</EmptyTitle>
                        <EmptyDescription>There are no mutual servers between you and {user.displayName} yet.</EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return mountUserDetails();
};

export default UserDetails;
