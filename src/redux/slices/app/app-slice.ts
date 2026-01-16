import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ActiveUI, AppInitialState, FriendsView, MessageRequestsView } from "~/interfaces/app.interface";
import { Channel, UpdateChannelBody } from "~/interfaces/channels.interface";

const initialState: AppInitialState = {
  activeUI: ActiveUI.FRIENDS_LIST,
  sidebarOpen: false,
  showChannelDetails: false,
  friendsHeaderActiveUI: FriendsView.ONLINE,
  messageRequestsHeaderActiveUI: MessageRequestsView.REQUESTS,
  currentChannel: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setActiveUI: (state, action: PayloadAction<ActiveUI>) => {
      state.activeUI = action.payload;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setShowChannelDetails: (state, action: PayloadAction<boolean>) => {
      state.showChannelDetails = action.payload;
    },
    setDashboardFriendsHeaderActiveUI: (state, action: PayloadAction<FriendsView>) => {
      state.friendsHeaderActiveUI = action.payload;
    },
    setDashboardMessageRequestsHeaderActiveUI: (state, action: PayloadAction<MessageRequestsView>) => {
      state.messageRequestsHeaderActiveUI = action.payload;
    },
    setCurrentChannel: (state, action: PayloadAction<Channel | null>) => {
      state.currentChannel = action.payload;
    },
    updateCurrentChannel: (state, action: PayloadAction<Channel>) => {
      if (state.currentChannel) {
        if (action.payload.groupOrServerName !== undefined) {
          state.currentChannel.groupOrServerName = action.payload.groupOrServerName;
        }
        if (action.payload.groupOrServerLogo !== undefined) {
          state.currentChannel.groupOrServerLogo = action.payload.groupOrServerLogo;
        }
      }
    },
  },
});

export const {
  setActiveUI,
  setSidebarOpen,
  setDashboardFriendsHeaderActiveUI,
  setDashboardMessageRequestsHeaderActiveUI,
  setShowChannelDetails,
  setCurrentChannel,
  updateCurrentChannel,
} = appSlice.actions;
export default appSlice.reducer;
