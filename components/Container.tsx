import React from "react";
import type { NextPage } from "next";

const Container: NextPage = (props) => {
  return (
    <div className="grid grid-flow-row auto-rows-max grid-cols-2 p-6">
      {props.children}
    </div>
  );
};

export default Container;
