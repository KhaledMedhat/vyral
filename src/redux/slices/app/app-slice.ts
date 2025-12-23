import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ActiveUI, AppInitialState, FriendsView, MessageRequestsView } from "~/interfaces/app.interface";
import { Channel, ChannelInitialState } from "~/interfaces/channels.interface";

const initialState: AppInitialState = {
  activeUI: ActiveUI.FRIENDS_LIST,
  sidebarOpen: false,
  friendsHeaderActiveUI: FriendsView.ONLINE,
  messageRequestsHeaderActiveUI: MessageRequestsView.REQUESTS,
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
    setDashboardFriendsHeaderActiveUI: (state, action: PayloadAction<FriendsView>) => {
      state.friendsHeaderActiveUI = action.payload;
    },
    setDashboardMessageRequestsHeaderActiveUI: (state, action: PayloadAction<MessageRequestsView>) => {
      state.messageRequestsHeaderActiveUI = action.payload;
    },
  },
});

export const { setActiveUI, setSidebarOpen, setDashboardFriendsHeaderActiveUI, setDashboardMessageRequestsHeaderActiveUI } = appSlice.actions;
export default appSlice.reducer;
