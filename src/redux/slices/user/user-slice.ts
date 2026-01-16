import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Channel } from "~/interfaces/channels.interface";
import {
  FriendInterface,
  FriendRequest,
  ObsessionDuration,
  StatusDuration,
  StatusType,
  User,
  UserInitialState,
  Notification,
} from "~/interfaces/user.interface";

const initialState: UserInitialState = {
  isLoggedIn: false,
  userInfo: {
    _id: "",
    displayName: "",
    channelSlug: "",
    password: "",
    email: "",
    friends: [
      {
        _id: "",
        displayName: "",
        pronouns: "",
        status: { type: StatusType.Online, duration: StatusDuration.Forever },
        profileCover: "",
        profilePicture: "",
        bio: "",
        username: "",
        phoneNumber: "",
        obsession: {
          text: null,
          emoji: null,
          duration: ObsessionDuration.DontClear,
        },
        activity: "",
        createdAt: new Date(),
        friends: [],
      },
    ],
    googleId: "",
    pronouns: "",
    status: { type: StatusType.Online, duration: StatusDuration.Forever },
    latestStatus: { type: StatusType.Online, duration: StatusDuration.Forever },
    provider: "",
    profilePicture: "",
    profileCover: "",
    bio: "",
    obsession: {
      text: null,
      emoji: null,
      duration: ObsessionDuration.DontClear,
    },
    activity: "",
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  notifications: [],
  friendRequests: [],
  channelsInfo: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
    setUpdatedFriend: (state, action: PayloadAction<FriendInterface>) => {
      state.userInfo.friends = state.userInfo.friends.map((friend) => (friend._id === action.payload._id ? action.payload : friend));
    },
    setChannelListActive: (state, action: PayloadAction<{ channelId: string; listActive: boolean }>) => {
      state.channelsInfo = state.channelsInfo.map((channel) =>
        channel._id === action.payload.channelId ? { ...channel, listActive: action.payload.listActive } : channel
      );
    },
    setUserLoggingInStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    setChannels: (state, action: PayloadAction<Channel[]>) => {
      state.channelsInfo = action.payload;
    },
    updateChannel: (state, action: PayloadAction<Channel>) => {
      state.channelsInfo = state.channelsInfo.map((channel) => (channel._id === action.payload._id ? { ...channel, ...action.payload } : channel));
    },
    addChannel: (state, action: PayloadAction<Channel>) => {
      if (!state.channelsInfo.some((channel) => channel._id === action.payload._id)) {
        state.channelsInfo.push(action.payload);
      }
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      if (!state.notifications.some((notification) => notification._id === action.payload._id)) {
        state.notifications.push(action.payload);
      }
    },
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
    setFriendRequests: (state, action: PayloadAction<FriendRequest[]>) => {
      state.friendRequests = action.payload;
    },
    addFriendRequest: (state, action: PayloadAction<FriendRequest>) => {
      // Avoid duplicates
      if (!state.friendRequests.some((req) => req._id === action.payload._id)) {
        state.friendRequests.push(action.payload);
      }
    },
    removeFriendRequest: (state, action: PayloadAction<string>) => {
      state.friendRequests = state.friendRequests.filter((req) => req._id !== action.payload);
    },
    setChannelActiveList: (state, action: PayloadAction<{ channelId: string; listActive: boolean }>) => {
      state.channelsInfo = state.channelsInfo.map((channel) =>
        channel._id === action.payload.channelId ? { ...channel, listActive: action.payload.listActive } : channel
      );
    },
  },
});

export const {
  setUserLoggingInStatus,
  setUserInfo,
  setUpdatedFriend,
  setChannels,
  updateChannel,
  setFriendRequests,
  addFriendRequest,
  removeFriendRequest,
  setChannelActiveList,
  addChannel,
  addNotification,
  setChannelListActive,
} = userSlice.actions;
export default userSlice.reducer;
