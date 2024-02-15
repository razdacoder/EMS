import axios from "axios";
import { useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineBackward,
  AiOutlinePlus,
} from "react-icons/ai";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Accordion from "./../components/Accordion";
import { CourseType } from "./TimebalePage";

interface DepartmentType {
  id: number;
  name: string;
  slug: string;
}

interface ClassType {
  id: number;
  name: string;
  level: string;
  program: string;
  courses: CourseType[];
}

export interface DepartmentInfoType {
  department: DepartmentType;
  classes: ClassType[];
}

const CoursePage = () => {
  const { slug } = useParams();
  const [department, setDepartment] = useState<DepartmentInfoType>();
  const navigate = useNavigate();

  useEffect(() => {
    const getdepartmentInfo = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/department/${slug}`
      );
      const departmentinfo: DepartmentInfoType = {
        department: response.data?.department,
        classes: [],
      };
      response.data?.classes?.forEach((cls: ClassType) => {
        cls?.courses.forEach((course: CourseType) => {
          const c = {
            id: course.id,
            name: course.name,
            code: course.code,
          };
          cls.courses.push(c);
        });
        departmentinfo.classes.push(cls);
      });
      setDepartment(departmentinfo);
    };
    getdepartmentInfo();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <button
          className=" cursor-pointer"
          onClick={() => navigate("/app/departments", { replace: true })}
        >
          <MdChevronLeft size={30} />
        </button>
        <h2 className="text-black text-title-lg">
          {department?.department.name}
        </h2>
        <button className="inline-flex items-center justify-center gap-2.5 rounded-md bg-success py-3 px-6 text-center font-medium text-white hover:bg-opacity-90">
          <AiOutlinePlus />
          Add New
        </button>
      </div>
      <div className="mt-6">
        {department?.classes.map((cls) => (
          <Accordion
            key={cls.id}
            id={cls.id}
            name={cls.name}
            courses={cls.courses}
            level={cls.level}
            program={cls.level}
          />
        ))}
      </div>

      <div></div>
    </div>
  );
};

export default CoursePage;
