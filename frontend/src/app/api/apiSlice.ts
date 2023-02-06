import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = fetchBaseQuery({
  baseUrl: "http://83.229.85.165",
  credentials: "include",
  referrerPolicy: "unsafe-url",
  prepareHeaders: (headers, api) => {
    const state = api.getState() as RootState;
    const token = state.auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal, dispatch, getState()
  // console.log(extraOptions) //custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // If you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data = "Поточна сесія недійсна, повторіть вхід";
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Ads"],
  reducerPath: "api",
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({}),
});

// export type FetchBaseQueryError =
//   | {
//       /**
//        * * `number`:
//        *   HTTP status code
//        */
//       status: number;
//       data: unknown;
//     }
//   | {
//       /**
//        * * `"FETCH_ERROR"`:
//        *   An error that occurred during execution of `fetch` or the `fetchFn` callback option
//        **/
//       status: "FETCH_ERROR";
//       data?: undefined;
//       error: string;
//     }
//   | {
//       /**
//        * * `"PARSING_ERROR"`:
//        *   An error happened during parsing.
//        *   Most likely a non-JSON-response was returned with the default `responseHandler` "JSON",
//        *   or an error occurred while executing a custom `responseHandler`.
//        **/
//       status: "PARSING_ERROR";
//       originalStatus: number;
//       data: string;
//       error: string;
//     }
//   | {
//       /**
//        * * `"CUSTOM_ERROR"`:
//        *   A custom error type that you can return from your `queryFn` where another error might not make sense.
//        **/
//       status: number;
//       data?: { message: string };
//       error: string;
//     };
