/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Modal, Table, Tooltip } from "antd";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoEye } from "react-icons/go";
import {
  useBlockedUserMutation,
  useGetAllUserQuery,
} from "../../Redux/api/authApi";
import Swal from "sweetalert2";

import * as XLSX from "xlsx";

export default function Users() {
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState([]);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isBlockModalVisible, setIsBlockModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleExport = () => {
    // Map the data to include only the relevant fields: Name, Email, and Live Location
    const exportData = userData.map((user) => ({
      Name: user.name,
      Email: user.email,
      "Live Location": user.liveLocation,
    }));

    // Get the current date and time
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB").replace(/\//g, "-"); // Format as dd-mm-yyyy
    const formattedTime = now.toLocaleTimeString("en-GB").replace(/:/g, "-"); // Format as HH-MM-SS

    // Combine date and time for the sheet name
    const xlSheetName = `TASK_FLY_ALL_User_List_${formattedDate}_${formattedTime}`;

    const worksheet = XLSX.utils.json_to_sheet(exportData); // Convert the mapped data to a worksheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "User List"); // Append worksheet to the workbook

    // Generate Excel file and download
    XLSX.writeFile(workbook, `${xlSheetName}.xlsx`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-indexed, so add 1
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // const { data: usersData, isLoading } = useGetAllUserQuery(null);

  //  useEffect(() => {
  //   if (usersData && usersData.data) {
  //     setData(usersData.data); // Ensure only valid data is set
  //   }
  // }, [usersData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/userData.json");
        //  const response1 = await useGetAllUserQuery(null)
        //  console.log('response',response.data);
        setUserData(response?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // console.log("userData",userData)

  const filteredData = useMemo(() => {
    if (!searchText) return userData;
    return userData.filter((item) =>
      item.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [userData, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const showViewModal = (record) => {
    setCurrentRecord(record);
    setIsViewModalVisible(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const showBlockModal = () => {
    setIsBlockModalVisible(true);
  };

  const handleDelete = () => {
    // Handle delete action here
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsViewModalVisible(false);
    setIsDeleteModalVisible(false);
    setIsBlockModalVisible(false);
  };

  const handleBlock = async () => {
    // try {
    //   const res = await blockedUser(currentRecord._id).unwrap();
    //   if (res.success) {
    //     Swal.fire({
    //       title: "User Blocked is Successfull!!",
    //       text: "Your user has been blocked successfully.",
    //       icon: "success",
    //     });
    //     setIsBlockModalVisible(false);
    //     setIsViewModalVisible(false);
    //   } else {
    //     Swal.fire({
    //       title: "Error",
    //       text: res.message || "There was an issue blocked the user.",
    //       icon: "error",
    //     });
    //   }
    // } catch (error) {
    //   const errorMessage = error.data?.message || "Something went wrong while blocked the user.";
    //   Swal.fire({
    //     title: "Error",
    //     text: errorMessage,
    //     icon: "error",
    //   });
    // }
  };

  return (
    <div className="min-h-[90vh]">
      <div className="bg-[#E6ECF3] rounded-lg">
        <div className="flex justify-between p-6">
          <div className="flex justify-start">
          <h1 className="text-2xl font-bold text-[#1F2852] ">Users List</h1>
         
          </div>
          <div className="flex gap-4 items-center">
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
                className="text-base font-semibold"
                prefix={
                  <SearchOutlined className="text-[#97C6EA] font-bold text-lg mr-2" />
                }
                style={{
                  width: 280,
                  padding: "8px 16px",
                  backgroundColor: "#F3F3F3",
                  border: "1px solid white",
                  color: "#010515",
                }}
              />
            </ConfigProvider>
            <Button type="primary" onClick={handleExport}>
            Export to Excel
          </Button>
          </div>
        </div>
        <div>
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  headerBg: "rgb(255,255,255)",
                  colorBgContainer: "rgb(255,255,255)",
                  colorText: "rgb(0,0,0)",
                  borderColor: "rgb(73,72,72)",
                  headerColor: "#013564",
                  footerBg: "rgb(255,255,255)",
                  // borderRadius: 20,
                },
              },
            }}
          >
            <Table
              dataSource={filteredData}
              loading={loading}
              pagination={{ pageSize: 15 }}
              rowKey={(record) => record.serialId}
              scroll={{ x: true }}
            >
              <Table.Column
                title="S.ID"
                dataIndex="index"
                render={(text, record, index) => index + 1}
              />
              <Table.Column
                title="Full Name"
                dataIndex="fullName"
                key="fullName"
                // render={(text, record) => (
                //   <div style={{ display: "flex", alignItems: "center" }}>
                //     <img
                //       src={record.avatar}
                //       alt={record.customerName}
                //       style={{
                //         width: 28,
                //         height: 28,
                //         borderRadius: "50%",
                //         marginRight: 8,
                //       }}
                //     />
                //     {text}
                //   </div>
                // )}
              />
              <Table.Column title="Email" dataIndex="email" key="email" />
              <Table.Column
                title="Role"
                dataIndex="role"
                key="role"
                filters={[
                  { text: "Admin", value: "admin" },
                  { text: "Tasker", value: "tasker" },
                  { text: "Poster", value: "poster" },
                ]}
                onFilter={(value, record) => record.role === value}
              />
              <Table.Column
                title="User Created Date"
                dataIndex="createdAt"
                key="createdAt"
                responsive={["sm", "xs"]}
                render={(text) => formatDate(text)}
                sorter={(a, b) => new Date(a.createdAt) - new Date(b.createdAt)}
                sortDirections={["ascend", "descend"]}
              />
              <Table.Column
                title="Action"
                key="action"
                render={(_, record) => (
                  <>
                    <div>
                      <Tooltip placement="right" title="View Details">
                        <Button
                          style={{
                            background: "white",
                            padding: 0,
                            border: "1px solid #013564",
                            color: "#013564",
                          }}
                          onClick={() => showViewModal(record)}
                        >
                          <p className="px-5 font-semibold">Details</p>
                        </Button>
                      </Tooltip>
                    </div>
                  </>
                )}
              />
            </Table>
          </ConfigProvider>
        </div>

        {/* <div className="text-center mt-10 pb-10">
          <Button type="primary" onClick={handleExport}>
            Export to Excel
          </Button>
        </div> */}

        {/* View Modal */}
        <Modal
          title={
            <div className="pt-7">
              <h2 className="text-[#010515] text-2xl font-bold">
                Users Details
              </h2>
            </div>
          }
          open={isViewModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
          style={{ textAlign: "center" }}
          width={450}
          className=""
        >
          {currentRecord && (
            <div>
              <div className="flex items-center justify-center gap-5 mt-8">
                <p className="text-2xl text-[#013564] font-bold">
                  {currentRecord.customerName}
                </p>
              </div>
              {/* <p className="text-xl font-bold my-2 text-start">User Information</p> */}
              <div className="flex flex-col text-lg font-semibold gap-y-2 text-start w-[80%] mx-auto mt-3">
                <p>
                  <span>Name:</span> {currentRecord.fullName}
                </p>
                <p>
                  <span>Email:</span> {currentRecord.email}
                </p>
                <p>
                  <span>Role:</span> {currentRecord.role}
                </p>
              </div>
              <button
                onClick={showBlockModal}
                className="bg-[#013564] text-white font-bold py-2 text-lg px-5 rounded-lg mt-8 w-[80%]"
              >
                {currentRecord.isBlocked ? "unblocked" : "Block"}
              </button>
            </div>
          )}
        </Modal>

        {/* Block Confirmation Modal */}
        <Modal
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
                onClick={handleBlock}
              >
                submit
              </Button>
            </div>
          }
        >
          <p className="text-lg font-semibold pt-10 pb-4">
            Are you sure you want to block this user?
          </p>
        </Modal>

        {/* Delete Modal */}
        {/* <Modal
          // title="Confirm Delete"
          open={isDeleteModalVisible}
          onOk={handleDelete}
          onCancel={handleCancel}
          okText="Delete"
          cancelText="Cancel"
          centered
          style={{ textAlign: "center" }}
          // styles.body={{ textAlign: "center" }}
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
                style={{ background: "rgba(136, 24, 24, 1)" }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          }
        >
          <p className="text-lg font-semibold pt-10 pb-4">
            Want to delete this house?
          </p>
        </Modal> */}
      </div>
    </div>
  );
}
