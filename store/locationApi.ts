// store/slices/locationApi.ts

import { baseApi } from "./baseApi";


export const locationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // LOCATIONS
    getLocations: builder.query({
      query: () => "/locations",
      providesTags: ["Location"],
    }),

    getLocation: builder.query({
      query: (id: number) => `/locations/${id}`,
    }),

    createLocation: builder.mutation({
      query: (body) => ({
        url: "/locations",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Location"],
    }),

    updateLocation: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/locations/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Location"],
    }),

    deleteLocation: builder.mutation({
      query: (id: number) => ({
        url: `/locations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Location"],
    }),

    // STOPS
    getStops: builder.query({
      query: () => "/stops",
      providesTags: ["Location"],
    }),

    getStop: builder.query({
      query: (id: number) => `/stops/${id}`,
    }),

    createStop: builder.mutation({
      query: (body) => ({
        url: "/stops",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Location"],
    }),

    updateStop: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/stops/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Location"],
    }),

    deleteStop: builder.mutation({
      query: (id: number) => ({
        url: `/stops/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Location"],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useGetLocationQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
  useGetStopsQuery,
  useGetStopQuery,
  useCreateStopMutation,
  useUpdateStopMutation,
  useDeleteStopMutation,
} = locationApi;
