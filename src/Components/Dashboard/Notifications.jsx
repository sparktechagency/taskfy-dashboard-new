
import {
  BellOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAdminNotificationQuery } from "../../Redux/api/dashboardApi";
import moment from "moment";

// const data = [
//   {
//     name: "Alice",
//     feedback: "You have a story request.",
//     time: "Fri, 12:30pm",
//   },
//   {
//     name: "Bob",
//     feedback: "An user joined in app.",
//     time: "Fri, 12:30pm",
//   },
//   {
//     name: "Charlie",
//     feedback: "You have a story request.",
//     time: "Fri, 12:30pm",
//   },
//   {
//     name: "David",
//     feedback: "You have a story request.",
//     time: "Fri, 12:30pm",
//   },
//   {
//     name: "Eve",
//     feedback: "An user joined in app.",
//     time: "Fri, 12:30pm",
//   },
//   {
//     name: "Frank",
//     feedback: "You have a story request.",
//     time: "Fri, 12:30pm",
//   },
//   {
//     name: "Grace",
//     feedback: "You have a story request.",
//     time: "Fri, 12:30pm",
//   },
//   {
//     name: "Hank",
//     feedback: "An user joined in app.",
//     time: "Fri, 12:30pm",
//   },
//   {
//     name: "Ivy",
//     feedback: "You have a story request.",
//     time: "Fri, 12:30pm",
//   },
//   {
//     name: "Jack",
//     feedback: "You have a story request.",
//     time: "Fri, 12:30pm",
//   },
// ];

const Notifications = () => {
  const {data:allNotifications} = useAdminNotificationQuery();
  console.log('allNotifications======', allNotifications?.data);
  const navigate = useNavigate();
  // const [profileModalOpen, setProfileModalOpen] = useState(false);

  // const onView = () => {
  //   console.log("On View Function");
  //   setProfileModalOpen(true);
  // };

  // const onDelete = () => {
  //   console.log("Clicked On Delete");
  // };

  const goBack = () => {
    navigate(-1); // Navigate to the previous route
  };

  return (
    <div className="h-screen bg-white">
      <div className="mx-auto w-full rounded-full">
        <div className="flex items-center mb-4 h-20 px-8 text-2xl bg-[#013564]">
          <LeftOutlined
            className="text-white text-lg mr-4 font-bold cursor-pointer"
            onClick={goBack}
          />
          <h2 className="text-white text-xl font-semibold">
            All Notifications
          </h2>
        </div>
        <div className=" rounded-lg p-4">
          <div className="bg-white p-4 rounded-lg">
            {allNotifications?.data?.map((notification) => (
                    <div className="text-start" key={notification._id}>
                      <div className="flex gap-2 md:w-2/2">
                        <BellOutlined
                          style={{
                            color: "#013564",
                            background: "#B1D7FA",
                            padding: "0 5px",
                            fontSize: "20px",
                            borderRadius: "10%",
                          }}
                        />
                        <div className="flex flex-col items-start">
                          <p>{notification.message}</p>
                          <p className="text-gray-400">{moment(notification.createdAt).fromNow()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
