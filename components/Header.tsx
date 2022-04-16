import React from "react";
import Link from "next/link";

export const Header = () => {
  return (
    <>
      <header>
        <h3>
          <Link href="/">MD Blog</Link>
        </h3>
      </header>
      <style jsx>
        {`
          header {
            height: 60px;
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </>
  );
};
