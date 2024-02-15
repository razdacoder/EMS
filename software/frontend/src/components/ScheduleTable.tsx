import { compareAsc, format } from "date-fns";
import { ScheduleType } from "../pages/TimebalePage";

interface TableProps {
  schedules: ScheduleType[] | undefined;
}

const ScheduleTable = ({ schedules }: TableProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex px-2 gap-x-12 rounded-sm bg-gray-2 dark:bg-meta-4">
        <div className="py-2.5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">ID</h5>
        </div>
        <div className="py-2.5 ml-2">
          <h5 className="text-sm font-medium uppercase xsm:text-base">CLASS</h5>
        </div>
        <div className="py-2.5 flex-1">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            COURSE TITLE
          </h5>
        </div>
        <div className="py-2.5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            COURSE CODE
          </h5>
        </div>
        <div className="py-2.5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">DATE</h5>
        </div>
        <div className="py-2.5">
          <h5 className="text-sm font-medium uppercase xsm:text-base">
            PERIOD
          </h5>
        </div>
      </div>

      {schedules?.map((schedule) => (
        <div
          key={schedule.id}
          className="flex gap-x-12 border-b border-stroke dark:border-strokedark"
        >
          <div className="flex w-5 items-center py-2.5">
            <p className="text-black text-sm dark:text-white">#{schedule.id}</p>
          </div>

          <div className="flex items-center py-2.5 ml-4">
            <p className="text-black text-sm dark:text-white">
              {schedule.class.name}
            </p>
          </div>

          <div className="flex flex-1 items-center py-2.5">
            <p className="text-black text-sm">{schedule.course.name}</p>
          </div>

          <div className="items-center py-2.5">
            <p className="text-black text-sm dark:text-white">
              {schedule.course.code}
            </p>
          </div>

          <div className=" items-center py-2.5">
            <p className="text-black text-sm">
              {/* {format(
                new Date(
                  parseInt(schedule.day.split("-")[2]),
                  parseInt(schedule.day.split("-")[1]),
                  parseInt(schedule.day.split("-")[0])
                ),
                "E do LLL, Y"
              )} */}
              {schedule.day}
            </p>
          </div>
          <div className=" items-center justify-center py-2.5">
            <p className="text-black text-sm">{schedule.period}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleTable;
