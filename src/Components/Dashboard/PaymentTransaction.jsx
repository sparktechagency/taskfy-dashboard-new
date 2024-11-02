import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { ConfigProvider, Table, Input } from "antd";
import { SearchOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import { useGetAllTasksPaymentQuery } from "../../Redux/api/dashboardApi";

const columns = [
  {
    title: "S.ID",
    dataIndex: "index",
    responsive: ["md"],
    render: (text, record, index) => index + 1,
  },

  {
    title: "Provider Name",
    dataIndex: ["providerId", "fullName"],
    key: "fullName",
    responsive: ["md", "xs"],
  },
  {
    title: "Task Name",
    dataIndex: ["taskId", "taskName"],
    key: "taskName",
    responsive: ["sm"],
  },
  {
    title: "Task Price",
    dataIndex: ["taskId", "taskPrice"],
    key: "taskPrice",
    responsive: ["sm"],
  },
  {
    title: "Task Payment Method",
    dataIndex: "method",
    key: "method",
    responsive: ["sm", "xs"],
  },
  {
    title: "Task Transaction Id",
    dataIndex: "transactionId",
    key: "transactionId",
    responsive: ["sm", "xs"],
  },
];

const PaymentTransaction = () => {
  const [searchText, setSearchText] = useState("");
  const [taskConformPaymentData, setTaskConformPamentData] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("/data/conformPaymentTask.json");
        // console.log("all payment tasks ===> ", response);
        const data = Array.isArray(response.data) ? response.data : [];
        // console.log("Fetched Data task:", data); // Log the data format
        setTaskConformPamentData(data);
      } catch (error) {
        console.error("Error fetching stories data:", error);
        setTaskConformPamentData([]); // Set to empty array if fetching fails
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return taskConformPaymentData;
    return taskConformPaymentData.filter((item) =>
      item.method.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [taskConformPaymentData, searchText]);

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
              All Confirm Payment Tasks
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

export default PaymentTransaction;
