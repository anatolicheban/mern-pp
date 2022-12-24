import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ResultDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { apiSlice } from "../../app/api/apiSlice";
import { GetAdsResult, GetSingleAdResult } from "../../models/models";

const providesTags:
  | ResultDescription<
      "Ads",
      GetAdsResult,
      number | { page: number; userId?: string },
      FetchBaseQueryError,
      {} | undefined
    >
  | undefined = (result, error, arg) => {
  if (result) {
    return [
      { type: "Ads", id: "LIST" },
      ...result.ads.map((item) => ({ type: "Ads" as const, id: item._id })),
    ];
  } else return [{ type: "Ads", id: "LIST" }];
};

export const adsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLatestAds: builder.query<GetAdsResult, { page: number; userId?: string }>({
      query: ({ page, userId }) => ({
        url: "/ads/latest",
        method: "GET",
        params: {
          page,
          userId,
        },
      }),
      providesTags,
    }),
    getMyAds: builder.query<GetAdsResult, number>({
      query: (page) => ({
        url: "/ads/my-ads",
        method: "GET",
        params: {
          page,
        },
      }),
      providesTags,
    }),
    togleLikeAd: builder.mutation<void, string>({
      query: (id) => ({
        url: "/ads/like",
        method: "POST",
        body: { id },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Ads", id: arg }],
    }),
    getFavAds: builder.query<GetAdsResult, number>({
      query: (page) => ({
        url: "/ads/favs",
        method: "GET",
        params: {
          page,
        },
      }),
      providesTags,
    }),
    getSingleAd: builder.query<GetSingleAdResult, string>({
      query: (id) => ({
        url: `/ads/single-ad/${id}`,
      }),
      providesTags: (result, err, arg) => [{ type: "Ads", id: arg }],
    }),
  }),
});

export const {
  useGetLatestAdsQuery,
  useGetMyAdsQuery,
  useTogleLikeAdMutation,
  useGetFavAdsQuery,
  useGetSingleAdQuery,
} = adsApiSlice;
