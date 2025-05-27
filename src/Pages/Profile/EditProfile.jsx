import { Button, ConfigProvider, Form, Input,  Upload } from "antd";
// import profileImage from "/images/profileImage.jpg";
// import { useEffect, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "react-day-picker/dist/style.css";
// import Swal from "sweetalert2";
import { useProfileQuery, useUpdateProfileMutation } from "../../Redux/api/authApi";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const EditProfile = () => {
  const navigate = useNavigate();
  const {data:profileData} = useProfileQuery();
    console.log('profileData edit', profileData?.data);
    const [updateProfile] = useUpdateProfileMutation();


  // const [imageUrl, setImageUrl] = useState('');
  const [imageUrl, setImageUrl] = useState(profileData?.data?.image);

  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect (() => {
    if (profileData?.data?.image) {
      setImageUrl(profileData?.data?.image);
    }
  }, [profileData]);

 
  const handleUploadChange = (info) => {
    console.log('info', info.file);
    
      setImageUrl(info.file); 
      setUploadedFile(info.file);
      
    const reader = new FileReader();
    reader.onload = (e) => {
      setImageUrl(e.target.result); 
    };
    reader.readAsDataURL(info.file); 
   
  };





   
  
  
  const onFinish = async (values) => {
    console.log("Success:", values);
    console.log('uploadedFile', uploadedFile);

    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("phone", values.phone);
    if(uploadedFile){
      formData.append("image", uploadedFile);
    }
    try {
      const res = await updateProfile(formData).unwrap();
      console.log('update profile response', res);
      if (res.success) {
        Swal.fire({
          title: "Profile Updated Successfully!",
          text: "The profile has been updated successfully.",
          icon: "success",
        });
        navigate("/profile");
      } else {
        Swal.fire({
          title: "Error",
          text: res.message || "There was an issue updating the profile.",
          icon: "error",
        });
      }
      
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Error",
        text: error.data.message,
        icon: "error",
      });
      
    }
    // navigate("/profile");
  };
  
  return (
    <div className="p-4 lg:p-8 min-h-screen">
      <div className="flex justify-between items-center mb-8 mx-10 xl:mx-40">
        <div className="flex items-center">
          <LeftOutlined
            className="text-black text-xl mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-black text-2xl font-semibold">Edit Profile Information</h2>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 md:mx-10 xl:mx-40">
        <div className="relative flex flex-col items-center bg-[#3565A1] p-5 rounded mb-5">
            <img
               src={imageUrl || "/default-profile.png"}
              alt="Profile"
              className="rounded-full border-4 border-white md:w-28 md:h-28 lg:h-32 lg:w-32 xl:w-36 xl:h-36 object-cover mb-2"
            />
            <Upload
              name="avatar"
              showUploadList={false}
              onChange={handleUploadChange}
              beforeUpload={() => false} 
            >
              <div className="absolute h-5 lg:h-8 w-20  left-[550px] lg:w-24 xl:w-24 inset-0 top-8 xl:top-24 md:top-20  flex items-center justify-center bg-blue-800 bg-opacity-50 rounded-full opacity-100 cursor-pointer">
                <span className="text-white text-xs lg:text-sm">
                  Change Image
                </span>
              </div>
            </Upload>
            <h2 className="text-lg font-bold text-white">{profileData?.data?.fullName}</h2>
          </div>
       
        <div className="">
          <div className="flex-1">
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    colorTextPlaceholder: "rgba(255,255,255,0.7)",
                    // hoverBg: "rgb(113,185,249)",
                    activeBg: "#3565A1",
                  },
                },
              }}
            >
              <Form
                layout="vertical"
                id="editProfileForm"
                onFinish={onFinish}
                initialValues={{
                  fullName: profileData?.data?.fullName,
                  email: profileData?.data?.email,
                  phone: profileData?.data?.phone,
                }}
              >
                <div className="flex flex-col">
                  <Form.Item
                    label={
                      <label
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "18px",
                        }}
                      >
                        Full Name
                      </label>
                    }
                    name="fullName"
                  >
                    <Input className=" rounded-lg h-10 font-semibold " />
                  </Form.Item>
                </div>
                <Form.Item
                  label={
                    <label
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: "18px",
                      }}
                    >
                      Email
                    </label>
                  }
                  name="email"
                >
                  <Input disabled className=" rounded-lg h-10 font-semibold" />
                </Form.Item>
                <div className="flex flex-col">
                  <Form.Item
                    label={
                      <label
                        style={{
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "18px",
                        }}
                      >
                        Phone Number
                      </label>
                    }
                    name="phone"
                  >
                    <Input  className="rounded-lg h-10 font-semibold" />
                  </Form.Item>
                </div>
                <Button
                  block
                  form="editProfileForm"
                  key="submit"
                  htmlType="submit"
                  className="bg-[#013564] text-white h-10 py-5 rounded-xl font-semibold"
                  style={{background:"#013564"}}
                >
                  Save Changes
                </Button>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;


