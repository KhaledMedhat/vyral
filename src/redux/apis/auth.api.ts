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
} from "~/interfaces/user.interface";
import { setChannels, setFriendRequests, setUserInfo, setUserLoggingInStatus } from "~/redux/slices/user/user-slice";
import { Channel } from "~/interfaces/channels.interface";

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
    }),
    getUserInfo: builder.query<{ user: User; channels: Channel[]; notifications: Notification[]; friendRequests: FriendRequest[] }, void>({
      query: () => ({
        url: "/auth/get-profile",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserLoggingInStatus(true));
          dispatch(setUserInfo(data.user));
          dispatch(setChannels(data.channels));
          // dispatch(setNotifications(data.notifications));
          dispatch(setFriendRequests(data.friendRequests));
        } catch {
          dispatch(setUserLoggingInStatus(false));
        }
      },
    }),
  }),
});

export const { useSignInMutation, useFinalizingProviderUsernameMutation, useLogoutMutation, useCreateAccountMutation, useGetUserInfoQuery } = authApi;
