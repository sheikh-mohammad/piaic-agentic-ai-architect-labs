import Image from "next/image";
import type { Post } from "@/lib/posts";

type PostCardProps = {
  post: Post;
};

const reactionIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
    <path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
);

const commentIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
  </svg>
);

const repostIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
    <path d="M17 1l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4m14-2v2a4 4 0 0 1-4 4H3" />
  </svg>
);

const sendIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-[#0b0b0b]">
      <div className="flex items-start gap-3 p-4">
        <Image
          src={post.author.avatar}
          alt={post.author.name}
          width={48}
          height={48}
          className="h-12 w-12 shrink-0 rounded-full"
        />
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-foreground">{post.author.name}</h3>
          <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{post.author.headline}</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">{post.time} ago</p>
        </div>
      </div>

      <p className="px-4 pb-4 text-[0.95rem] leading-relaxed text-zinc-800 dark:text-zinc-200">
        {post.content}
      </p>

      {post.image && (
        <div className="relative">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            width={post.image.width}
            height={post.image.height}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full"
            style={{ height: "auto" }}
          />
        </div>
      )}

      <div className="flex items-center justify-between border-t border-black/[0.06] px-4 py-2 text-xs text-zinc-500 dark:border-white/[0.08] dark:text-zinc-400">
        <span>{post.reactions.toLocaleString()} reactions</span>
        <span>
          {post.comments} comments · {post.reposts} reposts
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-black/[0.06] px-2 py-1 text-sm text-zinc-600 dark:border-white/[0.08] dark:text-zinc-400">
        <button className="flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-2 hover:bg-zinc-100 dark:hover:bg-white/[0.06]">
          {reactionIcon}
          Like
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-2 hover:bg-zinc-100 dark:hover:bg-white/[0.06]">
          {commentIcon}
          Comment
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-2 hover:bg-zinc-100 dark:hover:bg-white/[0.06]">
          {repostIcon}
          Repost
        </button>
        <button className="flex flex-1 items-center justify-center gap-2 rounded-md px-2 py-2 hover:bg-zinc-100 dark:hover:bg-white/[0.06]">
          {sendIcon}
          Send
        </button>
      </div>
    </article>
  );
}