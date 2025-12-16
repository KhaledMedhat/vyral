import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateChannelBody, CreateChannelResponse } from "~/interfaces/channels.interface";
import { User } from "~/interfaces/user.interface";

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
  }),
});

export const { useSearchUsersMutation } = userApi;
