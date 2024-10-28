
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { ConfigProvider, Table, Input, Button, Space, Modal } from "antd";
import { SearchOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};


const PendingWithdrawList = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  // const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  
  const columns = [
    {
      title: "S.ID",
      dataIndex: "index",
      responsive: ["md"],
      render: (text, record, index) => index + 1,
    },
    
    {
      title: "Worker Name",
      dataIndex: ["worker", "fullName"],
      key: "fullName",
      responsive: ["md","xs"], 
    },
    {
      title: "Withdraw Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => formatDate(text),
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      responsive: ["sm"], 
    },
    {
      title: "Withdraw Amount",
      dataIndex: "amount",
      key: "amount",
      responsive: ["sm"], 
    },
    {
      title: "Withdraw Status",
      dataIndex: "status",
      key: "status",
      responsive: ["sm", "xs"],
      render: (text) => {
        let color = "";
        let displayText = text;
        let fontWeight = "normal"; 
    
        if (text === "pending") {
          color = "#FFD33C";
          displayText = "Pending"; 
          fontWeight = "bold"; 
        } else if (text === "paid") {
          color = "green"; 
          displayText = "Paid"; 
          fontWeight = "bold"; 
        }
    
        return <span style={{ color, fontWeight }}>{displayText}</span>;
      },
    },
    {
      title: "Action",
      responsive: ["sm"],
      render: (text, record) => {
        // Button to trigger a pending withdraw action
        return (
          <Space><Button
          type="primary"
  
          onClick={() => handleAdminConformWithdraw(record)}
          
        >
         Pending Withdraw
        </Button>
        <Button
          onClick={() => showViewModal(record)}
          style={{ border: '1px solid', borderColor: "#023E8A" }}
           // Disable if already paid
        >View Details
        </Button></Space>
          
        );
      },
    },
    
  ];

  const [conformWithdrawData, setconformWithdrawData] = useState([]);

  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get("/data/withdrowPending.json");
        // console.log("all tasks ===> ", response);
        const data = Array.isArray(response.data) ? response.data : [];
        // console.log("Fetched Data task:", data); // Log the data format
        setconformWithdrawData(data);
      } catch (error) {
        console.error("Error fetching stories data:", error);
        setconformWithdrawData([]); // Set to empty array if fetching fails
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return conformWithdrawData;
    return conformWithdrawData.filter((item) =>
      item.method.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [conformWithdrawData, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const onChange = (filters, extra) => {
    console.log("params", filters, extra);
  };


  const handleAdminConformWithdraw = async (record) => {
    if (!record) {
      console.error("No record provided.");
      return;
    }
  
    console.log("Record:", record);
  
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    });
  
    if (result.isConfirmed) {
      try {
        // Assuming the function or API call to update the status, e.g., record approval
        // const response = await someMutationFunction(record.id); 
  
        // Simulate the result or check record status after updating
        if (record.status) {
          Swal.fire({
            title: "Approved!",
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
  
  

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
  };

  return (
    <div className="min-h-[90vh] p-4 lg:p-6">
      {/* Header Section */}
      <div className="bg-[#E6ECF3] rounded-lg mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4">
          <div className="flex items-center">
            <LeftOutlined
              className="text-[#3565A1] text-xl mr-4 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-2xl md:text-3xl font-bold text-[#1F2852]">
             Pending Withdraw List
            </h1>
          </div>

          <div className="flex gap-4 items-center w-full md:w-auto">
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    colorTextPlaceholder: "rgb(0, 0, 0,0.5)",
                    colorBgContainer: "white",
                  },
                },
              }}
            >
              <Input
                placeholder="Search..."
                value={searchText}
                onChange={(e) => onSearch(e.target.value)}
                className="text-base font-semibold w-full md:w-72"
                prefix={
                  <SearchOutlined className="text-[#97C6EA] font-bold text-lg mr-2" />
                }
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#F3F3F3",
                  border: "1px solid white",
                  color: "#010515",
                }}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div>
        <ConfigProvider
          theme={{
            components: {
              Table: {
                headerBg: "#FAFAFA",
                headerColor: "#1F2852",
                colorBgContainer: "rgb(255,255,255)",
                colorText: "rgb(0,0,0)",
                headerSplitColor: "rgba(151, 198, 234, 1)",
              },
            },
          }}
        >
          <div className="w-full overflow-x-auto rounded-xl">
            <Table
              columns={columns}
              dataSource={filteredData}
              loading={loading}
              pagination={{ pageSize: 10 }}
              onChange={onChange}
              className="user-table"
              scroll={{ x: true }} // Enable horizontal scrolling on smaller screens
            />
          </div>
        </ConfigProvider>
      </div>
       {/* View Modal */}
       <Modal
          title={
            <div className="pt-7">
              <h2 className="text-[#010515] text-2xl font-bold ">
                User Withdraw Details
              </h2>
              
            </div>
          }
          open={isViewModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
          style={{ textAlign: "center" }}
          width={600}
          className=""
        >
          {currentRecord && (
            <div>
              {/* <p className="text-xl font-bold my-2 text-start">User Information</p> */}
              <div className="flex flex-col text-lg  gap-y-2 text-start w-[80%] mx-auto mt-3 mb-5">
                <p>
                  <span className="font-semibold " >Name:</span> {currentRecord.worker.fullName}
                </p>
                <p>
                  <span className="font-semibold " >Email:</span> {currentRecord.worker.email}
                </p>
                <p>
                  <span className="font-semibold " >Phone No:</span> {currentRecord.worker.phone}
                </p>
                <p>
                  <span className="font-semibold " >Amount:</span> {currentRecord.amount}
                </p>
                <p>
                  <span className="font-semibold " >Payment Method:</span> {currentRecord.method}
                </p>
                <p>
                  <span className="font-semibold " >Payment Status:</span> {currentRecord.status}
                </p>
                <p>
                  <span className="font-semibold " >Payment Transaction Id:</span> {currentRecord.transactionId}
                </p>
                <p>
                  <span className="font-semibold " >Google Pay Email:</span> {currentRecord.googlePayDetails.googleEmail}
                </p>
                <p>
                  <span className="font-semibold " >google Pay Token:</span> {currentRecord.googlePayDetails.googleId}
                </p>
                
              </div>
              {/* <button
                // onClick={showBlockModal}
                className="bg-[#013564] text-white font-bold py-2 text-lg px-5 rounded-lg mt-8 w-[80%]"
              >
                Block
              </button> */}
            </div>
          )}
        </Modal>

        {/* Block Confirmation Modal */}
        {/* <Modal
          open={isBlockModalVisible}
          onOk={handleBlock}
          onCancel={handleCancel}
          okText="Block"
          cancelText="Cancel"
          centered
          style={{ textAlign: "center" }}
          footer={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "40px",
              }}
            >
              <Button
                onClick={handleCancel}
                style={{
                  marginRight: 12,
                  background: "rgba(221, 221, 221, 1)",
                }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                style={{ background: "#013564" }}
                // onClick={handleBlock}
              >
                Block
              </Button>
            </div>
          }
        >
          <p className="text-lg font-semibold pt-10 pb-4">
            Are you sure you want to block this user?
          </p>
        </Modal> */}
    </div>
  );
};

export default PendingWithdrawList;
