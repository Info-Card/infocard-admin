import { USERS_URL } from '@/configs/constants';
import { apiSlice } from '../api';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createUser: builder.mutation({
      query(body) {
        return {
          url: `${USERS_URL}`,
          method: 'POST',
          body: body,
        };
      },
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query({ id, body }) {
        return {
          url: `${USERS_URL}/${id}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query(id) {
        return {
          url: `${USERS_URL}/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userSlice;
