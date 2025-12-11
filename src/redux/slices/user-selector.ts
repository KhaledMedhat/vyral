import { RootState } from "../store";

// export const selectCurrentUser = (state: RootState) => state.user.userInfo;

export const selectUserLoggedInStatus = (state: RootState) => state.user.isLoggedIn;
