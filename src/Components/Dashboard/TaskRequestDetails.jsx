import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import image1 from "../../../public/images/task requies details image/1.jpg"
import image2 from "../../../public/images/task requies details image/2.jpg"
import Swal from 'sweetalert2';

const taskRequestImages ={
  images:[image1,image2]
}

const TaskRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [taskRequests, setTaskRequests] = useState({});
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [currentRequest, setCurrentRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`/data/taskRequestedDetails.json`);
        console.log("first task requested details ===>", response.data);
        // const data = Array.isArray(response?.data) ? response.data : [];
        // console.log("Fetched Data:", data);
        
        setTaskRequests(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRequests();
  }, []);
  
  
const handleAccept=(id)=>{
  console.log('task accept id: ', id)
  if(id){
    Swal.fire({
      title: "Accept!",
      text: "The withdrawal has been Accept.",
      icon: "success",
    });
  }
  

}
const handleDelete=(id)=>{
  console.log('task delete id: ', id)
  if(id){
    Swal.fire({
      title: "Deleted!",
      text: "The withdrawal has been Accept.",
      icon: "success",
    });
  }
  
}
  return (
    <div className='min-h-[90vh] p-6 md:p-12 bg-gray-50'>
      <div className='bg-white shadow-md rounded-lg p-6 md:p-10'>
        {/* Task Overview */}
        <div className="flex items-center mb-4">
          <LeftOutlined
            className="text-[#3565A1] text-xl mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
 
          <h2 className='text-2xl text-[#023E8A] font-bold '>Task Requiest Details</h2>
        </div>
       
        <div className='grid grid-cols-1'>
          {/* Display Both Images */}
          <h3 className='text-xl text-[#023E8A] font-bold mb-2'>Task Images</h3>
          <div className="grid grid-cols-5 gap-4">
            {taskRequestImages?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Task Image ${index + 1}`}
                className='w-full h-64 object-cover rounded-lg shadow'
              />
            ))}
          </div>

          <div>
            <div className='mb-2 flex justify-start items-center  mt-2'>
              <div className=''>
              <h2 className='text-lg font-medium text-[#023E8A]'>Provider Details: </h2>
              <p className='text-[#1F2852] ml-2 text-lg'>Name: {taskRequests?.provider?.fullName}</p>
              <p className='text-[#1F2852] ml-2 text-lg'>Email: {taskRequests?.provider?.email}</p>
              </div>
            </div>
            <div className='mb-2 flex justify-start items-center '>
              <h2 className='text-lg font-medium text-[#023E8A]'>Task Name: </h2>
              <p className='text-[#1F2852] ml-2 text-lg'>{taskRequests.taskName}</p>
            </div>
            <div className='mb-2'>
              <h2 className='text-lg font-medium text-[#023E8A]'>Details: </h2>
              <p className='text-[#1F2852] text-lg'>{taskRequests.taskDetails}</p>
            </div>
            <div className='mb-2 flex justify-start items-center'>
              <h2 className='text-lg font-medium text-[#023E8A]'>Amount: </h2>
              <p className='text-[#1F2852] ml-2 text-lg'>
                ${taskRequests.taskPrice}
              </p>
            </div>
            <div className='mb-2 flex justify-start items-center'>
              <h2 className='text-lg font-medium text-[#023E8A]'>Category: </h2>
              <p className='text-[#1F2852] text-lg ml-2'>{taskRequests.category}</p>
            </div>
            <div className='mb-2 flex justify-start items-center'>
              <h2 className='text-lg font-medium text-[#023E8A]'>Work Type: </h2>
              <p className='text-[#1F2852] text-lg ml-2'>{taskRequests.workType}</p>
            </div>
            <div className='mb-2 flex justify-start items-center'>
              <h2 className='text-lg font-medium text-[#023E8A]'>Task Time: </h2>
              <p className='text-[#1F2852] text-lg ml-2'>{taskRequests.taskTime}</p>
            </div>
            <div className='mb-4 flex justify-start items-center'>
              <h2 className='text-lg font-medium text-[#023E8A]'>Task Date: </h2>
              <p className='text-[#1F2852] ml-2 text-lg'>{new Date(taskRequests.taskDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      {/* Task requiest button */}
        <div className="mt-4">
               <Button
                 className="text-white px-5 py-1 rounded-lg border border-[#013564] mr-4"
                 style={{background:"#3565A1"}}
                 onClick={() => handleAccept(taskRequests._id)}
               >
                 Accept
               </Button>
               <Button
                 className="bg-white text-[#013564] px-5 py-1 rounded-lg border border-[#013564]"
                 onClick={() => handleDelete(taskRequests._id)}
               >
                 Delete
               </Button>
             </div>
      </div>
    </div>
  );
};

export default TaskRequestDetails;
