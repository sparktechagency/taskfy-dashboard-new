
import { baseApi } from "../baseApi";

const accessToken = localStorage.getItem("authToken");
// console.log(accessToken);

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => {
        const accessToken = localStorage.getItem("authToken");
        return {
          url: "/auth/change-password",
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getSettings: builder.query({
      query: () => ({
        url: "/setting",
        method: "GET",
      }),
    //   providesTags: [tagTypes.settings],
    }),
    addSettings: builder.mutation({
      query: (data) => ({
        url: "/setting",
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        // invalidatesTags: [tagTypes.settings],
      }),
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: "/setting",
        method: "PATCH",
        body: data,
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `Bearer ${accessToken}`,
        // },
        // invalidatesTags: [tagTypes.settings],
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useAddSettingsMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} = settingsApi;