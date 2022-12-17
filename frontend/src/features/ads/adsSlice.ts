import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

export const adsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({}),
});
