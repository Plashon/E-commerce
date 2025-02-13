import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Index";
import Cart from "../pages/Cart/Index";
import ViewProfile from "../pages/ViewProfile";
import Setting from "../pages/Setting";
import UserDetect from "./UserDetect";
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
]);

export default router;
