import { createBrowserRouter } from "react-router-dom";
import CoursePage from "../pages/CoursePage";
import DashBoardPage from "../pages/DashBoardPage";
import DepartmentPage from "../pages/DepartmentPage";
import DistributionPage from "../pages/DistributionPage";
import HallPage from "../pages/HallsPage";
import LoginPage from "../pages/LoginPage";
import TimetablePage from "../pages/TimebalePage";
import DashBoardLayout from "../pages/layout2";
import ErrorPage from "./../error_page";
import Home from "./../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login/",
    element: <LoginPage />,
  },
  {
    path: "app/",
    element: <DashBoardLayout />,
    children: [
      {
        path: "dashboard/",
        element: <DashBoardPage />,
      },
      {
        path: "departments/",
        element: <DepartmentPage />,
        children: [{ path: ":slug/", element: <CoursePage /> }],
      },
      {
        path: "halls/",
        element: <HallPage />,
      },
      {
        path: "timetable/",
        element: <TimetablePage />,
      },
      {
        path: "distribution/",
        element: <DistributionPage />,
      },
    ],
  },
]);

export default router;
