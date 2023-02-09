import React, { FC } from "react";

import { ModalTypes } from "utils/types/components";

const Modal: FC<ModalTypes> = (props) => {
  const { children, show } = props;

  if (show) {
    return (
      <div className="fixed inset-y-0 z-50 flex h-full min-w-full max-w-full items-center justify-center bg-black/50 md:min-w-[480px] md:max-w-[480px]">
        <div className="w-1/2 rounded-xl border-2 border-black bg-white p-5 dark:border-white dark:bg-neutral-800">
          {children}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
