import React from "react";
import { BlogPost } from "../lib/blog";
import { BlogCard } from "./BlogCard";

interface BlogPostsProps {
  posts: BlogPost[];
}

export const BlogPosts: React.FC<BlogPostsProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </>
  );
};
