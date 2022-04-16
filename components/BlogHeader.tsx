import React from "react";

export const BlogHeader = () => {
  return (
    <>
      <div className="wrapper">
        <p>Recent Posts</p>
      </div>
      <style jsx>
        {`
          p {
            margin-top: 0;
            margin-bottom: 0;
          }
        `}
      </style>
    </>
  );
};
