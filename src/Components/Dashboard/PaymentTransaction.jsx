import {  useState, useMemo } from "react";
// import axios from "axios";
import { ConfigProvider, Table, Input } from "antd";
import { SearchOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGetAllTasksPaymentQuery } from "../../Redux/api/dashboardApi";
import moment from "moment";



const PaymentTransaction = () => {
  const [searchText, setSearchText] = useState("");
  // const [taskConformPaymentData, setTaskConformPamentData] = useState([]);
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  const { data:taskPayment, isLoading } = useGetAllTasksPaymentQuery();


console.log('taskPayment',taskPayment?.data?.result);

  const filteredData = useMemo(() => {
    if (!searchText) return taskPayment?.data?.result;
    return taskPayment?.data?.result?.filter((item) =>
      item.method.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [taskPayment, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const onChange = (filters, extra) => {
    console.log("params", filters, extra);
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
    key: "fullName",
    render: (text, record) => record.posterUserId.fullName,
    responsive: ["md", "xs"],
  },
  {
    title: "Provider Email",
    key: "taskName",
    render : (text, record) => record.posterUserId.email,
    responsive: ["sm"],
  },
  {
    title: "Amount",
    key: "price",
    render: (text, record) => `$${record.price}`,
    responsive: ["sm"],
  },
  {
    title: "Method",
    dataIndex: "method",
    key: "method",
    responsive: ["sm", "xs"],
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    responsive: ["sm", "xs"],
    render: (text) => (text === "paid" ? "Paid" : "Pending"),
  },
  {
    title: "Transaction Date",
    dataIndex: "transactionDate",
    key: "transactionId",
    responsive: ["sm", "xs"],
    render : (text) => moment(text).format('DD-MM-YYYY'),
  },
  {
    title: "Transaction Id",
    dataIndex: "transactionId",
    key: "transactionId",
    responsive: ["sm", "xs"],
  },
];

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
              Task Payment Transaction
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
              loading={isLoading}
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
