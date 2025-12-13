import { useAppSelector } from "~/redux/hooks";
import { selectCurrentUserInfo } from "~/redux/slices/user/user-selector";
import AvailabilityIndicator from "./availability-indicator";
import { Button } from "./ui/button";
import { IconChevronDown, IconHeadphonesFilled, IconMicrophone, IconSettings } from "@tabler/icons-react";
import { ButtonGroup } from "./ui/button-group";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const UserNavigator = () => {
  const currentUserInfo = useAppSelector(selectCurrentUserInfo);
  return (
    <div className="absolute bottom-3 left-0 right-0 mx-2 flex items-center justify-between bg-main p-2 rounded-md">
      <Popover>
        <PopoverTrigger asChild>
          <div className="flex items-center gap-2 hover:bg-input rounded-md p-2">
            <AvailabilityIndicator
              status={currentUserInfo.status.type}
              imageUrl={currentUserInfo.profilePicture}
              name={currentUserInfo.displayName}
            />
            <div className="flex flex-col items-start">
              <p className="text-lg truncate font-semibold">{currentUserInfo.displayName}</p>
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

      <div className="flex items-center">
        <ButtonGroup>
          <Button size="icon" variant="ghost">
            <IconMicrophone className="size-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <IconChevronDown className="size-5" />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button size="icon" variant="ghost">
            <IconHeadphonesFilled className="size-5" />
          </Button>
          <Button size="icon" variant="ghost">
            <IconChevronDown className="size-5" />
          </Button>
        </ButtonGroup>
        <Button variant="ghost" size="icon">
          <IconSettings className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default UserNavigator;
