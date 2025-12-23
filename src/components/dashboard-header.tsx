import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { selectActiveUI, selectDashboardFriendsHeaderActiveUI, selectDashboardMessageRequestsHeaderActiveUI } from "~/redux/slices/app/app-selector";
import { ActiveUI, FriendsSelectorView, FriendsView, MessageRequestsView } from "~/interfaces/app.interface";
import { setDashboardFriendsHeaderActiveUI, setDashboardMessageRequestsHeaderActiveUI } from "~/redux/slices/app/app-slice";
import { selectCurrentUserInfo } from "~/redux/slices/user/user-selector";
import FriendsSelector from "./friends-selector";

const DashboardHeader = () => {
  const activeUI = useAppSelector(selectActiveUI);
  const dashboardFriendsHeaderActiveUI = useAppSelector(selectDashboardFriendsHeaderActiveUI);
  const dashboardMessageRequestsHeaderActiveUI = useAppSelector(selectDashboardMessageRequestsHeaderActiveUI);
  const currentUserInfo = useAppSelector(selectCurrentUserInfo);
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
  const renderHeaderTitle = () => {
    switch (activeUI) {
      case ActiveUI.FRIENDS_LIST:
        return (
          <div className="flex items-center gap-4">
            <h1 className="text-base font-medium">Friends</h1>
            <span className="text-muted-foreground text-sm">&#8226;</span>
            <div className="flex items-center gap-2">
              {friendsButtons.map((button) => (
                <Button size={button.size} key={button.label} variant={button.variant} onClick={button.onClick} className={`${button.isActive}`}>
                  {button.label}
                </Button>
              ))}
            </div>
          </div>
        );
      case ActiveUI.MESSAGE_REQUESTS:
        return (
          <div className="flex items-center gap-4">
            <h1 className="text-base font-medium">Message Requests</h1>
            <span className="text-muted-foreground text-sm">&#8226;</span>
            <div className="flex items-center gap-2">
              {messageRequestsButtons.map((button) => (
                <Button size={button.size} key={button.label} variant={button.variant} onClick={button.onClick} className={`${button.isActive}`}>
                  {button.label}
                </Button>
              ))}
            </div>
          </div>
        );
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
          <div className="ml-auto flex items-center gap-2">
            <FriendsSelector friends={currentUserInfo.friends} currentUser={currentUserInfo} view={FriendsSelectorView.DASHBOARD} />
          </div>
        </div>
      </header>
      <Separator className="w-[99%]! mx-auto" />
    </>
  );
};

export default DashboardHeader;
