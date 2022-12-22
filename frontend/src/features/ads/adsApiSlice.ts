import { apiSlice } from "../../app/api/apiSlice";
import { ItemCard } from "../../models/models";

type AdsResponse = {
  ads: (ItemCard & { _id: string })[];
  pages: number;
};

export const adsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLatestAds: builder.query<AdsResponse, number>({
      query: (page) => ({
        url: "/ads/latest",
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
      providesTags: (result, error, arg) => {
        if (result) {
          return [
            { type: "Ads", id: "LIST" },
            ...result.ads.map((item) => ({ type: "Ads" as const, id: item.id })),
          ];
        } else return [{ type: "Ads", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetLatestAdsQuery, useLazyGetLatestAdsQuery } = adsApiSlice;
