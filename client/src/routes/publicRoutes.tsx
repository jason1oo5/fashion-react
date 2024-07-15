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
      fallback={<LoadingScreen isDashboard={pathname.includes("dashboard")} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function PublicRoutes() {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to="/dashboard/marketplace/product-store" />,
    },
    {
      path: "/dashboard",
      element: <MainLayout />,
      children: [
        {
          path: "marketplace",
          element: <MarketPlace />,
          children: [
            { path: "product-store", element: <ProductStore /> },
            {
              path: "product-view/:product_id",
              element: <ProductView />,
            },
          ],
        },
        { path: "tutorials", element: <Tutorials /> },
        { path: "download", element: <Download /> },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "reset-password",
      element: <ResetPassword />,
    },
    {
      path: "verify",
      element: <Verify />,
    },
  ]);
}

// MainLayout
const MainLayout = Loadable(lazy(() => import("../layouts/index")));

const MarketPlace = Loadable(
  lazy(() => import("../pages/dashboard/marketplace/index"))
);
const Tutorials = Loadable(
  lazy(() => import("../pages/dashboard/tutorials/index"))
);
const Download = Loadable(
  lazy(() => import("../pages/dashboard/download/index"))
);
const ProductStore = Loadable(
  lazy(() => import("../pages/dashboard/marketplace/product-store"))
);
const ProductView = Loadable(
  lazy(() => import("../pages/dashboard/marketplace/product-view"))
);

const Login = Loadable(lazy(() => import("../pages/auth/login")));
const Register = Loadable(lazy(() => import("../pages/auth/register")));
const ForgotPassword = Loadable(
  lazy(() => import("../pages/auth/forgot-password"))
);
const ResetPassword = Loadable(
  lazy(() => import("../pages/auth/reset-password"))
);
const Verify = Loadable(lazy(() => import("../pages/auth/verify")));
