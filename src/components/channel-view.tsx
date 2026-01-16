"use client";

import { useAppSelector } from "~/redux/hooks";
import { selectCurrentChannel } from "~/redux/slices/app/app-selector";
import MessageInput from "./message-input";
import { ChannelType } from "~/interfaces/channels.interface";

const ChannelView: React.FC<{ channelId: string }> = ({ channelId }) => {
  const currentChannel = useAppSelector(selectCurrentChannel);

  return (
    <MessageInput
      placeholder={`Message @${currentChannel?.directChannelOtherMember?.displayName}`}
      mentionSuggestions={
        currentChannel?.type === ChannelType.Direct && currentChannel.directChannelOtherMember
          ? [currentChannel.directChannelOtherMember]
          : currentChannel?.members
      }
    />
  );
};

export default ChannelView;
