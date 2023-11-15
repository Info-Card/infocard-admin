import { CATEGORIES_URL } from '@/configs/constants';
import { apiSlice } from '../api';

export const categorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (params) => ({
        url: CATEGORIES_URL,
        params,
      }),
      providesTags: ['Category'],
      keepUnusedDataFor: 5,
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createCategory: builder.mutation({
      query(body) {
        return {
          url: `${CATEGORIES_URL}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation({
      query({ id, body }) {
        return {
          url: `${CATEGORIES_URL}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation({
      query(id) {
        return {
          url: `${CATEGORIES_URL}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categorySlice;
