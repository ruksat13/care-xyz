import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ServiceDetail from "../pages/ServiceDetail/ServiceDetail";
import Booking from "../pages/Booking/Booking";
import MyBookings from "../pages/MyBookings/MyBookings";
import NotFound from "../pages/NotFound/NotFound";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/service/:service_id", element: <ServiceDetail /> },
      {
        path: "/booking/:service_id",
        element: <PrivateRoute><Booking /></PrivateRoute>,
      },
      {
        path: "/my-bookings",
        element: <PrivateRoute><MyBookings /></PrivateRoute>,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;