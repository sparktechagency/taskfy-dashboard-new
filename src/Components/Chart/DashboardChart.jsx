/* eslint-disable react/prop-types */
import { Select } from "antd";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

import { useState } from "react";
import { useIncomeChartListQuery } from "../../Redux/api/dashboardApi";

// // Dummy data for charts
// const dataBar = [
//   { name: "PENDING", total: 8, ongoing: 5 },
//   { name: "ONBOARDING", total: 9, ongoing: 6 },
//   { name: "ONGOING", total: 7, ongoing: 4 },
//   { name: "COMPLETED", total: 8, ongoing: 5 },
//   { name: "CENCELED", total: 9, ongoing: 7 },
//   // { name: "SAT", total: 7, ongoing: 3 },
//   // { name: "SUN", total: 8, ongoing: 5 },
// ];

const dataLine = [
  { name: "SAT", value: 20 },
  { name: "SUN", value: 2 },
  { name: "MON", value: 50 },
  { name: "TUE", value: 5 },
  { name: "WED", value: 75 },
  { name: "THU", value: 22 },
  { name: "FRI", value: 13 },
];

// InfoCard Component

export const InfoCard = ({ title, value, color }) => {
  // SVG for the fat arrow
  const fatArrowSvg = (fillColor) =>
    `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cpolygon fill="${encodeURIComponent(
      fillColor
    )}" points="0,0 100,0 50,50 100" /%3E%3C/svg%3E')`;

  return (
    <div
      className={`relative rounded-lg p-4 md:p-6 shadow-lg overflow-hidden ${color}`}
      style={{
        backgroundImage: `${fatArrowSvg(
          "rgba(255, 255, 255, 0.1)"
        )}, ${fatArrowSvg("rgba(255, 255, 255, 0.1)")}`,
        backgroundSize: "80px 80px, 80px 80px",
        backgroundPosition: "top right, bottom left", // Position arrows
        backgroundRepeat: "no-repeat, no-repeat",
      }}
    >
      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white">{value}</h2>
        <p className="text-sm md:text-lg text-white mt-2">{title}</p>
      </div>
      <ResponsiveContainer width="100%" height={50}>
        <LineChart data={dataLine}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#fff"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// export const TaskOverviewBarChart = ({ tasks }) => {
//   // Log tasks for debugging
//   // console.log("taskOverviewBarChart", tasks);

//   // Prepare data for the bar chart based on the tasks
//   const pendingTasks = Array.isArray(tasks)
//     ? tasks?.filter((task) => task?.taskStatus === "pending")
//     : [];
 
//   const completedTasks = Array.isArray(tasks)
//     ? tasks?.filter((task) => task?.taskStatus === "completed")
//     : [];
//   const cancelledTasks = Array.isArray(tasks)
//     ? tasks?.filter((task) => task?.taskStatus === "cancelled")
//     : [];

//   // Data for the bar chart
//   const dataBar = [
//     { name: "PENDING", total: tasks?.length, tasks: pendingTasks?.length },
    
//     { name: "COMPLETED", total: tasks?.length, tasks: completedTasks?.length },
//     { name: "CANCELED", total: tasks?.length, tasks: cancelledTasks?.length },
//   ];

//   console.log("databar", dataBar);

//   return (
//     <div className="bg-[#F5F9FE] rounded-lg p-4">
//       <ResponsiveContainer width="100%" height={300}>
//         <BarChart data={dataBar} barGap={0}>
//           <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//           <YAxis tick={{ fontSize: 12 }} />
//           <Tooltip />
//           <Bar
//             dataKey="total"
//             barSize={14}
//             fill="#1F2852"
//             radius={[10, 10, 0, 0]}
//           />
//           <Bar
//             dataKey="tasks"
//             barSize={14}
//             fill={({ payload }) => {
//               switch (payload.name) {
//                 case "COMPLETED":
//                   return "#28a745"; // Green for completed
//                 case "CANCELED":
//                   return "#dc3545"; // Red for canceled
//                 case "PENDING":
//                   return "#1F2852"; // Navy blue for pending
//                 default:
//                   return "#3565A1"; // Default color
//               }
//             }}
//             radius={[10, 10, 0, 0]}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };




// export const TaskOverviewBarChart = ({ tasks }) => {
//   console.log('chatt task====', tasks)
  
//   // Filter tasks based on their status
//   const pendingTasks = Array.isArray(tasks)
//     ? tasks?.filter((task) => task?.status === "pending")
//     : [];
//   const completedTasks = Array.isArray(tasks)
//     ? tasks?.filter((task) => task?.status === "complete")
//     : [];
//   const cancelledTasks = Array.isArray(tasks)
//     ? tasks?.filter((task) => task?.status === "cancel")
//     : [];

//   // Prepare data for the bar chart
//   const dataBar = [
//     { name: "PENDING", total: tasks?.length, tasks: pendingTasks?.length, fill: "#1F2852" }, // Navy blue
//     { name: "COMPLETED", total: tasks?.length, tasks: completedTasks?.length, fill: "#28a745" }, // Green
//     { name: "CANCELED", total: tasks?.length, tasks: cancelledTasks?.length, fill: "#dc3545" }, // Red
//   ];

//   return (
//     <div className="bg-[#F5F9FE] p-4">
//       <ResponsiveContainer width="100%" height={330}>
//         <BarChart data={dataBar} barGap={0}>
//           <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//           <YAxis tick={{ fontSize: 12 }} />
//           <Tooltip />
//           <Bar
//             dataKey="tasks"
//             barSize={35}
//             radius={[10, 10, 0, 0]}
//             fill={({ payload }) => payload.fill}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };



// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";


export const TaskOverviewBarChart = ({ tasks }) => {
  const pendingCount = Array.isArray(tasks)
    ? tasks.filter((task) => task?.status === "pending").length
    : 0;
  const completedCount = Array.isArray(tasks)
    ? tasks.filter((task) => task?.status === "complete").length
    : 0;
  const cancelledCount = Array.isArray(tasks)
    ? tasks.filter((task) => task?.status === "cancel").length
    : 0;

  const dataBar = [
    { name: "PENDING", tasks: pendingCount, fill: "#1F2852" },
    { name: "COMPLETED", tasks: completedCount, fill: "#28a745" },
    { name: "CANCELED", tasks: cancelledCount, fill: "#dc3545" },
  ];

  return (
    <div className="bg-[#F5F9FE] p-4">
      <ResponsiveContainer width="100%" height={330}>
        <BarChart data={dataBar} barGap={0}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip formatter={(value) => `${value} tasks`} />
          <Bar
            dataKey="tasks"
            barSize={35}
            radius={[10, 10, 0, 0]}
            fill={({ payload }) => payload.fill}
            label={({ x, y, width, value }) => (
              <text
                x={x + width / 2}
                y={y - 5}
                fill="#000"
                fontSize={12}
                fontWeight="bold"
                textAnchor="middle"
              >
                {value}
              </text>
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};


export const IncomeLineChart = () => {
  const [year, setYear] = useState(2025);
  const MONTH_NAMES = [
    "", // placeholder for 1-based index
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Fetch data
  const { data: incomeChartList, isLoading, isError } = useIncomeChartListQuery(year);

  if (isLoading) {
    return <div>Loading chart data...</div>;
  }

  if (isError) {
    return <div>Error loading chart data.</div>;
  }

  const prepareChartDataByMonth = (data) => {
    const monthlyData = {};
    for (let i = 1; i <= 12; i++) {
      monthlyData[i] = { month: i, totalIncome: 0 };
    }

    data.forEach(({ month, totalIncome }) => {
      monthlyData[month] = { month, totalIncome };
    });

    return Object.values(monthlyData);
  };

  const incomeData = incomeChartList?.data ?? [];
  const dataLine = prepareChartDataByMonth(incomeData);

  if (!dataLine.length) {
    return <div>No data available for the chart.</div>;
  }

  // Step 1: Calculate max income for Y axis
  const maxIncome = Math.max(...dataLine.map(d => d.totalIncome), 20000);

  return (
    <div className="p-4 bg-[#F5F9FE]">
      {/* Year selector */}
      <div className="flex justify-end mb-4">
        <Select
          value={year}
          style={{
            width: 80,
            height: 30,
            fontSize: 12,
            fontWeight: "bold",
          }}
          onChange={(value) => setYear(Number(value))}
        >
          {[2025, 2026, 2027, 2028, 2029, 2030].map((yr) => (
            <Option key={yr} value={yr}>
              {yr}
            </Option>
          ))}
        </Select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={282}>
        <AreaChart
          data={dataLine}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            tickFormatter={(month) => MONTH_NAMES[month]}
            tickMargin={5}
          />
          {/* Step 2: Use maxIncome and format ticks */}
          <YAxis
            tick={{ fontSize: 12 }}
            tickMargin={5}
            domain={[0, maxIncome]}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#838ff8" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#fdfdfd" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Tooltip
            formatter={(value) => [`$${value}`, "Income"]}
            labelFormatter={(label) => `Month: ${MONTH_NAMES[label]}`}
            contentStyle={{
              backgroundColor: "#1F2852",
              borderColor: "#4f6ef9",
              color: "#FFF",
            }}
            itemStyle={{ color: "#FFF" }}
          />
          <Area
            type="monotone"
            dataKey="totalIncome"
            stroke="#023E8A"
            fill="url(#colorUv)"
            strokeWidth={3}
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};




// export const IncomeLineChart = () => {
//   const [year, setYear] = useState(2025);
//   const MONTH_NAMES = [
//     "", // placeholder for 1-based index
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//   ];

//   // Fetch data for selected year
//   const { data: incomeChartList, isLoading, isError } = useIncomeChartListQuery(year);

//   // Handle loading state
//   if (isLoading) {
//     return <div>Loading chart data...</div>;
//   }

//   // Handle error state
//   if (isError) {
//     return <div>Error loading chart data.</div>;
//   }

//   const prepareChartDataByMonth = (data) => {
//   const monthlyData = {};
//   for (let i = 1; i <= 12; i++) {
//     monthlyData[i] = { month: i, totalIncome: 0 };
//   }

//   data.forEach(({ month, totalIncome }) => {
//     monthlyData[month] = { month, totalIncome };
//   });

//   return Object.values(monthlyData);
// };


//   // Safely extract income data (default to empty array)
//   const incomeData = incomeChartList?.data ?? [];

//   // Prepare chart data with zero-filled months
//   const dataLine = prepareChartDataByMonth(incomeData);

//   // Show message if no data available
//   if (!dataLine.length) {
//     return <div>No data available for the chart.</div>;
//   }

//   return (
//     <div className="p-4 bg-[#F5F9FE]">
//       {/* Year selector */}
//       <div className="flex justify-end mb-4">
//         <Select
//           value={year}
//           style={{
//             width: 80,
//             height: 30,
//             fontSize: 12,
//             fontWeight: "bold",
//           }}
//           onChange={(value) => setYear(Number(value))}
//         >
//           {[2025, 2026, 2027, 2028, 2029, 2030].map((yr) => (
//             <Option key={yr} value={yr}>{yr}</Option>
//           ))}
//         </Select>
//       </div>

//       {/* Chart */}
//       <ResponsiveContainer width="100%" height={282}>
//         <AreaChart
//           data={dataLine}
//           margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
//           <XAxis
//             dataKey="month"
//             tick={{ fontSize: 12 }}
//             tickFormatter={(month) => MONTH_NAMES[month]}
//             tickMargin={5}
//           />
//           <YAxis tick={{ fontSize: 12 }} tickMargin={5} />
//           <defs>
//             <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor="#838ff8" stopOpacity={0.8} />
//               <stop offset="100%" stopColor="#fdfdfd" stopOpacity={0.1} />
//             </linearGradient>
//           </defs>
//           <Tooltip
//             formatter={(value) => [`$${value}`, "Income"]}
//             labelFormatter={(label) => `Month: ${MONTH_NAMES[label]}`}
//             contentStyle={{
//               backgroundColor: "#1F2852",
//               borderColor: "#4f6ef9",
//               color: "#FFF",
//             }}
//             itemStyle={{ color: "#FFF" }}
//           />
//           <Area
//             type="monotone"
//             dataKey="totalIncome"
//             stroke="#023E8A"
//             fill="url(#colorUv)"
//             strokeWidth={3}
//             fillOpacity={1}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };




// Line Chart Component for Income Overview
// export const IncomeLineChart = ({tasks}) => {
//   return (
//     <div className="p-4 bg-[#F5F9FE]">
//       <ResponsiveContainer width="100%" height={300}>
//         <AreaChart
//           data={dataLine}
//           margin={{
//             top: 10,
//             right: 20,
//             left: 0,
//             bottom: 0,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
//           <XAxis dataKey="name" tickMargin={5} tick={{ fontSize: 12 }} />
//           <YAxis tickMargin={5} tick={{ fontSize: 12 }} />
//           <defs>
//             <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor="#838ff8" stopOpacity={0.8} />
//               <stop offset="100%" stopColor="#fdfdfd" stopOpacity={0.1} />
//             </linearGradient>
//           </defs>
//           <Tooltip
//             formatter={(value) => [`${value}K`, "Income"]}
//             labelFormatter={(label) => `Day: ${label}`}
//             contentStyle={{
//               backgroundColor: "#1F2852",
//               borderColor: "#4f6ef9",
//               color: "#FFF",
//             }}
//             itemStyle={{ color: "#FFF" }}
//           />
//           <Area
//             type="monotone"
//             dataKey="value"
//             stroke="#023E8A"
//             fill="url(#colorUv)"
//             strokeWidth={3}
//             fillOpacity={1}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export const IncomeLineChart = ({ tasks = [] }) => {
   
//   const MONTH_NAMES = [
//   "", // placeholder for 1-based month indexing
//   "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
// ];

//   const [year, setYear] = useState(new Date().getFullYear());
//  const {data:incomeChartList} = useIncomeChartListQuery(year);
//     console.log('task chart list',incomeChartList?.data)
//   console.log('year==', year)
//   // Prepare data for the chart from tasks
//   const prepareChartData = (tasks) => {
//     const groupedData = {};

//     // Group tasks by date and sum their prices
//     tasks.forEach((task) => {
//       const date = new Date(task?.taskDate).toLocaleDateString(); // Convert to a readable date format
//       const price = task?.taskPrice;

//       if (!groupedData[date]) {
//         groupedData[date] = { name: date, totalIncome: 0 };
//       }

//       groupedData[date].totalIncome += price;
//     });

//     // Convert the grouped data into an array format
//     return Object.values(groupedData);
//   };

//   const dataLine = prepareChartData(tasks); // Prepare the chart data from tasks
//   // console.log("line chart data:", dataLine); // Log the prepared data

//   // Return early if there's no data to render
//   if (!dataLine.length) {
//     return <div>No data available for the chart.</div>;
//   }

//   return (
//     <div className="p-4 bg-[#F5F9FE]">
//       <div className="flex justify-end mb-4">
//         <Select
//           defaultValue={year}
//           style={{
//             width: 80,
//             height: 30,
//             fontSize: 12,
//             fontWeight: "bold",
//           }}
//            onChange={(value) => setYear(value)}
//         >
//           <Option value="2025">2025</Option>
//           <Option value="2026">2026</Option>
//           <Option value="2027">2027</Option>
//           <Option value="2028">2028</Option>
//           <Option value="2029">2029</Option>
//           <Option value="2030">2030</Option>
//         </Select>
//       </div>
//       <ResponsiveContainer width="100%" height={282}>
//         <AreaChart
//           data={dataLine}
//           margin={{
//             top: 10,
//             right: 20,
//             left: 0,
//             bottom: 0,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
//           <XAxis dataKey="name" tickMargin={5} tick={{ fontSize: 12 }} />
//           <YAxis tickMargin={5} tick={{ fontSize: 12 }} />
//           <defs>
//             <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="0%" stopColor="#838ff8" stopOpacity={0.8} />
//               <stop offset="100%" stopColor="#fdfdfd" stopOpacity={0.1} />
//             </linearGradient>
//           </defs>
//           <Tooltip
//             formatter={(value) => [`$${value}`, "Income"]}
//             labelFormatter={(label) => `Date: ${label}`}
//             contentStyle={{
//               backgroundColor: "#1F2852",
//               borderColor: "#4f6ef9",
//               color: "#FFF",
//             }}
//             itemStyle={{ color: "#FFF" }}
//           />
//           <Area
//             type="monotone"
//             dataKey="totalIncome" // Using totalIncome to match the prepared data
//             stroke="#023E8A"
//             fill="url(#colorUv)"
//             strokeWidth={3}
//             fillOpacity={1}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };
