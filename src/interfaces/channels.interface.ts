import { Message } from "./message.interface";
import { FriendInterface, StatusType } from "./user.interface";

export interface ChannelMembers {
  id: FriendInterface;
  listActive?: boolean;
}
export enum ChannelType {
  Direct = "Direct",
  Server = "Server",
  Group = "Group",
}

export interface ChannelMembersBody {
  id: string;
  listActive?: boolean;
}

export interface CreateChannelBody {
  members: ChannelMembersBody[];
  groupOrServerName?: string;
  groupOrServerLogo?: string;
  createdBy?: string;
  type: ChannelType;
}

export interface UpdateChannelBody {
  members?: ChannelMembersBody[];
  groupOrServerName?: string;
  groupOrServerLogo?: string;
  createdBy?: string;
  type?: ChannelType;
  pinnedMessages?: string;
  updatedAt?: Date;
}

export interface CreateChannelResponse {
  success: boolean;
  message: string;
  data: {
    type: ChannelType;
    route: string;
  };
}

export interface Channel {
  _id: string;
  members: ChannelMembers[];
  updatedAt?: Date;
  type: ChannelType;
  createdBy: string;
  groupOrServerName?: string;
  groupOrServerLogo?: string;
  pinnedMessages?: Message[];
  createdAt: string;
}

export interface ChannelInitialState {
  channelsInfo: Channel[];
}

export interface ChannelDisplayData {
  _id: string; // Add this to identify the channel
  channelName: string;
  channelAvatar: string;
  channelAvatarFallbackText: string;
  channelStatus: StatusType | null;
  channelType: ChannelType;
  memberCount?: number; // Add this for groups
  friend?: FriendInterface; // Add this for direct messages
  channel: Channel; // Keep reference to original channel
}
