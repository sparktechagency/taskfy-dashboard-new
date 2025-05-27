// import {  useState, useMemo } from "react";
// import { ConfigProvider, Table, Input, Button, Space, Modal } from "antd";
// import { SearchOutlined, LeftOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import { useGetAllWithdrawRequestQuery } from "../../Redux/api/dashboardApi";

// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
//   const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
//   const year = date.getFullYear();

//   return `${day}-${month}-${year}`;
// };

// const PendingWithdrawList = () => {
//   const [searchText, setSearchText] = useState("");
//   const navigate = useNavigate();
//   const [isViewModalVisible, setIsViewModalVisible] = useState(false);
//   const [currentRecord, setCurrentRecord] = useState(null);
//   // const [isViewModalVisible, setIsViewModalVisible] = useState(false);

//   const columns = [
//     {
//       title: "S.ID",
//       dataIndex: "index",
//       responsive: ["md"],
//       render: (text, record, index) => index + 1,
//     },

//     {
//       title: "Worker Name",
//       dataIndex: ["worker", "fullName"],
//       key: "fullName",
//       responsive: ["md", "xs"],
//     },
//     {
//       title: "Withdraw Date",
//       dataIndex: "createdAt",
//       key: "createdAt",
//       render: (text) => formatDate(text),
//     },
//     {
//       title: "Method",
//       dataIndex: "method",
//       key: "method",
//       responsive: ["sm"],
//     },
//     {
//       title: "Withdraw Amount",
//       dataIndex: "amount",
//       key: "amount",
//       responsive: ["sm"],
//     },
//     {
//       title: "Withdraw Status",
//       dataIndex: "status",
//       key: "status",
//       responsive: ["sm", "xs"],
//       render: (text) => {
//         let color = "";
//         let displayText = text;
//         let fontWeight = "normal";

//         if (text === "pending") {
//           color = "#FFD33C";
//           displayText = "Pending";
//           fontWeight = "bold";
//         } else if (text === "paid") {
//           color = "green";
//           displayText = "Paid";
//           fontWeight = "bold";
//         }

//         return <span style={{ color, fontWeight }}>{displayText}</span>;
//       },
//     },
//     {
//       title: "Action",
//       responsive: ["sm"],
//       render: (text, record) => {
//         // Button to trigger a pending withdraw action
//         return (
//           <Space>
//             <Button
//               type="primary"
//               onClick={() => handleAdminConformWithdraw(record)}
//             >
//               ACCEPT THE WITHDRAW
//             </Button>
//             <Button
//               onClick={() => showViewModal(record)}
//               style={{ border: "1px solid", borderColor: "#023E8A" }}
//               // Disable if already paid
//             >
//               View Details
//             </Button>
//           </Space>
//         );
//       },
//     },
//   ];



//   const {data:pendingWithdrawData, isLoading} = useGetAllWithdrawRequestQuery();

// console.log('pendingWithdrawData ===>', pendingWithdrawData?.data);

  

//   const filteredData = useMemo(() => {
//     if (!searchText) return pendingWithdrawData?.data;
//     return pendingWithdrawData?.data?.filter((item) =>
//       item.method.toLowerCase().includes(searchText.toLowerCase())
//     );
//   }, [pendingWithdrawData?.data, searchText]);

//   const onSearch = (value) => {
//     setSearchText(value);
//   };

//   const onChange = (filters, extra) => {
//     console.log("params", filters, extra);
//   };

//   const handleAdminConformWithdraw = async (record) => {
//     if (!record) {
//       console.error("No record provided.");
//       return;
//     }

//     console.log("Record:", record);

//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, approve it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         // Assuming the function or API call to update the status, e.g., record approval
//         // const response = await someMutationFunction(record.id);

