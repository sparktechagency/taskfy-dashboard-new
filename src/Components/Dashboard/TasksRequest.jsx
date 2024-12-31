/* eslint-disable no-unused-vars */
import { ConfigProvider, Button, Select } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const { Option } = Select;

const TasksRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("/data/taskRequest.json");
        const data = Array.isArray(response.data) ? response.data : [];
        setRequests(data);
        setFilteredRequests(data);
      } catch (error) {
        console.error("Error fetching stories data:", error);
        setRequests([]);
        setFilteredRequests([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get("/data/categoryData.json");
        const categoryData = Array.isArray(response.data) ? response.data : [];
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchStories();
    fetchCategories();
  }, []);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    if (value) {
      if (value === "all") {
        setFilteredRequests(requests);
      }
      const filtered = requests.filter((request) => request.category === value);
      setFilteredRequests(filtered);
    } else {
      setFilteredRequests(requests);
    }
  };

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
        if (id) {
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
          text: "An error occurred while processing the acceptance.",
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
        if (id) {
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
          text: "An error occurred while processing the deletion.",
          icon: "error",
        });
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
          <div className="text-[#1F2852] p-4 rounded-t-lg flex justify-between items-center">
            <h1 className="text-2xl font-bold">Tasks Request</h1>
            <div className="p-4">
            <Select
              placeholder="Filter by Category"
              onChange={handleCategoryChange}
              allowClear
              className="w-full mb-4 h-12 text-2xl !text-zinc-900 border border-[#1F2852] rounded-lg"
            >
              {/* <Option value={"all"}>All</Option> */}
              {categories.map((category) => (
                <Option key={category.id} value={category.name}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </div>
          </div>
          

          <div className="rounded-b-lg py-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredRequests.map((request, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg shadow-md"
                >
                  <Link
                    to={`/task-requiest-details/${request._id}`}
                    state={request}
                    className="text-xl font-bold text-[#013564]"
                  >
                    {request.taskName}
                  </Link>
                  <p className="text-gray-600">
                    <span className="font-bold text-[#1F2852]">Category: </span>
                    {request.category}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold text-[#1F2852]">
                      Poster Name:
                    </span>
                    {request.provider.fullName}
                  </p>
                  <p className="text-gray-600">Price: {request.taskPrice}</p>
                  <div className="mt-4">
                    <Button
                      className="text-white px-5 py-1 rounded-lg border border-[#013564] mr-4"
                      style={{ background: "#3565A1" }}
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
        </div>
      </ConfigProvider>
    </div>
  );
};

export default TasksRequest;
