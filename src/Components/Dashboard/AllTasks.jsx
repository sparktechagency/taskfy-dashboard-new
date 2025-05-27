// import React, { useState, useEffect, useMemo } from "react";
// import { Input } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// import axios from "axios";
// import { Tabs } from "antd";
// import CompletedTask from "./Tasks/CompletedTask/CompletedTask";
// import CencelTask from "./Tasks/CencelTask/CencelTask";
// import OngoingTask from "./Tasks/OngoingTask/OngoingTask";
// // import { useGetAllTasksQuery } from "../../Redux/api/dashboardApi";

// const onChange = (key) => {
//   console.log(key);
// };

// const AllTasks = () => {
//   const [searchText, setSearchText] = useState("");
//   const [tasksData, setTasksData] = useState([]);
//   // const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   //  useEffect(() => {
//   //   if (taskData && taskData) {
//   //     setTasksData(taskData);
//   //   }
//   // }, [taskData]);

//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const response = await axios.get("/data/tasks.json");
//         // console.log("all tasks ===> ", response);
//         const data = Array.isArray(response.data) ? response.data : [];
//         // console.log("Fetched Data task:", data); // Log the data format
//         setTasksData(data);
//       } catch (error) {
//         console.error("Error fetching stories data:", error);
//         setTasksData([]); // Set to empty array if fetching fails
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStories();
//   }, []);

//   const filteredData = useMemo(() => {
//     if (!searchText) return tasksData;
//     return tasksData.filter(
//       (item) =>
//         item.taskName.toLowerCase().includes(searchText.toLowerCase()) ||
//         item.taskDetails.toLowerCase().includes(searchText.toLowerCase())
//     );
//   }, [tasksData, searchText]);

//   const onSearch = (value) => {
//     setSearchText(value);
//   };

//   const items = [
//     {
//       key: "1",
//       label: "Ongoing",
//       children: <OngoingTask filteredData={filteredData} />,
//     },
//     {
//       key: "2",
//       label: "Completed",
//       children: <CompletedTask filteredData={filteredData} />,
//     },
//     {
//       key: "3",
//       label: "Cencel",
//       children: <CencelTask filteredData={filteredData} />,
//     },
//   ];

//   if (loading) {
//     <div>Loading...</div>;
//   }
//   return (
//     <div className="p-5 min-h-[90vh] bg-[#E6ECF3]">
//       <div className="flex justify-between items-center mb-2">
//         <h3 className="text-[#1F2852] text-xl font-bold ">All Tasks</h3>
//         <div className="flex items-center">
//           <Input
//             placeholder="Search Here"
//             prefix={<SearchOutlined className="text-[#013564]" />}
//             className="w-72 rounded-lg"
//             value={searchText}
//             onChange={(e) => onSearch(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* <Tabs defaultActiveKey="1" items={items} onChange={onChange} /> */}
//       <Tabs
//         defaultActiveKey="1"
//         onChange={onChange}
//         items={items}
//         tabBarStyle={{
//           backgroundColor: "#FFFFFF", // Tab background color
//           padding: "10px",
//           borderRadius: "5px",
//         }}
//         tabBarGutter={0} // Gap between tabs
//         moreIcon={null}
//       />
//       <style jsx>{`
//         .ant-tabs-tab {
//           padding-top: 16px !important;
//           padding-right: 30px !important;
//           padding-bottom: 16px !important;
//           padding-left: 30px !important;
//           background-color: transparent !important;
//           color: black !important;
//           borderradius: "10px";
//         }
//         .ant-tabs-tab-active {
//           background-color: #b1c3db !important;
//         }
//         .ant-tabs-tab-active .ant-tabs-tab-btn {
//           color: #1f2852 !important;
//         }
//         .ant-tabs-tab-btn {
//           color: black !important;
//         }
//         .ant-tabs-ink-bar {
//           background-color: #1f2852 !important;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AllTasks;