//         // Simulate the result or check record status after updating
//         if (record.status) {
//           Swal.fire({
//             title: "Approved!",
//             text: "The withdrawal has been approved.",
//             icon: "success",
//           });
//         } else {
//           Swal.fire({
//             title: "Error",
//             text: "There was an issue approving the withdrawal.",
//             icon: "error",
//           });
//         }
//       } catch (error) {
//         console.error("Error approving withdrawal:", error);
//         Swal.fire({
//           title: "Error",
//           text: "An error occurred while processing the approval.",
//           icon: "error",
//         });
//       }
//     }
//   };

//   const showViewModal = (record) => {
//     setCurrentRecord(record);
//     setIsViewModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsViewModalVisible(false);
//   };

//   return (
//     <div className="min-h-[90vh] p-4 lg:p-6">
//       {/* Header Section */}
//       <div className="bg-[#E6ECF3] rounded-lg mb-6">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4">
//           <div className="flex items-center">
//             <LeftOutlined
//               className="text-[#3565A1] text-xl mr-4 cursor-pointer"
//               onClick={() => navigate(-1)}
//             />
//             <h1 className="text-2xl md:text-3xl font-bold text-[#1F2852]">
//               Pending Withdraw List
//             </h1>
//           </div>

//           <div className="flex gap-4 items-center w-full md:w-auto">
//             <ConfigProvider
//               theme={{
//                 components: {
//                   Input: {
//                     colorTextPlaceholder: "rgb(0, 0, 0,0.5)",
//                     colorBgContainer: "white",
//                   },
//                 },
//               }}
//             >
//               <Input
//                 placeholder="Search..."
//                 value={searchText}
//                 onChange={(e) => onSearch(e.target.value)}
//                 className="text-base font-semibold w-full md:w-72"
//                 prefix={
//                   <SearchOutlined className="text-[#97C6EA] font-bold text-lg mr-2" />
//                 }
//                 style={{
//                   padding: "8px 16px",
//                   backgroundColor: "#F3F3F3",
//                   border: "1px solid white",
//                   color: "#010515",
//                 }}
//               />
//             </ConfigProvider>
//           </div>
//         </div>
//       </div>

//       {/* Table Section */}
//       <div>
//         <ConfigProvider
//           theme={{
//             components: {
//               Table: {
//                 headerBg: "#FAFAFA",
//                 headerColor: "#1F2852",
//                 colorBgContainer: "rgb(255,255,255)",
//                 colorText: "rgb(0,0,0)",
//                 headerSplitColor: "rgba(151, 198, 234, 1)",
//               },
//             },
//           }}
//         >
//           <div className="w-full overflow-x-auto rounded-xl">
//             <Table
//               columns={columns}
//               dataSource={filteredData}
//               loading={isLoading}
//               pagination={{ pageSize: 10 }}
//               onChange={onChange}
//               className="user-table"
//               scroll={{ x: true }} // Enable horizontal scrolling on smaller screens
//             />
//           </div>
//         </ConfigProvider>
//       </div>
//       {/* View Modal */}
//       <Modal
//         title={
//           <div className="pt-7">
//             <h2 className="text-[#010515] text-2xl font-bold ">
//               User Withdraw Details
//             </h2>
//           </div>
//         }
//         open={isViewModalVisible}
//         onCancel={handleCancel}
//         footer={null}
//         centered
//         style={{ textAlign: "center" }}
//         width={600}
//         className=""
//       >
//         {currentRecord && (
//           <div>
//             {/* <p className="text-xl font-bold my-2 text-start">User Information</p> */}
//             <div className="flex flex-col text-lg  gap-y-2 text-start w-[80%] mx-auto mt-3 mb-5">
//               <p>
//                 <span className="font-semibold ">Name:</span>{" "}
//                 {currentRecord.worker.fullName}
//               </p>
//               <p>
//                 <span className="font-semibold ">Email:</span>{" "}
//                 {currentRecord.worker.email}
//               </p>
//               <p>
//                 <span className="font-semibold ">Phone No:</span>{" "}
//                 {currentRecord.worker.phone}
//               </p>
//               <p>
//                 <span className="font-semibold ">Amount:</span>{" "}
//                 {currentRecord.amount}
//               </p>
//               <p>
//                 <span className="font-semibold ">Payment Method:</span>{" "}
//                 {currentRecord.method}
//               </p>
//               <p>
//                 <span className="font-semibold ">Payment Status:</span>{" "}
//                 {currentRecord.status}
//               </p>
//               <p>
//                 <span className="font-semibold ">Payment Transaction Id:</span>{" "}
//                 {currentRecord.transactionId}
//               </p>
//               <p>
//                 <span className="font-semibold ">Google Pay Email:</span>{" "}
//                 {currentRecord.googlePayDetails.googleEmail}
//               </p>
//               <p>
//                 <span className="font-semibold ">google Pay Token:</span>{" "}
//                 {currentRecord.googlePayDetails.googleId}
//               </p>
//             </div>
//             {/* <button
//                 // onClick={showBlockModal}
//                 className="bg-[#013564] text-white font-bold py-2 text-lg px-5 rounded-lg mt-8 w-[80%]"
//               >
//                 Block
//               </button> */}
//           </div>
//         )}
//       </Modal>

