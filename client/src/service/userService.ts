import qs from "qs";
import axios_instance, {
  axios_file_instance,
} from "../components/api/api_instance";

export const getAppUsers = async () => {
  const res = await axios_instance({
    url: "/user/getFashionPublisher",
    method: "GET",
  });
  const appUsers: string[] = [];
  res.data.publisher.map((item: any) => {
    appUsers.push(item.email);
  });

  return { appUsers };
};

export const getUserProfile = async () => {
  const res = await axios_instance({
    url: "/user/getUserProfile",
    method: "GET",
  });

  return res.data.user;
};

export const updateUserProfile = async (newProfile: any, avatar: any) => {
  const formData = new FormData();
  formData.append("file", avatar);
  const res = await axios_instance({
    url: "/user/updateProfile",
    method: "POST",
    data: qs.stringify(newProfile),
  });

  const ava_res = await axios_file_instance({
    url: "/user/uploadUserImage",
    method: "POST",
    data: formData,
  });
};

export const changePassword = async (newPwd: any) => {
  const res = await axios_instance({
    url: "/v1/evovor/change-password",
    method: "POST",
    data: qs.stringify({ password: newPwd }),
  });
  return res.data;
};

export const getOrderInfo = async (type: number, id: number) => {
  const res = await axios_instance({
    url: "/user/order/getOrderList/" + type + "/" + id,
    method: "GET",
  });

  return res.data.userOrders;
};

export const getUserOrderInfoByAdmin = async (id: any) => {
  const res = await axios_instance({
    url: "/user/admin/user/getOrderList/" + id,
    method: "GET",
  });

  return res.data.userOrders;
};

export const addOrderInfo = async (data: any) => {
  const res = await axios_instance({
    url: "/user/order/addOrderInfo",
    method: "POST",
    data: qs.stringify(data),
  });

  return res.data.success;
};

export const getUserCompanies = async () => {
  const res = await axios_instance({
    url: "user/getUserCompanyInfo",
    method: "GET",
  });

  return res.data.userCompanies;
};
