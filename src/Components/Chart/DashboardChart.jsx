import React from "react";
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
        backgroundImage: `${fatArrowSvg("rgba(255, 255, 255, 0.1)")}, ${fatArrowSvg(
          "rgba(255, 255, 255, 0.1)"
        )}`,
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
          <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const TaskOverviewBarChart = ({ tasks }) => {
  // Log tasks for debugging
  // console.log("taskOverviewBarChart", tasks);

  // Prepare data for the bar chart based on the tasks
  const pendingTasks = Array.isArray(tasks)
    ? tasks?.filter((task) => task?.taskStatus === "pending")
    : [];
  const onBoardingTasks = Array.isArray(tasks)
    ? tasks?.filter((task) => task?.taskStatus === "onBoarding")
    : [];
  const onGoingTasks = Array.isArray(tasks)
    ? tasks?.filter((task) => task?.taskStatus === "onGoing")
    : [];
  const completedTasks = Array.isArray(tasks)
    ? tasks?.filter((task) => task?.taskStatus === "completed")
    : [];
  const canceledTasks = Array.isArray(tasks)
    ? tasks?.filter((task) => task?.taskStatus === "canceled")
    : [];

  // Data for the bar chart
  const dataBar = [
    { name: "PENDING", total: tasks?.length, tasks: pendingTasks?.length },
    { name: "ONBOARDING", total: tasks?.length, tasks: onBoardingTasks?.length },
    { name: "ONGOING", total: tasks?.length, tasks: onGoingTasks?.length },
    { name: "COMPLETED", total: tasks?.length, tasks: completedTasks?.length },
    { name: "CANCELED", total: tasks?.length, tasks: canceledTasks?.length },
  ];

  // console.log('databar', dataBar);

  return (
    <div className="bg-[#F5F9FE] rounded-lg p-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataBar} barGap={0}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="total" barSize={14} fill="#1F2852" radius={[10, 10, 0, 0]} />
          <Bar dataKey="tasks" barSize={14} fill="#3565A1" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
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

export const IncomeLineChart = ({ tasks = [] }) => {
  // console.log("tasks in income line chart", tasks); // Log tasks for debugging

  // Prepare data for the chart from tasks
  const prepareChartData = (tasks) => {
    const groupedData = {};

    // Group tasks by date and sum their prices
    tasks.forEach((task) => {
      const date = new Date(task?.taskDate).toLocaleDateString(); // Convert to a readable date format
      const price = task?.taskPrice;

      if (!groupedData[date]) {
        groupedData[date] = { name: date, totalIncome: 0 };
      }

      groupedData[date].totalIncome += price;
    });

    // Convert the grouped data into an array format
    return Object.values(groupedData);
  };

  const dataLine = prepareChartData(tasks); // Prepare the chart data from tasks
  // console.log("line chart data:", dataLine); // Log the prepared data

  // Return early if there's no data to render
  if (!dataLine.length) {
    return <div>No data available for the chart.</div>;
  }

  return (
    <div className="p-4 bg-[#F5F9FE]">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={dataLine}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.5} />
          <XAxis dataKey="name" tickMargin={5} tick={{ fontSize: 12 }} />
          <YAxis tickMargin={5} tick={{ fontSize: 12 }} />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#838ff8" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#fdfdfd" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Tooltip
            formatter={(value) => [`$${value}`, "Income"]}
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{
              backgroundColor: "#1F2852",
              borderColor: "#4f6ef9",
              color: "#FFF",
            }}
            itemStyle={{ color: "#FFF" }}
          />
          <Area
            type="monotone"
            dataKey="totalIncome" // Using totalIncome to match the prepared data
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
