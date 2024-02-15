import { Link, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";

export default function Home() {
  const auth = useAppSelector((state: RootState) => state.auth.token);

  if (auth) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return (
    <main className="w-full bg-white h-screen flex flex-col gap-y-6 justify-center items-center">
      <img src={"/logo.jpeg"} width={200} height={200} alt="FPI LOGO" />
      <h2 className="text-4xl font-bold">Examination Management System</h2>
      <p>For the automation the examination time table scheduling</p>

      <Link
        className="bg-green-900 px-12 text-center rounded cursor-pointer py-3 text-white"
        to="/login"
      >
        Get Started
      </Link>
    </main>
  );
}
