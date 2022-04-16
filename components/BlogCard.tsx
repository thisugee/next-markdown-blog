import Link from "next/link";
import React from "react";
import { BlogPost } from "../lib/blog";

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <>
      <div className="wrapper">
        <h3 className="title">
          <Link href={`${post.slug}`}>
            <a>{post.title}</a>
          </Link>
        </h3>
        <p className="byline">
          {post.date} by {post.author}
        </p>
      </div>
      <style jsx>
        {`
          .wrapper {
            display: flex;
            flex-direction: column;
          }

          h3.title {
            margin-bottom: 0;
            opacity: 1;
            text-decoration-line: underline;
            text-decoration-thickness: initial;
            text-decoration-style: initial;
            text-underline-offset: 5px;
            text-decoration-color: #f0f3f5;
            transition: opacity 300ms;
          }
          h3.title:hover {
            opacity: 0.5;
          }

          p.byline {
            color: #6e6e6e;
            font-size: 0.8rem;
          }
        `}
      </style>
    </>
  );
};
