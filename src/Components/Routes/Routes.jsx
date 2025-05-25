/* eslint-disable no-unused-vars */
import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../../Pages/Auth/ForgotPassword";
import Main from "../Layout/Main";
import Dashboard from "../Dashboard/Dashboard";
import DashboardLayout from "../Layout/DashboardLayout";
import PrivacyPolicy from "../Dashboard/settings/PrivacyPolicy";
import Profile from "../../Pages/Profile/Profile";
import Logout from "../Dashboard/Logout";
import ChangePassword from "../../Pages/Auth/ChangePassword";
// import BookingDetails from "../Dashboard/UserDetails";
import Notifications from "../Dashboard/Notifications";
import EditProfile from "../../Pages/Profile/EditProfile";
import AboutUs from "../Dashboard/settings/AboutUs";
import UpdatePassword from "../../Pages/Auth/UpdatePassword";
import OtpPage from "../../Pages/Auth/OtpPage";
import SignIn from "../../Pages/Auth/SignIn";
import UserDetails from "../Dashboard/UserDetails";
// import SignUp from "../../Pages/Auth/SignUp";
// import SettingsForgotPassword from "../Dashboard/settings/SettingsForgotPassword";
import SettingsChangePassword from "../Dashboard/settings/SettingsChangePassword";
// import SettingsUpdatePassword from "../Dashboard/settings/SettingsUpdatePassword";
// import SettingsOtpPage from "../Dashboard/settings/SettingsOtpPage";

// import AppTransactions from "../Dashboard/AppTransactions";
// import FAQ from "../Dashboard/settings/FAQ";
import Users from "../Dashboard/Users";
import TermsAndCondition from "../Dashboard/settings/TermsAndCondition";
import AllTasks from "../Dashboard/AllTasks";
import TaskRequestDetails from "../Dashboard/TaskRequestDetails";
// import AllUsers from "../Dashboard/Users/AllUsers/AllUsers";
// import AllWorker from "../Dashboard/Users/AllWorker/AllWorker";
// import AllProvider from "../Dashboard/Users/AllProvider/AllProvider";
import TasksRequest from "../Dashboard/TasksRequest";
import TasksDetails from "../Dashboard/TasksDetails";
import PaymentPendingTasks from "../Dashboard/PendingWithdrawList";
import ConformPaymentTask from "../Dashboard/ConformPaymentTask";
import PaymentTransaction from "../Dashboard/PaymentTransaction";
import WithdrawList from "../Dashboard/PendingWithdrawList";
import ConformWithdrawList from "../Dashboard/ConformWithdrawList";
import PendingWithdrawList from "../Dashboard/PendingWithdrawList";
import CreateAdmin from "../Dashboard/CreateAdmin";
import PendingPaymentTask from "../Dashboard/PendingPaymentTask";
import ProtectedRoute from "../ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "signin",
        element: <SignIn />,
      },
      // {
      //   path: "signup",
      //   element: <SignUp />,
      // },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/verify-otp",
        element: <OtpPage />,
      },
      {
        path: "/update-password",
        element: <UpdatePassword />,
      },
      {
        path: "",
        element: (<ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>),
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "user-details",
            element: <UserDetails />,
          },
          {
            path: "users",
            element: <Users />,
          },
          // {
          //   path: "all-recent-users",
          //   element: <AllUsers />,
          // },
          // {
          //   path: "all-worker",
          //   element: <AllWorker />,
          // },
          // {
          //   path: "all-provider",
          //   element: <AllProvider />,
          // },
          {
            path: "all-tasks",
            element: <AllTasks />,
          },
          {
            path: "task-details/:id",
            element: <TasksDetails />,
          },
          {
            path: "task-requiest-details/:id",
            element: <TaskRequestDetails />,
          },
          {
            path: "tasks-request",
            element: <TasksRequest />,
          },
          {
            path: "conform-payment-tasks",
            element: <ConformPaymentTask />,
          },
          {
            path: "task-payment-transaction",
            element: <PaymentTransaction />,
          },
          {
            path: "task-pending-payment-task",
            element: <PendingPaymentTask />,
          },
          {
            path: "all-pending-withdraw-list",
            element: <PendingWithdrawList />,
          },
          {
            path: "all-conform-withdraw-list",
            element: <ConformWithdrawList />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "dashboard/create-admin",
            element: <CreateAdmin />,
          },
          {
            path: "edit-profile",
            element: <EditProfile />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
          {
            path: "settings/privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "settings/terms-of-service",
            element: <TermsAndCondition />,
          },
          {
            path: "settings/about-us",
            element: <AboutUs />,
          },
          // {
          //   path: "settings/forgot-password",
          //   element: <SettingsForgotPassword />,
          // },
          {
            path: "settings/change-password",
            element: <SettingsChangePassword />,
          },
          // {
          //   path: "settings/update-password",
          //   element: <SettingsUpdatePassword />,
          // },
          // {
          //   path: "settings/otp-page",
          //   element: <SettingsOtpPage />,
          // },
          {
            path: "logout",
            element: <Logout />,
          },
        ],
      },
    ],
  },
]);

export default router;
