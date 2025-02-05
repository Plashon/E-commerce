import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Index";
import Cart from "../pages/Cart/Index";
import SignUp from "../components/SignUp";
import ViewProfile from "../pages/ViewProfile";
import Setting from "../pages/Setting";

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
        element: <Cart />,
      },
      {
        path:"/profile",
        element:<ViewProfile/>
      },
      {
        path:"/setting",
        element:<Setting/>
      }
    ],
  },
  {
    path:"/signup",
    element:<SignUp/>
  }
]);

export default router;
