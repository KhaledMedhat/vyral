import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FriendInterface, ObsessionDuration, StatusDuration, StatusType, User, UserInitialState } from "~/interfaces/user.interface";

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
    setUserLoggingInStatus: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setUserLoggingInStatus, setUserInfo, setUpdatedFriend } = userSlice.actions;
export default userSlice.reducer;
