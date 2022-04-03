import React from "react";
import { sectionType } from "../types/section";

const Section = (props: sectionType) => {
  return (
    <div
      className={`border border-black dark:border-white rounded-2xl p-5 m-3 shadow-lg shadow-black dark:shadow-white ${
        props.center && "flex flex-col justify-center"
      } ${props.fill && "col-span-2"}`}
    >
      {props.children}
    </div>
  );
};

export default Section;
