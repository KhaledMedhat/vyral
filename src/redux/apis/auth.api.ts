import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "~/redux/store";
import { HYDRATE } from "next-redux-wrapper";
import { CreateAccountRequest, CreateAccountResponse, SignInRequest, StatusDuration, StatusType } from "~/interfaces/user.interface";
import { setUserLoggingInStatus } from "~/redux/slices/user-slice";

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
      async onQueryStarted(_, { dispatch }) {
        try {
          dispatch(setUserLoggingInStatus(true));
        } catch {
          dispatch(setUserLoggingInStatus(false));
        }
      },
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
  }),
});

export const { useSignInMutation, useFinalizingProviderUsernameMutation, useLogoutMutation, useCreateAccountMutation } = authApi;
