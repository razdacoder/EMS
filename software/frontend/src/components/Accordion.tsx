import classNames from "classnames";
import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { CourseType } from "../pages/TimebalePage";

interface ClassType {
  id: number;
  name: string;
  level: string;
  program: string;
  courses: CourseType[];
}

const Accordion = ({ id, name, level, program, courses }: ClassType) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      <input
        id="expandCollapse"
        checked={open}
        type="checkbox"
        className="peer sr-only"
      />
      <label
        htmlFor="expandCollapse"
        className={classNames(
          "w-full flex justify-between items-center bg-blue-100",
          "hover:bg-blue-500",
          "transition-colors duration-1000 ease-in-out",

          "text-xl font-semibold rounded-sm border border-stroke text-black bg-white shadow-default p-4 mb-4"
        )}
        onClick={() => setOpen(!open)}
      >
        <h3>{name}</h3>
        {open ? <MdArrowDropUp /> : <MdArrowDropDown />}
      </label>
      <div
        className={classNames(
          " h-0 bg-slate-300",
          "peer-checked:h-full",
          "transition-[height] duration-1000 ease-in-out "
        )}
      >
        {open ? (
          <div className="px-4">
            {courses.map((course) => (
              <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                <div className="col-span-1 flex items-center">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {course.code}
                  </div>
                </div>
                <div className="col-span-5 hidden items-center sm:flex">
                  <p className="text-sm text-black dark:text-white">
                    {course.name}
                  </p>
                </div>
                <button>
                  <AiOutlineEdit />
                </button>
                <button>
                  <AiOutlineDelete />
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Accordion;
