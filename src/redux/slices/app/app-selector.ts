import { RootState } from "~/redux/store";

export const selectActiveUI = (state: RootState) => state.app.activeUI;
export const selectSidebarOpen = (state: RootState) => state.app.sidebarOpen;
export const selectDashboardFriendsHeaderActiveUI = (state: RootState) => state.app.friendsHeaderActiveUI;
export const selectDashboardMessageRequestsHeaderActiveUI = (state: RootState) => state.app.messageRequestsHeaderActiveUI;
export const selectShowChannelDetails = (state: RootState) => state.app.showChannelDetails;
export const selectCurrentChannel = (state: RootState) => state.app.currentChannel;
