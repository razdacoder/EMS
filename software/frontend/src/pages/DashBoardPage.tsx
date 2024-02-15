import axios from "axios";
import { useEffect, useState } from "react";
import { FaBook, FaHome, FaLandmark, FaUsers } from "react-icons/fa";
import Button from "../components/Button";
import Card from "../components/Card";
import Navbar from "../components/Navbar";

interface Stat {
  courses: number;
  halls: number;
  departments: number;
  classes: number;
}
const DashBoardPage = () => {
  const [stats, setStats] = useState<Stat>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getStats = async () => {
      setLoading(true);
      const statistics = await axios.get<Stat>(
        "http://127.0.0.1:8000/api/v1/statistics/"
      );
      setStats(statistics.data);
    };
    getStats();
    setLoading(false);
  }, []);
  return (
    <main className=" w-full flex flex-col gap-y-6 h-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <Card num={stats?.courses} title="Courses">
          <FaBook fontSize={46} className="text-gray-200" />
        </Card>
        <Card num={stats?.departments} title="Departments">
          <FaHome fontSize={46} className="text-gray-200" />
        </Card>
        <Card num={stats?.classes} title="Classes">
          <FaUsers fontSize={46} className="text-gray-200" />
        </Card>
        <Card num={stats?.halls} title="Halls">
          <FaLandmark fontSize={46} className="text-gray-200" />
        </Card>
      </div>
      {/* <div className="bg-green h-3/4 w-full bg-white px-10 py-5">
        <form className="w-1/2">
          <h3 className="text-2xl mb-3">Generate Examination Schedule</h3>
          <div>
            <label className="mb-3" htmlFor="semester">
              Semester
            </label>
            <select
              name=""
              id="semester"
              className="w-full p-3 rounded mb-5 outline-none bg-white"
            >
              <option value="">Choose a semester</option>
              <option value="first">First Semester</option>
              <option value="second">Second Semester</option>
            </select>
            <div>
              <div>
                <label className="mb-3" htmlFor="sdate">
                  Start Date
                </label>
                <input
                  type="date"
                  id="sdate"
                  placeholder="Start Date"
                  className="w-full p-3 rounded mb-5 outline-none"
                />
              </div>
              <div>
                <label className="mb-3" htmlFor="edate">
                  End Date
                </label>
                <input
                  type="date"
                  id="edate"
                  placeholder="End Date"
                  className="w-full p-3 rounded mb-5 outline-none"
                />
              </div>
            </div>
            <button className="w-full p-3 rounded mb-5 outline-none bg-green-900 text-white">
              Generate Schedule
            </button>
          </div>
        </form>
      </div> */}
    </main>
  );
};

export default DashBoardPage;
