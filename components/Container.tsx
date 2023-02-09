import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Container: FC<Props> = (props) => {
  return (
    <div className="grid grid-flow-row auto-rows-max grid-cols-2 gap-3 p-6">
      {props.children}
    </div>
  );
};

export default Container;
