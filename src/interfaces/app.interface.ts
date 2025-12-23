export enum ConfigPrefix {
  SINGLE_IMAGE_UPLOADER = "singleImageUploader",
  CHAT_INPUT_UPLOADER = "chatInputUploader",
}

export enum ActiveUI {
  FRIENDS_LIST = "friendsList",
  MESSAGE_REQUESTS = "messageRequests",
  SERVER = "server",
  DIRECT_MESSAGES = "directMessages",
  GROUP = "group",
}

export enum FriendsView {
  ONLINE = "online",
  ALL = "all",
  PENDING = "pending",
  ADD_FRIEND = "addFriend",
}

export enum MessageRequestsView {
  REQUESTS = "requests",
  SPAM = "spam",
}

export enum FriendsSelectorView {
  SIDEBAR = "sidebar",
  DASHBOARD = "dashboard",
  CHANNEL = "channel",
}

export interface FriendListPageInfo<T> {
  status: string;
  count: number;
  items: T[];
  showStatus: boolean;
  requestIds: string[];
}

export interface AppInitialState {
  activeUI: ActiveUI;
  sidebarOpen: boolean;
  friendsHeaderActiveUI: FriendsView;
  messageRequestsHeaderActiveUI: MessageRequestsView;
}
