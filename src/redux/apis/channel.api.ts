import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Channel, CreateChannelBody, CreateChannelResponse } from "~/interfaces/channels.interface";
import { authApi } from "./auth.api";

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
    updateChannelActiveList: builder.mutation<Channel, { channelId: string; memberId: string }>({
      query: (args) => ({
        url: `/channels/update-member-list-active/${args.channelId}/${args.memberId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Channel"],
    }),
  }),
});

export const { useCreateChannelMutation, useUpdateChannelActiveListMutation } = channelApi;
