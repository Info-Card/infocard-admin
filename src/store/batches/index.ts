import { BATCHES_URL } from '@/configs/constants';
import { apiSlice } from '../api';

export const batchSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBatches: builder.query({
      query: (params) => ({
        url: BATCHES_URL,
        params,
      }),
      providesTags: ['Batch'],
      keepUnusedDataFor: 5,
    }),
    getBatch: builder.query({
      query: (id) => ({
        url: `${BATCHES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createBatch: builder.mutation({
      query(body) {
        return {
          url: `${BATCHES_URL}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['Batch'],
    }),
    updateBatch: builder.mutation({
      query({ id, body }) {
        return {
          url: `${BATCHES_URL}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['Batch'],
    }),
    deleteBatch: builder.mutation({
      query(id) {
        return {
          url: `${BATCHES_URL}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Batch'],
    }),
  }),
});

export const {
  useGetBatchesQuery,
  useGetBatchQuery,
  useCreateBatchMutation,
  useUpdateBatchMutation,
  useDeleteBatchMutation,
} = batchSlice;
