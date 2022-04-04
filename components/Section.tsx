import React from "react";
import { sectionType } from "../types/section";

const Section = (props: sectionType) => {
  return (
    <div
      className={`${
        !props.noBorder &&
        "border border-black dark:border-white rounded-2xl shadow-lg shadow-black"
      } p-5 m-3 ${props.center && "flex flex-col justify-center"} ${
        props.fill && "col-span-2"
      } ${props.bgColor}`}
    >
      {props.children}
    </div>
  );
};

export default Section;
