import { useAppSelector } from "~/redux/hooks";
import { selectCurrentUserInfo } from "~/redux/slices/user/user-selector";
import ProfileAvailabilityIndicator from "./profile-availability-indicator";
import { Button } from "./ui/button";
import { IconChevronDown, IconHeadphonesFilled, IconMicrophone, IconSettings } from "@tabler/icons-react";
import { ButtonGroup } from "./ui/button-group";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const UserNavigator = () => {
  const currentUserInfo = useAppSelector(selectCurrentUserInfo);
  return (
    <div className="absolute bottom-3 left-0 right-0 mx-2 flex items-center justify-between bg-main py-1 px-2 rounded-md">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center w-full group gap-2 hover:bg-input rounded-md p-2 cursor-pointer">
            <ProfileAvailabilityIndicator
              size="default"
              status={currentUserInfo.status.type}
              imageUrl={currentUserInfo.profilePicture}
              name={currentUserInfo.displayName}
            />
            <div className="flex flex-col items-start">
              <p className="text-md truncate font-semibold">{currentUserInfo.displayName}</p>
              <p className="text-sm text-muted-foreground">{currentUserInfo.username}</p>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={10}
          style={
            {
              width: "calc(var(--spacing) * 100)",
              right: "20%",
              transform: "translateX(2%)",
            } as React.CSSProperties
          }
        ></PopoverContent>
      </Popover>

      <TooltipProvider>
        <div className="flex items-center gap-1">
          <ButtonGroup>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost">
                  <IconMicrophone className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Mute</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon-xs" variant="ghost">
                  <IconChevronDown />
                </Button>
              </TooltipTrigger>
              <TooltipContent>More</TooltipContent>
            </Tooltip>
          </ButtonGroup>
          <ButtonGroup>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost">
                  <IconHeadphonesFilled className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Deafen</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon-xs" variant="ghost">
                  <IconChevronDown />
                </Button>
              </TooltipTrigger>
              <TooltipContent>More</TooltipContent>
            </Tooltip>
          </ButtonGroup>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <IconSettings className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Settings</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default UserNavigator;
