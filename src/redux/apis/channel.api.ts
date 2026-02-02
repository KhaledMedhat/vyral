import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Channel, CreateChannelBody, CreateChannelResponse, UpdateChannelBody } from "~/interfaces/channels.interface";
import { authApi } from "./auth.api";
import { AddMessageBody, MessageInterface } from "~/interfaces/message.interface";
import { updateCurrentChannel } from "../slices/app/app-slice";

export const channelApi = createApi({
  reducerPath: "channelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    credentials: "include",
  }),

  tagTypes: ["Channel"],
  endpoints: (builder) => ({
    createChannel: builder.mutation<CreateChannelResponse, CreateChannelBody>({
      query: (body) => ({
        url: `/channels/create-channel`,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(authApi.util.invalidateTags(["Auth"]));
      },
    }),
    leaveGroupChannel: builder.mutation<void, string>({
      query: (channelId) => ({
        url: `/channels/leave-group-channel/${channelId}`,
        method: "PATCH",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(authApi.util.invalidateTags(["Auth"]));
      },
    }),
    updateChannel: builder.mutation<Channel, { channelId: string; updateChannelDto: UpdateChannelBody }>({
      query: (body) => ({
        url: `/channels/update-channel/${body.channelId}`,
        method: "PATCH",
        body: body.updateChannelDto,
      }),
    }),
    getChannelMessages: builder.query<
      { messages: MessageInterface[]; hasMore: boolean; total: number },
      { channelId: string; limit?: number; before?: string }
    >({
      query: ({ channelId, limit = 30, before }) => ({
        url: `/messages/get-messages/${channelId}`,
        method: "GET",
        params: { limit, ...(before && { before }) },
      }),
    }),
    sendMessage: builder.mutation<MessageInterface, AddMessageBody>({
      query: (body) => ({
        url: `/messages/send-message`,
        method: "POST",
        body,
      }),
    }),
    deleteMessage: builder.mutation<void, string>({
      query: (messageId) => ({
        url: `/messages/delete-message/${messageId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateChannelMutation,
  useLeaveGroupChannelMutation,
  useGetChannelMessagesQuery,
  useLazyGetChannelMessagesQuery,
  useUpdateChannelMutation,
  useSendMessageMutation,
  useDeleteMessageMutation
} = channelApi;
