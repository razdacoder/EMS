import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import DepartmentTable from "../components/DepartmentTable";
import { useAppDispatch, useAppSelector } from "../hooks";
import { toogleModal } from "../slices/appSlice";
import { RootState } from "../store";
import CoursePage from "./CoursePage";

export interface DepartmentType {
  id: number;
  name: string;
  slug: string;
}
const DepartmentPage = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { pathname } = location;
  const modal = useAppSelector((state: RootState) => state.app.modal);
  const [departments, setDepartments] = useState<DepartmentType[]>();

  useEffect(() => {
    const getDepartments = async () => {
      const response = await axios.get<DepartmentType[]>(
        "http://127.0.0.1:8000/api/v1/departments/"
      );
      setDepartments(response.data);
    };

    getDepartments();
  }, []);

  return (
    <main className="w-full h-full flex flex-col gap-y-3 bg-white p-4 shadow-sm">
      {pathname.endsWith("departments") ? (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-black text-lg">
              Departments ({departments?.length})
            </h2>
            <button className="inline-flex items-center justify-center gap-2.5 rounded-md bg-success py-3 px-6 text-center font-medium text-white hover:bg-opacity-90">
              <AiOutlinePlus />
              Add New
            </button>
          </div>
          <div className="mt-4">
            <DepartmentTable departments={departments} />
          </div>{" "}
        </>
      ) : (
        <CoursePage />
      )}
    </main>
  );
};

export default DepartmentPage;
