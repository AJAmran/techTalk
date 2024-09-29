import { api } from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "users",
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `users/${userId}`,
        method: "PUT",
        body: { role },
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateUserRoleMutation } = userApi;
