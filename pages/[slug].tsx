import Head from "next/head";
import type { NextPage } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Layout } from "../components";
import { BlogPost, getAllPostSlugs, getPost } from "../lib/blog";

interface BlogPostPageProps {
  post: BlogPost;
  previousPost: BlogPost;
  nextPost: BlogPost;
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post, source }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Layout>
        <h1 className="title">{post.title}</h1>
        <p className="byline">
          {post.date} by {post.author}
        </p>
        <div className="content">
          <MDXRemote {...source} />
        </div>
      </Layout>
      <style jsx>{`
        h1.title {
          margin-bottom: 4px;
        }
        p.byline {
          color: #333;
          font-size: 0.8rem;
          margin-top: 0;
        }

        .content {
          margin-top: 40px;
        }

        .content a {
          color: blue !important;
          text-decoration: underline !important;
        }
      `}</style>
    </>
  );
};

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const data = await getPost(params.slug);
  if (!data.post) {
    throw new Error("Post is unexpectedly not defined");
  }

  const mdxSource = await serialize(data.post.content);

  return {
    props: {
      post: data.post,
      source: mdxSource,
      previousPost: data.previousPost,
      nextPost: data.nextPost,
    },
  };
}

export default BlogPostPage;
