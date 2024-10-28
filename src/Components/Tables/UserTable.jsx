import React, { useEffect, useState } from "react";
import axios from "axios";
import { ConfigProvider, Table } from "antd";
// import { useGetAllUserQuery } from "../../Redux/api/authApi";

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
    title: "Role",
    dataIndex: "role",
    responsive: ["xs", "sm", "md"], // Visible on all screen sizes
  },
];

const UserTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { data: usersData, isLoading } = useGetAllUserQuery(null);
  
  //  useEffect(() => {
  //   if (usersData && usersData.data) {
  //     setData(usersData.data); // Ensure only valid data is set
  //   }
  // }, [usersData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/userData.json");
      //  const response1 = await useGetAllUserQuery(null)
      //  console.log('response1',response.data);
        setData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log("data",data)


  const onChange = (filters, extra) => {
    console.log("params", filters, extra);
  };

  return (
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
      <div className="w-full overflow-x-auto rounded-xl p-4">
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 5, responsive: true }}
          // pagination={{ pageSize: 5, showSizeChanger: true, responsive: true }}
          onChange={onChange}
          className="user-table"
          scroll={{ x: "100%" }} // Ensure horizontal scroll on small screens
        />
      </div>
    </ConfigProvider>
  );
};

export default UserTable;
