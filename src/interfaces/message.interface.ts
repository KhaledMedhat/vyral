import { FriendInterface, User } from "./user.interface";
import { JSONContent } from "@tiptap/react";

export interface MessageInterface {
  _id: string;
  referenceId: string;
  message: JSONContent;
  attachment: Attachment[];
  sentBy?: FriendInterface;
  createdAt?: Date;
  updatedAt?: Date;
  reactions: ReactionInterface[];
  isPinned?: boolean;
  type: MessageType;
  replyMessageId?: MessageInterface;
  forwardMessageId?: string;
}

export interface AddMessageBody {
  referenceId: string;
  message: JSONContent;
  attachment?: Attachment[];
  sentBy: string;
  type: MessageType;
  replyMessageId?: string;
  forwardMessageId?: string;
}

export interface UpdateMessageBody {
  isPinned?: boolean;
  message: JSONContent;
}

export interface Attachment {
  type: string;
  url: string;
  name: string;
  size: number;
}

export interface ReactionInterface {
  emoji: string;
  counter: number;
  sentBy: User[];
}

export enum MessageType {
  TEXT = "Text",
  REPLY = "Reply",
  FORWARD = "Forward",
  SYSTEM = "System",
}
