
import { Input, Button, Form, ConfigProvider } from "antd";
import {
  EditOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import profileImage from "../../../public/images/profileImage.jpg";
import { useProfileQuery } from "../../Redux/api/authApi";

// const countryCodes = [
//   { label: "+1", value: "US", flag: "https://flagcdn.com/w320/us.png" },
//   { label: "+44", value: "UK", flag: "https://flagcdn.com/w320/gb.png" },
//   { label: "+91", value: "IN", flag: "https://flagcdn.com/w320/in.png" },
//   { label: "+880", value: "BD", flag: "https://flagcdn.com/w320/bd.png" }, // Bangladesh
//   { label: "+92", value: "PK", flag: "https://flagcdn.com/w320/pk.png" }, // Pakistan
//   { label: "+54", value: "AR", flag: "https://flagcdn.com/w320/ar.png" }, // Argentina
//   { label: "+90", value: "TR", flag: "https://flagcdn.com/w320/tr.png" }, // Turkey
// ];

const Profile = () => {
  const {data:profileData} = useProfileQuery();
  console.log('profileData', profileData?.data);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="p-4 lg:p-8 min-h-screen">
      <div className="flex justify-between items-center mb-8 xl:mx-40">
        <div className="flex items-center">
          <LeftOutlined
            className="text-black text-xl mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h2 className="text-black text-2xl font-semibold">
            Profile Information
          </h2>
        </div>
        <Button
          icon={<EditOutlined />}
          onClick={handleEditClick}
          className="bg-[#013564] text-white h-10"
          style={{background:"#013564"}}
        >
          Edit Profile
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6 xl:mx-40">
      <div className="flex flex-col items-center bg-[#3565A1] p-5 rounded mb-5">
            <img
              src={`http://10.0.70.163:5001/${profileData?.data?.image}`}
              alt="Profile"
              className="rounded-full w-36 h-36 object-cover mb-4"
            />
            <h2 className="text-xl lg:text-2xl font-bold text-white">{``}</h2>
          </div>
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
              <Form layout="vertical">
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
                  >
                    <Input
                      className=" rounded-lg h-10 font-semibold "
                      value={profileData?.data?.fullName || ""}
                      // value="Amit Kumar"
                      readOnly
                    />
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
                >
                  <Input
                    className=" rounded-lg h-10 font-semibold"
                    value={profileData?.data?.email || ""}
                    // value="b4aZ0@example.com"
                    readOnly
                  />
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
                  >
                    <Input
                    className="  rounded-lg h-10 font-semibold"
                    value={profileData?.data?.phone || ""}
                    // value="+91 1234567890"
                    readOnly
                  />
                  </Form.Item>
                </div>
              </Form>
            </ConfigProvider>
          </div>
     
      </div>
    </div>
  );
};

export default Profile;
