import axios from "axios";
import { compareAsc, format } from "date-fns";
import { useEffect, useState } from "react";
import {
  AiOutlineCalendar,
  AiOutlineExport,
  AiOutlineFieldTime,
  AiOutlineFilter,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import Loader from "../common/Loader";

interface DistributionHallType {
  id: number;
  name: string;
  working_capacity: number;
}

interface DistributionCourseType {
  code: string;
}

interface DistributionClassType {
  name: string;
}

interface DistributionScheduleType {
  id: number;
  course: DistributionCourseType;
  classe: DistributionClassType;
}

interface DistributionItemsType {
  id: number;
  no_of_students: number;
  schedule: DistributionScheduleType;
}

interface DistributionType {
  id: number;
  day: string;
  period: string;
  hall: DistributionHallType;
  items: DistributionItemsType[];
}

const DistributionPage = () => {
  const [distributions, setDistribution] = useState<DistributionType[]>([]);
  const [dates, setDates] = useState<Record<string, string>[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [loading, setLoading] = useState(false);
  const getDistribution = async (date: string, period: string) => {
    setLoading(true);
    const response = await axios.get<DistributionType[]>(
      `http://127.0.0.1:8000/api/v1/distribution/${date}/${period}/`
    );
    setDistribution(response.data);
    setLoading(false);
  };

  const getDates = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/v1/dates");
    setDates(response.data);
  };

  const filterDistributions = async () => {
    setLoading(true);
    if (selectedDate === "any" || selectedPeriod === "any") {
      window.alert("Please select a day and period!!");
      return;
    }
    await getDistribution(selectedDate, selectedPeriod);
    setLoading(false);
  };

  const createDistribution = async () => {
    setLoading(true);
    if (selectedDate === "any" || selectedPeriod === "any") {
      window.alert("Please select a day and period!!");
      return;
    }
    const response = await axios.get(
      `http://127.0.0.1:8000/api/v1/distribute/${selectedDate}/${selectedPeriod}/`
    );
    if (response.status == 201) {
      await getDistribution(selectedDate, selectedPeriod);
    }
    setLoading(false);
  };

  const TdStyle = {
    ThStyle: `w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-medium text-white lg:py-7 lg:px-4`,
    TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-white dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium`,
  };

  useEffect(() => {
    getDates();
  }, []);
  return (
    <main className="w-full h-full flex flex-col gap-y-3 bg-white p-4 shadow-sm">
      <div className="flex justify-between items-center shadow-sm pb-3">
        <h2 className="text-black text-lg">Hall Distribution</h2>
        <div className="flex gap-x-3 items-center">
          <div className="relative z-20 bg-white dark:bg-form-input">
            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
              <AiOutlineCalendar />
            </span>
            <select
              onChange={(e) => setSelectedDate(e.target.value)}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-success active:border-success dark:border-form-strokedark dark:bg-form-input"
            >
              <option value={"any"}>Select a date</option>
              {dates.map((day, index) => (
                <option key={day.day} value={day.day}>
                  {format(
                    new Date(
                      parseInt(day.day.split("-")[2]) - 1,
                      parseInt(day.day.split("-")[1]) - 1,
                      parseInt(day.day.split("-")[0]) - 1
                    ),
                    "E do LLL, Y"
                  )}
                </option>
              ))}
            </select>
          </div>
          <div className="relative z-20 bg-white">
            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
              <AiOutlineFieldTime />
            </span>
            <select
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-success active:border-success dark:border-form-strokedark dark:bg-form-input"
            >
              <option value={"any"}>Select a period</option>
              <option value={"AM"}>AM</option>
              <option value={"PM"}>PM</option>
            </select>
          </div>
          <div className="relative z-20">
            <button
              onClick={filterDistributions}
              className="bg-success p-3 rounded-md"
            >
              <AiOutlineFilter className="text-white" fontSize={22} />
            </button>
          </div>
          <div className="relative z-20">
            <button
              onClick={createDistribution}
              className="bg-success p-3 rounded-md"
            >
              <AiOutlineSetting className="text-white" fontSize={22} />
            </button>
          </div>
          <div className="relative z-20">
            <button
              // onClick={createDistribution}
              className="bg-success p-3 rounded-md"
            >
              <AiOutlineExport className="text-white" fontSize={22} />
            </button>
          </div>
        </div>
      </div>
      <div className="h-full overflow-y-scroll">
        {loading && <Loader />}
        {distributions?.length > 0 || loading == false ? (
          <div className="relative overflow-x-auto mt-6">
            <table className="w-full table-auto">
              <thead className="text-center bg-success">
                <tr className="py-3">
                  <th scope="col" className={TdStyle.ThStyle}>
                    S/N
                  </th>
                  <th scope="col" className={TdStyle.ThStyle}>
                    Venue
                  </th>
                  <th scope="col" className={TdStyle.ThStyle}>
                    Capacity
                  </th>
                  <th scope="col" className={TdStyle.ThStyle}>
                    Class/Code
                  </th>
                  <th scope="col" className={TdStyle.ThStyle}>
                    No of Students
                  </th>
                </tr>
              </thead>
              <tbody>
                {distributions?.map((distribution, index) => (
                  <tr key={distribution.id} className="">
                    <th scope="row" className={TdStyle.TdStyle}>
                      {index + 1}
                    </th>
                    <td className={TdStyle.TdStyle}>
                      {distribution.hall.name}
                    </td>
                    <td className={TdStyle.TdStyle}>
                      {distribution.hall.working_capacity}
                    </td>
                    <td className="" colSpan={2} scope="col">
                      {distribution.items.map((item, index) => (
                        <tr
                          key={item.id}
                          className="flex justify-between border-l border-r border-b border-[#E8E8E8]"
                        >
                          <td className="w-1/2 text-dark bg-white dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            <p>{`${item.schedule.classe.name} (${item.schedule.course.code})`}</p>
                          </td>
                          <td className="w-1/2 text-dark border-l border-[#E8E8E8]  bg-white dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-5 px-2 text-center text-base font-medium">
                            {item.no_of_students}
                          </td>
                        </tr>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p>No Distributions to show!!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default DistributionPage;
