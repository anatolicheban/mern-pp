import { apiSlice } from "../../app/api/apiSlice";
import {
  LoginCredentials,
  LoginQueryResult,
  RefreshResult,
  RegisterCredentials,
  RegisterQueryResult,
} from "../../models/models";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginQueryResult, LoginCredentials>({
      query: (credentials) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: credentials,
        };
      },
    }),
    register: builder.mutation<RegisterQueryResult, RegisterCredentials>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    refresh: builder.mutation<RefreshResult, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut(""));
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice;
