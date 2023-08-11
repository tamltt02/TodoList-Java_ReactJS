import { notification } from "antd";

const openNotification = async (placement, message) => {
  console.log(message, "message notification");
  notification.info({
    message: "Thông báo",
    duration: 3,
    description: message,
    placement,
  });
};

export { openNotification };
