/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { ConfigProvider, Table, Input, Button, Space, Modal } from "antd";
import { SearchOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGetAllWithdrawConfirmQuery } from "../../Redux/api/dashboardApi";
// import { useGetAllConformWithdrawQuery, useGetAllPendingWithdrawQuery } from "../../Redux/api/dashboardApi";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const ConformWithdrawList = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  // const [isViewModalVisible, setIsViewModalVisible] = useState(false);

 const columns = [
     {
       title: "S.ID",
       dataIndex: "index",
       responsive: ["md"],
       render: (text, record, index) => index + 1,
     },
     {
       title: "Tasker Name",
       dataIndex: ["taskerUserId", "fullName"],
       key: "fullName",
       responsive: ["md", "xs"],
     },
     {
       title: "Tasker Email",
       dataIndex: ["taskerUserId", "email"],
       key: "email",
       responsive: ["md", "xs"],
     },
     
     {
       title: "Method",
       dataIndex: "method",
       key: "method",
       responsive: ["sm"],
     },
     {
       title: "Amount",
       dataIndex: "amount",
       key: "amount",
       responsive: ["sm"],
     },
    
     {
       title: "Status",
       dataIndex: "status",
       key: "status",
       responsive: ["sm", "xs"],
       render: (text) => {
         let color = "";
         let displayText = text;
         let fontWeight = "normal";
 
         if (text === "request") {
           color = "#FFD33C";
           displayText = "Request";
           fontWeight = "bold";
         } else if (text === "completed") {
           color = "green";
           displayText = "Completed";
           fontWeight = "bold";
         }
 
         return <span style={{ color, fontWeight }}>{displayText}</span>;
       },
     },
      {
       title: "Request Date",
       dataIndex: "transactionDate",
       key: "transactionDate",
       render: (text) => formatDate(text),
     },
     {
       title: "Action",
       responsive: ["sm"],
       render: (text, record) => (
         <Space>
           <Button
             onClick={() => showViewModal(record)}
             style={{ border: "1px solid", borderColor: "#023E8A" }}
           >
             View Details
           </Button>
         </Space>
       ),
     },
   ];

  const { data: confirmWithdrawData, isLoading } = useGetAllWithdrawConfirmQuery();

  const filteredData = useMemo(() => {
  const rawData = confirmWithdrawData?.data?.result;
  if (!Array.isArray(rawData)) {
    return [];
  }
  if (!searchText) return rawData;
  return rawData.filter((item) =>
    (item.method || "").toLowerCase().includes(searchText.toLowerCase())
  );
}, [confirmWithdrawData?.data, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const onChange = (filters, extra) => {
    console.log("params", filters, extra);
  };

  const handleWithdraw = (record) => {
    // Implement your logic for pending withdraw action
    console.log("Withdraw action for: ", record);
    // You can integrate your logic for processing the withdrawal request here.
  };

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
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
              Confirm Withdraw List
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

      {/* <Modal
        title={
          <div className="pt-7">
            <h2 className="text-[#010515] text-2xl font-bold ">
              User Withdraw Details
            </h2>
          </div>
        }
        open={isViewModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        style={{ textAlign: "center" }}
        width={450}
        className=""
      >
        {currentRecord && (
          <div>
            <div className="flex flex-col text-lg pb-5  gap-y-2 text-start w-[80%] mx-auto mt-3">
              <p>
                <span className="font-semibold ">Name:</span>{" "}
                {currentRecord.worker.fullName}
              </p>
              <p>
                <span className="font-semibold ">Email:</span>{" "}
                {currentRecord.worker.email}
              </p>
              <p>
                <span className="font-semibold ">Phone No:</span>{" "}
                {currentRecord.worker.phone}
              </p>
              <p>
                <span className="font-semibold ">Amount:</span>{" "}
                {currentRecord.amount}
              </p>
              <p>
                <span className="font-semibold ">Payment Method:</span>{" "}
                {currentRecord.method}
              </p>
              <p>
                <span className="font-semibold ">Payment Status:</span>{" "}
                {currentRecord.status}
              </p>
              <p>
                <span className="font-semibold ">Payment Transaction Id:</span>{" "}
                {currentRecord.transactionId}
              </p>
            </div>
          </div>
        )}
      </Modal> */}

      <Modal
        title={
          <div className="pt-7">
            <h2 className="text-[#010515] text-2xl mb-5 font-bold text-center">
              Tasker Withdraw Details
            </h2>
          </div>
        }
        open={isViewModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        width={600}
      >
        {currentRecord && (
          <div className="w-full max-w-md mx-auto space-y-4 text-left">
            {[
              { label: "Name", value: currentRecord.taskerUserId.fullName },
              { label: "Email", value: currentRecord.taskerUserId.email },
              { label: "Phone No", value: currentRecord.taskerUserId.phone || "N/A" },
              { label: "Amount", value: currentRecord.amount },
              { label: "Method", value: currentRecord.method },
              { label: "Status", value: currentRecord.status },
              { label: "Request Date", value: formatDate(currentRecord.createdAt) },
              { label: "Country Name", value: currentRecord.country || "N/A" },
              { label: "Bank No", value: currentRecord.accountNumber || "N/A" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center bg-gray-50 rounded-md p-3 shadow-sm"
              >
                <span className="font-semibold text-gray-700">{label}:</span>
                <span className="text-gray-900 break-words max-w-[70%] text-right">{value}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>

      {/* Block Confirmation Modal */}
      {/* <Modal
          open={isBlockModalVisible}
          onOk={handleBlock}
          onCancel={handleCancel}
          okText="Block"
          cancelText="Cancel"
          centered
          style={{ textAlign: "center" }}
          footer={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "40px",
              }}
            >
              <Button
                onClick={handleCancel}
                style={{
                  marginRight: 12,
                  background: "rgba(221, 221, 221, 1)",
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                style={{ background: "#013564" }}
                // onClick={handleBlock}
              >
                Block
              </Button>
            </div>
          }
        >
          <p className="text-lg font-semibold pt-10 pb-4">
            Are you sure you want to block this user?
          </p>
        </Modal> */}
    </div>
  );
};

export default ConformWithdrawList;
