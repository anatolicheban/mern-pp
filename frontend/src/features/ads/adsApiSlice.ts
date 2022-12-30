import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ResultDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { apiSlice } from "../../app/api/apiSlice";
import { GetAdsResult, GetSingleAdResult, SearchResult } from "../../models/models";

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
    postAd: builder.mutation<{ id: string }, FormData>({
      query: (body) => ({
        url: "/ads/",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Ads", id: "LIST" }],
    }),
    editAd: builder.mutation<{ id: string }, FormData>({
      query: (body) => ({
        url: "/ads/",
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Ads", id: "LIST" }],
    }),
    deleteAd: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: "/ads",
        method: "DELETE",
        body: { id },
      }),
    }),
    searchAds: builder.query<SearchResult, { keyword: string }>({
      query: ({ keyword }) => ({
        url: "/ads/search?onlyTitles=true",
        method: "POST",
        body: {
          keyword,
        },
      }),
    }),
  }),
});

export const {
  useGetLatestAdsQuery,
  useGetMyAdsQuery,
  useTogleLikeAdMutation,
  useGetFavAdsQuery,
  useGetSingleAdQuery,
  usePostAdMutation,
  useEditAdMutation,
  useDeleteAdMutation,
  useLazySearchAdsQuery,
} = adsApiSlice;
