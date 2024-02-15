import ReactPDF, { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import {
  AiOutlineExport,
  AiOutlineHome,
  AiOutlineSetting,
} from "react-icons/ai";
import { Datatable, initTE } from "tw-elements";
import Loader from "../common/Loader";
import ScheduleTable from "../components/ScheduleTable";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../store";
import MyDocument from "./../components/TimeTableDoc";
import { DepartmentType } from "./DepartmentPage";

initTE({ Datatable });

export interface CourseType {
  id: number;
  name: string;
  code: string;
}

export interface ClassType {
  id: number;
  name: string;
}

export interface ScheduleType {
  id: number;
  day: string;
  period: string;
  course: CourseType;
  class: ClassType;
}

const TimetablePage = () => {
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);

  useEffect(() => {
    const getSchedules = async () => {
      setLoading(true);
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/schedules/CS/"
      );
      const schedule: ScheduleType[] = [];

      response.data?.forEach((item: any) => {
        const sc = {
          id: item.id,
          day: item.day,
          period: item.period,
          course: {
            id: item.course.id,
            name: item.course.name,
            code: item.course.code,
          },
          class: {
            id: item.classe.id,
            name: item.classe.name,
          },
        };
        schedule.push(sc);
      });
      setLoading(false);
      setSchedules(schedule);
    };

    getSchedules();
  }, []);

  const [departments, setDepartments] = useState<DepartmentType[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDepartments = async () => {
      const response = await axios.get<DepartmentType[]>(
        "http://127.0.0.1:8000/api/v1/departments/"
      );
      setDepartments(response.data);
    };

    getDepartments();
  }, []);

  const dispatch = useAppDispatch();
  const modal = useAppSelector((state: RootState) => state.app.modal);

  const onDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const getSchedules = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/schedules/${e.target.value}/`
      );
      const schedule: ScheduleType[] = [];

      response.data?.forEach((item: any) => {
        const sc = {
          id: item.id,
          day: item.day,
          period: item.period,
          course: {
            id: item.course.id,
            name: item.course.name,
            code: item.course.code,
          },
          class: {
            id: item.classe.id,
            name: item.classe.name,
          },
        };
        schedule.push(sc);
      });
      setSchedules(schedule);
    };

    getSchedules();
  };

  return (
    <main className="w-full h-full flex flex-col gap-y-3 bg-white p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-black text-lg">Schedules</h2>
        <div className="flex gap-x-3 items-center">
          <div className="rounded-sm ">
            <div className="flex flex-col gap-5.5 p-6.5">
              <div className="flex gap-x-2 items-center">
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                    <AiOutlineHome />
                  </span>
                  <select
                    onChange={onDepartmentChange}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-success active:border-success dark:border-form-strokedark dark:bg-form-input"
                  >
                    {departments?.map((department) => (
                      <option key={department.id} value={department.slug}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                  <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button className="inline-flex items-center justify-center gap-2.5 rounded-md bg-success py-3 px-6 text-center font-medium text-white hover:bg-opacity-90">
            <AiOutlineExport />
            Export
          </button>
          <button className="inline-flex items-center justify-center gap-2.5 rounded-md bg-success py-3 px-6 text-center font-medium text-white hover:bg-opacity-90">
            <AiOutlineSetting />
            Generate New
          </button>
        </div>
      </div>
      <div className="mt-6">
        {loading ? <Loader /> : <ScheduleTable schedules={schedules} />}
      </div>
    </main>
  );
};

export default TimetablePage;
