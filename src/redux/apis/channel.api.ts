import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateChannelBody, CreateChannelResponse } from "~/interfaces/channels.interface";

export const channelApi = createApi({
  reducerPath: "channelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    credentials: "include",
  }),

  tagTypes: ["Channel"], // Define tag types
  endpoints: (builder) => ({
    createChannel: builder.mutation<CreateChannelResponse, CreateChannelBody>({
      query: (body) => ({
        url: `/channels/create-channel`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Channel"],
    }),
  }),
});

export const { useCreateChannelMutation } = channelApi;
