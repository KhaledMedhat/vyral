import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateChannelBody, CreateChannelResponse } from "~/interfaces/channels.interface";
import { SendFriendRequest, User } from "~/interfaces/user.interface";
import { authApi } from "./auth.api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    credentials: "include",
  }),

  tagTypes: ["Channel"], // Define tag types
  endpoints: (builder) => ({
    searchUsers: builder.mutation<User[], string>({
      query: (query) => ({
        url: `/user/search`,
        method: "GET",
        params: { query },
      }),
    }),
    sendFriendRequest: builder.mutation<void, SendFriendRequest>({
      query: (data) => ({
        url: "/user/send-friend-request",
        method: "POST",
        body: data,
      }),
    }),
    acceptFriendRequest: builder.mutation<void, { requestId: string }>({
      query: (args) => ({
        url: `/user/friend-request-accept/${args.requestId}`,
        method: "PATCH",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authApi.util.invalidateTags(["Auth"]));
        } catch {
          dispatch(authApi.util.invalidateTags(["Auth"]));
        }
      },
    }),

    rejectFriendRequest: builder.mutation<void, { requestId: string }>({
      query: (args) => ({
        url: `/user/friend-request-reject/${args.requestId}`,
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(authApi.util.invalidateTags(["Auth"]));
        } catch {
          dispatch(authApi.util.invalidateTags(["Auth"]));
        }
      },
    }),
    removeFriend: builder.mutation<void, string>({
      query: (friendId) => ({
        url: `/user/remove-friend/${friendId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSearchUsersMutation,
  useRemoveFriendMutation,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
} = userApi;
