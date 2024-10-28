import React, { useState,useEffect,useMemo } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { Tabs } from 'antd';
import CompletedTask from "./Tasks/CompletedTask/CompletedTask";
import CencelTask from "./Tasks/CencelTask/CencelTask";
import OngoingTask from "./Tasks/OngoingTask/OngoingTask";
// import { useGetAllTasksQuery } from "../../Redux/api/dashboardApi";

const onChange = (key) => {
  console.log(key);
};



const AllTasks = () => {
  const [searchText, setSearchText] = useState("");
  const [tasksData, setTasksData] = useState([]);
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 
  
  
  
  //  useEffect(() => {
  //   if (taskData && taskData) {
  //     setTasksData(taskData);
  //   }
  // }, [taskData]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("/data/tasks.json");
        // console.log("all tasks ===> ", response);
        const data = Array.isArray(response.data) ? response.data : [];
        // console.log("Fetched Data task:", data); // Log the data format
        setTasksData(data);
      } catch (error) {
        console.error("Error fetching stories data:", error);
        setTasksData([]); // Set to empty array if fetching fails
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return tasksData;
    return tasksData.filter(
      (item) =>
        item.taskName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.taskDetails.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [tasksData, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const items = [
    {
      key: '1',
      label: 'Ongoing',
      children: <OngoingTask filteredData={filteredData} />,
    },
    {
      key: '2',
      label: 'Completed',
      children: <CompletedTask filteredData={filteredData}/>,
    },
    {
      key: '3',
      label: 'Cencel',
      children: <CencelTask filteredData={filteredData}/>,
    },
  ];

  if(loading){
    <div>Loading...</div>
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
 

  {/* <Tabs defaultActiveKey="1" items={items} onChange={onChange} /> */}
  <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={items}
        tabBarStyle={{
          backgroundColor: '#FFFFFF', // Tab background color
          padding: '10px', 
          borderRadius:'5px'
        }}
        tabBarGutter={0} // Gap between tabs
        moreIcon={null}
      />
      <style jsx>{`
        .ant-tabs-tab {
          padding-top: 16px !important;
          padding-right: 30px !important;
          padding-bottom: 16px !important;
          padding-left: 30px !important;
          background-color: transparent !important; 
          color: black !important; 
          borderRadius:'10px'
        }
        .ant-tabs-tab-active {
          background-color: #B1C3DB !important; 
          
        }
        .ant-tabs-tab-active .ant-tabs-tab-btn {
          color: #1F2852 !important;
        }
        .ant-tabs-tab-btn {
          color: black !important; 
        }
          .ant-tabs-ink-bar {
          background-color: #1F2852 !important; 
        }
      `}</style>

    </div>

  );
};

export default AllTasks;
