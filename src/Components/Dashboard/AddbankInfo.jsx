import { useState } from "react";
import { Button, ConfigProvider, Form, Input, Modal } from "antd";
import {
  useAddBankInfoMutation,
  useGetBankInfoQuery,
  useUpdateBankInfoMutation,
} from "../../Redux/api/bankinfoApi";
import Swal from "sweetalert2";

const AddbankInfo = () => {
  const { data: bankInfo, refetch } = useGetBankInfoQuery();
  const [addBankInfo] = useAddBankInfoMutation();
  const [updateBankInfo] = useUpdateBankInfoMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [form] = Form.useForm();

  console.log("bankInfo", bankInfo?.data);
  // console.log("bankInfo", updateBankInfo);

  const showModal = () => setIsModalOpen(true);
  const showModal2 = () => setIsModalOpen2(true);
  const handleCancel = () => setIsModalOpen(false);
  const handleCancel2 = () => setIsModalOpen2(false);

  const onFinish = async (values) => {
    console.log("Form values:", values);

    // TODO: call API mutation to save data
    const data = {
      name: values.fullName,
      bankName: values.bankName,
      accountNumber: values.accountNumber,
      routingNumber: values.routingNumber,
    };

    try {
      // Await the mutation response
      const res = await addBankInfo(data).unwrap();

      console.log("create admin response", res);

      if (res.success) {
        Swal.fire({
          title: "Bank info added successfully",
          text: "Bank info  has been created.",
          icon: "success",
        });
        form.resetFields();
        refetch();
        setIsModalOpen(false);
      } else {
        Swal.fire({
          title: "Error",
          text: "There was an issue creating the admin.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      if (error.data) {
        Swal.fire({
          title: `${error.data.message}`,
          text: "Something went wrong while creating the admin.",
          icon: "error",
        });
      }
    }
  };


  const updateBankDetails = async (values) => {
    console.log("Form values update:", values);

    // TODO: call API mutation to save data
    const data = {
      name: values.fullName,
      bankName: values.bankName,
      accountNumber: values.accountNumber,
      routingNumber: values.routingNumber,
    };

    console.log('data update', data);

    try {
      // Await the mutation response
      const res = await updateBankInfo(data).unwrap();

      console.log("create admin response", res);

      if (res.success) {
        Swal.fire({
          title: "Update Bank info successfully",
          text: "Bank info  has been updated.",
          icon: "success",
        });
        form.resetFields();
        refetch();
        setIsModalOpen2(false);
      } else {
        Swal.fire({
          title: "Error",
          text: "There was an issue creating the admin.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error creating admin:", error);
      if (error.data) {
        Swal.fire({
          title: `${error.data.message}`,
          text: "Something went wrong while creating the admin.",
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-[1350px] w-[90%] mx-auto flex flex-col lg:flex-row gap-20 items-center justify-center min-h-screen py-10">
        {bankInfo?.data ? (
          <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-10 flex flex-col gap-6 border border-gray-200">
            <h2 className="text-[#023E8A] text-3xl font-extrabold tracking-wide mb-6 border-b-4 border-[#023E8A] pb-2">
              Bank Information
            </h2>
            <div className="flex flex-col gap-4 text-gray-800">
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="font-semibold text-lg">Full Name:</span>
                <span className="text-lg">{bankInfo.data.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="font-semibold text-lg">Bank:</span>
                <span className="text-lg">{bankInfo.data.bankName}</span>
              </div>

              <div className="flex justify-between border-b border-gray-200 pb-3">
                <span className="font-semibold text-lg">Account Number:</span>
                <span className="text-lg">{bankInfo.data.accountNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-lg">Routing Number:</span>
                <span className="text-lg">{bankInfo.data.routingNumber}</span>
              </div>
              <button onClick={showModal2} className="px-8 py-3 mt-3 rounded-full bg-gradient-to-r from-[#023E8A] to-[#0077B6] text-white font-bold text-xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
                Update Bank Info
              </button>
            </div>
          </div>
        ) : (
          <button
            className="px-12 py-4 rounded-full bg-gradient-to-r from-[#023E8A] to-[#0077B6] text-white font-bold text-xl shadow-lg hover:scale-105 transform transition duration-300 ease-in-out"
            onClick={showModal}
          >
            Add Bank Info
          </button>
        )}
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null} centered>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                colorError: "#F44848",
                labelColor: "#1F2852",
                labelFontSize: 20,
              },
              Button: {
                defaultHoverBg: "rgb(10,39,153)",
                defaultHoverColor: "rgb(255,255,255)",
                defaultBg: "rgb(2,62,138)",
                defaultBorderColor: "rgb(2,62,138)",
                defaultColor: "rgb(255,255,255)",
              },
              Input: {
                colorTextPlaceholder: "rgb(113,111,111)",
              },
            },
          }}
        >
          <Form
            form={form}
            layout="vertical"
            className="bg-transparent w-full"
            onFinish={onFinish}
          >
            <Form.Item
              name="fullName"
              label={<p style={{ fontWeight: "500" }}>Full Name</p>}
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input
                placeholder="Enter your Full Name"
                className="py-2 px-3 text-xl bg-site-color border-base-color text-base-color"
              />
            </Form.Item>

            <Form.Item
              name="bankName"
              label={<p style={{ fontWeight: "500" }}>Bank Name</p>}
              rules={[
                { required: true, message: "Please enter your bank name" },
              ]}
            >
              <Input
                placeholder="Enter your bank name"
                className="py-2 px-3 text-xl bg-site-color border-base-color text-base-color"
              />
            </Form.Item>

            <Form.Item
              name="accountNumber"
              label={<p style={{ fontWeight: "500" }}>Account Number</p>}
              rules={[
                { required: true, message: "Please enter your account number" },
              ]}
            >
              <Input
                type="number"
                placeholder="Enter your account number"
                className="py-2 px-3 text-xl bg-site-color border-base-color text-base-color"
              />
            </Form.Item>

            <Form.Item
              name="routingNumber"
              label={<p style={{ fontWeight: "500" }}>Routing Number</p>}
              rules={[
                { required: true, message: "Please enter your routing number" },
              ]}
            >
              <Input
                placeholder="Enter your routing number"
                className="py-2 px-3 text-xl bg-site-color border-base-color text-base-color"
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full py-6 border text-xl font-semibold rounded-2xl mt-14"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Modal>
      <Modal open={isModalOpen2} onCancel={handleCancel2} footer={null} centered>
        <h3 className="text-2xl text-center text-[#023E8A] font-bold mb-4">Update Bank Info</h3>
        <ConfigProvider
          theme={{
            components: {
              Form: {
                colorError: "#F44848",
                labelColor: "#1F2852",
                labelFontSize: 20,
              },
              Button: {
                defaultHoverBg: "rgb(10,39,153)",
                defaultHoverColor: "rgb(255,255,255)",
                defaultBg: "rgb(2,62,138)",
                defaultBorderColor: "rgb(2,62,138)",
                defaultColor: "rgb(255,255,255)",
              },
              Input: {
                colorTextPlaceholder: "rgb(113,111,111)",
              },
            },
          }}
        >
          <Form
            form={form}
            layout="vertical"
            className="bg-transparent w-full"
            onFinish={updateBankDetails}
          >
            <Form.Item
              name="fullName"
              label={<p style={{ fontWeight: "500" }}>Full Name</p>}
              
            >
              <Input
                placeholder="Enter your Full Name"
                className="py-2 px-3 text-xl bg-site-color border-base-color text-base-color"
                defaultValue={bankInfo?.data?.name}
              />
            </Form.Item>

            <Form.Item
              name="bankName"
              label={<p style={{ fontWeight: "500" }}>Bank Name</p>}
              
            >
              <Input
                placeholder="Enter your bank name"
                className="py-2 px-3 text-xl bg-site-color border-base-color text-base-color"
                defaultValue={bankInfo?.data?.bankName}
              />
            </Form.Item>

            <Form.Item
              name="accountNumber"
              label={<p style={{ fontWeight: "500" }}>Account Number</p>}
             
            >
              <Input
                type="number"
                placeholder="Enter your account number"
                className="py-2 px-3 text-xl bg-site-color border-base-color text-base-color"
                defaultValue={bankInfo?.data?.accountNumber}
              />
            </Form.Item>

            <Form.Item
              name="routingNumber"
              label={<p style={{ fontWeight: "500" }}>Routing Number</p>}
            
            >
              <Input
                placeholder="Enter your routing number"
                className="py-2 px-3 text-xl bg-site-color border-base-color text-base-color"
                defaultValue={bankInfo?.data?.routingNumber}
              />
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full py-6 border text-xl font-semibold rounded-2xl mt-14"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Modal>
    </div>
  );
};

export default AddbankInfo;
