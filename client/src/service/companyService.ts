import axios_instance from "../components/api/api_instance";
import qs from "qs";

export const getCompanyInfo = async () => {
  const res = await axios_instance({
    url: "user/company/getCompanyInfo",
    method: "GET",
  });

  return res.data.data;
};

export const addNewCompanyByAdmin = async (company: any) => {
  const res = await axios_instance({
    url: "user/company/addCompany",
    method: "POST",
    data: qs.stringify(company),
  });

  return res.data.success;
};

export const deleteCompanyByAdmin = async (company_id: any) => {
  const res = await axios_instance({
    url: "user/admin/company/deleteCompany/" + company_id,
    method: "DELETE",
  });

  return res.data.success;
};

export const getCompanyEditInfo = async (id: any) => {
  const res = await axios_instance({
    url: "user/admin/company/findEditInfo/" + id,
    method: "GET",
  });

  return res.data.company;
};

export const updateCompanySettings = async (updated: any, id: any) => {
  const res = await axios_instance({
    url: "user/admin/company/updateCompany/" + id,
    method: "POST",
    data: qs.stringify(updated),
  });

  return res.data.success;
};

// service company edit service

export const addAssetSkusTo = async (skus: any, type: any, id: any) => {
  const res = await axios_instance({
    url: "user/admin/giveAssetSkus/" + type + "/" + id,
    method: "POST",
    data: qs.stringify({ assetSkus: skus }),
  });

  return res.data;
};
