import React from "react";
import { modalTypes } from "../types/modal";

const Modal = (props: modalTypes) => {
  return (
    <>
      {props.show && (
        <div className="absolute w-full md:w-1/2 h-full flex flex-col justify-center items-center bg-black/50 z-50">
          <div className="w-1/2 border-2 p-5 rounded-xl bg-white dark:bg-neutral-800 border-black dark:border-white">
            {props.children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
