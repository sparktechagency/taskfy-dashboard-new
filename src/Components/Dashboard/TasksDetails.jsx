/* eslint-disable no-unused-vars */
import { LeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { useSingleTaskQuery } from "../../Redux/api/dashboardApi";
import axios from "axios";
import image1 from "../../../public/images/task requies details image/1.jpg";
import image2 from "../../../public/images/task requies details image/2.jpg";

const taskRequestImages = {
  images: [image1, image2],
};

const TasksDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [singleTask, setSingleTask] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // const { data: singleTask, isLoading, isError } = useSingleTaskQuery(id);

  console.log("single task data", singleTask);

  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [currentRequest, setCurrentRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`/data/taskRequestedDetails.json`);
        console.log("first task requested details ===>", response.data);
        // const data = Array.isArray(response?.data) ? response.data : [];
        // console.log("Fetched Data:", data);
        setIsLoading(false);
        setSingleTask(response.data);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }
    };

    fetchRequests();
  }, []);

  // Handle loading and error states
  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-[90vh] p-6 md:p-12 bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-6 md:p-10">
        {/* Task Overview */}
        <div className="flex items-center mb-4">
          <LeftOutlined
            className="text-[#3565A1] text-xl mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />

          <h2 className="text-2xl text-[#023E8A] font-bold ">Task Details</h2>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {/* Display Both Images */}
          <div className="grid grid-cols-5 gap-4">
            {taskRequestImages?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Task Image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow"
              />
            ))}
          </div>

          <div>
            <div className="mb-5 flex justify-start items-center  mt-2">
              <div className="">
                <h2 className="text-lg font-medium text-[#023E8A]">
                  Provider Details:{" "}
                </h2>
                <p className="text-[#1F2852] ml-2 text-lg">
                  <span className="font-semibold text-[#023E8A]">Name:</span>{" "}
                  {singleTask?.provider?.fullName}
                </p>
                <p className="text-[#1F2852] ml-2 text-lg">
                  <span className="font-semibold text-[#023E8A]">Email:</span>{" "}
                  {singleTask?.provider?.email}
                </p>
              </div>
            </div>
            <div className="mb-4 flex justify-start items-center ">
              <h2 className="text-lg font-medium text-[#023E8A]">
                Task Name:{" "}
              </h2>
              <p className="text-[#023E8A] ml-2 text-xl font-bold">
                {singleTask?.taskName}
              </p>
            </div>
            <div className="mb-4 flex justify-start items-center">
              <h2 className="text-lg font-medium text-[#023E8A]">Details: </h2>
              <p className="text-[#1F2852] text-lg ml-2">
                {singleTask?.taskDetails}
              </p>
            </div>

            <div className="mb-4 flex justify-start items-center">
              <h2 className="text-lg font-medium text-[#023E8A]">Category: </h2>
              <p className="text-[#1F2852] ml-2 text-lg">
                {singleTask?.category}
              </p>
            </div>

            <div className="mb-4 flex justify-start items-center">
              <h2 className="text-lg font-medium text-[#023E8A]">Location: </h2>
              <p className="text-[#1F2852] ml-2 text-lg">
                {singleTask?.location.type}
              </p>
            </div>

            <div className="mb-4 flex justify-start items-center">
              <h2 className="text-lg font-medium text-[#023E8A]">Price: </h2>
              <p className="text-[#1F2852] ml-2 text-lg">
                {singleTask?.data?.taskPriceType}: ${singleTask?.taskPrice}
              </p>
            </div>

            <div className="mb-4 flex justify-start items-center">
              <h2 className="text-lg font-medium text-[#023E8A]">
                Task Date & Time:{" "}
              </h2>
              <p className="text-[#1F2852] ml-2 text-lg">
                {singleTask?.taskTime},{" "}
                {new Date(singleTask?.taskDate).toLocaleDateString()}
              </p>
            </div>

            <div className="mb-4 flex justify-start items-center">
              <h2 className="text-lg font-medium text-[#023E8A]">Status: </h2>
              <p
                className={`font-semibold ml-2 text-lg ${
                  singleTask?.taskStatus === "completed"
                    ? "text-green-500"
                    : singleTask?.taskStatus === "onGoing"
                    ? "text-blue-500"
                    : singleTask?.taskStatus === "cancelled"
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
              >
                {singleTask?.taskStatus}
              </p>
            </div>

            <div className="mb-4 flex justify-start items-center">
              <h2 className="text-lg font-medium text-[#023E8A]">
                Work Type:{" "}
              </h2>
              <p className="text-[#1F2852] ml-2 text-lg">
                {singleTask?.workType}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksDetails;
