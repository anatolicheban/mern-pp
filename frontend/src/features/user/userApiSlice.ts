import { apiSlice } from "../../app/api/apiSlice";
import { GetMyProfileresult } from "../../models/models";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyProfile: builder.query<GetMyProfileresult, void>({
      query: () => ({
        url: "/user/my-profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyProfileQuery } = userApiSlice;
