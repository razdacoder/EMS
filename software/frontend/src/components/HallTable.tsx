import BrandOne from "../images/brand/brand-01.svg";
import BrandTwo from "../images/brand/brand-02.svg";
import BrandThree from "../images/brand/brand-03.svg";
import BrandFour from "../images/brand/brand-04.svg";
import BrandFive from "../images/brand/brand-05.svg";

type HallType = {
  id: number;
  name: string;
  capacity: number;
  hall_type: "Large" | "Small" | "medium";
};

interface TableProps {
  halls: HallType[] | undefined;
}

const HallTable = ({ halls }: TableProps) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-semibold text-black uppercase xsm:text-base">
              ID
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-semibold text-black uppercase xsm:text-base">
              HALL NAME
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-semibold text-black uppercase xsm:text-base">
              HALL TYPE
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-semibold text-black uppercase xsm:text-base">
              HALL SIZE
            </h5>
          </div>
        </div>

        {halls?.map((hall) => (
          <div
            key={hall.id}
            className="grid grid-cols-4 border-b border-stroke dark:border-strokedark "
          >
            <span className="flex-shrink-0 uppercase text-black pl-5">
              #{hall.id}
            </span>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black uppercase dark:text-white">
                {hall.name}
              </p>
            </div>
            <div className="flex items-center uppercase justify-center p-2.5 xl:p-5">
              <p className="text-black">{hall.hall_type}</p>
            </div>
            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black uppercase dark:text-white">
                {hall.capacity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HallTable;
