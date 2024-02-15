interface DepartmentType {
  id: number;
  name: string;
  slug: string;
}
import {
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineFolderView,
} from "react-icons/ai";
import { MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";

interface TableProps {
  departments: DepartmentType[] | undefined;
}

const DepartmentTable = ({ departments }: TableProps) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-semibold text-black  dark:text-white xl:pl-11">
                ID
              </th>
              <th className="min-w-[150px] uppercase py-4 px-4 font-semibold text-black dark:text-white">
                Department Name
              </th>
              <th className="min-w-[120px] uppercase py-4 px-4 font-semibold text-black dark:text-white">
                Slug
              </th>
              <th className="py-4 px-4 uppercase font-semibold text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {departments?.map((department) => (
              <tr key={department.id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    #{department.id}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {department.name}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-sm font-medium text-success">
                    {department.slug}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex justify-end space-x-3.5">
                    <Link
                      to={`/app/departments/${department.slug}/`}
                      className="hover:text-success"
                    >
                      <MdChevronRight size={28} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentTable;
