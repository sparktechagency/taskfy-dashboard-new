import { LeftOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAddSettingsMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../Redux/api/settingsApi";
import Swal from "sweetalert2";

const AboutUs = () => {
  const editor = useRef(null);
  const navigate = useNavigate();

  const [content, setContent] = useState("");

  const {
    data: getSettingsData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetSettingsQuery();
  console.log(getSettingsData?.data);

  // Mutations for adding and updating aboutUs
  const [addSettings, { isLoading: isAdding }] = useAddSettingsMutation();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  // Load aboutUs data on component mount
  useEffect(() => {
    if (getSettingsData?.data.aboutUs) {
      setContent(getSettingsData.data.aboutUs); // Load the latest aboutUs
    }
  }, [getSettingsData]);

  const handleOnSave = async () => {
    try {
      if (getSettingsData?.data.aboutUs) {
        // Update existing aboutUs
        await updateSettings({ aboutUs: content }).unwrap();
        Swal.fire({
          title: "Success",
          text: "aboutUs updated successfully!",
          icon: "success",
        })
      } else {
        // Add a new aboutUs if not existing
        await addSettings({ aboutUs: content }).unwrap();
        Swal.fire({
          title: "Success",
          text: "aboutUs added successfully!",
          icon: "success",
        })
      }
      refetch(); // Refresh the data after save
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to save aboutUs. Please try again.",
        icon: "error",
      })
      console.error("Save error:", error);
    }
  };

  // Show loading state while fetching data
  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading aboutUs..." />
      </div>
    );
  }

  // Show error message if fetch fails
  if (fetchError) {
    return (
      <div className="text-white">
        Error loading aboutUs. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen py-2 px-2 rounded-lg">
      <div className="flex items-center gap-2 text-2xl font-bold px-2 py-4 bg-[#013564] text-[#E1E1E1] rounded-lg">
        <p className="cursor-pointer" onClick={() => navigate(-1)}>
          <LeftOutlined />
        </p>
        <p>About Us</p>
      </div>
      <div className="mt-5">
        <JoditEditor
          ref={editor}
          value={content}
          config={{ height: 650, theme: "light", readonly: false }}
          onBlur={(newContent) => setContent(newContent)}
        />
      </div>
      <Button
        block
        onClick={handleOnSave}
        loading={isAdding || isUpdating} // Show loading while saving
        style={{
          marginTop: "16px",
          padding: "1px",
          fontSize: "24px",
          color: "white",
          background: "#013564",
          height: "55px",
          border: "none",
        }}
      >
        Save Changes
      </Button>
    </div>
  );
};

export default AboutUs;