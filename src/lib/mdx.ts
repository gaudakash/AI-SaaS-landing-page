import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const dir = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string; title: string; description: string; date: string;
  author: string; cover?: string; tags?: string[]; readingTime: string;
};

export function getPosts(): PostMeta[] {
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx")).map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf8");
    const { data, content } = matter(raw);
    return { slug: file.replace(/\.mdx$/, ""), ...(data as Omit<PostMeta, "slug" | "readingTime">), readingTime: readingTime(content).text };
  }).sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string) {
  const raw = fs.readFileSync(path.join(dir, `${slug}.mdx`), "utf8");
  const { data, content } = matter(raw);
  return { meta: { slug, ...data, readingTime: readingTime(content).text } as PostMeta, content };
}