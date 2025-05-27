// import Cookies from "universal-cookie";
import { baseApi } from "../baseApi";

// const cookie = new Cookies();
// const accessToken = cookie.get("token");

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    SingleTask: builder.query({
      query: (id) => ({
        url: `/task/${id}`,
        method: "GET",
      }),
      providesTags: ["task"],
    }),

    taskdashboardOverview: builder.query({
      query: () => ({
        url: "/task/task-dashboard-overview",
        method: "GET",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      providesTags: ["task"],
    }),

    taskPendingCancelCompleteOverview: builder.query({
      query: () => ({
        url: "/task/task-pending-complete-cancel-overview",
        method: "GET",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      providesTags: ["task"],
    }),

    incomeChartList: builder.query({
      query: (year) => ({
        url: `/payment/all-income-rasio?year=${year}`,
        method: "GET",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      providesTags: ["task"],
    }),

    getAllTasks: builder.query({
      query: () => ({
        url: "/task",
        method: "GET",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      providesTags: ["task"],
    }),

    // admin tasks assign cencel and get pending task

 
    getAllTasksRequests: builder.query({
      query: () => ({
        url: "/task?status=pending",
        method: "GET",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      providesTags: ["task"],
    }),

    acceptTasksRequest: builder.mutation({
      query: (id) => {
        console.log("accept task id", id);
        return {
          url: `/task/accept/${id}`,
          method: "PATCH",
          // headers: {
          //   "content-type": "application/json",
          //   Authorization: `${accessToken}`,
          // },
        };
      },
      invalidatesTags: ["task"],
    }),

    cencelTasksRequest: builder.mutation({
      query: (id) => ({
        url: `/task/cancel/${id}`,
        method: "PATCH",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      invalidatesTags: ["task"],
    }),

    // task payment all get

    getAllTasksPayment: builder.query({
      query: () => {
        const accessToken = localStorage.getItem('accessToken'); 
        return {
          url: `/payment`,
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      // providesTags: ["task"],
    }),

    // withdraw requested admin
    getAllWithdrawRequest: builder.query({
      query: () => ({
        url: "/withdraw?status=request",
        method: "GET",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      providesTags: ["withdraw"],
    }),

    getAllWithdrawConfirm: builder.query({
      query: () => ({
        url: "/withdraw?status=completed",
        method: "GET",
        // headers: {
        //   "content-type": "application/json",
        //   Authorization: `${accessToken}`,
        // },
      }),
      providesTags: ["withdraw"],
    }),

    adminConformWithdraw: builder.mutation({
      query: (id) => {
        const accessToken = localStorage.getItem('accessToken'); 
        return {
          url: `/withdraw/paid/${id}`,
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["withdraw"],
    }),
    adminNotification: builder.query({
      query: () => {
        const accessToken = localStorage.getItem('accessToken'); 
        return {
          url: `/notification/admin-all`,
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  // useAddTaskMutation,
  useSingleTaskQuery,
  useGetAllTasksRequestsQuery,
  useAcceptTasksRequestMutation,
  useCencelTasksRequestMutation,
  useGetAllTasksPaymentQuery,
  useGetAllWithdrawRequestQuery,
  useGetAllWithdrawConfirmQuery,
  useAdminConformWithdrawMutation,
  useIncomeChartListQuery,
  useTaskPendingCancelCompleteOverviewQuery,
  useTaskdashboardOverviewQuery,
  useAdminNotificationQuery
} = dashboardApi;
