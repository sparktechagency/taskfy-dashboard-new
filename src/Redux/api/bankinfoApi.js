import { baseApi } from "../baseApi";

const bankinfoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBankInfo: builder.mutation({
      query: (data) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/admin-bank-info/bank-info",
          method: "POST",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
    getBankInfo: builder.query({
      query: () => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/admin-bank-info",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
    updateBankInfo: builder.mutation({
      query: (data) => {
        const accessToken = localStorage.getItem("accessToken");
        return {
          url: "/admin-bank-info/update",
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        };
      },
    }),
   
  }),
});

export const {
  useAddBankInfoMutation,
  useGetBankInfoQuery,
  useUpdateBankInfoMutation
} = bankinfoApi; 