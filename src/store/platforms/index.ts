import { PLATFORMS_URL } from '@/configs/constants';
import { apiSlice } from '../api';
import { toFormData } from 'axios';

export const platformSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlatforms: builder.query({
      query: (params) => ({
        url: PLATFORMS_URL,
        params,
      }),
      providesTags: ['Platform'],
      keepUnusedDataFor: 5,
    }),
    getPlatform: builder.query({
      query: (id) => ({
        url: `${PLATFORMS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPlatform: builder.mutation({
      query(body) {
        return {
          url: `${PLATFORMS_URL}`,
          method: 'POST',
          body: toFormData(body),
        };
      },
      invalidatesTags: ['Platform'],
    }),
    updatePlatform: builder.mutation({
      query({ id, body }) {
        return {
          url: `${PLATFORMS_URL}/${id}`,
          method: 'PATCH',
          body: toFormData(body),
        };
      },
      invalidatesTags: ['Platform'],
    }),
    deletePlatform: builder.mutation({
      query(id) {
        return {
          url: `${PLATFORMS_URL}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Platform'],
    }),
  }),
});

export const {
  useGetPlatformsQuery,
  useGetPlatformQuery,
  useCreatePlatformMutation,
  useUpdatePlatformMutation,
  useDeletePlatformMutation,
} = platformSlice;
