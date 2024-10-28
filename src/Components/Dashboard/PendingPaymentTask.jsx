
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { ConfigProvider, Table, Input } from "antd";
import { SearchOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import { useGetAllPendingPaymentTaskQuery } from "../../Redux/api/dashboardApi";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};
const columns = [
  {
    title: "S.ID",
    dataIndex: "index",
    responsive: ["md"],
    render: (text, record, index) => index + 1,
  },
  
  {
    title: "Provider Name",
    dataIndex: ["provider", "fullName"],
    key: "fullName",
    responsive: ["md","xs"], 
  },
  {
    title: "Task Name",
    dataIndex: "taskName",
    key: "taskName",
    responsive: ["sm"], 
  },
  {
    title: "Task Price",
    dataIndex: "taskPrice",
    key: "taskPrice",
    responsive: ["sm"], 
    render: (price) => `$${price}`, 
  },
  
  {
    title: "Task Category",
    dataIndex: "category",
    key: "category",
    responsive: ["sm", "xs"],
    
  },
  {
    title: "Task Created Date",
    dataIndex: "taskDate",
    key: "taskDate",
    responsive: ["sm", "xs"],
    render: (text) => formatDate(text),
    
  },{
    title: "Payment Status",
    dataIndex: "status",
    key: "status",
    responsive: ["sm", "xs"],
    render: (status) => (status ? "Paid" : "Unpaid"), 
  }
  
];

const PendingPaymentTask = () => {
  const [searchText, setSearchText] = useState("");
  const [taskPendingPaymentData, setTaskPendingPamentData] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("/data/pendingPaymentTask.json");
        // console.log("all tasks ===> ", response);
        const data = Array.isArray(response.data) ? response.data : [];
        // console.log("Fetched Data task:", data); // Log the data format
        setTaskPendingPamentData(data);
      } catch (error) {
        console.error("Error fetching stories data:", error);
        setTaskPendingPamentData([]); // Set to empty array if fetching fails
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);
 
 

  const filteredData = useMemo(() => {
    if (!searchText) return taskPendingPaymentData;
    return taskPendingPaymentData.filter((item) =>
      item.provider.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [taskPendingPaymentData, searchText]);

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
              All Conform Payment Tasks
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

export default PendingPaymentTask;
