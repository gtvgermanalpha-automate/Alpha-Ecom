import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { type Insight } from "@/lib/content";
import { Badge } from "@/components/ui/badge";

/** Blog/insight preview card — links to the full article at /blog/[slug]. */
export function BlogCard({ post }: { post: Insight }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-aster hover:shadow-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
        {/* aster overlay wash on hover */}
        <div
          className="pointer-events-none absolute inset-0 bg-aster-700/0 transition-colors duration-300 group-hover:bg-aster-700/35"
          aria-hidden
        />
        <Badge variant="secondary" className="absolute left-4 top-4">
          {post.category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5" />
          {post.readingTime}
        </span>
        <h3 className="mt-2 text-lg font-bold text-navy transition-colors group-hover:text-aster-700">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy">
          Read more
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
