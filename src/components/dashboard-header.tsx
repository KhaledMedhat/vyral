import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import {
  selectActiveUI,
  selectCurrentChannel,
  selectDashboardFriendsHeaderActiveUI,
  selectDashboardMessageRequestsHeaderActiveUI,
  selectShowChannelDetails,
} from "~/redux/slices/app/app-selector";
import { ActiveUI, FriendsSelectorView, FriendsView, MessageRequestsView } from "~/interfaces/app.interface";
import { setDashboardFriendsHeaderActiveUI, setDashboardMessageRequestsHeaderActiveUI, setShowChannelDetails } from "~/redux/slices/app/app-slice";
import { selectCurrentUserInfo, selectFriendRequests } from "~/redux/slices/user/user-selector";
import FriendsSelector from "./friends-selector";
import { IconPhoneCall, IconPinFilled, IconSearch, IconUsers, IconUsersPlus, IconUserSquareRounded, IconVideoFilled } from "@tabler/icons-react";
import { Input } from "./ui/input";
import { Popover, PopoverContent } from "./ui/popover";
import { ChannelType } from "~/interfaces/channels.interface";
import ProfileAvailabilityIndicator from "./profile-availability-indicator";
import { getDirectMessageChannelOtherMember } from "~/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { FriendRequestStatus } from "~/interfaces/user.interface";
import { Badge } from "./ui/badge";

