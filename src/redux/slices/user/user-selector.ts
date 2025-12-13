import { RootState } from "../../store";

export const selectUserLoggedInStatus = (state: RootState) => state.user.isLoggedIn;
export const selectCurrentUserInfo = (state: RootState) => state.user.userInfo;
