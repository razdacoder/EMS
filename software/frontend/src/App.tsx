import { Route, Routes } from "react-router-dom";
import ErrorPage from "./error_page";
import CoursePage from "./pages/CoursePage";
import DashBoardPage from "./pages/DashBoardPage";
import DepartmentPage from "./pages/DepartmentPage";
import DistributionPage from "./pages/DistributionPage";
import HallPage from "./pages/HallsPage";
import Home from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./pages/RequireAuth";
import TimetablePage from "./pages/TimebalePage";
import DashBoardLayout from "./pages/layout2";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/app" element={<DashBoardLayout />}>
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/departments" element={<DepartmentPage />}>
          <Route path=":slug/" element={<CoursePage />} />
        </Route>
        <Route path="/halls" element={<HallPage />} />
        <Route path="/timetable" element={<TimetablePage />} />
        <Route path="/distribution" element={<DistributionPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
