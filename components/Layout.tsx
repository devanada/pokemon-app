import React, { FC } from "react";
import Head from "next/head";

import { LayoutTypes } from "utils/types/components";
import BottomNav from "./BottomNav";
import Header from "./Header";

const Layout: FC<LayoutTypes> = (props) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <link rel="icon" href="/PokeBall.ico" />
      </Head>
      <main className="flex justify-center bg-slate-900">
        <div className="layout-container min-w-full max-w-full bg-white dark:bg-neutral-800 md:min-w-[480px] md:max-w-[480px]">
          <Header />
          <div className="h-full w-full overflow-auto">{props.children}</div>
          <BottomNav />
        </div>
      </main>
    </>
  );
};

export default Layout;
