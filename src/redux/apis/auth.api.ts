import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/redux/store";
import { HYDRATE } from "next-redux-wrapper";
import {
  CreateAccountRequest,
  CreateAccountResponse,
  FriendRequest,
  SignInRequest,
  StatusDuration,
  StatusType,
  User,
  Notification,
} from "~/interfaces/user.interface";
import {
  addChannel,
  addFriendRequest,
  addNotification,
  removeFriendRequest,
  setChannels,
  setFriendRequests,
  setUserInfo,
  setUserLoggingInStatus,
} from "~/redux/slices/user/user-slice";
import { Channel, ChannelType } from "~/interfaces/channels.interface";
import { socketService } from "~/lib/socket";

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    credentials: "include",
  }),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo(action: Action, { reducerPath }): any {
    if (isHydrateAction(action)) {
      return (action.payload as Record<string, unknown>)[reducerPath];
    }
    return undefined;
  },
  tagTypes: ["Auth"], // Define tag types
  endpoints: (builder) => ({
    createAccount: builder.mutation<CreateAccountResponse, CreateAccountRequest>({
      query: (data) => ({
        url: "/user/create-user",
        method: "POST",
        body: data,
      }),
    }),
    signIn: builder.mutation<{ slug: string }, SignInRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<
      { url: string },
      {
        currentUserId: string;
        latestStatus: { type: StatusType; duration: StatusDuration };
      }
    >({
      query: (arg) => ({
        url: `/auth/logout/${arg.currentUserId}`,
        method: "POST",
        body: arg.latestStatus,
      }),
    }),

    finalizingProviderUsername: builder.mutation<{ slug: string }, { username: string }>({
      query: (data) => ({
        url: "/auth/finalize",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    getUserInfo: builder.query<{ user: User; channels: Channel[]; notifications: Notification[]; friendRequests: FriendRequest[] }, void>({
      query: () => ({
        url: "/auth/get-profile",
      }),
      providesTags: ["Auth"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log("data", data);
          // Add listActive: true to each member in channels
          const channelsWithListActive = data.channels.map((channel) => ({
            ...channel,
            listActive: channel.type === ChannelType.Direct ? true : undefined,
          }));
          dispatch(setUserLoggingInStatus(true));
          dispatch(setUserInfo(data.user));
          dispatch(setChannels(channelsWithListActive));
          // dispatch(setNotifications(data.notifications));
          dispatch(setFriendRequests(data.friendRequests));
        } catch {
          dispatch(setUserLoggingInStatus(false));
        }
      },
      async onCacheEntryAdded(_, { dispatch, cacheDataLoaded, cacheEntryRemoved }) {
        try {
          await cacheDataLoaded;
          const socket = await socketService.initialize();
          const handleFriendRequest = (data: { friendRequest: FriendRequest }) => {
            dispatch(addFriendRequest(data.friendRequest));
          };
          const handleFriendRequestAcceptanceForChannel = (data: { channel: Channel }) => {
            const channelsWithListActive = {
              ...data.channel,
              listActive: data.channel.type === ChannelType.Direct ? true : undefined,
            };
            dispatch(addChannel(channelsWithListActive));
          };
          const handleFriendRequestAcceptanceForNotification = (data: { notification: Notification }) => {
            dispatch(addNotification(data.notification));
          };
          socket?.on("friendRequest", handleFriendRequest);
          socket?.on("friendRequestAcceptanceChannelCreation", handleFriendRequestAcceptanceForChannel);
          socket?.on("friendRequestAcceptanceNotification", handleFriendRequestAcceptanceForNotification);
          await cacheEntryRemoved;
          socket?.off("friendRequest", handleFriendRequest);
          socket?.off("friendRequestAcceptanceChannelCreation", handleFriendRequestAcceptanceForChannel);
          socket?.off("friendRequestAcceptanceNotification", handleFriendRequestAcceptanceForNotification);
        } catch (error) {
          console.error("Socket cache entry error:", error);
        }
      },
    }),
  }),
});

export const { useSignInMutation, useFinalizingProviderUsernameMutation, useLogoutMutation, useCreateAccountMutation, useGetUserInfoQuery } = authApi;
