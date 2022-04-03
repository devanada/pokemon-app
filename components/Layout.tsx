import React, { lazy } from "react";
import Head from "next/head";
import { layoutTypes } from "../types/layout";
import Header from "./Header";
import BottomNav from "./BottomNav";

// const Header = lazy(() => import("./Header"));
// const BottomNav = lazy(() => import("./BottomNav"));

const Layout = (props: layoutTypes) => {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <link rel="icon" href="/PokeBall.ico" />
      </Head>
      <main className="flex justify-center bg-slate-900">
        <div className="layout-container bg-white dark:bg-neutral-800 w-full md:w-1/2 h-screen">
          <Header />
          {props.children}
          <BottomNav />
        </div>
      </main>
    </>
  );
};

export default Layout;
