import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format, parse } from "date-fns";

export type BlogPost = {
  slug: string;
  title?: string;
  date?: string;
  author?: string;
  readingTime: number;
  content: string;
};

export type GetPostResult = Record<
  "post" | "previousPost" | "nextPost",
  BlogPost | null
>;

const POSTS_DIRECTORY = path.join(process.cwd(), "posts");
const WORDS_PER_MINUTE = 225;

/**
 * Filter file names with .md or .mdx extension
 */
function filterMarkdownFiles(fileName: string): boolean {
  return /\.(md|mdx)$/.test(fileName);
}

/**
 * Read contents of markdown file
 */
function getFileContents(fileName: string): BlogPost {
  // Read markdown file as a string
  const fullPath = path.join(POSTS_DIRECTORY, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const {
    data: { slug, ...frontMatter },
    content,
  } = matter(fileContents);

  frontMatter.date = format(
    parse(frontMatter.date, "dd-MM-yyyy", new Date()),
    "MMMM dd, YYY"
  );

  const words = content.match(/\w+/g)?.length || 0;
  const readingTime = Math.ceil(words / WORDS_PER_MINUTE);

  return { slug, content, readingTime, ...frontMatter };
}

export function getAllPostSlugs(): { params: { slug: string } }[] {
  const fileNames = fs.readdirSync(POSTS_DIRECTORY);

  if (!fileNames.length) {
    return [];
  }

  const ids = fileNames.filter(filterMarkdownFiles).map((fileName) => {
    const post = getFileContents(fileName);
    return { params: { slug: post.slug } };
  });

  return ids;
}

export function getPosts(): BlogPost[] {
  let posts = [] as any[];
  let fileNames = fs.readdirSync(POSTS_DIRECTORY);

  if (!fileNames.length) {
    return [];
  }

  posts = fileNames.filter(filterMarkdownFiles).map((fileName) => {
    return getFileContents(fileName);
  });

  // Sort posts by date
  return posts.sort(({ date: a }: any, { date: b }: any) => {
    if (a < b) return 1;
    else if (a > b) return -1;
    else return 0;
  });
}

export function getPost(slug: string): GetPostResult {
  let post = null;
  let previousPost = null;
  let nextPost = null;

  const fileNames = fs.readdirSync(POSTS_DIRECTORY);

  fileNames.filter(filterMarkdownFiles).forEach((fileName, index) => {
    const tempPost = getFileContents(fileName);

    if (tempPost.slug === slug) {
      post = tempPost;

      if (index - 1 > 0) {
        nextPost = getFileContents(fileNames[index - 1]);
      }
      if (index + 1 < fileNames?.length - 1) {
        previousPost = getFileContents(fileNames[index + 1]);
      }
    }
  });

  return { post, previousPost, nextPost };
}
