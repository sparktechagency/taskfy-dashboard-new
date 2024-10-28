import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { ConfigProvider, Table, Input, Menu, Dropdown, Space } from "antd";
import { SearchOutlined, LeftOutlined, DownOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetAllWorkerQuery } from "../../../../Redux/api/authApi";


const menuItems = (
  <Menu>
    <Menu.Item key="1">
      <NavLink to="/all-worker">Worker</NavLink>
    </Menu.Item>
    <Menu.Item key="2">
      <NavLink to="/all-provider">Provider</NavLink>
    </Menu.Item>
  </Menu>
);

const columns = [
  {
    title: "S.ID",
    dataIndex: "serialId",
    responsive: ["md"], // Hide on smaller screens (below medium)
    render: (text, record, index) => index + 1,
  },
  {
    title: "Users Name",
    dataIndex: "fullName",
    render: (text, record) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <img
          src={record.avatar}
          alt={record.customerName}
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            marginRight: 8,
          }}
        /> */}
        {text}
      </div>
    ),
    responsive: ["xs", "sm"], // Visible on small and extra-small screens
  },
  {
    title: "Email",
    dataIndex: "email",
    responsive: ["lg"], // Hide on screens smaller than large
  },
  {
    title: "Contact Number",
    dataIndex: "phone",
    responsive: ["md"], // Hide on smaller screens
  },
  {
    title: "Delete Users",
    dataIndex: "isDelete",
    responsive: ["md"], // Hide on smaller screens
  },
  
  {
    title: (
      <Dropdown overlay={menuItems} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Role
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    ),
    dataIndex: "role",
    responsive: ["sm", "xs"],
  },
];

const AllWorker = () => {
  const [searchText, setSearchText] = useState("");
  const [workerData, setWorkerData] = useState([]);
  const [filteredWorkerData, setFilteredWorkerData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("/data/allProvider.json");
        // console.log("all users ===> ", response);
        const data = Array.isArray(response.data) ? response.data : [];
        // console.log("Fetched Data task:", data); // Log the data format
        setWorkerData(data);
      } catch (error) {
        console.error("Error fetching stories data:", error);
        setWorkerData([]); // Set to empty array if fetching fails
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

// console.log('providerData',providerData)
useEffect(() => {
  if (workerData && workerData?.length) {
    // Filter providers with the specific role
    const filteredProviders = workerData?.filter(
      (provider) => provider.role === "worker" // Replace "admin" with the role you want to filter by
    );

    // Set the provider data if there are any matching providers
    if (filteredProviders?.length > 0) {
      setFilteredWorkerData(filteredProviders);
    }
  }
}, [workerData]);


  const filteredData = useMemo(() => {
    if (!searchText) return filteredWorkerData;
    return filteredWorkerData.filter((item) =>
      item.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [filteredWorkerData, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const onChange = (filters, extra) => {
    console.log("params", filters, extra);
  };

  return (
    <div className="min-h-[90vh] p-4 lg:p-6">
      {/* Header Section */}
      <div className="bg-[#E6ECF3] rounded-lg mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4">
          <div className="flex items-center">
            <LeftOutlined
              className="text-[#3565A1] text-xl mr-4 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-2xl md:text-3xl font-bold text-[#1F2852]">
              All Worker List
            </h1>
          </div>

          <div className="flex gap-4 items-center w-full md:w-auto">
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    colorTextPlaceholder: "rgb(0, 0, 0,0.5)",
                    colorBgContainer: "white",
                  },
                },
              }}
            >
              <Input
                placeholder="Search..."
                value={searchText}
                onChange={(e) => onSearch(e.target.value)}
                className="text-base font-semibold w-full md:w-72"
                prefix={
                  <SearchOutlined className="text-[#97C6EA] font-bold text-lg mr-2" />
                }
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#F3F3F3",
                  border: "1px solid white",
                  color: "#010515",
                }}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#FAFAFA",
                headerColor: "#1F2852",
                colorBgContainer: "rgb(255,255,255)",
                colorText: "rgb(0,0,0)",
                headerSplitColor: "rgba(151, 198, 234, 1)",
              },
            },
          }}
        >
          <div className="w-full overflow-x-auto rounded-xl">
            <Table
              columns={columns}
              dataSource={filteredData}
              loading={loading}
              pagination={{ pageSize: 10 }}
              onChange={onChange}
              className="user-table"
              scroll={{ x: true }} // Enable horizontal scrolling on smaller screens
            />
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default AllWorker;
