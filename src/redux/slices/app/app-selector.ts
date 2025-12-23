import { RootState } from "~/redux/store";

export const selectActiveUI = (state: RootState) => state.app.activeUI;
export const selectSidebarOpen = (state: RootState) => state.app.sidebarOpen;
export const selectDashboardFriendsHeaderActiveUI = (state: RootState) => state.app.friendsHeaderActiveUI;
export const selectDashboardMessageRequestsHeaderActiveUI = (state: RootState) => state.app.messageRequestsHeaderActiveUI;
export const selectChannels = (state: RootState) => state.user.channelsInfo;
export const selectNotifications = (state: RootState) => state.user.notifications;
export const selectFriendRequests = (state: RootState) => state.user.friendRequests;
