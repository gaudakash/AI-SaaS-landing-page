import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/mdx";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta } = getPost(slug);
  return { title: meta.title, description: meta.description, openGraph: { images: meta.cover ? [meta.cover] : [] } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post;
  try { post = getPost(slug); } catch { notFound(); }

  return (
    <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl px-6 pt-32 pb-24">
      <p className="text-sm text-primary">{post.meta.readingTime}</p>
      <h1>{post.meta.title}</h1>
      <MDXRemote source={post.content} />
    </article>
  );
}