const DashboardHeader = () => {
  const activeUI = useAppSelector(selectActiveUI);
  const dashboardFriendsHeaderActiveUI = useAppSelector(selectDashboardFriendsHeaderActiveUI);
  const dashboardMessageRequestsHeaderActiveUI = useAppSelector(selectDashboardMessageRequestsHeaderActiveUI);
  const currentUserInfo = useAppSelector(selectCurrentUserInfo);
  const showChannelDetails = useAppSelector(selectShowChannelDetails);
  const currentChannel = useAppSelector(selectCurrentChannel);
  const friendRequests = useAppSelector(selectFriendRequests);
  const dispatch = useAppDispatch();
  const friendsButtons = [
    {
      label: "Online",
      onClick: () => dispatch(setDashboardFriendsHeaderActiveUI(FriendsView.ONLINE)),
      isActive: dashboardFriendsHeaderActiveUI === FriendsView.ONLINE && "bg-muted text-foreground",
      variant: "ghost" as const,
      size: "default" as const,
    },
    {
      label: "All",
      onClick: () => dispatch(setDashboardFriendsHeaderActiveUI(FriendsView.ALL)),
      isActive: dashboardFriendsHeaderActiveUI === FriendsView.ALL && "bg-muted text-foreground",
      variant: "ghost" as const,
      size: "default" as const,
    },
    {
      label: "Pending",
      onClick: () => dispatch(setDashboardFriendsHeaderActiveUI(FriendsView.PENDING)),
      isActive: dashboardFriendsHeaderActiveUI === FriendsView.PENDING && "bg-muted text-foreground",
      variant: "ghost" as const,
      size: "default" as const,
      counter: friendRequests.filter((request) => request.status === FriendRequestStatus.Pending).length,
    },
    {
      label: "Add Friend",
      onClick: () => dispatch(setDashboardFriendsHeaderActiveUI(FriendsView.ADD_FRIEND)),
      isActive: dashboardFriendsHeaderActiveUI === FriendsView.ADD_FRIEND && "bg-accent/40 text-foreground",
      variant: "default" as const,
      size: "sm" as const,
    },
  ];
  const messageRequestsButtons = [
    {
      label: "Requests",
      onClick: () => dispatch(setDashboardMessageRequestsHeaderActiveUI(MessageRequestsView.REQUESTS)),
      isActive: dashboardMessageRequestsHeaderActiveUI === MessageRequestsView.REQUESTS && "bg-muted text-foreground",
      variant: "ghost" as const,
      size: "default" as const,
    },
    {
      label: "Spam",
      onClick: () => dispatch(setDashboardMessageRequestsHeaderActiveUI(MessageRequestsView.SPAM)),
      isActive: dashboardMessageRequestsHeaderActiveUI === MessageRequestsView.SPAM && "bg-muted text-foreground",
      variant: "ghost" as const,
      size: "default" as const,
    },
  ];
  const nonServerchannelButtons = [
    {
      label: "Start Voice Call",
      onClick: () => {},
      variant: "ghost" as const,
      size: "icon" as const,
      icon: <IconPhoneCall size={20} />,
    },
    {
      label: "Start Video Call",
      onClick: () => {},
      variant: "ghost" as const,
      size: "icon" as const,
      icon: <IconVideoFilled size={20} />,
    },
    {
      label: "Pinned Messages",
      onClick: () => {},
      variant: "ghost" as const,
      size: "icon" as const,
      icon: <IconPinFilled size={20} />,
    },
    {
      label: "Add Friends to DM",
      onClick: () => {},
      variant: "ghost" as const,
      size: "icon" as const,
      icon: <IconUsersPlus size={20} />,
    },
    {
      label: ActiveUI.DIRECT_MESSAGES
        ? showChannelDetails
          ? "Hide User Profile"
          : "Show User Profile"
        : showChannelDetails
        ? "Hide Member List"
        : "Show Member List",
      onClick: () => dispatch(setShowChannelDetails(!showChannelDetails)),
      variant: "ghost" as const,
      size: "icon" as const,
      isActive: showChannelDetails && "text-accent-foreground",
      icon: ActiveUI.DIRECT_MESSAGES ? <IconUserSquareRounded size={20} /> : <IconUsers size={20} />,
    },
    {
      label: null,
      onClick: () => {},
      variant: "ghost" as const,
      size: "default" as const,
      style: "hover:bg-transparent p-0",
      icon: (
        <div className="relative">
          <IconSearch size={20} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={`Search ${
              currentChannel?.type === ChannelType.Direct
                ? getDirectMessageChannelOtherMember(currentChannel, currentUserInfo._id)?.displayName || ""
                : currentChannel?.groupOrServerName || ""
            }`}
          />
        </div>
      ),
    },
  ];
  const renderHeaderTitle = () => {
    switch (activeUI) {
      case ActiveUI.FRIENDS_LIST:
        return (
          <div className="flex items-center gap-4 w-full">
            <h1 className="text-base font-medium">Friends</h1>
            <span className="text-muted-foreground text-sm">&#8226;</span>
            <div className="flex items-center gap-2">
              {friendsButtons.map((button) => (
                <Button
                  size={button.size}
                  key={button.label}
                  variant={button.variant}
                  onClick={button.onClick}
                  className={`flex items-center${button.isActive}`}
                >
                  {button.label}{" "}
                  {(button.counter ?? 0) > 0 && (
                    <Badge className="h-5 min-w-5 rounded-full px-1 tabular-nums" variant="destructive">
                      {button.counter}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <FriendsSelector friends={currentUserInfo.friends} currentUser={currentUserInfo} view={FriendsSelectorView.DASHBOARD} />
            </div>
          </div>
        );
      case ActiveUI.MESSAGE_REQUESTS:
        return (
          <div className="flex items-center gap-4 w-full">
            <h1 className="text-base font-medium">Message Requests</h1>
            <span className="text-muted-foreground text-sm">&#8226;</span>
            <div className="flex items-center gap-2">
              {messageRequestsButtons.map((button) => (
                <Button size={button.size} key={button.label} variant={button.variant} onClick={button.onClick} className={`${button.isActive}`}>
                  {button.label}
                </Button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <FriendsSelector friends={currentUserInfo.friends} currentUser={currentUserInfo} view={FriendsSelectorView.DASHBOARD} />
            </div>
          </div>
        );
      case ActiveUI.DIRECT_MESSAGES:
      case ActiveUI.GROUP: {
        const otherMember = currentChannel ? getDirectMessageChannelOtherMember(currentChannel, currentUserInfo._id) : undefined;
        return (
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-2">
              <ProfileAvailabilityIndicator
                status={currentChannel?.type === ChannelType.Direct ? otherMember?.status?.type : undefined}
                imageUrl={currentChannel?.type === ChannelType.Direct ? otherMember?.profilePicture || "" : currentChannel?.groupOrServerLogo || ""}
                name={currentChannel?.type === ChannelType.Direct ? otherMember?.displayName || "" : currentChannel?.groupOrServerName || ""}
                size="sm"
              />
              <div className="flex items-center gap-1">
                <p className="font-semibold text-sm">
                  {currentChannel?.type === ChannelType.Direct ? otherMember?.displayName || "" : currentChannel?.groupOrServerName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {nonServerchannelButtons.map((button) => (
                <Tooltip key={button.label}>
                  <TooltipTrigger asChild>
                    <Button
                      size={button.size}
                      variant={button.variant}
                      onClick={button.onClick}
                      className={`rounded-full ${button.isActive} ${button.style}`}
                    >
                      {button.icon}
                    </Button>
                  </TooltipTrigger>
                  {button.label && <TooltipContent>{button.label}</TooltipContent>}
                </Tooltip>
              ))}
            </div>
          </div>
        );
      }
    }
  };
  return (
    <>
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
        <div
          className={`flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6 ${activeUI === ActiveUI.SERVER ? "justify-between" : "justify-normal"}`}
        >
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
          {renderHeaderTitle()}
        </div>
      </header>
      <Separator className="w-[99%]! mx-auto" />
      {/* <Popover open={showChannelDetails}>
        <PopoverContent>
          <h1>asdasd</h1>
        </PopoverContent>
      </Popover> */}
    </>
  );
};

export default DashboardHeader;
