import { multiTenantApi } from "./root-api";

export const globalApi = multiTenantApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (build) => ({
		userRegistration: build.mutation({
			query: (formData) => ({
				url: "/global/register",
				method: "POST",
				body: formData
			}),
			invalidatesTags: [{ type: "global user registration" }],
			transformErrorResponse: (results) => results.data.message
		}),
		userLogin: build.query({
			query: (query) => ({
				url: "/global/login",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global user login" }],
			transformErrorResponse: (results) => results.data.message
			//keepUnusedDataFor: 0
		}),
		getCurrentUser: build.query({
			query: (query) => ({
				url: "/global/user",
				method: "GET",
				params: query
			}),
			providesTags: [{ type: "global current user" }],
			transformErrorResponse: (results) => results.data.message
			//keepUnusedDataFor: 0
		})
	})
});

export const { useUserRegistrationMutation, useLazyUserLoginQuery, useLazyGetCurrentUserQuery } = globalApi;
