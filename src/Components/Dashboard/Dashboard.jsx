import { useEffect, useState } from "react";
import UserTable from "../Tables/UserTable";
import {
  InfoCard,
  TaskOverviewBarChart,
  IncomeLineChart,
} from "../Chart/DashboardChart";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useGetAllTasksQuery, useTaskdashboardOverviewQuery } from "../../Redux/api/dashboardApi";

const Dashboard = () => {
  const [tasksData, setTasksData] = useState([]);
  const [loading, setLoading] = useState(true); // Set to true initially
  const {data:taskCountOverview} = useTaskdashboardOverviewQuery();
  const {data:tasks} = useGetAllTasksQuery();
  // console.log('taskCountOverview',taskCountOverview)
  // console.log('tasks',tasks)

  useEffect(() => {
    // console.log('Fetching data...');
    const fetchStories = async () => {
      try {
        const response = await axios.get("/data/tasks.json");
        // console.log("Response:", response);
        const data = Array.isArray(response?.data) ? response?.data : [];
        // console.log("Fetched Data task:", data);
        setTasksData(data);
      } catch (error) {
        console.error("Error fetching stories data:", error);
        setTasksData([]); // Set to empty array if fetching fails
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  // console.log('data task', tasksData)

  return (
    <div className="w-full p-5 lg:p-10">
      {/* Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6">
        <div className="flex flex-col gap-6 mb-10">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900 mb-1">
            Task Overview
          </h1>

          {/* Adjusting the layout for better responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-6">
            <div className="flex flex-col gap-3">
              <InfoCard
                title="Total task"
                value={taskCountOverview?.data?.totalTask}
                color="bg-blue-400 w-full"
              />
              <InfoCard
                title="On going task"
                value={taskCountOverview?.data?.totalOngoingTask}
                color="bg-purple-400 w-full"
              />
            </div>

            <div className="flex flex-col gap-3">
              <InfoCard title="Tasker" value={taskCountOverview?.data?.tasker} color="bg-green-400 w-full" />
              <InfoCard
                title="Poster"
                value={taskCountOverview?.data?.poster}
                color="bg-purple-300 w-full"
              />
            </div>
          </div>
        </div>

        {/* Task Overview and Income Section */}
        <div className="h-full rounded-lg p-1">
          <div className="flex justify-between mb-14">
            {/* <h1 className="text-2xl lg:text-3xl font-bold text-[#fff] mb-1 ">
              Task overview 
            </h1> */}
            {/* <select className="bg-gray-100 px-2 py-1 rounded-lg text-sm lg:text-base">
              <option>Weekly</option>
              <option>Monthly</option>
            </select> */}
          </div>
        <div className="h-full">  <TaskOverviewBarChart tasks={tasks?.data} /></div>
          {/* <TaskOverviewBarChart /> */}
        </div>

        {/* Income Card */}
        <div className=" rounded-lg px-2 py-3 h-auto lg:h-[92%]">
          <div className="flex justify-between mb-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-1">
              Income
            </h1>
            {/* <select className="bg-gray-100 px-2 py-1 rounded-lg text-sm lg:text-base">
              <option>Weekly</option>
              <option>Monthly</option>
            </select> */}
          </div>
          <IncomeLineChart tasks={tasksData} />
          {/* <IncomeLineChart /> */}
        </div>
      </div>

      {/* Bottom Section (User Table & Earnings Chart) */}
      <div className="flex flex-col lg:flex-row gap-3 mt-5">
        <div className="lg:flex-1">
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg lg:text-xl font-bold text-[#1F2852] mb-1">
              Recent users
            </p>
            <NavLink to="/users">
              <p className="text-sm lg:text-base text-[#1F2852] underline font-bold">
                View All
              </p>
            </NavLink>
          </div>
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
