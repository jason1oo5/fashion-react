import axios_instance, {
  axios_file_instance,
} from "../../components/api/api_instance";

export const getShowcase = async (type: string) => {
  const res = await axios_instance({
    url: "/public/showcase/getShowcase/" + type,
    method: "GET",
  });

  return res.data.showCase;
};

export const addShowcase = async (newShowcase: any) => {
  const res = await axios_file_instance({
    url: "/user/admin/showcase/add",
    method: "POST",
    data: newShowcase,
  });

  return res.data.success;
};

export const deleteShowcase = async (showcase_id: string) => {
  const res = await axios_instance({
    url: "/user/admin/showcase/delete/" + showcase_id,
    method: "DELETE",
  });

  return res.data.success;
};
