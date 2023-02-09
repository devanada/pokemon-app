import React, { FC } from "react";

import { SectionType } from "utils/types/components";

const Section: FC<SectionType> = (props) => {
  return (
    <div
      className={`${
        !props.noBorder &&
        "rounded-2xl border border-black shadow-lg shadow-black dark:border-white"
      } m-3 p-5 ${props.center && "flex flex-col justify-center"} ${
        props.fill && "col-span-2"
      } ${props.bgColor}`}
    >
      {props.children}
    </div>
  );
};

export default Section;