//       {/* Block Confirmation Modal */}
//       {/* <Modal
//           open={isBlockModalVisible}
//           onOk={handleBlock}
//           onCancel={handleCancel}
//           okText="Block"
//           cancelText="Cancel"
//           centered
//           style={{ textAlign: "center" }}
//           footer={
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 paddingBottom: "40px",
//               }}
//             >
//               <Button
//                 onClick={handleCancel}
//                 style={{
//                   marginRight: 12,
//                   background: "rgba(221, 221, 221, 1)",
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="primary"
//                 style={{ background: "#013564" }}
//                 // onClick={handleBlock}
//               >
//                 Block
//               </Button>
//             </div>
//           }
//         >
//           <p className="text-lg font-semibold pt-10 pb-4">
//             Are you sure you want to block this user?
//           </p>
//         </Modal> */}
//     </div>
//   );
// };

// export default PendingWithdrawList;


import { useState, useMemo } from "react";
import { ConfigProvider, Table, Input, Button, Space, Modal } from "antd";
import { SearchOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAdminConformWithdrawMutation, useGetAllWithdrawRequestQuery } from "../../Redux/api/dashboardApi";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const PendingWithdrawList = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const { data: pendingWithdrawData, isLoading } = useGetAllWithdrawRequestQuery();
  const [adminConformWithdraw] = useAdminConformWithdrawMutation();

  const columns = [
    {
      title: "S.ID",
      dataIndex: "index",
      responsive: ["md"],
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tasker Name",
      dataIndex: ["taskerUserId", "fullName"],
      key: "fullName",
      responsive: ["md", "xs"],
    },
    {
      title: "Tasker Email",
      dataIndex: ["taskerUserId", "email"],
      key: "email",
      responsive: ["md", "xs"],
    },
    
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      responsive: ["sm"],
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      responsive: ["sm"],
    },
   
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      responsive: ["sm", "xs"],
      render: (text) => {
        let color = "";
        let displayText = text;
        let fontWeight = "normal";

        if (text === "request") {
          color = "#FFD33C";
          displayText = "Request";
          fontWeight = "bold";
        } else if (text === "completed") {
          color = "green";
          displayText = "Completed";
          fontWeight = "bold";
        }

        return <span style={{ color, fontWeight }}>{displayText}</span>;
      },
    },
     {
      title: "Request Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (text) => formatDate(text),
    },
    {
      title: "Action",
      responsive: ["sm"],
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => handleAdminConfirmWithdraw(record)}>
            Accept
          </Button>
          <Button
            onClick={() => showViewModal(record)}
            style={{ border: "1px solid", borderColor: "#023E8A" }}
          >
            View Details
          </Button>
        </Space>
      ),
    },
  ];

 const filteredData = useMemo(() => {
  const rawData = pendingWithdrawData?.data?.result;
  if (!Array.isArray(rawData)) {
    return [];
  }
  if (!searchText) return rawData;
  return rawData.filter((item) =>
    (item.method || "").toLowerCase().includes(searchText.toLowerCase())
  );
}, [pendingWithdrawData?.data, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const onChange = (filters, extra) => {
    console.log("Table params", filters, extra);
  };

  const handleAdminConfirmWithdraw = async (record) => {
    console.log('record pp===>', record);
    if (!record) {
      console.error("No record provided.");
      return;
    }

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
        const response = await adminConformWithdraw(record._id).unwrap();
        console.log('response ===>', response);

        if (response.success) {
          Swal.fire({
            title: "Approved!",
            text: "The withdrawal has been approved.",
            icon: "success",
          });
        } 
      } catch (error) {
        console.error("Error approving withdrawal:", error);
        Swal.fire({
          title: "Error",
          text: error.data.message,
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

// console.log('pendingWithdrawData ===>', pendingWithdrawData?.data?.result);

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
                    colorTextPlaceholder: "rgba(0, 0, 0, 0.5)",
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
                prefix={<SearchOutlined className="text-[#97C6EA] font-bold text-lg mr-2" />}
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
              loading={isLoading}
              pagination={{ pageSize: 10 }}
              onChange={onChange}
              className="user-table"
              scroll={{ x: true }}
              rowKey={(record) => record._id}
            />
          </div>
        </ConfigProvider>
      </div>

      {/* <Modal
        title={
          <div className="pt-7">
            <h2 className="text-[#010515] text-2xl font-bold ">Tasker Withdraw Details</h2>
          </div>
        }
        open={isViewModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        style={{ textAlign: "center" }}
        width={600}
      >
        {currentRecord && (
          <div>
            <div className="flex flex-col text-lg gap-y-2 text-start w-[80%] mx-auto mt-3 mb-5">
              <p>
                <span className="font-semibold">Name:</span> {currentRecord.taskerUserId.fullName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {currentRecord.taskerUserId.email}
              </p>
              <p>
                <span className="font-semibold">Phone No:</span> {currentRecord.taskerUserId.phone}
              </p>
              <p>
                <span className="font-semibold">Amount:</span> {currentRecord.amount}
              </p>
              <p>
                <span className="font-semibold">Method:</span> {currentRecord.method}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {currentRecord.status}
              </p>
              <p>
                <span className="font-semibold">Request Date:</span> {formatDate(currentRecord.createdAt)}
              </p>
              <p>
                <span className="font-semibold">Country Name:</span> {currentRecord.country || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Bank No:</span> {currentRecord.accountNumber || "N/A"}
              </p>
            </div>
          </div>
        )}
      </Modal> */}

      <Modal
  title={
    <div className="pt-7">
      <h2 className="text-[#010515] text-2xl mb-5 font-bold text-center">
        Tasker Withdraw Details
      </h2>
    </div>
  }
  open={isViewModalVisible}
  onCancel={handleCancel}
  footer={null}
  centered
  width={600}
>
  {currentRecord && (
    <div className="w-full max-w-md mx-auto space-y-4 text-left">
      {[
        { label: "Name", value: currentRecord.taskerUserId.fullName },
        { label: "Email", value: currentRecord.taskerUserId.email },
        { label: "Phone No", value: currentRecord.taskerUserId.phone || "N/A" },
        { label: "Amount", value: currentRecord.amount },
        { label: "Method", value: currentRecord.method },
        { label: "Status", value: currentRecord.status },
        { label: "Request Date", value: formatDate(currentRecord.createdAt) },
        { label: "Country Name", value: currentRecord.country || "N/A" },
        { label: "Bank No", value: currentRecord.accountNumber || "N/A" },
      ].map(({ label, value }) => (
        <div
          key={label}
          className="flex justify-between items-center bg-gray-50 rounded-md p-3 shadow-sm"
        >
          <span className="font-semibold text-gray-700">{label}:</span>
          <span className="text-gray-900 break-words max-w-[70%] text-right">{value}</span>
        </div>
      ))}
    </div>
  )}
</Modal>

    </div>
  );
};

export default PendingWithdrawList;
