import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import HallTable from "../components/HallTable";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../store";

type HallType = {
  id: number;
  name: string;
  capacity: number;
  hall_type: "Large" | "Small" | "medium";
};

const HallPage = () => {
  const [loading, setLoading] = useState(false);
  const [halls, setHalls] = useState<HallType[]>();
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state: RootState) => state.app.modal);
  useEffect(() => {
    const getHalls = async () => {
      setLoading(true);
      const halls = await axios.get("http://127.0.0.1:8000/api/v1/halls/");
      setHalls(halls.data);
    };
    getHalls();
    setLoading(false);
  }, []);

  return (
    <main className="w-full h-full flex flex-col gap-y-3 bg-white p-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-black text-lg">Hall ({halls?.length})</h2>
        <button className="inline-flex items-center justify-center gap-2.5 rounded-md bg-success py-3 px-6 text-center font-medium text-white hover:bg-opacity-90">
          <AiOutlinePlus />
          Add New
        </button>
      </div>
      <div className="mt-4">
        <HallTable halls={halls} />
      </div>
    </main>
  );
};

export default HallPage;
