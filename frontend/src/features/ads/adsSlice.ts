import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { Location } from "../../models/models";

export const adsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({}),
});
