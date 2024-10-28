import React from "react";
import { Button, Table, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";


const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const CencelTask = ({ filteredData }) => {
  const navigate = useNavigate();

  const cencelTask = filteredData.filter(item => item.taskStatus === "canceled")

  const columns = [
    {
      title: "S.ID",
      dataIndex: "index",
      key: "index",
      responsive: ["md"], // Hide on smaller screens
      render: (text, record, index) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: ["provider","fullName"],
      key: "name",
      responsive: ["sm", "xs"], // Visible on small screens
    },
    {
      title: "Email",
      dataIndex:["provider","email"],
      key: "email",
      responsive: ["md"], // Hide on smaller screens
    },
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "storyTitle",
      responsive: ["sm"], // Visible on small screens
    },
    {
      title: "Task Category",
      dataIndex: "category",
      key: "storyTitle",
      responsive: ["sm"], // Visible on small screens
    },
    {
      title: "Task Price",
      dataIndex: "taskPrice",
      key: "taskPrice",
      responsive: ["sm"], 
      render: (price) => `$${price}`, 
    },
    {
      title: "Withdraw Date",
      dataIndex: "createdAt",
      render: (text) => formatDate(text),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          className="bg-white text-[#013564] font-semibold border-[#013564]"
          onClick={() =>
            navigate(`/task-details/${record._id}`, { state: record })
          }
        >
          Details
        </Button>
      ),
      responsive: ["xs", "sm"], // Visible on all screens
    },
  ];

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "rgb(255,255,255)",
              colorBgContainer: "rgb(255,255,255)",
              colorText: "rgb(0,0,0)",
              headerColor: "rgb(1,53,100)",
              borderColor: "rgb(1,53,100)",
            },
          },
        }}
      >
        <div className="bg-white shadow-md rounded-lg">
          <Table
            dataSource={Array.isArray(cencelTask) ? cencelTask : []}
            columns={columns}
            pagination={{ pageSize: 8 }}
            rowKey="serialId"
            scroll={{ x: "100%" }} // Enable horizontal scrolling for smaller screens
          />
        </div>
      </ConfigProvider>
    </div>
  );
};

export default CencelTask;
