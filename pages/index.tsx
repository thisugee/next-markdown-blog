import type { NextPage } from "next";
import Head from "next/head";
import { BlogHeader, BlogPosts, Layout } from "../components";
import { BlogPost, getPosts } from "../lib/blog";

export interface BlogPageProps {
  posts: BlogPost[];
}

const HomePage: NextPage<BlogPageProps> = ({ posts }) => {
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Markdown Blog</title>
        </Head>
        <BlogHeader />
        <BlogPosts posts={posts} />
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const posts = getPosts();
  return { props: { posts } };
}

export default HomePage;