/* eslint-disable react/prop-types */
import { Button, Table, ConfigProvider, Input, Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { DownloadOutlined, SearchOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import { useGetAllTasksQuery } from "../../Redux/api/dashboardApi";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const AllTasks = () => {
  const [searchText, setSearchText] = useState("");
  // const [tasksData, setTasksData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ongoing");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const {data:allTaskData} = useGetAllTasksQuery();
  console.log('allTaskData',allTaskData);

  const handleExport = () => {
    const exportData = allTaskData?.data?.map((task) => ({
      taskName: task.taskName,
      taskDetails: task.taskDetails,
      price: task.price,
      taskType: task.taskType,
      taskTimeDate: task.taskTimeDate,
      taskAddress: task.taskAddress,
      category: task.category,
      certainTime: task.certainTime,
      ratingStatus: task.ratingStatus,
      paymentStatus: task.paymentStatus,
      createdAt: task.createdAt,

    }));

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB").replace(/\//g, "-"); 
    const formattedTime = now.toLocaleTimeString("en-GB").replace(/:/g, "-"); 
    
    const xlSheetName = `TASK_FLY_ALL_Task_List_${formattedDate}_${formattedTime}`;

    const worksheet = XLSX.utils.json_to_sheet(exportData); 
    const workbook = XLSX.utils.book_new(); 
    XLSX.utils.book_append_sheet(workbook, worksheet, "User List"); 

    XLSX.writeFile(workbook, `${xlSheetName}.xlsx`);
  };



  useEffect(() => {
    // const fetchTasks = async () => {
    //   try {
    //     const response = await axios.get("/data/tasks.json");
    //     const data = Array.isArray(response.data) ? response.data : [];
    //     setTasksData(data);
    //   } catch (error) {
    //     console.error("Error fetching tasks data:", error);
    //     setTasksData([]); // Set to empty array if fetching fails
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("/data/categoryData.json");
        const data = Array.isArray(response.data) ? response.data : [];
        setCategoryData(data);
      } catch (error) {
        console.error("Error fetching category data:", error);
        setCategoryData([]); // Set to empty array if fetching fails
      } finally {
        setLoading(false);
      }
    };

    // fetchTasks();
    fetchCategories();
  }, []);

  useEffect(() => {
    let filtered = allTaskData?.data;
    console.log('first task requested details ===>', filtered);

    // Filter by the active tab's task status
    if (activeTab) {
      filtered = allTaskData?.data?.filter((item) => item.status === activeTab);
    }

    // Apply search text filter
    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.taskName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.taskDetails.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [allTaskData?.data, searchText, activeTab]);

  console.log('filterData',filteredData);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const columns = [
    {
      title: "S.ID",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: ["provider", "fullName"],
      key: "name",
      render: (text, record) => record.posterUserId.fullName,
    },
    {
      title: "Email",
      dataIndex: ["provider", "email"],
      key: "email",
    },
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
    },
    {
      title: "Task Category",
      dataIndex: "category",
      key: "category",
      filters: categoryData.map((category) => ({
        text: category.name,
        value: category.name,
      })),
      onFilter: (value, record) => record.category === value,
    },
    // {
    //   title: "Task Price",
    //   dataIndex: "taskPrice",
    //   key: "taskPrice",
    //   render: (price) => `$${price}`,
    // },
    {
      title: "Task Price",
      dataIndex: "price",
      key: "price",
      responsive: ["sm"],
      render: (price) => `$${price}`,
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Task Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created Date",
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
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5 min-h-[90vh] bg-[#E6ECF3]">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-[#1F2852] text-xl font-bold ">All Tasks</h3>
        <div className="flex items-center">
          <Input
            placeholder="Search Here"
            prefix={<SearchOutlined className="text-[#013564]" />}
            className="w-72 rounded-lg"
            value={searchText}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div>
        <Tabs
        defaultActiveKey="ongoing"
        onChange={(key) => {
          setActiveTab(key);
          setSearchText(""); // Optionally reset search when switching tabs
        }}
        tabBarStyle={{
          width: "fit-content",
          backgroundColor: "#FFFFFF", // Tab background color
          padding: "10px",
          borderRadius: "5px",
        }}
        items={[
          { key: "ongoing", label: "Ongoing", children: null },
          { key: "complete", label: "Completed", children: null },
          { key: "cancel", label: "Cancelled", children: null },
        ]}
      />
        </div>
        <div>
        <Button type="primary" onClick={handleExport} icon={<DownloadOutlined />}>
        Export to Excel
      </Button>
        </div>
      </div>
     
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
        <div className="bg-white shadow-md rounded-lg -mt-3">
          <Table
            dataSource={Array.isArray(filteredData) ? filteredData : []}
            columns={columns}
            pagination={{ pageSize: 8 }}
            rowKey="_id"
            scroll={{ x: "100%" }}
          />
        </div>
      </ConfigProvider>
      {/* <div className="text-center mt-10 pb-10">
        <Button type="primary" onClick={handleExport}>
          Export to Excel
        </Button>
      </div> */}
      <style>{`
        .ant-tabs-tab {
          padding-top: 16px !important;
          padding-right: 30px !important;
          padding-bottom: 16px !important;
          padding-left: 30px !important;
          background-color: transparent !important;
          color: black !important;
          borderradius: "10px";
        }
        .ant-tabs-tab-active {
          background-color: #b1c3db !important;
        }
        .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #1f2852 !important;
        }
        .ant-tabs-tab-btn {
          color: black !important;
        }
        .ant-tabs-ink-bar {
          background-color: #1f2852 !important;
        }
      `}</style>
    </div>
  );
};

export default AllTasks;
