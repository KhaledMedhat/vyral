import { RootState } from "../../store";

export const selectUserLoggedInStatus = (state: RootState) => state.user.isLoggedIn;
export const selectCurrentUserInfo = (state: RootState) => state.user.userInfo;
export const selectCurrentUserChannels = (state: RootState) => state.user.channelsInfo;
export const selectNotifications = (state: RootState) => state.user.notifications;
export const selectFriendRequests = (state: RootState) => state.user.friendRequests;
