import React, { MouseEventHandler } from "react";

type ButtonProps = {
  children: React.ReactNode;
  callback: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ children, callback }: ButtonProps) => {
  return (
    <button
      className="bg-green-900  px-12 rounded cursor-pointer py-3 text-white"
      onClick={callback}
    >
      {children}
    </button>
  );
};

export default Button;
