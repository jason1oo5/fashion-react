import axios_instance from "../components/api/api_instance";
import qs from "qs";

export const login = async (email: string, password: string) => {
  const dataToSend = {
    email: email,
    password: password,
  };

  await axios_instance({
    url: "/v1/evovor/login",
    method: "POST",
    data: qs.stringify(dataToSend),
  }).then((res) => {
    const token = res.data.token;
    const username = res.data.user.name;
    if (token) {
      localStorage.setItem(
        "user",
        JSON.stringify({ token: token, name: username })
      );
    }
    return res.data;
  });
};

export const register = async (dataToSend: any) => {
  await axios_instance({
    url: "/v1/evovor/register",
    method: "POST",
    data: qs.stringify(dataToSend),
  }).then((res) => {
    // toast.success("Successfully created your account");
    // navigate('/login');
    return res.data;
  });
};

export const isAuthenticated = async () => {
  const c_user: any = localStorage.getItem("user");
  if (!c_user) {
    return null;
  }
  const jsonCUser = JSON.parse(c_user);
  const res = await axios_instance({
    url: "/v1/evovor/getAuthenticatedUserInfo",
    method: "GET",
    headers: {
      token: jsonCUser.token,
    },
  });
  const user = {
    email: res.data.user.email,
    name: jsonCUser.name,
    token: jsonCUser.token,
    role: res.data.user.account_type,
    avatar: res.data.user.avatar,
  };
  return user;
};

export const logout = async () => {
  await axios_instance({
    url: "/v1/evovor/logout",
    method: "GET",
  }).then(() => {
    localStorage.removeItem("user");
    return;
  });
};

export const sendMailResetLink = async (email: string) => {
  await axios_instance({
    url: "/v1/evovor/resetPassword",
    method: "POST",
    data: qs.stringify({ email: email }),
  }).then((res) => {
    return res.data;
  });
};

export const changePassword = async (data: any) => {
  await axios_instance({
    url: "/v1/evovor/update-password",
    method: "POST",
    data: qs.stringify(data),
  }).then((res) => {
    return res.data;
  });
};

export const verifyEmail = async (data: any) => {
  await axios_instance({
    url: `/v1/evovor/verify/${data.email}/${data.vToken}`,
    method: "GET",
  }).then((res) => {
    return res.data;
  });
};
