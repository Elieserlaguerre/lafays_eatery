import { multiTenantApi } from "./multiTenantApi";

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
		})
	})
});

export const { useUserRegistrationMutation } = globalApi;
