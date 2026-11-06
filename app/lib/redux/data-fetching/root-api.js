import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

/*
=====================
MULTI-TENANT API BASE
=====================
Inject API-slice endpoints later as needed
*/

export const multiTenantApi = createApi({
	reducerPath: "multiTenantApi",
	baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
	endpoints: () => ({}),
	tagTypes: ["global user registration"]
});
