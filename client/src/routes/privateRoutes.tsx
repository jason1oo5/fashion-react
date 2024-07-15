import { ElementType, lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreeen";

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { pathname } = useLocation();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const location = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={true} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function PrivateRoutes() {
  return useRoutes([
    {
      path: "/user",
      element: <MainLayout />,
      children: [
        {
          path: "myAccount",
          element: <Account />,
          children: [
            {
              path: "profile",
              element: <Profile />,
              index: true,
            },
            {
              path: "authentication",
              element: <Authentication />,
            },
            {
              path: "company",
              element: <Company />,
            },
            {
              path: "referral",
              element: <Referral />,
            },
            {
              path: "evoFashion",
              element: <EvoFashionDetail />,
            },
            {
              path: "request-cashout",
              element: <RequestCashout />,
            },
          ],
        },
        {
          path: "myProducts",
          element: <Publishes />,
          children: [
            {
              path: "published",
              element: <MyProduct />,
              index: true,
            },
            {
              path: "editProduct/:product_id",
              element: <ProductEdit />,
              index: true,
            },
          ],
        },
        {
          path: "myOrdersHistory",
          element: <OrderHistory />,
          index: true,
        },
        {
          path: "myFavourites",
          element: <FavoriteProduct />,
          index: true,
        },
        {
          path: "myPurchased-products",
          element: <PurchasedProduct />,
          index: true,
        },
        {
          path: "shop",
          element: <Shop />,
          index: true,
        },
      ],
    },
    {
      path: "/payment",
      element: <Navigate to="dashboard/payment" replace />,
    },
    // {
    //     path: '*',
    //     element: <Navigate to="/" replace />
    // }
  ]);
}

// MainLayout
const MainLayout = Loadable(lazy(() => import("../layouts/index")));

const Account = Loadable(lazy(() => import("../pages/user/account/index")));
const Profile = Loadable(lazy(() => import("../pages/user/account/profile")));
const Authentication = Loadable(
  lazy(() => import("../pages/user/account/authentication"))
);
const Company = Loadable(lazy(() => import("../pages/user/account/company")));
const Referral = Loadable(lazy(() => import("../pages/user/account/referral")));
const RequestCashout = Loadable(
  lazy(() => import("../pages/user/account/cashout"))
);
const EvoFashionDetail = Loadable(
  lazy(() => import("../pages/user/account/evoFashion/index"))
);

const Publishes = Loadable(lazy(() => import("../pages/user/publishes/index")));
const ProductEdit = Loadable(
  lazy(() => import("../pages/user/publishes/editProduct"))
);
const MyProduct = Loadable(
  lazy(() => import("../pages/user/publishes/myProduct"))
);
const OrderHistory = Loadable(
  lazy(() => import("../pages/user/orders-history/index"))
);
const FavoriteProduct = Loadable(
  lazy(() => import("../pages/user/favorites/index"))
);
const PurchasedProduct = Loadable(
  lazy(() => import("../pages/user/purchased/index"))
);

const Shop = Loadable(lazy(() => import("../pages/shop/index")));
