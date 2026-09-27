import Link from "next/link";
import { getPosts } from "@/lib/mdx";

export const metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getPosts();
  return (
    <section className="mx-auto max-w-7xl px-6 pt-32 pb-24">
      <h1 className="text-5xl font-semibold">Insights & <span className="text-primary">Updates</span></h1>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`}
            className="group rounded-2xl border border-border bg-card p-6 transition hover:border-primary/50">
            <p className="text-xs text-primary">{p.tags?.join(" · ")}</p>
            <h2 className="mt-3 text-xl font-medium group-hover:text-primary">{p.title}</h2>
            <p className="mt-2 text-sm text-muted">{p.description}</p>
            <p className="mt-6 text-xs text-muted">{new Date(p.date).toDateString()} · {p.readingTime}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}