import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import axios from 'axios';
import  { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import image1 from "../../../public/images/task requies details image/1.jpg"
import image2 from "../../../public/images/task requies details image/2.jpg"
import Swal from 'sweetalert2';
import { useAcceptTasksRequestMutation, useCencelTasksRequestMutation, useSingleTaskQuery } from '../../Redux/api/dashboardApi';
import { getImageBaseUrl } from '../../utils/baseUrl';

const taskRequestImages ={
  images:[image1,image2]
}

const TaskRequestDetails = () => {
  const { id } = useParams();
  // console.log('task id ', id)
  const navigate = useNavigate();

  const [taskRequests, setTaskRequests] = useState({});
  // const [isModalVisible, setIsModalVisible] = useState(false);
  // const [currentRequest, setCurrentRequest] = useState(null);
  const {data:singleTask, isLoading, isError} = useSingleTaskQuery(id);
    const [acceptTask] = useAcceptTasksRequestMutation();
    const [deleteTask] = useCencelTasksRequestMutation();
  console.log('single task', singleTask?.data);

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
  
  
// const handleAccept=(id)=>{
//   console.log('task accept id: ', id)
//   if(id){
//     Swal.fire({
//       title: "Accept!",
//       text: "The withdrawal has been Accept.",
//       icon: "success",
//     });
//   }
  

// }
// const handleDelete=(id)=>{
//   console.log('task delete id: ', id)
//   if(id){
//     Swal.fire({
//       title: "Deleted!",
//       text: "The withdrawal has been Accept.",
//       icon: "success",
//     });
//   }
  
// }



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
        const res = await acceptTask(id).unwrap();
        console.log('res',res);
        if (res.success) {
          Swal.fire({
            title: "Accept!",
            text: "The task has been accepted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "There was an issue accepting the task.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error accepting task:", error);
        Swal.fire({
          title: "Error",
          text: error.data.message,
          icon: "error",
        });
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    });

    if (result.isConfirmed) {
      try {
            const res = await deleteTask(id).unwrap();
        console.log('res',res);
        if (res.success) {
          Swal.fire({
            title: "Deleted!",
            text: "The task has been deleted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "There was an issue deleting the task.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        Swal.fire({
          title: "Error",
          text: error.data.message,
          icon: "error",
        });
      }
    }
  };


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
          {singleTask?.data?.taskImages?.length === 0 ? <p>No Images</p>: singleTask?.data?.taskImages?.map((image, index) => (
              <img
                key={index}
                src={`${getImageBaseUrl()}${image}`}
                alt={`Task Image ${index + 1}`}
                className='w-full h-64 object-cover rounded-lg shadow'
              />
            ))}  
          </div>

          <div>
            <div className='mb-2 flex justify-start items-center  mt-2'>
              <div className=''>
              <h2 className='text-lg font-medium text-[#023E8A]'>Provider Details: </h2>
              <p className='text-[#1F2852] ml-2 text-lg'>Name: {singleTask?.data?.posterUserId?.fullName}</p>
              <p className='text-[#1F2852] ml-2 text-lg'>Email: {singleTask?.data?.posterUserId?.email}</p>
              </div>
            </div>
            <div className='mb-2 flex justify-start items-center '>
              <h2 className='text-lg font-medium text-[#023E8A]'>Task Name: </h2>
              <p className='text-[#1F2852] ml-2 text-lg'>{singleTask?.data?.taskName}</p>
            </div>
            <div className='mb-2'>
              <h2 className='text-lg font-medium text-[#023E8A]'>Details: </h2>
              <p className='text-[#1F2852] text-lg'>{singleTask?.data?.taskDetails}</p>
            </div>
            <div className='mb-2 flex justify-start items-center'>
              <h2 className='text-lg font-medium text-[#023E8A]'>Amount: </h2>
              <p className='text-[#1F2852] ml-2 text-lg'>
                ${singleTask?.data?.price.toFixed(2)}
              </p>
            </div>
            <div className='mb-2 flex justify-start items-center'>
              <h2 className='text-lg font-medium text-[#023E8A]'>Category: </h2>
              <p className='text-[#1F2852] text-lg ml-2'>{singleTask?.data?.category}</p>
            </div>
            <div className='mb-2 flex justify-start items-center'>
              <h2 className='text-lg font-medium text-[#023E8A]'>Work Type: </h2>
              <p className='text-[#1F2852] text-lg ml-2'>{singleTask?.data?.taskType}</p>
            </div>
            <div className='mb-2 flex justify-start items-center'>
              <h2 className='text-lg font-medium text-[#023E8A]'>Task Need Time: </h2>
              <p className='text-[#1F2852] text-lg ml-2'>{singleTask?.data?.needTime.option} ({singleTask?.data?.needTime.time})</p>
            </div>
            <div className='mb-4 flex justify-start items-center'>
              <h2 className='text-lg font-medium text-[#023E8A]'>Task Date: </h2>
              <p className='text-[#1F2852] ml-2 text-lg'>{singleTask?.data?.taskTimeDate}</p>
            </div>
            <div className='mb-4 flex justify-start items-center'>
              <h2 className='text-lg font-medium text-[#023E8A]'>Task Status: </h2>
              <p className='text-[#1F2852] ml-2 text-lg border broder-[#023E8A] px-4 py-1 rounded'>{singleTask?.data?.status}</p>
            </div>
          </div>
        </div>
      {/* Task requiest button */}
        <div className="mt-4">
               <Button
                 className="text-white px-5 py-1 rounded-lg border border-[#013564] mr-4"
                 style={{background:"#3565A1"}}
                 onClick={() => handleAccept(singleTask?.data?._id)}
               >
                 Accept
               </Button>
               <Button
                 className="bg-white text-[#013564] px-5 py-1 rounded-lg border border-[#013564]"
                 onClick={() => handleDelete(singleTask?.data?._id)}
               >
                 Delete
               </Button>
             </div>
      </div>
    </div>
  );
};

export default TaskRequestDetails;
