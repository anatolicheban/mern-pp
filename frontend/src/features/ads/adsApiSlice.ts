import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ResultDescription } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { apiSlice } from "../../app/api/apiSlice";
import { ItemCard } from "../../models/models";

type AdsResponse = {
  ads: (ItemCard & { _id: string })[];
  pages: number;
};

const providesTags:
  | ResultDescription<"Ads", AdsResponse, number, FetchBaseQueryError, {} | undefined>
  | undefined = (result, error, arg) => {
  if (result) {
    return [
      { type: "Ads", id: "LIST" },
      ...result.ads.map((item) => ({ type: "Ads" as const, id: item.id })),
    ];
  } else return [{ type: "Ads", id: "LIST" }];
};

export const adsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLatestAds: builder.query<AdsResponse, number>({
      query: (page) => ({
        url: "/ads/latest",
        method: "GET",
        params: {
          page,
        },
      }),
      transformResponse: (responseData: AdsResponse) => {
        const loadedAds = responseData.ads.map((ad) => {
          ad.id = ad._id;
          return ad;
        });
        return { ads: loadedAds, pages: responseData.pages };
      },
      providesTags,
    }),
    getMyAds: builder.query<AdsResponse, number>({
      query: (page) => ({
        url: "/ads/my-ads",
        method: "GET",
        params: {
          page,
        },
      }),
      transformResponse: (responseData: AdsResponse) => {
        console.log(responseData);

        const loadedAds = responseData.ads.map((ad) => {
          ad.id = ad._id;
          return ad;
        });
        return { ads: loadedAds, pages: responseData.pages };
      },
      providesTags,
    }),
    togleLikeAd: builder.mutation({
      query: (id) => ({
        url: "/ads/like",
        method: "POST",
        body: { id },
      }),
      invalidatesTags: (result, err, arg) => [{ type: "Ads", id: "LIST" }],
    }),
    getFavAds: builder.query<AdsResponse, number>({
      query: (page) => ({
        url: "/ads/favs",
        method: "GET",
        params: {
          page,
        },
      }),
      transformResponse: (responseData: AdsResponse) => {
        console.log(responseData);

        const loadedAds = responseData.ads.map((ad) => {
          ad.id = ad._id;
          return ad;
        });
        return { ads: loadedAds, pages: responseData.pages };
      },
      providesTags,
    }),
  }),
});

export const { useGetLatestAdsQuery, useGetMyAdsQuery, useTogleLikeAdMutation, useGetFavAdsQuery } =
  adsApiSlice;
