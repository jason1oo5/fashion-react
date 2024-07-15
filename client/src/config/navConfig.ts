import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import KeyboardOptionKeyRoundedIcon from "@mui/icons-material/KeyboardOptionKeyRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PixOutlinedIcon from "@mui/icons-material/PixOutlined";
import AutoAwesomeMotionRoundedIcon from "@mui/icons-material/AutoAwesomeMotionRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";

export const NavItems = [
  {
    btn: "All",
    id: "all-btn",
    menu: [],
  },
  {
    btn: "Shirt",
    id: "shirt-btn",
    menu: [],
  },
  {
    btn: "Dresses",
    id: "dress-btn",
    menu: [],
  },
  {
    btn: "Fabrics",
    id: "fabrics-btn",
    menu: [],
  },
  {
    btn: "Garments",
    id: "garments-btn",
    menu: [],
  },
  {
    btn: "Models",
    id: "models-btn",
    menu: [],
  }
];

export const UserMenuItems = [
  {
    title: "my_account",
    link: "/user/myAccount/profile",
  },
  {
    title: "my_publishes",
    link: "/user/myProducts/published",
  },
  {
    title: "orders_history",
    link: "/user/myOrdersHistory",
  },
  {
    title: "my_favorite",
    link: "/user/myFavourites",
  },
  {
    title: "purchased_products",
    link: "/user/myPurchased-products",
  },
];

export const SortTypes = ["posting_date", "title", "price", "popular"];

export const PerPageList = [20, 40, 80];

export const AccountMenu = [
  {
    title: "User_Profile",
    action: "profile",
  },
  {
    title: "Authentication",
    action: "authentication",
  },
  {
    title: "My_Companies",
    action: "company",
  },
  {
    title: "Referral",
    action: "referral",
  },
];

export const RelatedEvoMenu = [
  {
    title: "EvoFashion",
    action: "evoFashion",
  },
  {
    title: "EvoExpo",
    action: "authentication",
  },
  {
    title: "Evokit",
    action: "company",
  },
];

export const ProfileList = [
  {
    title: "Email",
    content: [],
  },
  {
    title: "Roles",
    content: ["super admin", "owner", "editor", "fashion publisher"],
  },
  {
    title: "Company",
    content: [],
  },
  {
    title: "Locale",
    content: ["English", "Chinese", "Japanese"],
  },
  {
    title: "Password",
    content: [],
  },
  {
    title: "Display name",
    content: [],
  },
];

export const Gender = ["Male", "Female", "Rather not say"];
export const Locale = ["en", "ch", "ja"];
export const UserStatus = ["Unverified", "Active", "Suspended"];

export const AccountHeaderContent = [
  {
    index: 1,
    title: "User_Profile",
    detail: "Let us know you more to provide better service",
    btn: "Save_Profile",
  },
  {
    index: 2,
    title: "pwd_social_account_bindings",
    detail: "change_pwd_quick_social_account_bindings",
    btn: "",
  },
  {
    index: 3,
    title: "My_companies",
    detail: "Detail",
    btn: "Add_Company",
  },
  {
    index: 4,
    title: "Referrals",
    detail: "Detail",
    btn: "",
  },
  {
    index: 5,
    title: "Evo_Fashion",
    detail: "Detail",
    btn: "",
  },
];

export const CompanyConfig = [
  "Name",
  "Multiplier",
  "Company admin",
  "Company users",
];

export const ReferralConfig = ["Referral_Link", "Reward", "Statistics"];
export const CashoutConfig = ["Note", "Amount", "Payment Account"];

export const ProductConfig = [
  "Title",
  "SKU",
  "Asset SKUs",
  "Price",
  "Category",
  "Publisher",
  "Labels",
  "Description",
  "Editor's Pick",
  "Platform",
  "Public",
];

export const AdminPanelConfig = [
  {
    title: "SERVER SYSTEMS",
    listItem: [
      {
        name: "DevOps",
        icon: LayersRoundedIcon,
        subItem: [
          { subName: "Server Jobs", action: "manageUserRole" },
          { subName: "UI Translations", action: "/translationManager" },
        ],
      },
      {
        name: "Dev Services",
        icon: KeyboardOptionKeyRoundedIcon,
        subItem: [
          { subName: "Shortlinks", action: "manageUserRole" },
          { subName: "App Data Sets", action: "manageAppDataSet" },
          { subName: "User Data Sets", action: "manageUserDataSet" },
        ],
      },
    ],
  },
  {
    title: "OPERATIONS",
    listItem: [
      {
        name: "Account Management",
        icon: PersonRoundedIcon,
        subItem: [
          { subName: "User Roles", action: "manageUserRole" },
          { subName: "Users", action: "manageUser" },
          { subName: "Permissions", action: "managePermission" },
          { subName: "Companies", action: "manageCompany" },
          { subName: "Cash Out", action: "manageCashOut" },
        ],
      },
      {
        name: "Settings",
        icon: SettingsRoundedIcon,
        subItem: [
          { subName: "Credits", action: "manageCredit" },
          { subName: "Licenses", action: "manageLicense" },
          { subName: "In-App SKUs", action: "manageAppSku" },
          { subName: "Referral System", action: "manageReferralSystem" },
        ],
      },
    ],
  },
  {
    title: "APPLICATIONS",
    listItem: [
      {
        name: "Fashion",
        icon: PixOutlinedIcon,
        subItem: [
          { subName: "Settings", action: "manageFahionSetting" },
          { subName: "Promotions", action: "manageUser" },
          { subName: "Announcements", action: "managePermission" },
          { subName: "Tutorials", action: "manageTutorial" },
          { subName: "Showcase", action: "manageShowcase" },
          { subName: "Testbed", action: "manageCashOut" },
        ],
      },
      {
        name: "Expo",
        icon: AutoAwesomeMotionRoundedIcon,
        subItem: [
          { subName: "Settings", action: "manageCredit" },
          { subName: "Site List", action: "manageLicense" },
          { subName: "Anouncements", action: "manageAppSku" },
          { subName: "Tutorials", action: "manageReferralSystem" },
        ],
      },
      {
        name: "Kit",
        icon: GridViewRoundedIcon,
        subItem: [
          { subName: "Dictionary", action: "manageCredit" },
          { subName: "Forum", action: "manageLicense" },
        ],
      },
    ],
  },
];

export const DownloadUrls = {
  "etoron.com":
    "https://oss.etoron.com/etoron/evofashion/installer/evofashion_installer.exe",
  "evovor.com":
    "https://oss.evovor.com/file/evoweb/evovor/evofashion/installer/evofashion_installer.exe",
  "devovor.com":
    "https://oss.devovor.com/file/evoweb/devovor/evofashion/installer/evofashion_installer.exe",
  "evoauth.personal":
    "https://oss.devovor.com/file/evoweb/devovor/evofashion/installer/evofashion_installer.exe",
};
