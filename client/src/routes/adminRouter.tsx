import { ElementType, lazy, Suspense } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreeen";

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const location = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes("admin")} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function AdminRoutes() {
  return useRoutes([
    {
      path: "/admin",
      element: <MainLayout />,
      children: [
        {
          path: "application",
          element: <AdminPage />,
          children: [
            { path: "manageAppDataSet", element: <AppDataSet /> },
            { path: "manageUserDataSet", element: <UserDataSet /> },

            { path: "manageUser", element: <UserManagement /> },
            { path: "manageUserRole", element: <UserRole /> },
            { path: "managePermission", element: <Permission /> },
            { path: "manageCompany", element: <CompanyManagement /> },
            { path: "manageCashOut", element: <CashOut /> },
            { path: "manageAppSku", element: <AppSku /> },
            { path: "manageCredit", element: <Credit /> },
            { path: "manageLicense", element: <License /> },
            { path: "manageReferralSystem", element: <ReferralSystem /> },
            {
              path: "editAccountDetail/:edit_subject/:edit_id",
              element: <EditAccountDetail />,
            },

            { path: "manageTutorial", element: <TutorialManagement /> },
            { path: "manageShowcase", element: <ShowcaseManagement /> },
            { path: "manageFahionSetting", element: <FashionSetting /> },
          ],
        },
      ],
    },
    {
      path: "/translationManager",
      element: <TranslationManager />,
    },
  ]);
}

// MainLayout
const MainLayout = Loadable(lazy(() => import("../layouts/index")));
const AdminPage = Loadable(lazy(() => import("../pages/admin/index")));

const TranslationManager = Loadable(
  lazy(() => import("../pages/admin/system/devOps/translationManager"))
);

const AppDataSet = Loadable(
  lazy(() => import("../pages/admin/system/devService/appDataSet"))
);
const UserDataSet = Loadable(
  lazy(() => import("../pages/admin/system/devService/userDataSet"))
);

const UserManagement = Loadable(
  lazy(
    () => import("../pages/admin/operation/accountManagement/userManagement")
  )
);
const Permission = Loadable(
  lazy(() => import("../pages/admin/operation/accountManagement/permission"))
);
const CompanyManagement = Loadable(
  lazy(
    () => import("../pages/admin/operation/accountManagement/companyManagement")
  )
);
const UserRole = Loadable(
  lazy(() => import("../pages/admin/operation/accountManagement/userRole"))
);
const CashOut = Loadable(
  lazy(() => import("../pages/admin/operation/accountManagement/cashOut"))
);
const EditAccountDetail = Loadable(
  lazy(
    () => import("../pages/admin/operation/accountManagement/editAccountDetail")
  )
);

const AppSku = Loadable(
  lazy(() => import("../pages/admin/operation/setting/appSku"))
);
const Credit = Loadable(
  lazy(() => import("../pages/admin/operation/setting/credit"))
);
const License = Loadable(
  lazy(() => import("../pages/admin/operation/setting/license"))
);
const ReferralSystem = Loadable(
  lazy(() => import("../pages/admin/operation/setting/referralSystem"))
);

const TutorialManagement = Loadable(
  lazy(() => import("../pages/admin/application/fashion/tutorialManagement"))
);

const ShowcaseManagement = Loadable(
  lazy(() => import("../pages/admin/application/fashion/showcaseManagement"))
);

const FashionSetting = Loadable(
  lazy(() => import("../pages/admin/application/fashion/fashionSetting"))
);
