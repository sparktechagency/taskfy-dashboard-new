import Topbar from "../Shared/Topbar";
import logo from "/images/small-logo.png";
import dashboardLogo from "../../../public/images/dashboard-logo/dashboard.svg";
import earnings from "../../../public/images/dashboard-logo/Earnings.svg";
import users from "../../../public/images/dashboard-logo/users.svg";
import stories from "../../../public/images/dashboard-logo/stories.svg";
import setting from "../../../public/images/dashboard-logo/Setting.svg";
import logout from "../../../public/images/dashboard-logo/logout.svg";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ConfigProvider, Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import { useState, useEffect } from "react";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState([]);

  // Function to check if any submenu under "Stories" is active
  const isSubMenuActive = (paths) => {
    return paths.some((path) => location.pathname.includes(path));
  };

  // Detect active menu item and open the corresponding submenu
  useEffect(() => {
    if (isSubMenuActive(["all-stories", "story-request"])) {
      setOpenKeys(["stories"]);
    }
  }, [location]);

  return (
    <div className="h-screen">
      <Layout className="min-h-[100vh]">
        <Sider
          width={280}
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            background: "#023E8A",
            // marginRight: "10px",
            // borderRadius: "5px",
          }}
        >
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              width={140}
              height={140}
              className="my-7 mx-auto rounded-lg"
            />
          </Link>
          <ConfigProvider
            theme={{
              // components: {
              //   Button: {
              //     defaultHoverBg: "#97C6EA",
              //     defaultHoverColor: "#1A1A1A",
              //   },
              // },
              token: {
                colorBgBase: "#023E8A",
                colorInfo: "#023E8A",
              },
            }}
          >
            <Menu
              theme="light"
              mode="inline"
              openKeys={openKeys}
              onOpenChange={(keys) => setOpenKeys(keys)}
              defaultSelectedKeys={["dashboard"]}
              style={{
                backgroundColor: "transparent",
                border: "none",
              }}
              items={[
                {
                  key: "dashboard",
                  icon: (
                    <img
                      src={dashboardLogo}
                      alt="dashboard"
                      className={`h-5 menu-icon ${
                        location.pathname.includes("dashboard")
                          ? "active-icon"
                          : ""
                      }`}
                    />
                  ),
                  label: (
                    <NavLink
                      to="dashboard"
                      className={({ isActive }) =>
                        isActive ? "active-menu-item" : ""
                      }
                    >
                      Dashboard
                    </NavLink>
                  ),
                },
                {
                  key: "users",
                  icon: (
                    <img
                      src={users}
                      alt="users"
                      className={`h-5 menu-icon ${
                        location.pathname.includes("users") ? "active-icon" : ""
                      }`}
                    />
                  ),
                  label: (
                    <NavLink
                      to="users"
                      className={({ isActive }) =>
                        isActive ? "active-menu-item" : ""
                      }
                    >
                      Users
                    </NavLink>
                  ),
                },
                {
                  key: "tasks",
                  icon: (
                    <img
                      src={stories}
                      alt="tasks"
                      width={15}
                      height={15}
                      className="menu-icon"
                      // className={`menu-icon ${
                      //   isSubMenuActive(["all-stories", "story-request"])
                      //     ? "active-icon"
                      //     : ""
                      // }`}
                    />
                  ),
                  label: (
                    <span
                      // className={
                      //   isSubMenuActive(["all-stories", "story-request"])
                      //     ? "active-menu-item"
                      //     : ""
                      // }
                      className="text-white active:bg-white active:text-white"
                    >
                      Tasks
                    </span>
                  ),
                  children: [
                    {
                      key: "all-tasks",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="all-tasks"
                          className={({ isActive }) =>
                            isActive ? "active-menu-item" : ""
                          }
                        >
                          All Tasks
                        </NavLink>
                      ),
                    },
                    {
                      key: "tasks-request",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="tasks-request"
                          className={({ isActive }) =>
                            isActive ? "active-menu-item" : ""
                          }
                        >
                          Tasks Request
                        </NavLink>
                      ),
                    },
                    {
                      key: "task-pending-payment-task",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="task-pending-payment-task"
                          className={({ isActive }) =>
                            isActive ? "active-menu-item" : ""
                          }
                        >
                          Pending Payment Tasks
                        </NavLink>
                      ),
                    },
                    {
                      key: "conform-payment-tasks",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="conform-payment-tasks"
                          className={({ isActive }) =>
                            isActive ? "active-menu-item" : ""
                          }
                        >
                          Confirm Payment Tasks
                        </NavLink>
                      ),
                    },
                    {
                      key: "task-payment-transaction",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="task-payment-transaction"
                          className={({ isActive }) =>
                            isActive ? "active-menu-item" : ""
                          }
                        >
                          Transaction Payment task
                        </NavLink>
                      ),
                    },
                  ],
                },

                {
                  key: "withdraws",
                  icon: (
                    <img
                      src={earnings}
                      alt="withdraws"
                      width={15}
                      height={15}
                      className="menu-icon"
                      // className={`menu-icon ${
                      //   isSubMenuActive(["all-stories", "story-request"])
                      //     ? "active-icon"
                      //     : ""
                      // }`}
                    />
                  ),
                  label: (
                    <span
                      // className={
                      //   isSubMenuActive(["all-stories", "story-request"])
                      //     ? "active-menu-item"
                      //     : ""
                      // }
                      className="text-white active:bg-white active:text-white"
                    >
                      Withdraws
                    </span>
                  ),
                  children: [
                    {
                      key: "all-pending-withdraw-list",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="all-pending-withdraw-list"
                          className={({ isActive }) =>
                            isActive ? "active-menu-item" : ""
                          }
                        >
                          Withdraw Request
                        </NavLink>
                      ),
                    },
                    {
                      key: "all-conform-withdraw-list",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="all-conform-withdraw-list"
                          className={({ isActive }) =>
                            isActive ? "active-menu-item" : ""
                          }
                        >
                          Confirm Withdraw
                        </NavLink>
                      ),
                    },
                  ],
                },
                {
                  key: "settings",
                  icon: (
                    <img
                      src={setting}
                      alt="settings"
                      width={15}
                      height={15}
                      className="menu-icon"
                      // className={`menu-icon ${
                      //   isSubMenuActive(["all-stories", "story-request"])
                      //     ? "active-icon"
                      //     : ""
                      // }`}
                    />
                  ),
                  label: (
                    <span
                      // className={
                      //   isSubMenuActive(["all-stories", "story-request"])
                      //     ? "active-menu-item"
                      //     : ""
                      // }
                      className="text-white active:bg-white active:text-white"
                    >
                      Setting
                    </span>
                  ),
                  children: [
                    {
                      key: "settings/change-password",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="settings/change-password"
                          className={({ isActive }) =>
                            isActive ? "active-menu-item" : ""
                          }
                        >
                          Change Password
                        </NavLink>
                      ),
                    },
                    {
                      key: "settings/about-us",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="settings/about-us"
                          className={({ isActive }) =>
                            isActive ? "active-menu-item" : ""
                          }
                        >
                          About Us
                        </NavLink>
                      ),
                    },
                    {
                      key: "settings/terms-and-condition",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="settings/terms-of-service"
                          className={({ isActive }) =>
                            isActive ? "active-menu-item" : ""
                          }
                        >
                          Terms Of Service
                        </NavLink>
                      ),
                    },
                    {
                      key: "settings/privacy-policy",
                      icon: <span>&#8226;</span>,
                      label: (
                        <NavLink
                          to="settings/privacy-policy"
                          className={({ isActive }) =>
                            isActive ? "active-menu-item" : ""
                          }
                        >
                          Privacy And Policy
                        </NavLink>
                      ),
                    },
                  ],
                },

                // {
                //   key: "settings",
                //   icon: (
                //     <img
                //       src={setting}
                //       alt="settings"
                //       width={15}
                //       height={15}
                //       className={`menu-icon ${
                //         location.pathname.includes("settings")
                //           ? "active-icon"
                //           : ""
                //       }`}
                //     />
                //   ),
                //   label: (
                //     <NavLink
                //       to="/settings"
                //       className={({ isActive }) =>
                //         isActive ? "active-menu-item" : ""
                //       }
                //     >
                //       Setting
                //     </NavLink>
                //   ),
                // },
                {
                  key: "dashboard/create-admin",
                  icon: (
                    <img
                      src={users}
                      alt="users"
                      className={`h-5 menu-icon ${
                        location.pathname.includes("users") ? "active-icon" : ""
                      }`}
                    />
                  ),
                  label: (
                    <NavLink
                      to="dashboard/create-admin"
                      className={({ isActive }) =>
                        isActive ? "active-menu-item" : ""
                      }
                    >
                      Create New Admin
                    </NavLink>
                  ),
                },
                {
                  key: "logout",
                  icon: (
                    <img
                      src={logout}
                      alt="logout"
                      width={15}
                      height={15}
                      className={`menu-icon ${
                        location.pathname.includes("signin")
                          ? "active-icon"
                          : ""
                      }`}
                    />
                  ),
                  label: (
                    <NavLink
                      to="signin"
                      className={({ isActive }) =>
                        isActive ? "active-menu-item" : ""
                      }
                    >
                      Logout
                    </NavLink>
                  ),
                },
              ]}
            />
          </ConfigProvider>
        </Sider>
        <Layout style={{ background: "white" }}>
          <Header style={{ borderRadius: "10px" }}>
            <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Header>
          <Content style={{ padding: "25px" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardLayout;
