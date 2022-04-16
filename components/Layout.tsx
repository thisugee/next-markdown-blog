import React from "react";
import { Header } from "./Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className="wrapper">
        <Header />
        {children}
      </div>
      <style jsx>
        {`
          .wrapper {
            max-width: 715px;
            margin: 0 auto;
            padding-left: 20px;
            padding-right: 20px;
          }
        `}
      </style>
    </>
  );
};
