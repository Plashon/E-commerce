import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Index";
import Cart from "../pages/Cart/Index";
import ViewProfile from "../pages/ViewProfile";
import Setting from "../pages/Setting";
import UserDetect from "./UserDetect";

import AdminLayout from "../layouts/AdminLayout";
import CreateProduct from "../pages/Admin/CreateProduct";
import Dashborad from "../pages/Admin/Dashborad";
import ManageOrders from "../pages/Admin/ManageOrders";
import ManageItem from "../pages/Admin/ManageItem";
import AllUser from "../pages/Admin/AllUser";
import ProtectAdmin from "../pages/Admin/ProtectAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/cart",
        element: (
          <UserDetect>
            <Cart />
          </UserDetect>
        ),
      },
      {
        path: "/profile",
        element: <ViewProfile />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
    ],
  },
  {
    path: "",
    element: <ProtectAdmin><AdminLayout /></ProtectAdmin>,
    children: [
      {
        path: "dashboard",
        element: <Dashborad />,
      },
      {
        path: "create",
        element: <CreateProduct />,
      },
      {
        path: "manage-orders",
        element: <ManageOrders />,
      },
      {
        path: "manage-product",
        element: <ManageItem />,
      },
      {
        path: "all-user",
        element: <AllUser />,
      },
    ],
  },
]);

export default router;
