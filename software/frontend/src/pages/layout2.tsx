import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";

export default function DashBoardLayout() {
  const auth = useAppSelector((state: RootState) => state.auth.token);

  if (!auth) {
    return <Navigate to={"/login"} replace />;
  }
  return (
    <main className="w-full h-screen">
      {/* <Navbar /> */}
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen setSidebarOpen={() => {}} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Navbar sidebarOpen setSidebarOpen={() => {}} />
          <main className="w-full p-4 h-full">
            <Outlet />
          </main>
        </div>
      </div>
    </main>
  );
}
