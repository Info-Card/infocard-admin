import { TAGS_URL } from '@/configs/constants';
import { apiSlice } from '../api';

export const tagSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      query: (params) => ({
        url: TAGS_URL,
        params,
      }),
      providesTags: ['Tag'],
      keepUnusedDataFor: 5,
    }),
    getMyTags: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `${TAGS_URL}/my-tags`,
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Tag'],
    }),
    getTag: builder.query({
      query: (id) => ({
        url: `${TAGS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createTag: builder.mutation({
      query(body) {
        return {
          url: `${TAGS_URL}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['Tag'],
    }),
    updateTag: builder.mutation({
      query({ id, body }) {
        return {
          url: `${TAGS_URL}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['Tag'],
    }),
    deleteTag: builder.mutation({
      query(id) {
        return {
          url: `${TAGS_URL}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Tag'],
    }),
    exportTag: builder.mutation({
      query: (id) => {
        return {
          url: `${TAGS_URL}/export-csv/${id}`,
          method: 'GET',
        };
      },
      invalidatesTags: ['Tag'],
    }),

    unLinkTag: builder.query({
      query: (tagId) => ({
        url: `${TAGS_URL}/unlink/${tagId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    linkTag: builder.query({
      query: ({ userId, tagId }) => ({
        url: `${TAGS_URL}/link/${tagId}`,
        params: { userId },
      }),
      providesTags: ['Tag'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetTagsQuery,
  useGetMyTagsQuery,
  useGetTagQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
  useExportTagMutation,
  useUnLinkTagQuery,
  useLazyLinkTagQuery,
} = tagSlice;
