
import { ConfigProvider, Button } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAcceptTasksRequestMutation, useCencelTasksRequestMutation, useGetAllTasksRequestsQuery } from "../../Redux/api/dashboardApi";
import Swal from "sweetalert2";
import axios from "axios";

const TasksRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("/data/taskRequest.json");
        console.log("all tasks ===> ", response);
        const data = Array.isArray(response.data) ? response.data : [];
        console.log("Fetched Data task:", data); // Log the data format
        setRequests(data);
      } catch (error) {
        console.error("Error fetching stories data:", error);
        setTasksData([]); // Set to empty array if fetching fails
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);


  if(loading){
    return <div>Loading...</div>
  }
  
  const handleAccept = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Accept it!",
    });
  
    if (result.isConfirmed) {
      try {
        // Assuming the function or API call to update the status, e.g., record approval
        // const response = await someMutationFunction(record.id); 
  
        // Simulate the result or check record status after updating
        if (id) {
          Swal.fire({
            title: "Accept!",
            text: "The withdrawal has been Accept.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "There was an issue approving the withdrawal.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error approving Accept:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while processing the approval.",
          icon: "error",
        });
      }
    }
  }
  

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Deleted it!",
    });
  
    if (result.isConfirmed) {
      try {
        // Assuming the function or API call to update the status, e.g., record approval
        // const response = await someMutationFunction(record.id); 
  
        // Simulate the result or check record status after updating
        if (id) {
          Swal.fire({
            title: "Deleted!",
            text: "The withdrawal has been approved.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "There was an issue approving the withdrawal.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error approving withdrawal:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while processing the approval.",
          icon: "error",
        });
      }
    }
  };

  // const handleModalOk = () => {
  //   setIsModalVisible(false);
  // };

  // const handleModalCancel = () => {
  //   setIsModalVisible(false);
  // };

  return (
    <div className="min-h-[90vh]">
      <ConfigProvider
      theme={{
        components: {
          Input: {
            hoverBg: "#b1d7fa",
            hoverBorderColor: "rgb(39,136,255)",
            colorText: "rgb(255,255,255)",
            colorTextPlaceholder: "rgba(100,99,99,0.25)",
          },
        },
      }}
    >
      <div>
        <div className=" text-[#1F2852] p-4 rounded-t-lg ">
          <h1 className="text-2xl font-bold">Tasks Request</h1>
          
        </div>

        <div className="rounded-b-lg py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {requests.map((request, index) => (
           
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
             <Link
               to={`/task-requiest-details/${request._id}`}
               state={request}
               className="text-xl font-bold text-[#013564]"
             >
               {request.taskName}
             </Link>
             <p className="text-gray-600"><span className="font-bold text-[#1F2852]">Poster Name: </span>{request.provider.fullName}</p>
             <p className="text-gray-600">Price: {request.taskPrice}</p>
             <div className="mt-4">
               <Button
                 className="text-white px-5 py-1 rounded-lg border border-[#013564] mr-4"
                 style={{background:"#3565A1"}}
                 onClick={() => handleAccept(request._id)}
               >
                 Accept
               </Button>
               <Button
                 className="bg-white text-[#013564] px-5 py-1 rounded-lg border border-[#013564]"
                 onClick={() => handleDelete(request._id)}
               >
                 Delete
               </Button>
             </div>
           </div>
            ))}
          </div>
        </div>

        {/* <Modal
          width={400}
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          footer={null}
        >
          <p className="text-center font-medium text-2xl mb-2">
            Reason for Revision
          </p>

          <Input.TextArea
            rows={4}
            placeholder="Enter your revision comments here..."
            className="border border-[#013564] text-black"
          />
          <div className="flex justify-center gap-2 mt-4">
            <Button
              onClick={handleModalCancel}
              style={{
                backgroundColor: "#f5f5f5",
                borderColor: "#d9d9d9",
                color: "#000",
                width: "100%",
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleModalOk}
              style={{
                backgroundColor: "#013564",
                borderColor: "#013564",
                color: "#fff",
                width: "100%",
              }}
            >
              Revision
            </Button>
          </div>
        </Modal> */}
      </div>
    </ConfigProvider>
    </div>
    
  );
};

export default TasksRequest;
