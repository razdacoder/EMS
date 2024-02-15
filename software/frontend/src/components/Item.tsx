import React from "react";

type HallType = {
  id: number;
  name: string;
  capacity: number;
  hall_type: "Large" | "Small" | "medium";
};

const Item = ({ id, name, capacity, hall_type }: HallType) => {
  return (
    <div className="w-full p-3 text-[#333333] bg-gray-300 mt-3 flex">
      <h3 className="w-1/12">{id}</h3>
      <h3 className="w-7/12">{name}</h3>
      <h3 className="w-2/12 uppercase">{hall_type}</h3>
      <h3 className="2/12">{capacity}</h3>
    </div>
  );
};

export default Item;
