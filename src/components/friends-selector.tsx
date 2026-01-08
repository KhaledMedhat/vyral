import { MAX_FRIENDS, SHORT_LOGO_URL } from "~/constants/constants";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
import { Tag, TagInput } from "./ui/tag-input";
import { useId, useMemo, useState } from "react";
import { FriendInterface, User } from "~/interfaces/user.interface";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { NestErrorResponse } from "~/interfaces/error.interface";
import { useRouter } from "next/navigation";
import { createChannelName } from "~/lib/utils";
import { useCreateChannelMutation } from "~/redux/apis/channel.api";
import { ChannelType } from "~/interfaces/channels.interface";
import ProfileAvailabilityIndicator from "./profile-availability-indicator";
import { IconLoader, IconMessageCirclePlus, IconPlus, IconUserPlus } from "@tabler/icons-react";
import { SidebarMenuButton } from "./ui/sidebar";
import { Spinner } from "./ui/spinner";
import { FriendsSelectorView } from "~/interfaces/app.interface";
import { useAppDispatch, useAppSelector } from "~/redux/hooks";
import { selectCurrentUserChannels } from "~/redux/slices/user/user-selector";
import { setCurrentChannel } from "~/redux/slices/app/app-slice";

const FriendsSelector: React.FC<{ friends: FriendInterface[]; currentUser: User; view: FriendsSelectorView; otherUser?: FriendInterface[] }> = ({
  friends,
  currentUser,
  view,
  otherUser,
}) => {
  const [createChannel, { isLoading: isCreateChannelLoading }] = useCreateChannelMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const id = useId();
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [selectedFriends, setSelectedFriends] = useState<FriendInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const filteredFriends = friends.filter((friend) => friend.displayName.toLowerCase().includes(searchQuery.toLowerCase()));
  const currentUserChannels = useAppSelector(selectCurrentUserChannels);
  const friendSelectorDisplayHelper = () => {
    switch (view) {
      case FriendsSelectorView.SIDEBAR:
        return {
          tooltip: "Create DM",
          icon: <IconPlus size={16} />,
          loadingText: selectedFriends.length > 1 ? "Creating Group ..." : "Creating DM ...",
          buttonText: selectedFriends.length > 1 ? "Create Group" : "Create DM",
        };
      case FriendsSelectorView.DASHBOARD:
        return {
          tooltip: "New Group DM",
          icon: <IconMessageCirclePlus stroke={2} className="size-9!" />,
          loadingText: selectedFriends.length > 1 ? "Creating Group ... " : "Creating DM ...",
          buttonText: selectedFriends.length > 1 ? "Create Group" : "Create DM",
        };
      case FriendsSelectorView.CHANNEL:
        return {
          tooltip: "Add Friends to DM",
          icon: <IconPlus size={16} />,
          loadingText: "Creating Group DM ...",
          buttonText: "Create Group DM",
        };
      default:
        return {
          tooltip: null,
          icon: null,
          loadingText: null,
          buttonText: null,
        };
    }
  };

  const friendTags: Tag[] = selectedFriends.map((friend) => ({
    id: friend._id,
    text: friend.displayName,
  }));
  const handleSelect = (friend: FriendInterface) => {
    if (selectedFriends.some((selected) => selected._id === friend._id)) {
      // Remove friend
      const newSelectedFriends = selectedFriends.filter((f) => f._id !== friend._id);
      setSelectedFriends(newSelectedFriends);
    } else if (selectedFriends.length < MAX_FRIENDS) {
      // Add friend
      const newSelectedFriends = [...selectedFriends, friend];
      setSelectedFriends(newSelectedFriends);
    }
  };

  const handleTagsChange = (newTags: Tag[]) => {
    // Convert tags back to friends
    const newSelectedFriends = newTags
      .map((tag) => friends.find((friend) => friend._id === tag.id))
      .filter((friend): friend is FriendInterface => friend !== undefined);

    setSelectedFriends(newSelectedFriends);
  };
  // const handleCreateDM = async () => {
  //   try {
  //     await createChannel({
  //       members: isSidebarDisplay
  //         ? [
  //             ...selectedFriends.map((friend) => ({ id: friend._id, listActive: true })),
  //             { id: currentUser._id, listActive: true },
  //             ...(otherUser?.map((user) => ({ id: user._id, listActive: true })) ?? []),
  //           ]
  //         : [...selectedFriends.map((friend) => ({ id: friend._id, listActive: true })), { id: currentUser._id, listActive: true }],
  //       createdBy: selectedFriends.length > 1 || isSidebarDisplay ? currentUser._id : undefined,
  //       groupOrServerLogo: selectedFriends.length > 1 || isSidebarDisplay ? SHORT_LOGO_URL : undefined,
  //       type: selectedFriends.length !== 1 || isSidebarDisplay ? ChannelType.Group : ChannelType.Direct,
  //       groupOrServerName:
  //         selectedFriends.length > 1 || isSidebarDisplay
  //           ? createChannelName([
  //               currentUser.displayName,
  //               ...selectedFriends.map((friend) => friend.displayName),
  //               ...(otherUser?.map((user) => user.displayName) || []),
  //             ])
  //           : undefined,
  //     })
  //       .unwrap()
  //       .then((res) => {
  //         router.push(`/${res.data.type === ChannelType.Group ? "groups" : "dm"}/${res.data.route}`);
  //         setSelectedFriends([]);
  //         setOpenPopover(false);
  //       });
  //   } catch (error) {
  //     const errData = (error as FetchBaseQueryError).data as NestErrorResponse;
  //     toast.error("Oops, something went wrong!", {
  //       description: errData?.message || "An unexpected error occurred",
  //     });
  //   }
  // };

  const handleCreateDM = async () => {
    if (selectedFriends.length === 1) {
      const directedChannel = currentUserChannels.find((channel) => channel.members.some((member) => member._id === selectedFriends[0]._id));
      router.push(`/dm/${selectedFriends[0]._id}`);
      directedChannel && dispatch(setCurrentChannel(directedChannel));
      setOpenPopover(false);
    } else {
      await createChannel({
        members: [...selectedFriends.map((friend) => ({ ...friend })), { ...currentUser }],
        groupOrServerLogo: SHORT_LOGO_URL,
        type: ChannelType.Group,
        groupOrServerName: createChannelName([currentUser.displayName, ...selectedFriends.map((friend) => friend.displayName)]),
      })
        .unwrap()
        .then((res) => {
          router.push(`/groups/${res.data.route}`);
          dispatch(setCurrentChannel(res.data.channel));
          setOpenPopover(false);
        });
    }
  };
  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <SidebarMenuButton
          tooltip={{
            children: friendSelectorDisplayHelper().tooltip,
            hidden: false,
          }}
          asChild
          className="data-[slot=sidebar-menu-button]:p-1.5! w-fit"
        >
          {friendSelectorDisplayHelper().icon}
        </SidebarMenuButton>
      </PopoverTrigger>
      <PopoverContent className="w-md p-6 relative flex flex-col gap-6 items-center">
        <div className="w-full">
          <h2 className="text-xl font-semibold">Select Friends</h2>
          <p className="text-xs text-muted-foreground mb-4">You can add {MAX_FRIENDS - selectedFriends.length} more friends.</p>
          <div className="mb-4">
            <TagInput
              id={id}
              tags={friendTags}
              setTags={handleTagsChange}
              placeholder="Type the username of a friend"
              activeTagIndex={activeTagIndex}
              setActiveTagIndex={setActiveTagIndex}
              onInputChange={setSearchQuery}
              inputValue={searchQuery}
            />
          </div>
          <ScrollArea className="h-48 mb-12">
            <div className="flex flex-col">
              {filteredFriends && filteredFriends.length > 0 ? (
                filteredFriends?.map((friend) => (
                  <div
                    key={friend._id}
                    className="group/friend flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-hover transition-all duration-300 ease-in-out"
                    onClick={() => handleSelect(friend)}
                  >
                    <div className="flex items-center gap-2">
                      <ProfileAvailabilityIndicator
                        status={friend.status.type}
                        imageUrl={friend.profilePicture}
                        name={friend.displayName}
                        size="md"
                      />
                      <div className="flex items-center gap-1">
                        <p className="font-semibold text-sm">{friend.displayName}</p>
                        <p className="text-xs text-muted-foreground">{friend.username}</p>
                      </div>
                    </div>
                    <Checkbox className="h-5 w-5" id={friend._id} checked={selectedFriends.some((selected) => selected._id === friend._id)} />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-4 text-muted-foreground">
                  <p className="text-sm font-medium">No friends found</p>
                  <p className="text-xs">Try a different search term</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="bg-muted z-10 rounded-bl-md rounded-br-md absolute bottom-0 w-full py-6 px-8">
          <Button onClick={handleCreateDM} variant="default" className="w-full p-5" disabled={isCreateChannelLoading || selectedFriends.length === 0}>
            {isCreateChannelLoading ? (
              <span className="flex items-center gap-1">
                <Spinner />
                {friendSelectorDisplayHelper().loadingText}
              </span>
            ) : (
              friendSelectorDisplayHelper().buttonText
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FriendsSelector;
