import React from "react";
import { MdClose } from "react-icons/md";
import { toogleModal } from "../slices/appSlice";
import { useAppDispatch } from "./../hooks";

type ModalProps = {
  children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="w-full h-screen absolute top-0 left-0 z-10 bg-[rgb(0,0,0)] bg-[rgba(0,0,0,0.4)] flex justify-center items-center">
      <div className="flex justify-center items-start w-full gap-x-2">
        <div className="bg-white opacity-100 w-1/3 h-96 px-5 flex justify-center items-center flex-col gap-y-6">
          {children}
        </div>
        <button
          onClick={() => dispatch(toogleModal(false))}
          className="p-3 bg-white rounded-full"
        >
          <MdClose />
        </button>
      </div>
    </div>
  );
};

export default Modal;
