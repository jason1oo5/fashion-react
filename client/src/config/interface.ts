interface InputReg {
  min?: number;
  max?: number;
}
export interface Validation_data {
  input: any;
  type: string;
  inputReg: InputReg;
}

export interface IUserContext {
  email: string;
  token: string;
  name: string;
  role: number;
  avatar: string;
}

export type UserContextType = {
  user: IUserContext;
  updateContextUser: (newUser: IUserContext) => void;
};

export type QuestionType = {
  user?: string;
  title: string;
  content: string;
  product_id?: number;
};

export type ReviewType = {
  user?: string;
  feedback: string;
  product_id?: number;
};

export type ProductOpinionType = {
  reviews: ReviewType[];
  questions: QuestionType[];
};

export type LocaleType = {
  _id?: string;
  locale: string;
  locale_name: string;
};

export type CompanyType = {
  _id?: string;
  id: number;
  name: string;
  multiplier: number;
  business_id: string;
  status: number;
};

export interface UserCompanyType {
  _id: number;
  apply_roles: string;
  admin: number;
  company: CompanyType[];
}

export type AccountStateType = {
  accountType: number;
  companyIdx?: number;
};

export type AccountType = {
  user: IUserContext;
  company: UserCompanyType[];
  accountState: AccountStateType;
};

export type S3AuthType = {
  s3ApiUrl: string;
  authorizationToken: string;
};

export interface ConfigType {
  productCategoryList: Array<string>;
  platformList: Array<string>;
  fashionTagList: Array<string>;
  assetSkusList: Array<string>;
  s3Auth: S3AuthType;
  appUserList: Array<string>;
}
